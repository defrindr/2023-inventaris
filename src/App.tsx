import DashboardRoutes from "@/app/dashboard/routes";
import NotFound from "@/not-found";
import Home from "@/app/page";
import { Route, Routes, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MasterRoutes from "@/app/page";
import { useState } from "react";
import LoginForm from "./app/auth/login";
import RegisterForm from "./app/auth/register";
import { AlertError } from "./components/ui/Alert";
import TransactionRoutes from "./app/peminjaman/routes";

const queryClient = new QueryClient();
export default function App() {
  const navigate = useNavigate();

  if (localStorage.getItem("token") === null && window.location.pathname !== "/login" && window.location.pathname !== "/register") {
    AlertError("Anda harus login terlebih dahulu");
    window.open("/login", "_self");
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route path="/master/*" element={<MasterRoutes />} />
        <Route path="/peminjaman/*" element={<TransactionRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </QueryClientProvider>
  );
}
