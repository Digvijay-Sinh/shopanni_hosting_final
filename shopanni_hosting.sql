-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2023 at 01:43 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopanni_hosting`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `username`, `password`) VALUES
(1, 'admin@admin.com', 'admin123');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `cart_item_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` varchar(191) DEFAULT NULL,
  `product_size_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `colour` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`cart_item_id`, `user_id`, `product_id`, `product_size_id`, `quantity`, `colour`) VALUES
(85, 12, '1682355686619', 3, 2, 'white'),
(112, 14, '1683634414486', 0, 2, 'Red');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `description`) VALUES
(18, 'Lehengas', 'Ankle-length skirt paired with a blouse and dupatta'),
(19, 'Salwar Kameez', 'Loose tunic worn over pants or leggings'),
(20, 'Kurtis', 'Short or long tops worn over pants or skirts'),
(21, 'Anarkalis', 'Flared dress with a fitted bodice and flowing skirt'),
(22, 'Designer Kurti', 'Description of designer kurti                        '),
(23, 'Category2', 'Category description                        ');

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `colour_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`colour_id`, `name`) VALUES
(1, 'Red'),
(2, 'Blue'),
(3, 'Green'),
(4, 'Orange'),
(5, 'blueblack');

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `coupon_id` int(11) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `expiration_date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`coupon_id`, `code`, `discount`, `expiration_date`) VALUES
(1, 'SAVE10', 15, '2023-06-30 00:00:00'),
(2, 'NEW30', 30, '2023-03-27 00:00:00'),
(3, 'SUMMER25', 25, '2023-09-30 00:00:00'),
(4, 'bye50', 50, '2023-03-30 00:00:00'),
(5, 'april50', 50, '2023-04-01 00:00:00'),
(6, 'april60', 60, '2023-04-01 00:00:00'),
(7, 'sweet16', 16, '2023-03-28 00:00:00'),
(8, 'sweet17', 17, '2023-04-01 00:00:00'),
(9, 'new60', 60, '2023-05-31 00:00:00'),
(10, 'demo1', 1, '2023-04-01 00:00:00'),
(11, 'demo2', 2, '2023-04-07 00:00:00'),
(12, 'demo3', 3, '2023-04-07 00:00:00'),
(13, 'demo5', 5, '2023-04-05 00:00:00'),
(14, 'demo6', 6, '2023-04-06 00:00:00'),
(15, 'demo10', 10, '2023-04-28 00:00:00'),
(16, 'old100', 100, '0000-00-00 00:00:00'),
(17, 'old100', 100, '2023-04-25 00:00:00'),
(18, 'mode50', 50, '2023-05-05 00:00:00'),
(21, 'demo123', 123, '2023-06-06 06:06:00'),
(22, 'demo45', 45, '2023-07-07 22:33:00'),
(24, '1updated again agin', 1, '2023-05-05 00:32:00'),
(26, 'Welcome50', 50, '2023-05-31 00:14:00');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `image_id` int(11) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `image_url1` varchar(255) DEFAULT NULL,
  `image_url2` varchar(255) DEFAULT NULL,
  `image_url3` varchar(255) DEFAULT NULL,
  `image_url4` varchar(255) DEFAULT NULL,
  `image_url5` varchar(255) DEFAULT NULL,
  `image_url6` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`image_id`, `product_id`, `image_url1`, `image_url2`, `image_url3`, `image_url4`, `image_url5`, `image_url6`, `updated_at`) VALUES
