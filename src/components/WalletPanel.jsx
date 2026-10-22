import { useState } from "react";
import { LoaderCircle, Wallet } from "lucide-react";
import { BASE_URL } from "../utils/urls";
import loadRazorpay from "../utils/loadRazorpay";
import { formatPaise } from "../utils/formatPaise";

const LABELS = { topup: "Wallet top-up", campaign_payment: "Campaign payment", campaign_refund: "Refund" };

export default function WalletPanel({ wallet, onChanged, disabled }) {
  const [amount, setAmount] = useState("1000");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  if (!wallet) return null;

  const post = async (path, body) => {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Request failed.");
    return data;
  };

  const topUp = async () => {
    setBusy(true);
    setError("");
    try {
      const order = await post("/api/wallet/topup/order", { amount: Number(amount) });
      if (!(await loadRazorpay())) throw new Error("Payment checkout could not be loaded. Check your connection and retry.");
      const checkout = new window.Razorpay({
        key: order.keyId, amount: order.amount, currency: order.currency, order_id: order.orderId,
        name: "SocialBureau", description: "Wallet top-up", theme: { color: "#d8fb56" },
        handler: async (paymentResponse) => {
          try {
            await post("/api/wallet/topup/verify", paymentResponse);
          } catch (verifyError) {
            setError(`${verifyError.message} If money was debited, your wallet will be credited shortly.`);
          } finally {
            await onChanged();
            setBusy(false);
          }
        },
        modal: { ondismiss: () => setBusy(false) },
      });
      checkout.on("payment.failed", (response) => {
        setBusy(false);
        setError(response.error?.description || "Top-up did not complete.");
      });
      checkout.open();
    } catch (topUpError) {
      setBusy(false);
      setError(topUpError.message);
    }
  };

  return <section className="campaign-wallet" aria-label="Wallet">
    <div className="campaign-wallet-head"><Wallet size={18} /><div><span>WALLET BALANCE</span><b>{formatPaise(wallet.balancePaise)}</b></div></div>
    <div className="campaign-wallet-topup">
      <input type="number" aria-label="Top-up amount in INR" min={wallet.minTopupPaise / 100} max={wallet.maxTopupPaise / 100} step="1" value={amount} onChange={(event) => setAmount(event.target.value)} disabled={busy || disabled} />
      <button type="button" className="campaign-button" onClick={topUp} disabled={busy || disabled}>{busy ? <LoaderCircle className="spin" size={16} /> : null} Add money</button>
    </div>
    <small>Add {formatPaise(wallet.minTopupPaise)} to {formatPaise(wallet.maxTopupPaise)} per top-up via Razorpay. Wallet balance is non-transferable.</small>
    {error && <p className="campaign-error" role="alert">{error}</p>}
    {wallet.transactions.length > 0 && <>
      <button type="button" className="campaign-wallet-toggle" onClick={() => setShowHistory((value) => !value)}>{showHistory ? "Hide" : "Show"} recent transactions</button>
      {showHistory && <ul className="campaign-wallet-history">{wallet.transactions.map((tx) => <li key={tx.id}>
        <span>{LABELS[tx.type] || tx.type}{tx.bookingId ? ` · ${tx.bookingId}` : ""}<small>{new Date(tx.createdAt).toLocaleString("en-IN")}</small></span>
        <b className={tx.direction}>{tx.direction === "credit" ? "+" : "−"}{formatPaise(tx.amountPaise)}</b>
      </li>)}</ul>}
    </>}
  </section>;
}
