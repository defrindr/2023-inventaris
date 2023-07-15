import DashboardBooksRoutes from "@/app/dashboard/books/routes";
import DashboardLayout from "@/app/dashboard/layout";
import NotFoundDashboard from "@/app/dashboard/not-found";
import Dashboard from "@/app/dashboard/page";
import { Route, Routes } from "react-router-dom";

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/books/*" element={<DashboardBooksRoutes />} />
      </Route>
      <Route path="*" element={<NotFoundDashboard />} />
    </Routes>
  );
}
