-- ============================================================
-- SQL Schema & Initial Data for Product Management System
-- Database Name: product_management_db
-- Engine: MySQL 8.0 (InnoDB, utf8mb4)
-- ============================================================

CREATE DATABASE IF NOT EXISTS `product_management_db`
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `product_management_db`;

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS `users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. USER ROLES TABLE
CREATE TABLE IF NOT EXISTS `user_roles` (
  `user_id` BIGINT NOT NULL,
  `role` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`user_id`, `role`),
  CONSTRAINT `fk_user_roles_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS `products` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `price` DOUBLE NOT NULL,
  `category` VARCHAR(100) DEFAULT NULL,
  `date` VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS `customers` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) DEFAULT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `location` VARCHAR(150) DEFAULT NULL,
  `total_orders` INT DEFAULT 0,
  `spent` DOUBLE DEFAULT 0,
  `status` VARCHAR(50) DEFAULT 'Active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. ORDERS TABLE
CREATE TABLE IF NOT EXISTS `orders` (
  `id` VARCHAR(50) NOT NULL,
  `customer` VARCHAR(150) NOT NULL,
  `items` INT DEFAULT 1,
  `total` DOUBLE DEFAULT 0,
  `status` VARCHAR(50) DEFAULT 'Processing',
  `date` VARCHAR(50) DEFAULT NULL,
  `payment` VARCHAR(50) DEFAULT 'UPI',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- DEFAULT SEED DATA
-- Passwords below are BCrypt encrypted:
-- 'admin123' -> $2a$10$/kiJk4GPBwarGzRa2ffx4uvWwATHjB2oc0MhxONdvQIM9FxSA9L6a
-- 'user123'  -> $2a$10$pk4LVdphpw46SkH/kAJRk.Oi9fWmKCYmnU/tizQslcOo5MmQ67Jh2
-- ============================================================

INSERT IGNORE INTO `users` (`id`, `username`, `email`, `password`, `full_name`) VALUES
(1, 'admin', 'admin@example.com', '$2a$10$/kiJk4GPBwarGzRa2ffx4uvWwATHjB2oc0MhxONdvQIM9FxSA9L6a', 'Admin User'),
(2, 'user', 'user@example.com', '$2a$10$pk4LVdphpw46SkH/kAJRk.Oi9fWmKCYmnU/tizQslcOo5MmQ67Jh2', 'Demo User');

INSERT IGNORE INTO `user_roles` (`user_id`, `role`) VALUES
(1, 'ROLE_ADMIN'),
(1, 'ROLE_USER'),
(2, 'ROLE_USER');

INSERT IGNORE INTO `products` (`id`, `name`, `price`, `category`, `date`) VALUES
(1, 'Fan', 2000, 'Electronics', 'Sat Dec 17 2022 14:55:08 GMT+0530 (India Standard Time)'),
(2, 'New HP Laptop', 30000, 'Electronics', 'Fri Dec 16 2022 10:24:47 GMT+0530 (India Standard Time)'),
(3, 'One Plus Advance', 80000, 'Mobile', 'Fri Dec 16 2022 10:23:52 GMT+0530 (India Standard Time)'),
(4, 'Lenevo 2022 Model', 99999, 'Laptop', 'Thu Dec 15 2022 21:13:26 GMT+0530 (India Standard Time)'),
(5, 'Samsung LED TV', 90000, 'Electronics', 'Thu Dec 15 2022 21:53:51 GMT+0530 (India Standard Time)'),
(6, 'Dummy', 15000, 'Electronics', 'Wed Dec 14 2022 18:30:00 GMT+0530 (India Standard Time)');

INSERT IGNORE INTO `customers` (`id`, `name`, `email`, `phone`, `location`, `total_orders`, `spent`, `status`) VALUES
(1, 'Aarav Sharma', 'aarav.sharma@example.com', '+91 98765 43210', 'Mumbai, India', 12, 145000, 'VIP'),
(2, 'Priya Verma', 'priya.v@example.com', '+91 98123 45678', 'Delhi, India', 5, 42000, 'Active'),
(3, 'Rohan Mehta', 'rohan.m@example.com', '+91 97111 22334', 'Bangalore, India', 8, 98000, 'Active'),
(4, 'Sneha Patel', 'sneha.patel@example.com', '+91 96555 44332', 'Ahmedabad, India', 2, 12000, 'New'),
(5, 'Vikram Singh', 'vikram.s@example.com', '+91 95444 33221', 'Jaipur, India', 15, 210000, 'VIP'),
(6, 'Ananya Gupta', 'ananya.g@example.com', '+91 94333 22110', 'Kolkata, India', 4, 34000, 'Active');

INSERT IGNORE INTO `orders` (`id`, `customer`, `items`, `total`, `status`, `date`, `payment`) VALUES
('ORD-7089', 'Aarav Sharma', 3, 4500, 'Completed', '2026-08-10', 'UPI'),
('ORD-7090', 'Priya Verma', 1, 30000, 'Processing', '2026-08-11', 'Credit Card'),
('ORD-7091', 'Rohan Mehta', 2, 82000, 'Shipped', '2026-08-09', 'Net Banking'),
('ORD-7092', 'Sneha Patel', 4, 9500, 'Cancelled', '2026-08-08', 'Debit Card'),
('ORD-7093', 'Vikram Singh', 1, 90000, 'Completed', '2026-08-07', 'UPI'),
('ORD-7094', 'Ananya Gupta', 2, 15000, 'Processing', '2026-08-06', 'Credit Card'),
('ORD-7095', 'Karan Malhotra', 5, 125000, 'Shipped', '2026-08-05', 'Net Banking');

