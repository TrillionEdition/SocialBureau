import { useState } from "react";
import { subscribeNewsletter } from "..newsletterService";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await subscribeNewsletter(email);
      setMsg("Subscribed successfully ✅");
      setEmail("");
    } catch {
      setMsg("Subscription failed ❌");
    }
  };

  return (
    <form onSubmit={submit}>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <button>Subscribe</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}
