import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Lock } from "lucide-react";
import Seo from "@/components/Seo";
import { api, apiErrorMessage, setToken } from "@/lib/api";

const field =
  "w-full rounded-sm border border-white/12 bg-night-3 px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-beige focus:outline-none";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setToken(data.access_token);
      navigate("/admin");
    } catch (err) {
      setError(apiErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Seo title="Admin Login" noindex />
      <div className="grid min-h-screen place-items-center bg-night px-6" data-testid="admin-login-page">
        <form onSubmit={submit} className="w-full max-w-sm border border-white/10 bg-night-2 p-8" data-testid="admin-login-form">
          <p className="overline mb-3">Nomyra Travels</p>
          <h1 className="flex items-center gap-3 text-3xl">
            <Lock className="h-5 w-5 text-terra" strokeWidth={1.5} /> Admin
          </h1>
          <div className="mt-8 space-y-4">
            <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} data-testid="admin-email" />
            <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={field} data-testid="admin-password" />
          </div>
          {error && <p className="mt-4 text-sm text-terra" data-testid="admin-login-error">{error}</p>}
          <button type="submit" disabled={busy} className="mt-7 flex w-full items-center justify-center gap-2 rounded-sm bg-beige px-6 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-night transition-colors hover:bg-ink disabled:opacity-60" data-testid="admin-login-submit">
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}
