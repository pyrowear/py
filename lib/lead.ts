export type Lead = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  city: string;
  address: string;
  size: string;
  product: string;
  priceMAD: number;
  lang: "fr" | "ar";
};

const KEY = "pyro_leads_v1";

export function saveLead(lead: Lead) {
  if (typeof window === "undefined") return;
  const raw = localStorage.getItem(KEY);
  const list: Lead[] = raw ? JSON.parse(raw) : [];
  list.unshift(lead);
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, 500)));
}

export function getLeads(): Lead[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export function clearLeads() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
