import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Contexts
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ToastProvider } from "@/contexts/ToastContext";

// Components
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ToastContainer } from "@/components/ToastContainer";

// Pages
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import ObligationsPage from "@/pages/ObligationsPage";
import DocumentsPage from "@/pages/DocumentsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <ToastContainer />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* Protected Routes */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <Layout>
                      <DashboardPage />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/obligations" element={
                  <ProtectedRoute>
                    <Layout>
                      <ObligationsPage />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/documents" element={
                  <ProtectedRoute>
                    <Layout>
                      <DocumentsPage />
                    </Layout>
                  </ProtectedRoute>
                } />

                {/* Redirect old routes */}
                <Route path="/messages" element={<Navigate to="/" replace />} />
                <Route path="/upload" element={<Navigate to="/documents" replace />} />
                <Route path="/settings" element={<Navigate to="/" replace />} />
                
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
