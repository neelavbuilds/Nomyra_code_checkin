import Seo from "@/components/Seo";
import { SITE } from "@/lib/site";

const CONTENT = {
  privacy: {
    title: "Privacy Policy",
    path: "/privacy-policy",
    blocks: [
      ["What we collect", `When you submit an enquiry we collect the details you enter — your name, phone number, WhatsApp number, preferred destination, travel dates, group size and your message. We do not collect payment information on this website.`],
      ["How we use it", `We use your details only to respond to your enquiry, plan your journey and stay in touch about that trip. Your enquiry may be sent to our team by WhatsApp so we can reply quickly.`],
      ["Sharing", `We share only what is necessary with the hotels, camps, drivers and guides involved in your trip. We do not sell or rent your personal data to anyone.`],
      ["Retention and your rights", `We keep enquiries for as long as needed to serve you and for our own records. You can ask us to correct or delete your details at any time by emailing ${SITE.email}.`],
      ["Cookies and analytics", `This website uses minimal storage required for the site to function. Any analytics we add in future will be limited to aggregate, non-identifying usage data.`],
      ["Contact", `Questions about this policy? Email ${SITE.email} or call ${SITE.phone}.`],
    ],
  },
  terms: {
    title: "Terms & Conditions",
    path: "/terms",
    blocks: [
      ["Enquiries and quotes", `Itineraries and prices shared in response to an enquiry are proposals and remain subject to availability at the time of confirmation. Nothing on this website is a confirmed booking.`],
      ["Confirmation", `A trip is confirmed only when we have confirmed it to you in writing and any agreed advance has been received.`],
      ["Changes to itineraries", `Northeast India travel is weather-dependent. Roads may close, rivers may rise and permits may be delayed. We may adjust routes, stays or activities where necessary for safety, and will always discuss changes with you.`],
      ["Permits and documents", `Travellers are responsible for carrying valid identification. Where permits such as the Inner Line Permit are required, we will assist with the process, but issuance rests with the relevant authority.`],
      ["Responsibility", `Travellers take part in treks, camping and water activities at their own risk and must follow guide instructions and safety equipment requirements. We recommend suitable travel insurance.`],
      ["Cancellations", `Cancellation terms depend on the stays, permits and transport booked for your journey and will be shared in writing with your confirmed itinerary.`],
      ["Contact", `For any clarification write to ${SITE.email} or call ${SITE.phone}.`],
    ],
  },
};

export default function Legal({ kind }) {
  const doc = CONTENT[kind];
  return (
    <>
      <Seo title={doc.title} description={`${doc.title} for ${SITE.name}.`} path={doc.path} noindex />
      <section className="bg-night pb-24 pt-40 md:pt-48" data-testid={`legal-${kind}`}>
        <div className="shell max-w-3xl">
          <p className="overline mb-5">{SITE.name}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight">{doc.title}</h1>
          <div className="mt-14 space-y-12">
            {doc.blocks.map(([heading, text]) => (
              <div key={heading}>
                <h2 className="text-2xl text-ink">{heading}</h2>
                <p className="mt-4 text-base leading-[1.9] text-ink-soft">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
