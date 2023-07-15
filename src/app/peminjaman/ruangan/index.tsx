import { faAdd, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteRoomTransaction, getRoomTransactions } from "./services";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Table from "@/components/ui/Table";
import Card from "@/components/ui/Card";
import { AlertConfirm, AlertError, AlertSuccess } from "@/components/ui/Alert";
export default function Index() {
  const {
    status,
    error,
    data: roomsTransaction,
  } = useQuery({
    queryKey: ["roomTransactions"],
    queryFn: () => getRoomTransactions(),
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
      await deleteRoomTransaction(id);
      queryClient.invalidateQueries(["roomsTransaction"]);
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
        <Card title={"Data Peminjaman Ruangan"} headerBtn={{ icon: faAdd, text: "Tambah Data", bg: "primary", to: "/peminjaman/ruangan/create" }}>
          <Table
            data={roomsTransaction}
            columns={[
              { name: "ruangan.nama", label: "Nama" },
              { name: "tgl_mulai", label: "Tanggal Mulai" },
              { name: "tgl_selesai", label: "Tanggal Selesai" },
              { name: "status_pinjaman", label: "Status" },
            ]}
            actions={[
              { text: "Edit", bg: "warning", icon: faPenToSquare, to: `/peminjaman/ruangan` },
              { text: "Delete", icon: faTrash, bg: "danger", delete: handleBtnDelete },
            ]}
          />
        </Card>
      </div>
    </>
  );
}