(9, '1682355009072', 'images_demo1.png', 'images_demo2.png', 'images_demo3.png', 'images_demo4.png', 'images_demo5.png', 'images_demo6.png', '2023-04-24 16:50:51'),
(13, '1682355055899', 'images_Screenshot_20221125_051933.png', 'images_Screenshot_20221125_052851.png', 'images_Screenshot_20221125_053036.png', 'images_Screenshot_20221125_053212.png', 'images_Screenshot_20221125_055442.png', 'images_Screenshot_20230204_110042.png', '2023-04-24 16:56:53'),
(14, '1682355686619', 'images_product-01.jpg', 'images_product-02.jpg', 'images_product-03.jpg', 'images_product-04.jpg', 'images_product-05.jpg', 'images_product-06.jpg', '2023-04-24 17:03:13'),
(15, '1682355798401', 'images_product-02.jpg', 'images_product-03.jpg', 'images_product-04.jpg', 'images_product-05.jpg', 'images_product-06.jpg', 'images_product-07.jpg', '2023-04-24 17:04:36'),
(16, '1682355878978', 'images_product-03.jpg', 'images_product-04.jpg', 'images_product-05.jpg', 'images_product-06.jpg', 'images_product-07.jpg', 'images_product-08.jpg', '2023-04-24 17:05:07'),
(17, '1683258303894', 'images_Screenshot 2023-04-06 134311.png', 'images_Screenshot_20221120_060011.png', 'images_Screenshot_20221120_060025.png', 'images_Screenshot_20221122_045654.png', 'images_Screenshot_20221124_021458.png', 'images_Screenshot_20221125_051655.png', '2023-05-05 03:46:50'),
(18, '1683630069700', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM (6) - Copy.jpeg', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM (6).jpeg', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM (5) - Copy.jpeg', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM (5).jpeg', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM (4) - Copy.jpeg', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM (4).jpeg', '2023-05-09 11:35:29'),
(19, '1683634414486', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM (3).jpeg', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM (2).jpeg', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM (1).jpeg', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM.jpeg', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM (3) - Copy.jpeg', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM (2) - Copy.jpeg', '2023-05-09 12:15:36'),
(20, '1683713718043', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM (6) - Copy.jpeg', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM (4) - Copy.jpeg', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM (3) - Copy.jpeg', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM (2) - Copy.jpeg', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM (1).jpeg', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM.jpeg', '2023-05-10 10:16:37'),
(21, '1683964177426', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM (5).jpeg', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM (4) - Copy.jpeg', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM (3) - Copy.jpeg', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM (2) - Copy.jpeg', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM (1).jpeg', 'images_WhatsApp Image 2023-05-09 at 4.29.59 PM.jpeg', '2023-05-13 07:50:41'),
(22, '1684037391388', 'images_Screenshot 2023-03-18 110721.png', 'images_Screenshot 2023-03-22 215835.png', 'images_Screenshot_20221120_060011.png', 'images_Screenshot_20221120_060025.png', 'images_Screenshot_20221122_045654.png', 'images_Screenshot_20221124_021458.png', '2023-05-14 04:11:47');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `payment_status` varchar(255) DEFAULT NULL,
  `date_ordered` datetime DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `landmark` varchar(255) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `district` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `total_amount`, `payment_status`, `date_ordered`, `product_id`, `name`, `address`, `phone`, `email`, `landmark`, `state`, `district`) VALUES
