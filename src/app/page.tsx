import DashboardBooksRoutes from "@/app/dashboard/books/routes";
import DashboardLayout from "@/app/dashboard/layout";
import NotFoundDashboard from "@/app/dashboard/not-found";
import Dashboard from "@/app/dashboard/page";
import { Route, Routes } from "react-router-dom";
import LectureRoutes from "./master/dosen/routes";
import StudentRoutes from "./master/mahasiswa/routes";
import RoomsRoutes from "./master/ruangan/routes";
import RoomTransactionRoutes from "./peminjaman/ruangan/routes";

export default function MasterRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/books/*" element={<DashboardBooksRoutes />} />
        <Route path="/ruangan/*" element={<RoomsRoutes />} />
        <Route path="/dosen/*" element={<LectureRoutes />} />
        <Route path="/mahasiswa/*" element={<StudentRoutes />} />
        <Route path="/ruangan/*" element={<RoomTransactionRoutes />} />
      </Route>
      <Route path="*" element={<NotFoundDashboard />} />
    </Routes>
  );
}
