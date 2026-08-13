import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, LogOut, Plus, Save, Trash2, X } from "lucide-react";
import Seo from "@/components/Seo";
import { api, apiErrorMessage, getToken, setToken } from "@/lib/api";

const TABS = [
  { key: "enquiries", label: "Enquiries" },
  { key: "packages", label: "Packages" },
  { key: "destinations", label: "Destinations" },
  { key: "experiences", label: "Experiences" },
  { key: "testimonials", label: "Testimonials" },
  { key: "gallery", label: "Gallery" },
  { key: "blog", label: "Blog" },
];

const TEMPLATES = {
  packages: { slug: "", order: 9, code: "", title: "", subtitle: "", description: "", image: "", image_alt: "", highlights: [], cta_label: "Enquire", duration: "", featured: true, variant: "standard" },
  destinations: { slug: "", order: 9, state: "Meghalaya", region: "", name: "", tagline: "", description: "", image: "", image_alt: "", highlights: [], span: "standard" },
  experiences: { slug: "", order: 9, category: "", location: "", title: "", summary: "", description: "", image: "", image_alt: "", highlights: [], cta_label: "Explore Experience", difficulty: "", best_time: "" },
  testimonials: { order: 9, name: "", trip: "", quote: "", photo: "", is_placeholder: true },
  gallery: { order: 9, category: "Meghalaya", image: "", caption: "", alt: "" },
  blog: { slug: "", title: "", excerpt: "", body: "", cover_image: "", cover_alt: "", category: "", read_time: "", tags: [], meta_title: "", meta_description: "", published: true },
};

const LABELS = {
  packages: "title", destinations: "name", experiences: "title",
  testimonials: "name", gallery: "caption", blog: "title",
};

const field =
  "w-full rounded-sm border border-white/12 bg-night-3 px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-beige focus:outline-none";

const STATUSES = ["new", "contacted", "converted", "closed"];

const EnquiryRow = ({ item, onStatus, onDelete }) => (
  <div className="border border-white/10 bg-night-2 p-5" data-testid={`enquiry-row-${item.id}`}>
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <p className="font-display text-2xl">{item.full_name}</p>
        <p className="mt-1 text-sm text-ink-soft">{item.phone}{item.whatsapp ? ` · WA ${item.whatsapp}` : ""}</p>
      </div>
      <div className="flex items-center gap-2">
        <select value={item.status} onChange={(e) => onStatus(item.id, e.target.value)} className={`${field} w-auto`} data-testid={`enquiry-status-${item.id}`}>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button type="button" onClick={() => onDelete(item.id)} aria-label="Delete enquiry" data-testid={`enquiry-delete-${item.id}`} className="grid h-10 w-10 place-items-center rounded-sm border border-white/12 text-ink-faint hover:text-terra">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
    <dl className="mt-4 grid gap-x-6 gap-y-2 text-xs text-ink-soft sm:grid-cols-3">
      {[["Destination", item.destination], ["Travelers", item.travelers], ["Date", item.travel_date],
        ["Duration", item.days], ["Style", item.travel_style], ["Experiences", (item.experiences || []).join(", ")]]
        .filter(([, v]) => v)
        .map(([k, v]) => (
          <div key={k}><dt className="uppercase tracking-[0.14em] text-stone">{k}</dt><dd className="text-ink">{v}</dd></div>
        ))}
    </dl>
    {item.message && <p className="mt-4 border-l border-terra/60 pl-4 text-sm text-ink-soft">{item.message}</p>}
    <p className="mt-4 text-[0.65rem] uppercase tracking-[0.14em] text-ink-faint">
      {new Date(item.created_at).toLocaleString()} · WhatsApp notified: {item.whatsapp_notified ? "yes" : "no"}
    </p>
  </div>
);