(1, 1, '200.50', 'Paid', '2022-03-18 12:30:00', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 1, '75.00', 'Paid', '2022-03-20 10:15:00', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 4, '300.00', 'Pending', '2022-03-20 16:00:00', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orders2`
--

CREATE TABLE `orders2` (
  `orders_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `payment_method` varchar(255) NOT NULL,
  `landmark` varchar(255) DEFAULT NULL,
  `razorpay_payment_id` varchar(255) DEFAULT NULL,
  `razorpay_order_id` varchar(255) DEFAULT NULL,
  `razorpay_signature` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders2`
--

INSERT INTO `orders2` (`orders_id`, `user_id`, `name`, `address`, `district`, `state`, `phone`, `email`, `total`, `created_at`, `updated_at`, `payment_method`, `landmark`, `razorpay_payment_id`, `razorpay_order_id`, `razorpay_signature`, `status`) VALUES
(18, 14, '', '', '', '', '', '', '7595.00', '2023-05-11 10:23:33', '2023-05-24 03:32:07', 'Online', '', NULL, NULL, NULL, 'Paid'),
(19, 14, '', '', '', '', '', '', '7595.00', '2023-05-11 10:34:19', '2023-05-24 03:32:16', 'Online', '', NULL, NULL, NULL, 'Paid'),
(20, 14, '', '', '', '', '', '', '7595.00', '2023-05-11 10:41:29', '2023-05-14 12:07:00', 'Online', '', NULL, NULL, NULL, 'Pending'),
(21, 14, '', '', '', '', '', '', '7595.00', '2023-05-11 10:45:37', '2023-05-14 12:07:00', 'Online', '', NULL, NULL, NULL, 'Pending'),
(22, 14, '', '', '', '', '', '', '433720.00', '2023-05-11 12:44:57', '2023-05-14 12:07:00', 'Online', '', NULL, NULL, NULL, 'Pending'),
(23, 14, '', '', '', '', '', '', '279800.00', '2023-05-14 15:13:38', '2023-05-14 15:13:38', '', '', NULL, NULL, NULL, 'Pending'),
(24, 1, 'Sdc', 'sdc', 'Ahmedabad', 'Gujarat', '8888877777', 'dsc13103@gmail.com', '109930.00', '2023-05-15 05:24:03', '2023-05-15 05:26:29', '', 'Landmark demo', 'pay_Lpp3NHUEczjRcl', 'order_Lpp12CQRlx4lD0', '97b13709d802408d3b1030b86d2a9e14ea6cdf69a356e8b74b8afebb735d7b27', 'Paid'),
(25, 1, '', '', '', '', '', '', '2078.60', '2023-05-15 06:36:55', '2023-05-15 06:36:55', '', '', NULL, NULL, NULL, 'Pending'),
(26, 1, 'Sumit ', 'Gurukul road', 'Ahmedabad', 'Gujarat', '8888877777', 'sumit@sumit.com', '5036400.00', '2023-05-15 07:15:10', '2023-05-15 07:15:45', '', 'Landmark', 'pay_Lpqume2uxNRnVx', 'order_LpquNpe3xRyx3o', '480d864a0e9f6ea44b4ecb9f2e1830b6d2a5980e11b82687e61baf3dccceffe9', 'Paid'),
(27, 1, '', '', '', '', '', '', '15990000.00', '2023-05-15 07:17:10', '2023-05-15 07:17:10', '', '', NULL, NULL, NULL, 'Pending'),
(28, 1, '', '', '', '', '', '', '11290930.00', '2023-05-15 07:44:35', '2023-05-15 07:44:35', '', '', NULL, NULL, NULL, 'Pending'),
(29, 1, 'Demo final', 'address final ', 'Ahmedabad', 'Gujarat', '9898989898', 'final@final.com', '391720.00', '2023-05-24 06:29:58', '2023-05-24 06:30:42', '', 'landmark', 'pay_LtOxg8teUbXi1S', 'order_LtOx6F2MrIqiIl', '79e32bb2009899e40d2aab0f59c61ca900d93f8ea144f327b0f692ea7de562bd', 'Paid');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` varchar(191) DEFAULT NULL,
  `product_size_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `colour` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`order_item_id`, `order_id`, `product_id`, `product_size_id`, `quantity`, `colour`) VALUES
(110, 18, '1683634414486', 2, 2, 'blue'),
(111, 18, '1683713718043', 2, 3, 'blue'),
(112, 19, '1683634414486', 2, 2, 'blue'),
(113, 19, '1683713718043', 2, 3, 'blue'),
(114, 20, '1683634414486', 2, 2, 'blue'),
(115, 20, '1683713718043', 2, 3, 'blue'),
(116, 21, '1683634414486', 2, 2, 'blue'),
(117, 21, '1683713718043', 2, 3, 'blue'),
(118, 22, '1683713718043', 4, 1, 'red'),
(119, 22, '1683713718043', 2, 2, 'blue'),
(120, 22, '1683634414486', 1, 1, 'red'),
(121, 23, '1683713718043', 4, 1, 'red'),
(122, 23, '1683713718043', 2, 0, 'blue'),
(123, 23, '1683634414486', 1, 0, 'red'),
(124, 23, '1683634414486', 0, 2, 'Red'),
(125, 24, '1683634414486', 1, 1, 'blue'),
(126, 25, '1683634414486', 0, 2, 'Blue'),
(127, 26, '1683634414486', 0, 36, 'Red'),
(128, 27, '1683713718043', 0, 100, 'Blue'),
(129, 28, '1683713718043', 0, 100, 'Blue'),
(130, 28, '1683634414486', 0, 1, 'Blue'),
(131, 29, '1683634414486', 0, 4, 'Blue');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` varchar(191) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `name`, `description`, `price`, `image_url`, `category_id`, `created_at`, `updated_at`) VALUES
('1683634414486', 'Kurti 2', 'Demo for Kurti 2\n                        ', '1399.00', '', 2, '2023-05-09 17:45:59', '2023-05-09 17:45:59'),
('1682355878978', '5', '5                        ', '5.00', '', 1, '2023-05-04 08:16:10', '2023-04-09 08:16:10'),
('1682355798401', '4', '4                        ', '4.00', '', 2, '2023-05-05 08:16:10', '2023-05-08 08:17:08'),
('1682355686619', '3', '3                        ', '3.00', '', 3, '2023-05-06 08:16:10', '2023-05-06 08:16:10'),
('1683713718043', 'Kurti 3', 'Description of kurti 3                        ', '1599.00', '', 2, '2023-05-10 15:46:45', '2023-05-10 15:46:45');

