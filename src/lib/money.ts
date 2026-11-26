export const inr = (p: number | null | undefined, dec = false) => p == null ? '—' : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: dec || p % 100 ? 2 : 0, maximumFractionDigits: dec || p % 100 ? 2 : 0 }).format(p / 100);
export const inr0 = (p: number | null | undefined) => p == null ? '—' : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Math.round(p / 100));
export const inrShort = (p: number) => { const r = p / 100; return r >= 1e7 ? `₹${(r / 1e7).toFixed(1)}Cr` : r >= 1e5 ? `₹${(r / 1e5).toFixed(1)}L` : r >= 1e3 ? `₹${(r / 1e3).toFixed(1)}k` : `₹${Math.round(r)}`; };
export const num = (n: number | null | undefined) => n == null ? '—' : new Intl.NumberFormat('en-IN').format(n);
export const pct = (n: number | null | undefined, d = 1) => n == null || !isFinite(n) ? '—' : `${(n * 100).toFixed(d)}%`;
export const fdate = (d: Date | string | null | undefined, o: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }) => d ? new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', ...o }).format(new Date(d)) : '—';
export const fdt = (d: Date | string | null | undefined) => fdate(d, { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });
export const nowDate = () => new Date();
