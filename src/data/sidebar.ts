const sidebarItems = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Beranda",
        href: "/dashboard",
        items: [],
        end: true,
      },
    ],
  },
  {
    title: "Data Master",
    items: [
      {
        title: "Mahasiswa",
        href: "/master/mahasiswa",
        items: [],
        end: false,
      },
      {
        title: "Dosen",
        href: "/master/dosen",
        items: [],
        end: false,
      },
      {
        title: "Ruangan",
        href: "/master/ruangan",
        items: [],
        end: false,
      },
    ],
  },
  {
    title: "Inventaris Barang",
    items: [
      {
        title: "Data Barang",
        href: "/dashboard/items",
        items: [],
        end: false,
      },
      {
        title: "Riwayat Peminjaman",
        href: "/dashboard/items-history",
        items: [],
        end: false,
      },
    ],
  },
  {
    title: "Inventaris Buku",
    items: [
      {
        title: "Data Buku",
        href: "/dashboard/books",
        items: [],
        end: true,
      },
      {
        title: "Riwayat Peminjaman",
        href: "/dashboard/books/history",
        items: [],
        end: false,
      },
    ],
  },
  {
    title: "Pinjam Ruangan",
    items: [
      {
        title: "Peminjaman",
        href: "/peminjaman/ruangan",
        items: [],
        end: false,
      },
      {
        title: "Riwayat Peminjaman",
        href: "/peminjaman/ruangan/history",
        items: [],
        end: false,
      },
    ],
  },
];

export default sidebarItems;
