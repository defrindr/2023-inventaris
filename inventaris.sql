-- Adminer 4.6.2 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `history_peminjaman_ruangan`;
CREATE TABLE `history_peminjaman_ruangan` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `ruangan_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_mulai` date NOT NULL,
  `tgl_selesai` date NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('tertunda','ditolak','dipinjam','ajukankembali','dikembalikan') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'tertunda',
  `photo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `history_peminjaman_ruangan` (`id`, `ruangan_id`, `tgl_mulai`, `tgl_selesai`, `description`, `status`, `photo`, `created_at`, `updated_at`) VALUES
(6,	'1',	'2023-07-15',	'2023-07-17',	'-',	'ditolak',	NULL,	'2023-07-15 03:20:42',	'2023-07-15 03:57:44'),
(7,	'3',	'2023-07-15',	'2023-07-17',	'asdasd',	'dikembalikan',	NULL,	'2023-07-15 03:58:08',	'2023-07-15 03:59:02'),
(8,	'2',	'2023-07-15',	'2023-07-18',	'tanding bola',	'tertunda',	NULL,	'2023-07-15 04:19:02',	'2023-07-15 04:19:02');

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1,	'2014_10_12_000000_create_users_table',	1),
(2,	'2014_10_12_100000_create_password_resets_table',	1),
(3,	'2019_08_19_000000_create_failed_jobs_table',	1),
(4,	'2023_07_09_132621_ruangan',	1),
(5,	'2023_07_09_133802_transaksi_ruangan',	1);

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `ruangan`;
CREATE TABLE `ruangan` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('dipinjam','bebas') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'bebas',
  `foto` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `flag` int(11) DEFAULT '1' COMMENT 'flag menjadi penanda bahwa data ini dihapus atau tidak',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `ruangan` (`id`, `nama`, `deskripsi`, `status`, `foto`, `created_at`, `updated_at`, `flag`) VALUES
(1,	'Ruangan 12',	'ruangan 1',	'bebas',	'/ruangan/64b251d09e435.png',	'2023-07-14 07:34:41',	'2023-07-15 03:57:44',	1),
(2,	'Ruangan 23',	'Ini adalah description dari ruangan yang sangat panjang',	'dipinjam',	'/ruangan/64b2525e40290.png',	'2023-07-15 01:01:34',	'2023-07-15 04:19:02',	1),
(3,	'Gedung A',	'-',	'bebas',	'/ruangan/64b26070df104.jpeg',	'2023-07-15 02:01:36',	'2023-07-15 03:59:02',	1),
(4,	'Ruangan 24',	'Ini adalah description dari ruangan yang sangat panjang',	'bebas',	'/ruangan/64b2525e40290.png',	'2023-07-15 01:01:34',	'2023-07-15 02:32:43',	1);

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('dosen','mahasiswa') COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_identitas` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_hp` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `foto` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `flag` int(11) NOT NULL DEFAULT '1' COMMENT 'penanda bahwa data dihapus atau tidak',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`id`, `username`, `nama`, `email`, `role`, `no_identitas`, `no_hp`, `foto`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `flag`) VALUES
(1,	'ferdinand',	'Fedinand',	'ferdinand@gmail.com',	'dosen',	'312051050',	'0821313955',	'/dosen/64b0428ec9192.jpeg',	NULL,	'$2a$12$zPrVCU0N.IQqo9qv1fVxG./RpyutJIdIAX7PrZScaRlWn/t0hwkTu',	NULL,	'2023-07-13 11:29:34',	'2023-07-15 00:02:01',	1),
(3,	'ferdi',	'Ferdi Sanjaya',	'ferdi@gmail.com',	'mahasiswa',	'3120510',	'082',	'/mahasiswa/64b282badef14.png',	NULL,	'$2a$12$zPrVCU0N.IQqo9qv1fVxG./RpyutJIdIAX7PrZScaRlWn/t0hwkTu',	NULL,	'2023-07-13 11:49:29',	'2023-07-15 04:27:54',	1),
(4,	'ferdi',	'Sastro',	'ferdians@gmail.com',	'mahasiswa',	'3120510',	'082131955086',	'/mahasiswa/64b047c26ac71.jpeg',	NULL,	'$2a$12$zPrVCU0N.IQqo9qv1fVxG./RpyutJIdIAX7PrZScaRlWn/t0hwkTu',	NULL,	'2023-07-13 11:51:46',	'2023-07-15 01:10:50',	0);

-- 2023-07-15 11:37:17
