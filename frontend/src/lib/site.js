const digitsOnly = (v) => (v || "").replace(/[^\d]/g, "");

export const SITE = {
  name: "Nomyra Travels",
  tagline: "Discover the Northeast, Beyond the Ordinary.",
  statement:
    "Curated journeys through the mountains, forests, rivers and hidden villages of Northeast India.",
  phone: process.env.REACT_APP_BUSINESS_PHONE || "",
  whatsapp: process.env.REACT_APP_BUSINESS_WHATSAPP || "",
  email: process.env.REACT_APP_BUSINESS_EMAIL || "",
  location: process.env.REACT_APP_BUSINESS_LOCATION || "Northeast India",
  instagram: process.env.REACT_APP_INSTAGRAM_URL || "",
  facebook: process.env.REACT_APP_FACEBOOK_URL || "",
  youtube: process.env.REACT_APP_YOUTUBE_URL || "",
  url: process.env.REACT_APP_BACKEND_URL || "",
};

export const telHref = `tel:${SITE.phone}`;
export const waHref = (text) =>
  `https://wa.me/${digitsOnly(SITE.whatsapp)}?text=${encodeURIComponent(
    text || `Hi ${SITE.name}, I'd like to plan a Northeast India trip.`
  )}`;

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Packages", to: "/packages" },
  { label: "Meghalaya", to: "/meghalaya" },
  { label: "Arunachal", to: "/arunachal" },
  { label: "Experiences", to: "/experiences" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const TRIP_OPTIONS = {
  destination: ["Meghalaya", "Assam", "Arunachal Pradesh", "Multiple states", "Not sure yet"],
  style: [
    "Adventure", "Relaxed", "Luxury", "Budget", "Backpacking",
    "Couple", "Family", "Friends", "Photography", "Offbeat",
  ],
  experiences: [
    "Trekking", "Camping", "Waterfalls", "Wildlife", "Rivers",
    "Mountains", "Culture", "Food", "Photography",
  ],
  duration: ["3–5 Days", "6–8 Days", "9–12 Days", "13+ Days"],
  travelers: ["1", "2", "3–4", "5–8", "9+"],
};
