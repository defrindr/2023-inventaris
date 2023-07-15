import { faAdd, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteRoom, getRooms } from "./services";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Table from "@/components/ui/Table";
import Card from "@/components/ui/Card";
import { AlertConfirm, AlertError, AlertSuccess } from "@/components/ui/Alert";
export default function Rooms() {
  const {
    status,
    error,
    data: rooms,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => getRooms(),
  });

  const queryClient = useQueryClient();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    console.log(error);
    return <div>Error: error while load data</div>;
  }

  const removeRoom = async (id: any) => {
    try {
      await deleteRoom(id);
      queryClient.invalidateQueries(["rooms"]);
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
        removeRoom(id);
      } else {
        console.log("cancel");
      }
    });
  };

  return (
    <>
      <div className="w-9/10">
        <Card title={"Data Ruangan"} headerBtn={{ icon: faAdd, text: "Tambah Data", bg: "primary", to: "/master/ruangan/create" }}>
          <Table
            data={rooms}
            columns={[{ name: "nama", label: "Nama" }]}
            actions={[
              { text: "Edit", bg: "warning", icon: faPenToSquare, to: `/master/ruangan` },
              { text: "Delete", icon: faTrash, bg: "danger", delete: handleBtnDelete },
            ]}
          />
        </Card>
      </div>
    </>
  );
}
