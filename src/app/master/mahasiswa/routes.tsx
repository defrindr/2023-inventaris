import { Route, Routes } from "react-router-dom";
import Create from "./create";
import Edit from "./edit";
import Students from "./students";

export default function StudentRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<Students />} />
        <Route path="/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </>
  );
}
