import DashboardBooksRoutes from "@/app/dashboard/books/routes";
import DashboardLayout from "@/app/dashboard/layout";
import NotFoundDashboard from "@/app/dashboard/not-found";
import Dashboard from "@/app/dashboard/page";
import { Route, Routes } from "react-router-dom";
import RoomTransactionRoutes from "./ruangan/routes";

export default function TransactionRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/ruangan/*" element={<RoomTransactionRoutes />} />
      </Route>
      <Route path="*" element={<NotFoundDashboard />} />
    </Routes>
  );
}
