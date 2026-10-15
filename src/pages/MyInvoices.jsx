import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/urls";

const money = (value, currency = "INR") => new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(value || 0);
const istDate = (value) => new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium" }).format(new Date(value));

export default function MyInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/api/invoices`, { credentials: "include" })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Could not load invoices.");
        setInvoices(data.invoices);
      })
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, []);

  const download = async (invoice) => {
    setError("");
    try {
      const response = await fetch(`${BASE_URL}/api/invoices/${invoice._id}/pdf`, { credentials: "include" });
      if (!response.ok) throw new Error("Could not download invoice.");
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = url;
      link.download = `${invoice.invoiceNumber}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (downloadError) {
      setError(downloadError.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f6f8] px-6 py-24 text-gray-900">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-2xl font-bold">My Invoices</h1>
        {error && <p className="mb-4 text-sm text-red-600" role="alert">{error}</p>}
        {loading ? <p className="text-gray-600">Loading invoices...</p> : !invoices.length ? <p className="text-gray-600">No invoices yet. Invoices appear here after a payment is verified.</p> : (
          <div className="overflow-x-auto rounded-lg bg-white shadow">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-600"><tr><th className="p-3">Invoice</th><th className="p-3">Date</th><th className="p-3">Description</th><th className="p-3 text-right">Total</th><th className="p-3" /></tr></thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice._id} className="border-t">
                    <td className="p-3 font-medium">{invoice.invoiceNumber}</td>
                    <td className="p-3">{istDate(invoice.issuedAt)}</td>
                    <td className="p-3">{invoice.description}</td>
                    <td className="p-3 text-right">{money(invoice.total, invoice.currency)}</td>
                    <td className="p-3 text-right"><button type="button" onClick={() => download(invoice)} className="rounded bg-indigo-500 px-3 py-1 text-white hover:bg-indigo-600">Download PDF</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
