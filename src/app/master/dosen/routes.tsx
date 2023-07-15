import { Route, Routes } from "react-router-dom";
import Create from "./create";
import Edit from "./edit";
import Lectures from "./lectures";

export default function LectureRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<Lectures />} />
        <Route path="/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </>
  );
}
