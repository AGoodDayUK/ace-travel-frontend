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
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/tour/:id"} component={TourDetail} />
      <Route path={"/destinations"} component={Destinations} />
      <Route path={"/destinations/thailand"} component={DestinationThailand} />
      <Route path={"/tours"} component={Tours} />
      <Route path={"/how-it-works"} component={HowItWorks} />
      <Route path={"/deals"} component={Deals} />
      <Route path={"/about"} component={About} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/reviews"} component={Reviews} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
