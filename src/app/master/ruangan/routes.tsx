import { Route, Routes } from "react-router-dom";
import Create from "./create";
import Edit from "./edit";
import Rooms from "./rooms";

export default function RoomsRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<Rooms />} />
        <Route path="/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </>
  );
}
