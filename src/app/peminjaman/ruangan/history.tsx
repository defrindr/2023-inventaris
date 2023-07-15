import { faAdd, faArrowLeft, faCheck, faPenToSquare, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { changeStatusRoomTransaction, deleteRoomTransaction, getRoomTransactionHistories, getRoomTransactions } from "./services";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Table from "@/components/ui/Table";
import Card from "@/components/ui/Card";
import { AlertConfirm, AlertError, AlertSuccess } from "@/components/ui/Alert";
import TransactionTable from "@/components/ui/TransactionTable";

export default function History() {
  const {
    status,
    error,
    data: roomsTransaction,
  } = useQuery({
    queryKey: ["roomTransactions"],
    queryFn: () => getRoomTransactionHistories(),
  });

  const queryClient = useQueryClient();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    console.log(error);
    return <div>Error: error while load data</div>;
  }

  return (
    <>
      <div className="w-9/10">
        <Card title={"Data Riwayat Peminjaman Ruangan"}>
          <TransactionTable
            data={roomsTransaction}
            columns={[
              { name: "ruangan.nama", label: "Nama" },
              { name: "tgl_mulai", label: "Tanggal Mulai" },
              { name: "tgl_selesai", label: "Tanggal Selesai" },
              { name: "status", label: "Status" },
            ]}
            actions={[]}
          />
        </Card>
      </div>
    </>
  );
}
