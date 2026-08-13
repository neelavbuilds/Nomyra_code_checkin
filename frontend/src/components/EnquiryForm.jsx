import { useEffect, useState } from "react";
import { Check, Loader2, MessageCircle, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CTAButton from "@/components/CTAButton";
import { api, apiErrorMessage } from "@/lib/api";
import { SITE, TRIP_OPTIONS, telHref } from "@/lib/site";
import { useEnquiry } from "@/context/EnquiryContext";

const EMPTY = {
  full_name: "",
  phone: "",
  whatsapp: "",
  destination: "",
  travelers: "",
  travel_date: "",
  days: "",
  travel_style: "",
  experiences: [],
  message: "",
};

const field =
  "w-full rounded-sm border border-white/12 bg-night-3 px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-beige focus:outline-none focus:ring-0";

const Selectish = ({ id, label, value, onChange, options, testid }) => (
  <div>
    <Label htmlFor={id} className="mb-2 block text-xs uppercase tracking-[0.14em] text-stone">
      {label}
    </Label>
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={field} data-testid={testid}>
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);

export const EnquiryForm = () => {
  const { open, setOpen, prefill } = useEnquiry();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (open) {
      setForm({ ...EMPTY, ...prefill });
      setStatus("idle");
      setErrors({});
      setApiError("");
      setResult(null);
    }
  }, [open, prefill]);

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const next = {};
    if (form.full_name.trim().length < 2) next.full_name = "Please enter your full name";
    if (!/^[+\d][\d\s-]{5,}$/.test(form.phone.trim())) next.phone = "Please enter a valid phone number";
    if (form.whatsapp && !/^[+\d][\d\s-]{5,}$/.test(form.whatsapp.trim()))
      next.whatsapp = "Please enter a valid WhatsApp number";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    setApiError("");
    try {
      const { data } = await api.post("/enquiries", { ...form, source: "website-form" });
      setResult(data);
      setStatus("done");
    } catch (error) {
      setApiError(apiErrorMessage(error));
      setStatus("idle");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        data-testid="enquiry-dialog"
        className="max-h-[92vh] w-[calc(100vw-2rem)] max-w-2xl overflow-y-auto border-white/10 bg-night-2 p-6 md:p-9"
      >
        {status === "done" ? (
          <div className="py-6 text-center" data-testid="enquiry-success">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-forest text-beige">
              <Check className="h-6 w-6" strokeWidth={1.6} />
            </span>
            <h2 className="mt-7 text-3xl md:text-4xl">Enquiry received</h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
              {result?.message ||
                `Thank you for reaching out to ${SITE.name}. We will get back to you shortly.`}
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              {result?.whatsapp_url && (
                <CTAButton href={result.whatsapp_url} target="_blank" rel="noreferrer noopener" variant="terra" data-testid="enquiry-success-whatsapp">
                  <MessageCircle className="h-4 w-4" strokeWidth={1.6} />
                  Send on WhatsApp
                </CTAButton>
              )}
              <CTAButton href={telHref} variant="outline" data-testid="enquiry-success-call">
                <Phone className="h-4 w-4" strokeWidth={1.6} />
                Call Now
              </CTAButton>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader className="text-left">
              <p className="overline mb-3">Plan my trip</p>
              <DialogTitle className="text-3xl md:text-4xl font-normal">
                Tell us about your journey
              </DialogTitle>
              <DialogDescription className="text-sm text-ink-soft">
                Share a few details and {SITE.name} will come back with a personalised Northeast India plan.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={submit} className="mt-6 space-y-5" noValidate data-testid="enquiry-form">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="full_name" className="mb-2 block text-xs uppercase tracking-[0.14em] text-stone">Full Name *</Label>
                  <input id="full_name" className={field} value={form.full_name} onChange={(e) => set("full_name")(e.target.value)} placeholder="Your name" data-testid="enquiry-name" />
                  {errors.full_name && <p className="mt-1.5 text-xs text-terra" data-testid="error-full-name">{errors.full_name}</p>}
                </div>
                <div>
                  <Label htmlFor="phone" className="mb-2 block text-xs uppercase tracking-[0.14em] text-stone">Phone Number *</Label>
                  <input id="phone" inputMode="tel" className={field} value={form.phone} onChange={(e) => set("phone")(e.target.value)} placeholder="+91" data-testid="enquiry-phone" />
                  {errors.phone && <p className="mt-1.5 text-xs text-terra" data-testid="error-phone">{errors.phone}</p>}
                </div>
                <div>
                  <Label htmlFor="whatsapp" className="mb-2 block text-xs uppercase tracking-[0.14em] text-stone">WhatsApp Number</Label>
                  <input id="whatsapp" inputMode="tel" className={field} value={form.whatsapp} onChange={(e) => set("whatsapp")(e.target.value)} placeholder="Same as phone" data-testid="enquiry-whatsapp" />
                  {errors.whatsapp && <p className="mt-1.5 text-xs text-terra">{errors.whatsapp}</p>}
                </div>
                <Selectish id="destination" label="Preferred Destination" value={form.destination} onChange={set("destination")} options={TRIP_OPTIONS.destination} testid="enquiry-destination" />
                <Selectish id="travelers" label="Number of Travelers" value={form.travelers} onChange={set("travelers")} options={TRIP_OPTIONS.travelers} testid="enquiry-travelers" />
                <div>
                  <Label htmlFor="travel_date" className="mb-2 block text-xs uppercase tracking-[0.14em] text-stone">Approximate Travel Date</Label>
                  <input id="travel_date" className={field} value={form.travel_date} onChange={(e) => set("travel_date")(e.target.value)} placeholder="e.g. October 2026" data-testid="enquiry-date" />
                </div>
                <Selectish id="days" label="Number of Days" value={form.days} onChange={set("days")} options={TRIP_OPTIONS.duration} testid="enquiry-days" />
                <Selectish id="travel_style" label="Travel Style" value={form.travel_style} onChange={set("travel_style")} options={TRIP_OPTIONS.style} testid="enquiry-style" />
              </div>

              {form.experiences?.length > 0 && (
                <div className="flex flex-wrap gap-2" data-testid="enquiry-selected-experiences">
                  {form.experiences.map((x) => (
                    <span key={x} className="rounded-sm border border-beige/30 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.12em] text-beige">{x}</span>
                  ))}
                </div>
              )}

              <div>
                <Label htmlFor="message" className="mb-2 block text-xs uppercase tracking-[0.14em] text-stone">Message / Requirements</Label>
                <Textarea id="message" rows={4} value={form.message} onChange={(e) => set("message")(e.target.value)} placeholder="Tell us what you want to experience..." className={field} data-testid="enquiry-message" />
              </div>

              {apiError && <p className="text-sm text-terra" data-testid="enquiry-api-error">{apiError}</p>}

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                <button type="submit" disabled={status === "sending"} className="inline-flex items-center justify-center gap-2 rounded-sm bg-beige px-8 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-night transition-colors hover:bg-ink disabled:opacity-60" data-testid="enquiry-submit">
                  {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
                  Send Enquiry
                </button>
                <CTAButton href={telHref} variant="outline" data-testid="enquiry-call-btn">
                  <Phone className="h-4 w-4" strokeWidth={1.6} />
                  Call {SITE.name}
                </CTAButton>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EnquiryForm;
