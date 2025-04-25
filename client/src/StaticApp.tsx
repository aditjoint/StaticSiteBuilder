import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/staticQueryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import NewHomePage from "@/pages/new-home-page";

function Router() {
  return (
    <Switch>
      <Route path="/" component={NewHomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function StaticApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default StaticApp;