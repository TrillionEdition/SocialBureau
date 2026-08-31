const API_BASE = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/subscription`;

async function handleJson(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
}

export async function getPortfolioVisibility(slug) {
  const res = await fetch(`${API_BASE}/portfolio/${slug}/visible`);
  return handleJson(res);
}

export async function startCheckout({ portfolioSlug, customerName, customerEmail }) {
  const res = await fetch(`${API_BASE}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ portfolioSlug, customerName, customerEmail }),
  });
  return handleJson(res);
}

export async function verifySubscription(payload) {
  const res = await fetch(`${API_BASE}/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleJson(res);
}
