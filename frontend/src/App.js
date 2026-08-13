import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EnquiryProvider } from "@/context/EnquiryContext";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";

const Packages = lazy(() => import("@/pages/Packages"));
const PackageDetail = lazy(() => import("@/pages/PackageDetail"));
const StatePage = lazy(() => import("@/pages/StatePage"));
const DestinationDetail = lazy(() => import("@/pages/DestinationDetail"));
const Experiences = lazy(() => import("@/pages/Experiences"));
const ExperienceDetail = lazy(() => import("@/pages/ExperienceDetail"));
const GalleryPage = lazy(() => import("@/pages/GalleryPage"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Legal = lazy(() => import("@/pages/Legal"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const AdminLogin = lazy(() => import("@/pages/AdminLogin"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));

const Loading = () => (
  <div className="grid min-h-screen place-items-center bg-night">
    <span className="overline animate-pulse">Nomyra Travels</span>
  </div>
);

const Site = ({ children }) => (
  <Layout>
    <Suspense fallback={<Loading />}>{children}</Suspense>
  </Layout>
);

function App() {
  return (
    <BrowserRouter>
      <EnquiryProvider>
        <Routes>
          <Route path="/" element={<Site><Home /></Site>} />
          <Route path="/packages" element={<Site><Packages /></Site>} />
          <Route path="/packages/:slug" element={<Site><PackageDetail /></Site>} />
          <Route path="/meghalaya" element={<Site><StatePage stateName="Meghalaya" /></Site>} />
          <Route path="/arunachal" element={<Site><StatePage stateName="Arunachal Pradesh" /></Site>} />
          <Route path="/assam" element={<Site><StatePage stateName="Assam" /></Site>} />
          <Route path="/destinations/:slug" element={<Site><DestinationDetail /></Site>} />
          <Route path="/experiences" element={<Site><Experiences /></Site>} />
          <Route path="/experiences/:slug" element={<Site><ExperienceDetail /></Site>} />
          <Route path="/gallery" element={<Site><GalleryPage /></Site>} />
          <Route path="/about" element={<Site><About /></Site>} />
          <Route path="/contact" element={<Site><Contact /></Site>} />
          <Route path="/blog" element={<Site><Blog /></Site>} />
          <Route path="/blog/:slug" element={<Site><BlogPost /></Site>} />
          <Route path="/privacy-policy" element={<Site><Legal kind="privacy" /></Site>} />
          <Route path="/terms" element={<Site><Legal kind="terms" /></Site>} />
          <Route path="/admin/login" element={<Suspense fallback={<Loading />}><AdminLogin /></Suspense>} />
          <Route path="/admin" element={<Suspense fallback={<Loading />}><AdminDashboard /></Suspense>} />
          <Route path="*" element={<Site><NotFound /></Site>} />
        </Routes>
      </EnquiryProvider>
    </BrowserRouter>
  );
}

export default App;
