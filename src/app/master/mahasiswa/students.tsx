import { faAdd, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteStudent, getStudents } from "./services";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Table from "@/components/ui/Table";
import Card from "@/components/ui/Card";
import { AlertConfirm, AlertError, AlertSuccess } from "@/components/ui/Alert";
export default function Students() {
  const {
    status,
    error,
    data: students,
  } = useQuery({
    queryKey: ["students"],
    queryFn: () => getStudents(),
  });

  const queryClient = useQueryClient();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    console.log(error);
    return <div>Error: error while load data</div>;
  }

  const removeStudent = async (id: any) => {
    try {
      await deleteStudent(id);
      queryClient.invalidateQueries(["students"]);
      AlertSuccess("Data berhasil dihapus");
    } catch (error) {
      console.log(error);
      AlertError("Data gagal dihapus");
    }
  };

  const handleBtnDelete = (id: any) => {
    AlertConfirm("Apakah anda yakin ingin menghapus data ini?").then((res) => {
      if (res.isConfirmed) {
        // mutate(id);
        removeStudent(id);
      } else {
        console.log("cancel");
      }
    });
  };

  return (
    <>
      <div className="w-9/10">
        <Card title={"Data Mahasiswa"} headerBtn={{ icon: faAdd, text: "Tambah Data", bg: "primary", to: "/master/mahasiswa/create" }}>
          <Table
            data={students}
            columns={[
              { name: "nama", label: "Nama" },
              { name: "no_identitas", label: "NRP" },
            ]}
            actions={[
              { text: "Edit", bg: "warning", icon: faPenToSquare, to: `/master/mahasiswa` },
              { text: "Delete", icon: faTrash, bg: "danger", delete: handleBtnDelete },
            ]}
          />
        </Card>
      </div>
    </>
  );
}
