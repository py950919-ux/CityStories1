import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import { ProtectedRoute } from "@/components/protected-route";

// Layout
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";

// Pages
import Home from "@/pages/home";
import Cities from "@/pages/cities";
import City from "@/pages/city";
import Pricing from "@/pages/pricing";
import Login from "@/pages/login";
import Contributor from "@/pages/contributor";
import ContributorApply from "@/pages/contributor-apply";
import SavedPlaces from "@/pages/saved";
import Trips from "@/pages/trips";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/cities" component={Cities} />
          <Route path="/city/:id" component={City} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/login" component={Login} />
          <Route path="/contributor" component={Contributor} />
          
          <Route path="/contributor/apply">
            <ProtectedRoute>
              <ContributorApply />
            </ProtectedRoute>
          </Route>
          
          <Route path="/saved">
            <ProtectedRoute>
              <SavedPlaces />
            </ProtectedRoute>
          </Route>
          
          <Route path="/trips">
            <ProtectedRoute>
              <Trips />
            </ProtectedRoute>
          </Route>
          
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
