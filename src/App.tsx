import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NGODashboard from "./pages/dashboards/NGODashboard";
import GovernmentDashboard from "./pages/dashboards/GovernmentDashboard";
import CorporateDashboard from "./pages/dashboards/CorporateDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute: React.FC<{ 
  children: React.ReactNode; 
  requiredUserType: string 
}> = ({ children, requiredUserType }) => {
  const { user, userType } = useAuth();
  
  if (!user || !userType) {
    return <Navigate to="/" replace />;
  }
  
  if (userType !== requiredUserType) {
    return <Navigate to={`/${userType}/dashboard`} replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login/:userType" element={<Login />} />
      
      {/* NGO Dashboard */}
      <Route 
        path="/ngo/dashboard" 
        element={
          <ProtectedRoute requiredUserType="ngo">
            <NGODashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Government Dashboard */}
      <Route 
        path="/government/dashboard" 
        element={
          <ProtectedRoute requiredUserType="government">
            <GovernmentDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Corporate Dashboard */}
      <Route 
        path="/corporate/dashboard" 
        element={
          <ProtectedRoute requiredUserType="corporate">
            <CorporateDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