const Editor = ({ collection, item, onCancel, onSaved }) => {
  const [draft, setDraft] = useState(item);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const save = async () => {
    setBusy(true);
    setError("");
    try {
      const payload = Object.fromEntries(
        Object.entries(draft).filter(([k]) => k !== "id")
      );
      if (item.id) await api.put(`/admin/${collection}/${item.id}`, payload);
      else await api.post(`/admin/${collection}`, payload);
      onSaved();
    } catch (err) {
      setError(apiErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="border border-beige/30 bg-night-2 p-6" data-testid="admin-editor">
      <div className="mb-5 flex items-center justify-between">
        <p className="overline">{item.id ? "Edit" : "New"} {collection}</p>
        <button type="button" onClick={onCancel} aria-label="Close editor" data-testid="admin-editor-close" className="text-ink-faint hover:text-ink"><X className="h-4 w-4" /></button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(draft).filter(([k]) => k !== "id").map(([key, value]) => (
          <div key={key} className={key === "body" || key === "description" ? "md:col-span-2" : ""}>
            <label htmlFor={`f-${key}`} className="mb-1.5 block text-[0.65rem] uppercase tracking-[0.14em] text-stone">{key.replace(/_/g, " ")}</label>
            {typeof value === "boolean" ? (
              <input id={`f-${key}`} type="checkbox" checked={value} onChange={(e) => setDraft({ ...draft, [key]: e.target.checked })} data-testid={`field-${key}`} className="h-5 w-5 accent-[#D3C3B1]" />
            ) : Array.isArray(value) ? (
              <input id={`f-${key}`} className={field} value={value.join(", ")} onChange={(e) => setDraft({ ...draft, [key]: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} data-testid={`field-${key}`} />
            ) : key === "body" || key === "description" ? (
              <textarea id={`f-${key}`} rows={key === "body" ? 12 : 4} className={field} value={value ?? ""} onChange={(e) => setDraft({ ...draft, [key]: e.target.value })} data-testid={`field-${key}`} />
            ) : (
              <input id={`f-${key}`} type={typeof value === "number" ? "number" : "text"} className={field} value={value ?? ""} onChange={(e) => setDraft({ ...draft, [key]: typeof value === "number" ? Number(e.target.value) : e.target.value })} data-testid={`field-${key}`} />
            )}
          </div>
        ))}
      </div>
      {error && <p className="mt-4 text-sm text-terra" data-testid="admin-editor-error">{error}</p>}
      <button type="button" onClick={save} disabled={busy} className="mt-6 inline-flex items-center gap-2 rounded-sm bg-beige px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-night hover:bg-ink disabled:opacity-60" data-testid="admin-editor-save">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
      </button>
    </div>
  );
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("enquiries");
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async (key) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get(key === "enquiries" ? "/admin/enquiries" : `/admin/${key}`);
      setItems(data);
    } catch (err) {
      if (err?.response?.status === 401) { setToken(null); navigate("/admin/login"); return; }
      setError(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (!getToken()) { navigate("/admin/login"); return; }
    load(tab);
    setEditing(null);
  }, [tab, load, navigate]);

  const logout = async () => {
    setToken(null);
    navigate("/admin/login");
  };

  const remove = async (id) => {
    await api.delete(tab === "enquiries" ? `/admin/enquiries/${id}` : `/admin/${tab}/${id}`);
    load(tab);
  };

  const setStatus = async (id, status) => {
    await api.patch(`/admin/enquiries/${id}`, { status });
    load(tab);
  };

  const counts = useMemo(() => items.length, [items]);

  return (
    <>
      <Seo title="Admin Dashboard" noindex />
      <div className="min-h-screen bg-night" data-testid="admin-dashboard">
        <header className="border-b border-white/10 bg-night-2">
          <div className="shell flex items-center justify-between py-5">
            <Link to="/" className="font-display text-xl tracking-[0.16em]">NOMYRA <span className="text-stone">CMS</span></Link>
            <button type="button" onClick={logout} data-testid="admin-logout" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-ink-soft hover:text-beige">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </header>

        <div className="shell py-10">
          <nav className="no-scrollbar mb-10 flex gap-2 overflow-x-auto pb-2">
            {TABS.map((t) => (
              <button key={t.key} type="button" onClick={() => setTab(t.key)} data-testid={`admin-tab-${t.key}`}
                className={`flex-none rounded-sm border px-4 py-2.5 text-xs uppercase tracking-[0.12em] transition-colors ${
                  tab === t.key ? "border-beige bg-beige text-night" : "border-white/12 text-ink-soft hover:text-beige"
                }`}>
                {t.label}
              </button>
            ))}
          </nav>

          <div className="mb-6 flex items-center justify-between">
            <p className="overline">{counts} {tab}</p>
            {tab !== "enquiries" && (
              <button type="button" onClick={() => setEditing({ ...TEMPLATES[tab] })} data-testid="admin-new-btn"
                className="inline-flex items-center gap-2 rounded-sm border border-white/15 px-4 py-2.5 text-xs uppercase tracking-[0.14em] text-ink hover:border-beige hover:text-beige">
                <Plus className="h-4 w-4" /> New
              </button>
            )}
          </div>

          {error && <p className="mb-6 text-sm text-terra" data-testid="admin-error">{error}</p>}
          {editing && (
            <div className="mb-8">
              <Editor collection={tab} item={editing} onCancel={() => setEditing(null)} onSaved={() => { setEditing(null); load(tab); }} />
            </div>
          )}

          {loading ? (
            <p className="text-sm text-ink-faint">Loading…</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-ink-faint" data-testid="admin-empty">Nothing here yet.</p>
          ) : tab === "enquiries" ? (
            <div className="space-y-4">
              {items.map((item) => <EnquiryRow key={item.id} item={item} onStatus={setStatus} onDelete={remove} />)}
            </div>
          ) : (
            <ul className="divide-y divide-white/8 border-y border-white/8">
              {items.map((item) => (
                <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-4" data-testid={`admin-item-${item.id}`}>
                  <span className="font-display text-xl text-ink">{item[LABELS[tab]] || item.slug || "Untitled"}</span>
                  <span className="flex items-center gap-2">
                    <button type="button" onClick={() => setEditing(item)} data-testid={`admin-edit-${item.id}`} className="rounded-sm border border-white/12 px-4 py-2 text-xs uppercase tracking-[0.14em] text-ink-soft hover:border-beige hover:text-beige">Edit</button>
                    <button type="button" onClick={() => remove(item.id)} aria-label="Delete" data-testid={`admin-delete-${item.id}`} className="grid h-9 w-9 place-items-center rounded-sm border border-white/12 text-ink-faint hover:text-terra"><Trash2 className="h-4 w-4" /></button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
