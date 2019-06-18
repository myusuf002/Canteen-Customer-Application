-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 17, 2019 at 02:22 PM
-- Server version: 8.0.13-4
-- PHP Version: 7.2.19-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `q6QysEiGxy`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `username` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`username`, `password`) VALUES
('admin', '21232f297a57a5a743894a0e4a801fc3');

-- --------------------------------------------------------

--
-- Table structure for table `akun_customer`
--

CREATE TABLE `akun_customer` (
  `id_akun_customer` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `no_hp` varchar(13) NOT NULL,
  `last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status_tcash` int(11) NOT NULL DEFAULT '0',
  `status_sso` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `akun_customer`
--

INSERT INTO `akun_customer` (`id_akun_customer`, `username`, `password`, `no_hp`, `status_tcash`, `status_sso`) VALUES
(1, 'myusuf', '1884567e1278b55ddc80d52636ba002d', '082216649096', 1, 0),
(2, 'side', 'e34b576431aba6ae1dc09cffcc2897b1', '081536107001', 0, 0),
(3, 'aitek230', '0bf185e1f001840a3ae9b91784994540', '082119189690', 0, 0),
(4, 'yurizamufidah', '11041454bee18dd8dbcabc3c9c48c5ac', '089512045035', 0, 0),
(5, 'Tito', '74cfd229458c6555414155c345c76ead', '085813036526', 0, 0),
(6, 'fikriaksan', '793a867db2bec49ae43f5cca885ae851', '081242282643', 0, 0),
(7, 'sso', '96e523203dcea04321b6f0c1ae63c34f', '085813036526', 0, 0),
(8, 'fahrul', '96e523203dcea04321b6f0c1ae63cccc', '09812671121', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `detail_order`
--

CREATE TABLE `detail_order` (
  `id_order` int(11) NOT NULL,
  `id_menu` int(11) NOT NULL,
  `qty` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `detail_order`
--

INSERT INTO `detail_order` (`id_order`, `id_menu`, `qty`) VALUES
(7, 10, 1),
(7, 11, 3),
(8, 16, 1),
(9, 13, 1),
(10, 10, 2),
(11, 22, 2),
(13, 21, 1),
(13, 22, 2),
(13, 22, 2),
(15, 22, 1),
(16, 13, 1),
(17, 22, 1),
(18, 10, 2),
(18, 13, 1),
(19, 13, 1),
(20, 13, 1),
(20, 15, 1),
(21, 13, 1),
(22, 12, 1),
(23, 13, 1),
(24, 10, 1),
(25, 15, 2),
(25, 16, 1),
(26, 14, 1),
(27, 13, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Kasir`
--

CREATE TABLE `Kasir` (
  `id_akun_kasir` int(11) DEFAULT NULL,
  `password` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `Kasir`
--

INSERT INTO `Kasir` (`id_akun_kasir`, `password`) VALUES
(1, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `log_saldo`
--

CREATE TABLE `log_saldo` (
  `id_log_saldo` int(11) NOT NULL,
  `id_saldo` int(11) NOT NULL,
  `id_transaksi_order` int(11) NOT NULL,
  `tipe_log_saldo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `log_saldo`
--

INSERT INTO `log_saldo` (`id_log_saldo`, `id_saldo`, `id_transaksi_order`, `tipe_log_saldo`) VALUES
(5, 2, 5, 'outcome'),
(6, 2, 6, 'outcome'),
(7, 2, 7, 'outcome'),
(8, 2, 8, 'outcome'),
(9, 2, 9, 'outcome'),
(12, 2, 12, 'outcome'),
(14, 2, 14, 'outcome'),
(15, 2, 15, 'outcome'),
(16, 3, 16, 'outcome'),
(19, 3, 19, 'outcome'),
(20, 2, 20, 'outcome'),
(21, 2, 21, 'outcome'),
(22, 2, 22, 'outcome'),
(23, 2, 23, 'outcome');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id_menu` int(11) NOT NULL,
  `id_tenant` int(11) NOT NULL,
  `nama_menu` varchar(100) NOT NULL,
  `harga_menu` double NOT NULL,
  `status_menu` tinyint(1) NOT NULL,
  `kategori_menu` varchar(50) NOT NULL,
  `foto_menu` text NOT NULL,
  `jumlah_pemesan` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id_menu`, `id_tenant`, `nama_menu`, `harga_menu`, `status_menu`, `kategori_menu`, `foto_menu`, `jumlah_pemesan`) VALUES
(10, 1, 'Ayam Bali Spesial', 13000, 0, 'Ayam', 'http://www.reesays.com/wp-content/uploads/2015/10/nasi-bali-rempah-kita.jpg', 5),
(11, 1, 'Nasi Udut', 9000, 1, 'Nasi', 'https://i.pinimg.com/originals/96/02/d8/9602d84f5e197ef912aa2cf7013988a4.jpg', 0),
(12, 1, 'Nasi Sungkep', 9000, 1, 'Nasi', 'https://i1.wp.com/farm1.static.flickr.com/140/361118919_3e66ca1972.jpg', 0),
(13, 1, 'Ayam Bali Biasa', 10000, 1, 'Ayam', 'https://78.media.tumblr.com/1e3f7c836a0790aec2c6d4383c1341aa/tumblr_nhl6807KqN1r1bd4do1_500.jpg', 12),
(14, 1, 'Ayam Bali Bakar', 15000, 1, 'Ayam', 'https://66.media.tumblr.com/8cb3a2c16938aece3ef9d55de1d0ade8/tumblr_oac72oPoq31uedh8io1_500.jpg', 0),
(15, 1, 'Ayam Siliweng', 17000, 1, 'Ayam', 'https://thebalidestiny.com/wp-content/uploads/2018/06/Kedaton-Bali-Destiny.jpg', 0),
(16, 1, 'Ayam Rica-rica', 10000, 1, 'Ayam', 'http://1.bp.blogspot.com/-JHGKXSiIg2U/VOyIYJkFmcI/AAAAAAAAI_E/1oftsYzxbjs/s1600/8456313574_f99d870ef1.jpg', 0),
(21, 2, 'Nasi Padang', 12000, 1, 'Nasi', 'https://igx.4sqi.net/img/general/500x500/46597431_8jXmdaxwpJePr9QEc6FloXGCGifeYPD5i4kmg-zph-4.jpg', 0),
(22, 2, 'Nasi Dadar Padang', 12000, 1, 'Telur', 'https://whattocooktoday.com/wp-content/uploads/2018/01/IMG_5862-500x500.jpg', 0),
(23, 2, 'Nasi Ayam Padang', 15000, 1, 'Nasi, Ayam', 'http://pesonanusantara.co.id/media/catalog/product/cache/1/image/500x/9df78eab33525d08d6e5fb8d27136e95/4/5/456-947_1.jpg', 0),
(24, 2, 'Nasi Rendang', 20000, 1, 'Nasi', 'http://pesonanusantara.co.id/media/catalog/product/cache/1/image/500x/9df78eab33525d08d6e5fb8d27136e95/p/e/pes-rendangparub_1.jpg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `menu_saldo`
--

CREATE TABLE `menu_saldo` (
  `id_menu_saldo` int(11) NOT NULL,
  `jumlah_saldo` int(11) NOT NULL,
  `harga` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `menu_saldo`
--

INSERT INTO `menu_saldo` (`id_menu_saldo`, `jumlah_saldo`, `harga`) VALUES
(1, 5000, 5000),
(2, 10000, 10000),
(3, 20000, 20000),
(4, 50000, 50000),
(5, 100000, 100000);

-- --------------------------------------------------------

--
-- Table structure for table `notifikasi_customer`
--

CREATE TABLE `notifikasi_customer` (
  `id_notifikasi_customer` int(11) NOT NULL,
  `id_akun_customer` int(11) NOT NULL,
  `pesan` text NOT NULL,
  `judul` text NOT NULL,
  `tanggal_notifikasi` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifikasi_customer`
--

INSERT INTO `notifikasi_customer` (`id_notifikasi_customer`, `id_akun_customer`, `pesan`, `judul`, `status`) VALUES
(9, 1, 'You ordered an item for Rp. 40000. Please make a payment to the cashier before 30 minutes from now', 'Pay to Cashier', 0),
(10, 1, 'Payment for ordering items with total Rp. 10000 has been successful', 'Payment Successful', 0),
(11, 1, 'Payment for ordering items with total Rp. 10000 has been successful', 'Payment Successful', 0),
(12, 1, 'You ordered an item for Rp. 26000. Please make a payment to the cashier before 30 minutes from now', 'Pay to Cashier', 0),
(13, 1, 'You ordered an item for Rp. 24000. Please make a payment to the cashier before 30 minutes from now', 'Pay to Cashier', 0),
(14, 2, 'You ordered an item for Rp. 36000. Please make a payment to the cashier before 30 minutes from now', 'Pay to Cashier', 0),
(15, 2, 'You ordered an item for Rp. 12000. Please make a payment to the cashier before 30 minutes from now', 'Pay to Cashier', 0),
(16, 1, 'You ordered an item for Rp. 10000. Please make a payment to the cashier before 30 minutes from now', 'Pay to Cashier', 0),
(17, 3, 'You ordered an item for Rp. 12000. Please make a payment to the cashier before 30 minutes from now', 'Pay to Cashier', 1),
(18, 3, 'You ordered an item for Rp. 12000. Please make a payment to the cashier before 30 minutes from now', 'Pay to Cashier', 1),
(19, 1, 'You ordered an item for Rp. 36000. Please make a payment to the cashier before 30 minutes from now', 'Pay to Cashier', 0),
(20, 1, 'Payment for ordering items with total Rp. 10000 has been successful', 'Payment Successful', 0),
(21, 4, 'You ordered an item for Rp. 27000. Please make a payment to the cashier before 30 minutes from now', 'Pay to Cashier', 0),
(22, 5, 'You ordered an item for Rp. 10000. Please make a payment to the cashier before 30 minutes from now', 'Pay to Cashier', 0),
(23, 5, 'You ordered an item for Rp. 9000. Please make a payment to the cashier before 30 minutes from now', 'Pay to Cashier', 0),
(24, 4, 'You ordered an item for Rp. 10000. Please make a payment to the cashier before 30 minutes from now', 'Pay to Cashier', 0),
(25, 1, 'You ordered an item for Rp. 13000. Please make a payment to the cashier before 30 minutes from now', 'Pay to Cashier', 0),
(26, 1, 'Payment for ordering items with total Rp. 44000 has been successful', 'Payment Successful', 0),
(27, 1, 'You ordered an item for Rp. 15000. Please make a payment to the cashier before 30 minutes from now', 'Pay to Cashier', 0),
(28, 1, 'Your food is in the process of waiting', 'Food Order', 0),
(29, 1, 'You ordered an item for Rp. 20000. Please make a payment to the cashier before 30 minutes from now', 'Pay to Cashier', 0);

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id_order` int(11) NOT NULL,
  `id_akun_customer` int(11) NOT NULL,
  `status_order` varchar(100) NOT NULL,
  `waktu_pengambilan` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `waktu_order` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `catatan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id_order`, `id_akun_customer`, `status_order`, `catatan`) VALUES
(7, 1, 'reserved', 'sambal banyakin'),
(8, 1, 'reserved', 'tidak pedas'),
(9, 1, 'reserved', 'nothing.'),
(10, 1, 'reserved', 'tes heroku'),
(11, 1, 'reserved', 'tes dari hape'),
(12, 2, 'reserved', 'tes side learn'),
(13, 2, 'reserved', 'tes side learn'),
(14, 2, 'reserved', 'nothing.'),
(15, 2, 'reserved', 'nothing.'),
(16, 1, 'reserved', 'nothing.'),
(17, 3, 'reserved', 'Banyakin bumbunya'),
(18, 1, 'reserved', 'cek notif'),
(19, 1, 'Process', 'nothing.'),
(20, 4, 'reserved', 'ayam dada'),
(21, 5, 'reserved', 'nothing.'),
(22, 5, 'reserved', 'Tambah nasi jadi 2'),
(23, 4, 'reserved', 'nothing.'),
(24, 1, 'reserved', 'tes sisfo'),
(25, 1, 'Finish', 'nothing.'),
(26, 1, 'reserved', 'nothing.'),
(27, 1, 'reserved', 'nothing.');

-- --------------------------------------------------------

--
-- Table structure for table `pengaduan`
--

CREATE TABLE `pengaduan` (
  `id_pengaduan` int(11) NOT NULL,
  `id_tenant` int(10) NOT NULL,
  `pengaduan_masalah` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `pengaduan`
--

INSERT INTO `pengaduan` (`id_pengaduan`, `id_tenant`, `pengaduan_masalah`) VALUES
(1, 2, 'Kaki meja rusak dan perlu perbaikan'),
(2, 4, 'Tidak disediakan meja. butuh meja'),
(3, 2, 'atap bocor karena hujan deras'),
(5, 1, 'asdasdasd'),
(6, 1, 'awdasdasd'),
(7, 1, 'asdasdasd'),
(8, 1, 'air mati'),
(9, 1, 'ygvhbjn');

-- --------------------------------------------------------

--
-- Table structure for table `pengajuan`
--

CREATE TABLE `pengajuan` (
  `id_pengajuan` int(11) NOT NULL,
  `proposal_pengajuan` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `no_hp` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `pengajuan`
--

INSERT INTO `pengajuan` (`id_pengajuan`, `proposal_pengajuan`, `no_hp`) VALUES
(1, '1234546780', '089877376586'),
(2, '[1301160020] - Tugas3-awal.docx', '12345678'),
(3, '[1301160020] - Tugas3-awal.docx', '1234567');

-- --------------------------------------------------------

--
-- Table structure for table `perpanjangan`
--

CREATE TABLE `perpanjangan` (
  `id_perpanjangan` int(11) NOT NULL,
  `id_tenant` int(10) NOT NULL,
  `tanggal_pengajuan` date NOT NULL,
  `tanggal_berakhir` date NOT NULL,
  `proposal_perpanjangan` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `rekomendasi` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `perpanjangan`
--

INSERT INTO `perpanjangan` (`id_perpanjangan`, `id_tenant`, `tanggal_pengajuan`, `tanggal_berakhir`, `proposal_perpanjangan`, `rekomendasi`) VALUES
(1, 2, '2019-05-13', '2019-06-13', 'perpanjangan_no4', 'Dilanjutkan');

-- --------------------------------------------------------

--
-- Table structure for table `rekap`
--

CREATE TABLE `rekap` (
  `id_rekap` int(11) NOT NULL,
  `id_transaksi_order` int(11) NOT NULL,
  `tgl_rekap` date NOT NULL,
  `pendapatan_total` int(11) NOT NULL,
  `persen_potongan` float NOT NULL,
  `bersih_tenant` float NOT NULL,
  `bersih_pengelola` float NOT NULL,
  `waktu_transaksi_order` timestamp NOT NULL,
  `id_tenant` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `saldo`
--

CREATE TABLE `saldo` (
  `id_saldo` int(11) NOT NULL,
  `id_akun_customer` int(11) NOT NULL,
  `saldo` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `saldo`
--

INSERT INTO `saldo` (`id_saldo`, `id_akun_customer`, `saldo`) VALUES
(2, 1, 131000),
(3, 4, 90000),
(4, 5, 15000);

-- --------------------------------------------------------

--
-- Table structure for table `tenant`
--

CREATE TABLE `tenant` (
  `id_tenant` int(10) NOT NULL,
  `no_tenant` int(11) NOT NULL,
  `nama_tenant` varchar(100) NOT NULL,
  `kategori_tenant` varchar(50) NOT NULL,
  `no_hp` varchar(13) NOT NULL,
  `foto_tenant` text NOT NULL,
  `status_sewa` varchar(30) NOT NULL,
  `status_rekomendasi` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tenant`
--

INSERT INTO `tenant` (`id_tenant`, `no_tenant`, `nama_tenant`, `kategori_tenant`, `no_hp`, `foto_tenant`, `status_sewa`, `status_rekomendasi`) VALUES
(1, 29, 'Ayam', '', '081239091111', 'https://3.bp.blogspot.com/-gvk5EZyQZOI/WvhiiJ9LARI/AAAAAAAABHU/kM2zEmHGNLQUpKvAufTGsw4Z9ID030zwwCLcBGAs/s640/Resep%2BAyam%2BSuwir%2BBali.jpg', 'aktif', 'Tidak Dilanjutkan'),
(2, 4, 'Nasi Goreng Padang', '', '0823981896555', 'https://merahputih.com/media/56/1f/bf/561fbfd1c3c47ac5ed549a4f6e05fd59.png', 'aktif', 'Dilanjutkan'),
(3, 7, 'Sate Ayam Timur', 'Sate, Ayam, Lontong', '082267339844', 'https://merahputih.com/media/56/1f/bf/561fbfd1c3c47ac5ed549a4f6e05fd59.png', 'aktif', ''),
(4, 12, 'Roti Canai India', 'Roti, Masakan India', '0813488264631', 'https://www.australiaindex.com/wp-content/uploads/C11-Roti-Canai-with-Beef-Rendang.jpg', 'tidak aktif', 'Tidak Dilanjutkan');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi_order`
--

CREATE TABLE `transaksi_order` (
  `id_transaksi_order` int(11) NOT NULL,
  `id_order` int(11) NOT NULL,
  `id_akun_customer` int(11) NOT NULL,
  `metode_transaksi_order` varchar(100) NOT NULL,
  `waktu_transaksi_order` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `total_transaksi_order` double NOT NULL,
  `status_transaksi_order` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaksi_order`
--

INSERT INTO `transaksi_order` (`id_transaksi_order`, `id_order`, `id_akun_customer`, `metode_transaksi_order`, `total_transaksi_order`, `status_transaksi_order`) VALUES
(5, 7, 1, 'Cash', 40000, 'accepted'),
(6, 8, 1, 'T-Cash', 10000, 'accepted'),
(7, 9, 1, 'T-Cash', 10000, 'accepted'),
(8, 10, 1, 'Cash', 26000, 'accepted'),
(9, 11, 1, 'Cash', 24000, 'waiting'),
(10, 13, 2, 'Cash', 36000, 'waiting'),
(11, 15, 2, 'Cash', 12000, 'waiting'),
(12, 16, 1, 'Cash', 10000, 'waiting'),
(13, 17, 3, 'Cash', 12000, 'waiting'),
(14, 18, 1, 'Cash', 36000, 'waiting'),
(15, 19, 1, 'T-Cash', 10000, 'accepted'),
(16, 20, 4, 'Cash', 27000, 'waiting'),
(17, 21, 5, 'Cash', 10000, 'waiting'),
(18, 22, 5, 'Cash', 9000, 'waiting'),
(19, 23, 4, 'Cash', 10000, 'waiting'),
(20, 24, 1, 'Cash', 13000, 'waiting'),
(21, 25, 1, 'T-Cash', 44000, 'accepted'),
(22, 26, 1, 'Cash', 15000, 'waiting'),
(23, 27, 1, 'Cash', 20000, 'waiting');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi_topup`
--

CREATE TABLE `transaksi_topup` (
  `id_topup` int(11) NOT NULL,
  `id_saldo` int(11) NOT NULL,
  `id_menu_saldo` int(11) NOT NULL,
  `tanggal` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `transaksi_topup`
--

INSERT INTO `transaksi_topup` (`id_topup`, `id_saldo`, `id_menu_saldo`, `tanggal`) VALUES
(3, 2, 3, '2019-05-13 06:30:36'),
(4, 2, 1, '2019-05-13 06:32:01'),
(5, 2, 3, '2019-05-13 06:33:35'),
(6, 2, 3, '2019-05-13 06:38:50'),
(7, 2, 4, '2019-05-13 06:39:53'),
(8, 2, 4, '2019-05-13 06:41:57'),
(9, 2, 1, '2019-05-13 06:42:40'),
(10, 4, 2, '2019-05-13 06:45:11'),
(11, 2, 4, '2019-05-13 06:52:42');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `rule` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `password`, `rule`) VALUES
('1', '2ErLw', 'tenant'),
('2', 'J7sxW1', 'tenant'),
('3', 'KKlp2x8', 'tenant'),
('4', 'hrH2x9j', 'tenant'),
('admin', 'admin', 'pkt'),
('q', 'w', 'kasir');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `akun_customer`
--
ALTER TABLE `akun_customer`
  ADD PRIMARY KEY (`id_akun_customer`);

--
-- Indexes for table `detail_order`
--
ALTER TABLE `detail_order`
  ADD KEY `id_order` (`id_order`),
  ADD KEY `id_menu` (`id_menu`);

--
-- Indexes for table `log_saldo`
--
ALTER TABLE `log_saldo`
  ADD PRIMARY KEY (`id_log_saldo`),
  ADD KEY `id_saldo` (`id_saldo`),
  ADD KEY `id_transaksi_order` (`id_transaksi_order`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id_menu`),
  ADD KEY `id_tenant` (`id_tenant`);

--
-- Indexes for table `menu_saldo`
--
ALTER TABLE `menu_saldo`
  ADD PRIMARY KEY (`id_menu_saldo`);

--
-- Indexes for table `notifikasi_customer`
--
ALTER TABLE `notifikasi_customer`
  ADD PRIMARY KEY (`id_notifikasi_customer`),
  ADD KEY `id_akun_customer` (`id_akun_customer`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `id_akun_customer` (`id_akun_customer`);

--
-- Indexes for table `pengaduan`
--
ALTER TABLE `pengaduan`
  ADD PRIMARY KEY (`id_pengaduan`);

--
-- Indexes for table `pengajuan`
--
ALTER TABLE `pengajuan`
  ADD PRIMARY KEY (`id_pengajuan`);

--
-- Indexes for table `perpanjangan`
--
ALTER TABLE `perpanjangan`
  ADD PRIMARY KEY (`id_perpanjangan`);

--
-- Indexes for table `rekap`
--
ALTER TABLE `rekap`
  ADD PRIMARY KEY (`id_rekap`),
  ADD KEY `id_transaksi_order` (`id_transaksi_order`),
  ADD KEY `id_tenant` (`id_tenant`);

--
-- Indexes for table `saldo`
--
ALTER TABLE `saldo`
  ADD PRIMARY KEY (`id_saldo`),
  ADD KEY `id_akun_customer` (`id_akun_customer`);

--
-- Indexes for table `tenant`
--
ALTER TABLE `tenant`
  ADD PRIMARY KEY (`id_tenant`);

--
-- Indexes for table `transaksi_order`
--
ALTER TABLE `transaksi_order`
  ADD PRIMARY KEY (`id_transaksi_order`),
  ADD KEY `id_order` (`id_order`),
  ADD KEY `id_akun_customer` (`id_akun_customer`);

--
-- Indexes for table `transaksi_topup`
--
ALTER TABLE `transaksi_topup`
  ADD PRIMARY KEY (`id_topup`),
  ADD KEY `transaksi_topup_ibfk_1` (`id_menu_saldo`),
  ADD KEY `transaksi_topup_ibfk_2` (`id_saldo`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `akun_customer`
--
ALTER TABLE `akun_customer`
  MODIFY `id_akun_customer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `log_saldo`
--
ALTER TABLE `log_saldo`
  MODIFY `id_log_saldo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id_menu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `notifikasi_customer`
--
ALTER TABLE `notifikasi_customer`
  MODIFY `id_notifikasi_customer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `pengaduan`
--
ALTER TABLE `pengaduan`
  MODIFY `id_pengaduan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `pengajuan`
--
ALTER TABLE `pengajuan`
  MODIFY `id_pengajuan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `perpanjangan`
--
ALTER TABLE `perpanjangan`
  MODIFY `id_perpanjangan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `rekap`
--
ALTER TABLE `rekap`
  MODIFY `id_rekap` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=723;

--
-- AUTO_INCREMENT for table `saldo`
--
ALTER TABLE `saldo`
  MODIFY `id_saldo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tenant`
--
ALTER TABLE `tenant`
  MODIFY `id_tenant` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `transaksi_order`
--
ALTER TABLE `transaksi_order`
  MODIFY `id_transaksi_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `transaksi_topup`
--
ALTER TABLE `transaksi_topup`
  MODIFY `id_topup` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_order`
--
ALTER TABLE `detail_order`
  ADD CONSTRAINT `detail_order_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `order` (`id_order`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_order_ibfk_2` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id_menu`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `log_saldo`
--
ALTER TABLE `log_saldo`
  ADD CONSTRAINT `log_saldo_ibfk_1` FOREIGN KEY (`id_saldo`) REFERENCES `saldo` (`id_saldo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `log_saldo_ibfk_2` FOREIGN KEY (`id_transaksi_order`) REFERENCES `transaksi_order` (`id_transaksi_order`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `menu`
--
ALTER TABLE `menu`
  ADD CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`id_tenant`) REFERENCES `tenant` (`id_tenant`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notifikasi_customer`
--
ALTER TABLE `notifikasi_customer`
  ADD CONSTRAINT `notifikasi_customer_ibfk_1` FOREIGN KEY (`id_akun_customer`) REFERENCES `akun_customer` (`id_akun_customer`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`id_akun_customer`) REFERENCES `akun_customer` (`id_akun_customer`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `saldo`
--
ALTER TABLE `saldo`
  ADD CONSTRAINT `saldo_ibfk_1` FOREIGN KEY (`id_akun_customer`) REFERENCES `akun_customer` (`id_akun_customer`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaksi_order`
--
ALTER TABLE `transaksi_order`
  ADD CONSTRAINT `transaksi_order_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `order` (`id_order`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaksi_order_ibfk_2` FOREIGN KEY (`id_akun_customer`) REFERENCES `akun_customer` (`id_akun_customer`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaksi_topup`
--
ALTER TABLE `transaksi_topup`
  ADD CONSTRAINT `transaksi_topup_ibfk_1` FOREIGN KEY (`id_menu_saldo`) REFERENCES `menu_saldo` (`id_menu_saldo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaksi_topup_ibfk_2` FOREIGN KEY (`id_saldo`) REFERENCES `saldo` (`id_saldo`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
