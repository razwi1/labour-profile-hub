import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserRoleSelection from "./pages/UserRoleSelection";
import VerificationPending from "./pages/VerificationPending";
import ContractorComingSoon from "./pages/ContractorComingSoon";
import AdminDashboard from "./pages/AdminDashboard";
import LabourProfile from "./pages/LabourProfile";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Remove BrowserRouter from here */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user-role-selection" element={<UserRoleSelection />} />
        <Route path="/verification-pending" element={<VerificationPending />} />
        <Route path="/contractor-coming-soon" element={<ContractorComingSoon />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/labour-profile" element={<LabourProfile />} />
        <Route path="/supervisor-dashboard" element={<SupervisorDashboard />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;
