import { Route, Routes } from "react-router-dom";
import Index from ".";
// import Create from "./create";
// import Edit from "./edit";
// import Rooms from "./rooms";

export default function RoomTransactionRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<Index />} />
        {/*<Route path="/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} /> */}
      </Routes>
    </>
  );
}
