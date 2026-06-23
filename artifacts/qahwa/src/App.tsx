import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Browse from "@/pages/Browse";
import ShopDetail from "@/pages/ShopDetail";
import RatePage from "@/pages/RatePage";
import { AppProvider } from "@/context/AppContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Browse} />
      <Route path="/shop/:id" component={ShopDetail} />
      <Route path="/rate/:id" component={RatePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AppProvider>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </AppProvider>
  );
}

export default App;
