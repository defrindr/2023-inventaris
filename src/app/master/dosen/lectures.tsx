import { faAdd, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteLecturer, getLectures } from "./services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Table from "@/components/ui/Table";
import Card from "@/components/ui/Card";
import { AlertConfirm, AlertError, AlertSuccess } from "@/components/ui/Alert";
export default function Lectures() {
  const {
    status,
    error,
    data: lectures,
  } = useQuery({
    queryKey: ["lectures"],
    queryFn: () => getLectures(),
  });

  const queryClient = useQueryClient();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    console.log(error);
    return <div>Error: error while load data</div>;
  }

  const removeLecturer = async (id: any) => {
    try {
      await deleteLecturer(id);
      queryClient.invalidateQueries(["lectures"]);
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
        removeLecturer(id);
      } else {
        console.log("cancel");
      }
    });
  };

  return (
    <>
      <div className="w-9/10">
        <Card title={"Data Dosen"} headerBtn={{ icon: faAdd, text: "Tambah Data", bg: "primary", to: "/master/dosen/create" }}>
          <Table
            data={lectures}
            columns={[
              { name: "nama", label: "Nama" },
              { name: "no_identitas", label: "NIP" },
            ]}
            actions={[
              { text: "Edit", bg: "warning", icon: faPenToSquare, to: `/master/dosen` },
              { text: "Delete", icon: faTrash, bg: "danger", delete: handleBtnDelete },
            ]}
          />
        </Card>
      </div>
    </>
  );
}
