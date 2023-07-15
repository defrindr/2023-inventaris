import DetailBook from "@/app/dashboard/books/[id]";
import HistoryBook from "@/app/dashboard/books/history";
import NotFoundBook from "@/app/dashboard/books/not-found";
import Books from "@/app/dashboard/books/page";
import { Route, Routes } from "react-router-dom";

export default function DashboardBooksRoutes() {
  return (
    <Routes>
      <Route index element={<Books />} />
      <Route path="history" element={<HistoryBook />} />
      <Route path=":id" element={<DetailBook />} />
      <Route path="*" element={<NotFoundBook />} />
    </Routes>
  );
}
