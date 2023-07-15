import { faAdd, faArrowLeft, faCheck, faPenToSquare, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { changeStatusRoomTransaction, deleteRoomTransaction, getRoomTransactions } from "./services";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Table from "@/components/ui/Table";
import Card from "@/components/ui/Card";
import { AlertConfirm, AlertError, AlertSuccess } from "@/components/ui/Alert";
import TransactionTable from "@/components/ui/TransactionTable";
import { useEffect, useState } from "react";
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
  const [user, setUser] = useState({});

  useEffect(() => {
    const loadUser = async () => {
      let accountLoggedIn = localStorage.getItem('user');
      // check if user data is exist
      if (accountLoggedIn) {
        // decode user data
        accountLoggedIn = JSON.parse(accountLoggedIn);
        // inject to reactive variable
        setUser(() => accountLoggedIn);
      }
    }

    loadUser();
  }, [])

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
      AlertError(error?.response?.data?.message ?? "Data gagal dihapus");
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


  const handleChangeStatus = async (id: any, status: string) => {
    AlertConfirm("Apakah anda yakin ingin mengubah status data ini?").then(async (res) => {
      if (res.isConfirmed) {
        try {
          await changeStatusRoomTransaction(id, status);
          queryClient.invalidateQueries(["roomsTransaction"]);
          AlertSuccess("Status berhasil diubah");
        } catch (error) {
          AlertError(error?.response?.data?.message ?? "Status gagal diubah");
        }
      } else {
        console.log("cancel");
      }
    });
  };

  return (
    <>
      <div className="w-9/10">
        <Card title={"Data Peminjaman Ruangan"} headerBtn={{ icon: faAdd, text: "Tambah Data", bg: "primary", to: "/peminjaman/ruangan/create" }}>
          <TransactionTable
            data={roomsTransaction}
            columns={[
              { name: "ruangan.nama", label: "Nama" },
              { name: "tgl_mulai", label: "Tanggal Mulai" },
              { name: "tgl_selesai", label: "Tanggal Selesai" },
              { name: "status", label: "Status" },
            ]}
            actions={[
              // { text: "Edit", bg: "warning", icon: faPenToSquare, to: `/peminjaman/ruangan`, visible: () => true },
              {
                text: "Delete",
                icon: faTrash,
                bg: "danger",
                action: (data: any) => handleBtnDelete(data.id),
                visible: () => true
              },
              {
                text: "Setujui",
                icon: faCheck,
                bg: "primary",
                action: async (data: any) => {
                  await handleChangeStatus(data.id, 'dipinjam');
                },
                visible: (data: any) => {
                  return user.role === "dosen" && data.status === "tertunda";
                }
              },
              {
                text: "Tolak",
                icon: faTimes,
                bg: "danger",
                action: async (data: any) => {
                  await handleChangeStatus(data.id, 'ditolak');
                },
                visible: (data: any) => {
                  return user.role === "dosen" && data.status === "tertunda";
                }
              },
              {
                text: "Kembalikan",
                icon: faArrowLeft,
                bg: "warning",
                action: async (data: any) => {
                  await handleChangeStatus(data.id, 'ajukankembali');
                },
                visible: (data: any) => {
                  return user.role === "mahasiswa" && data.status === "dipinjam";
                }
              },
              {
                text: "Setujui Pengembalian",
                icon: faCheck,
                bg: "primary",
                action: async (data: any) => {
                  await handleChangeStatus(data.id, 'dikembalikan');
                },
                visible: (data: any) => {
                  return user.role === "dosen" && data.status === "ajukankembali";
                }
              },
              {
                text: "Tolak Pengembalian",
                icon: faTimes,
                bg: "danger",
                action: async (data: any) => {
                  await handleChangeStatus(data.id, 'dipinjam');
                },
                visible: (data: any) => {
                  return user.role === "dosen" && data.status === "ajukankembali";
                }
              },
            ]}
          />
        </Card>
      </div>
    </>
  );
}