-- --------------------------------------------------------

--
-- Table structure for table `product_details`
--

CREATE TABLE `product_details` (
  `product_details_id` int(11) NOT NULL,
  `product_id` varchar(255) DEFAULT NULL,
  `product_size` varchar(10) DEFAULT NULL,
  `variant_quantity` int(11) NOT NULL,
  `product_color` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_details`
--

INSERT INTO `product_details` (`product_details_id`, `product_id`, `product_size`, `variant_quantity`, `product_color`) VALUES
(1, '1', 'S', 0, ''),
(2, '1', 'M', 0, ''),
(3, '1', 'L', 0, ''),
(4, '1', 'XL', 0, ''),
(5, '1', 'XXL', 0, ''),
(6, '2', 'S', 0, ''),
(7, '2', 'M', 0, ''),
(8, '2', 'L', 0, ''),
(9, '2', 'XL', 0, ''),
(10, '2', 'XXL', 0, ''),
(11, '3', 'S', 0, ''),
(12, '3', 'M', 0, ''),
(13, '3', 'L', 0, ''),
(14, '3', 'XL', 0, ''),
(15, '3', 'XXL', 0, ''),
(16, '4', 'S', 0, ''),
(17, '4', 'M', 0, ''),
(18, '4', 'L', 0, ''),
(19, '4', 'XL', 0, ''),
(20, '4', 'XXL', 0, ''),
(21, '5', 'S', 0, ''),
(22, '5', 'M', 0, ''),
(23, '5', 'L', 0, ''),
(24, '5', 'XL', 0, ''),
(25, '5', 'XXL', 0, ''),
(26, '1683947709346', 'XL', 0, 'Blue'),
(27, '1683949332019', 'XL', 21, 'Green'),
(28, '1683949464481', 'S', 20, 'Black'),
(29, '1683964177426', 'M', 10, 'Green'),
(30, '1683964177426', 'L', 31, 'Red'),
(31, '1683949464481', 'XL', 200, 'Blue'),
(32, '1683949464481', 'S', 500, 'Blue'),
(33, '1684037391388', 'L', 20, 'Blue'),
(34, '1683634414486', 'XL', 20, 'Blue');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `comment` text DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `sale_id` int(11) NOT NULL,
  `date_sold` date DEFAULT NULL,
  `total_sales` decimal(10,2) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`sale_id`, `date_sold`, `total_sales`) VALUES
(1, '2022-01-01', '1000.00'),
(2, '2022-02-01', '1500.50'),
(3, '2022-03-01', '800.00');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('9as_f_e5zOWrMu9buvsWTihHuDmoGHI8', 1682180382, '{\"cookie\":{\"originalMaxAge\":59999,\"expires\":\"2023-04-22T16:19:42.248Z\",\"httpOnly\":true,\"path\":\"/\"},\"loggedIn\":true,\"email\":\"sdc13103@gmail.com\"}'),
('9dhXk-WkI_vpv2UUaHjFmS6IhpCzJtEL', 1682180577, '{\"cookie\":{\"originalMaxAge\":60000,\"expires\":\"2023-04-22T16:22:57.144Z\",\"httpOnly\":true,\"path\":\"/\"},\"loggedIn\":true,\"email\":\"sdc13103@gmail.com\"}'),
('CzGaAJrtE-Pa3eotl-BqEX5ZpbvZ9kZu', 1682180228, '{\"cookie\":{\"originalMaxAge\":60000,\"expires\":\"2023-04-22T16:17:08.197Z\",\"httpOnly\":true,\"path\":\"/\"},\"loggedIn\":true,\"email\":\"sdc13103@gmail.com\"}'),
('OfDh3AuAN-CfC6yhOOcrrwIqtyEXUkCl', 1682181923, '{\"cookie\":{\"originalMaxAge\":60000,\"expires\":\"2023-04-22T16:45:23.267Z\",\"httpOnly\":true,\"path\":\"/\"},\"loggedIn\":true,\"email\":\"sdc13103@gmail.com\"}'),
('WRPUTmfE81vQnbZuQ3ST58yvNYzJ-yZk', 1682180117, '{\"cookie\":{\"originalMaxAge\":59999,\"expires\":\"2023-04-22T16:15:16.900Z\",\"httpOnly\":true,\"path\":\"/\"},\"email\":\"sdc13103@gmail.com\",\"otp\":\"458998\",\"loggedIn\":true}'),
('X2DwSHCquulVq30L2DpcyILiAAHn_OZC', 1682181611, '{\"cookie\":{\"originalMaxAge\":60000,\"expires\":\"2023-04-22T16:40:10.625Z\",\"httpOnly\":true,\"path\":\"/\"},\"loggedIn\":true,\"email\":\"sdc13103@gmail.com\"}'),
('_urwpe_ZPJF-6VlATtDgJlCpJVruywAv', 1682181950, '{\"cookie\":{\"originalMaxAge\":59998,\"expires\":\"2023-04-22T16:45:50.466Z\",\"httpOnly\":true,\"path\":\"/\"},\"loggedIn\":true,\"email\":\"sdc13103@gmail.com\"}'),
('axcgMYvmWT-VxDp28LAj90OnjRFHYCx6', 1682181244, '{\"cookie\":{\"originalMaxAge\":60000,\"expires\":\"2023-04-22T16:34:03.893Z\",\"httpOnly\":true,\"path\":\"/\"},\"loggedIn\":true,\"email\":\"sdc13103@gmail.com\"}'),
('gjpCQ8LtDbJuuirzhfS6mbecJWcbiV0D', 1682684189, '{\"cookie\":{\"originalMaxAge\":59999,\"expires\":\"2023-04-28T12:16:29.101Z\",\"httpOnly\":true,\"path\":\"/\"},\"loggedIn\":true,\"email\":\"sdc13103@gmail.com\"}'),
('puleygGpSRFmP5jjRSJ3o8xb3klgoG6T', 1682497560, '{\"cookie\":{\"originalMaxAge\":60000,\"expires\":\"2023-04-26T08:25:59.834Z\",\"httpOnly\":true,\"path\":\"/\"},\"loggedIn\":true,\"email\":\"sdc13103@gmail.com\"}'),
('y4PfrYU9Owc8cQnxGwooQweMA9k6QNez', 1683429780, '{\"cookie\":{\"originalMaxAge\":60000,\"expires\":\"2023-05-07T03:23:00.490Z\",\"httpOnly\":true,\"path\":\"/\"},\"loggedIn\":true,\"email\":\"sdc13103@gmail.com\"}');

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

CREATE TABLE `size` (
  `size_id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `size`
--

INSERT INTO `size` (`size_id`, `name`) VALUES
(1, 'S'),
(2, 'M'),
(3, 'L'),
(7, 'XL'),
(8, 'XXL');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `contactno` varchar(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`, `first_name`, `last_name`, `address`, `city`, `state`, `country`, `postal_code`, `contactno`) VALUES
(3, 'dsc13103@gmail.com', 'password3', 'Rohit', 'Kumar', '789 Bazaar Road', 'Bengaluru', 'Karnataka', 'India', '560001', '1234567890'),
(4, 'priya@gmail.com', 'password4', 'Priya', 'Singh', '101 Gali No. 5', 'Jaipur', 'Rajasthan', 'India', '302001', '1234567890'),
(5, 'amit@gmail.com', 'password5', 'Amit', 'Sharma', '2222 Sector 16', 'Chandigarh', 'Chandigarh', 'India', '160015', '1234567890');

-- --------------------------------------------------------

--
-- Table structure for table `users2`
--

CREATE TABLE `users2` (
  `user_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `number` varchar(15) NOT NULL,
  `address1` varchar(100) NOT NULL,
  `address2` varchar(100) NOT NULL,
  `state` varchar(50) NOT NULL,
  `district` varchar(50) NOT NULL,
  `pincode` char(6) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users2`
--

INSERT INTO `users2` (`user_id`, `name`, `email`, `number`, `address1`, `address2`, `state`, `district`, `pincode`, `password`) VALUES
(1, 'Digvijay', 'sdc13103@gmail.com', '91212121212', 'dvfefed', 'egvfev', 'state1', 'district1', '123456', 'updated'),
(2, 'Admins', 'work.digvijaysinh@gmail.com', '9558441004', 'aaaaa', 'dddddd', 'state1', 'district3', '363330', 'password123'),
(3, 'user2', 'work.digvijaysinh@gmail.com', '1234567891', 'wfew', 'wrfwr', 'state1', 'district2', '323432', 'errewfref'),
(4, 'Abc', 'abc@gmail.com', '1234567891', 'address 1', 'address 2', 'state2', 'district3', '333610', 'demo1'),
(5, 'Digvvijay', 'sdc13103@gmail.com', '8888888888', 'address 1', 'address 2', 'state1', 'district2', '363330', 'updatedagain'),
(6, 'grefew', 'sdc13103@gmail.com', '1111111111', 'bfw', 'dfbe', 'state2', 'district3', '363330', ''),
(7, 'name1', 'admin@admin.com', '9999999999', 'address1', 'address2', 'state1', 'district3', '222222', 'password123'),
(8, 'name1', 'admin@admin.com', '9999999999', 'address1', 'address2', 'state1', 'district3', '222222', 'password123'),
(9, 'name1', 'admin@admin.com', '9999999999', 'address1', 'address2', 'state1', 'district3', '222222', 'password123'),
(10, 'name', 'abc123@gmail.com', '9999999999', 'aa', 'bb', 'state2', 'district1', '363330', '12345678'),
(11, 'user2', '112@123.com', '1111111111', 'KADIYANA', 'add2', 'state1', 'district3', '363330', 'password123'),
(12, 'User final', 'dsc131034@gmail.com', '9739892812', 'add1', 'add2', 'Gujarat', 'Ahmedabad', '363330', 'password123'),
(13, 'Sumit', 'temptohai@drowblock.com', '8888888888', 'Address line1 ', 'Address line2', 'Gujarat', 'Ahmedabad', '123456', 'password123'),
(14, 'Amit updated', 'updtaedjanamit2001@yahoo.com', '8888888888', 'address line 1 updated', 'address line 2 updated', 'Rajasthan', 'Jaipur', '998800', 'password123');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `wishlist_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`wishlist_id`, `user_id`, `product_id`) VALUES
(27, 1, '1682355686619'),
(28, 13, '1682355878978');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`cart_item_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `product_size_id` (`product_size_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`colour_id`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`coupon_id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`image_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `orders2`
--
ALTER TABLE `orders2`
  ADD PRIMARY KEY (`orders_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `product_size_id` (`product_size_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product_details`
--
ALTER TABLE `product_details`
  ADD PRIMARY KEY (`product_details_id`),
  ADD KEY `product_id` (`product_id`(250));

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`sale_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`size_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email_idx` (`email`(191));

--
-- Indexes for table `users2`
--
ALTER TABLE `users2`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`wishlist_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`(250));

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `cart_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `colour_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `coupon_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `orders2`
--
ALTER TABLE `orders2`
  MODIFY `orders_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT for table `product_details`
--
ALTER TABLE `product_details`
  MODIFY `product_details_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `sale_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `size`
--
ALTER TABLE `size`
  MODIFY `size_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users2`
--
ALTER TABLE `users2`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `wishlist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
