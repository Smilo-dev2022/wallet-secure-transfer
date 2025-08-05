import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { MomentProvider } from "@/contexts/MomentContext";
import { WalletProvider } from "@/contexts/WalletContext";
import { VoucherProvider } from "@/contexts/VoucherContext";
import { WalletApp } from "@/components/WalletApp";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <MomentProvider>
              <VoucherProvider>
                <WalletProvider>
                  <WalletApp />
                </WalletProvider>
              </VoucherProvider>
            </MomentProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;