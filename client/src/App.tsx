import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TourDetail from "./pages/TourDetail";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Reviews from "./pages/Reviews";
import Destinations from "./pages/Destinations";
import Tours from "./pages/Tours";
import HowItWorks from "./pages/HowItWorks";
import Deals from "./pages/Deals";
import About from "./pages/About";
import DestinationThailand from "./pages/DestinationThailand";
import DestinationBali from "./pages/DestinationBali";
import DestinationPhilippines from "./pages/DestinationPhilippines";
import WelcomePack from "./pages/WelcomePack";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsConditions from "@/pages/TermsConditions";
import BlogsVlogs from "@/pages/BlogsVlogs";
import Payments from "@/pages/Payments";
import FlightSupport from "@/pages/FlightSupport";
import ScubaDiving from "@/pages/ScubaDiving";

// CMS Admin pages
import CmsLogin from "@/pages/admin/CmsLogin";
import CmsDashboard from "@/pages/admin/CmsDashboard";
import CmsTours from "@/pages/admin/CmsTours";
import CmsDeals from "@/pages/admin/CmsDeals";
import CmsFaqs from "@/pages/admin/CmsFaqs";
import CmsReviews from "@/pages/admin/CmsReviews";
import CmsPages from "@/pages/admin/CmsPages";
import CmsBlockEditor from "@/pages/admin/CmsBlockEditor";
import CmsMedia from "@/pages/admin/CmsMedia";
import CmsSettings from "@/pages/admin/CmsSettings";
import CmsUsers from "@/pages/admin/CmsUsers";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
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
          <Switch>
            {/* Welcome pack pages - no header/footer */}
            <Route path={"/welcome/:tour"} component={({ params }: { params: { tour: string } }) => <WelcomePack tour={params.tour} />} />

            {/* CMS Admin pages - no public header/footer, own dark layout */}
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

            {/* All other pages use the main layout with header and footer */}
            <Route component={MainLayout} />
          </Switch>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
