import { Navigate } from "react-router-dom";

export default function NotFoundBook() {
  return <Navigate to="/dashboard/books" />;
}
