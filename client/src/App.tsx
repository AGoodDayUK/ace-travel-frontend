import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { JsonLd, organisationSchema, webSiteSchema } from "@/components/JsonLd";
import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "wouter";

// ── Eagerly loaded (critical path) ──────────────────────────────────────────
import Home from "./pages/Home";
import NotFound from "@/pages/NotFound";

// ── Lazily loaded public pages ───────────────────────────────────────────────
const TourDetail = lazy(() => import("./pages/TourDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Destinations = lazy(() => import("./pages/Destinations"));
const Tours = lazy(() => import("./pages/Tours"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Deals = lazy(() => import("./pages/Deals"));
const About = lazy(() => import("./pages/About"));
const DestinationThailand = lazy(() => import("./pages/DestinationThailand"));
const DestinationBali = lazy(() => import("./pages/DestinationBali"));
const DestinationPhilippines = lazy(() => import("./pages/DestinationPhilippines"));
const WelcomePack = lazy(() => import("./pages/WelcomePack"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("@/pages/TermsConditions"));
const BlogsVlogs = lazy(() => import("@/pages/BlogsVlogs"));
const Payments = lazy(() => import("@/pages/Payments"));
const FlightSupport = lazy(() => import("@/pages/FlightSupport"));
const ScubaDiving = lazy(() => import("@/pages/ScubaDiving"));

// ── Lazily loaded CMS admin pages ────────────────────────────────────────────
const CmsLogin = lazy(() => import("@/pages/admin/CmsLogin"));
const CmsDashboard = lazy(() => import("@/pages/admin/CmsDashboard"));
const CmsTours = lazy(() => import("@/pages/admin/CmsTours"));
const CmsDeals = lazy(() => import("@/pages/admin/CmsDeals"));
const CmsFaqs = lazy(() => import("@/pages/admin/CmsFaqs"));
const CmsReviews = lazy(() => import("@/pages/admin/CmsReviews"));
const CmsPages = lazy(() => import("@/pages/admin/CmsPages"));
const CmsBlockEditor = lazy(() => import("@/pages/admin/CmsBlockEditor"));
const CmsMedia = lazy(() => import("@/pages/admin/CmsMedia"));
const CmsSettings = lazy(() => import("@/pages/admin/CmsSettings"));
const CmsUsers = lazy(() => import("@/pages/admin/CmsUsers"));
const CmsBlogs = lazy(() => import("@/pages/admin/CmsBlogs"));

// ── Minimal page-level loading skeleton ─────────────────────────────────────
function PageSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// ── Scroll to top on route change ────────────────────────────────────────────
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {/* Global structured data — present on every public page */}
      <JsonLd schema={organisationSchema()} />
      <JsonLd schema={webSiteSchema()} />
      <Header />
      <main className="flex-1">
        <Suspense fallback={<PageSkeleton />}>
          <Switch>
            <Route path={"/"} component={Home} />
            <Route path={"/tour/:id"} component={TourDetail} />
            <Route path={"/destinations"} component={Destinations} />
            <Route path={"/destinations/thailand"} component={DestinationThailand} />
            <Route path={"/destinations/bali"} component={DestinationBali} />
            <Route path={"/destinations/philippines"} component={DestinationPhilippines} />
            <Route path={"/tours"} component={Tours} />
            <Route path={"/how-it-works"} component={HowItWorks} />
            <Route path={"/deals"} component={Deals} />
            <Route path={"/about"} component={About} />
            <Route path={"/contact"} component={Contact} />
            <Route path={"/faq"} component={FAQ} />
            <Route path={"/reviews"} component={Reviews} />
            <Route path={"/privacy"} component={PrivacyPolicy} />
            <Route path={"/terms"} component={TermsConditions} />
            <Route path={"/blogs-vlogs"} component={BlogsVlogs} />
            <Route path={"/payments"} component={Payments} />
            <Route path={"/flight-support"} component={FlightSupport} />
            <Route path={"/add-ons/scuba-diving"} component={ScubaDiving} />
            <Route path={"/404"} component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Suspense fallback={<PageSkeleton />}>
            <Switch>
              {/* Welcome pack pages - no header/footer */}
              <Route path={"/welcome/:tour"} component={({ params }: { params: { tour: string } }) => <WelcomePack tour={params.tour} />} />

              {/* CMS Admin pages - no public header/footer, own layout */}
              <Route path={"/admin/login"} component={CmsLogin} />
              <Route path={"/admin/dashboard"} component={CmsDashboard} />
              <Route path={"/admin/tours"} component={CmsTours} />
              <Route path={"/admin/deals"} component={CmsDeals} />
              <Route path={"/admin/faqs"} component={CmsFaqs} />
              <Route path={"/admin/reviews"} component={CmsReviews} />
              <Route path={"/admin/pages"} component={CmsPages} />
              <Route path={"/admin/pages/:id/blocks"} component={({ params }: { params: { id: string } }) => <CmsBlockEditor />} />
              <Route path={"/admin/media"} component={CmsMedia} />
              <Route path={"/admin/settings"} component={CmsSettings} />
              <Route path={"/admin/users"} component={CmsUsers} />
              <Route path={"/admin/blogs"} component={CmsBlogs} />

              {/* All other pages use the main layout with header and footer */}
              <Route component={MainLayout} />
            </Switch>
          </Suspense>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
