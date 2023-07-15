import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <>
      <Navbar />

      <div className="flex-1">
        <div className="container flex-1 items-start lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 lg:pl-0">
          <Sidebar />

          <main className="px-2 py-6 sm:p-10">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
