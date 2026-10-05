-- Nam Nilam Hostinger MySQL Database Schema
-- Database: u665690797_nncpro (or localhost)

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------
-- Table structure for `leads` (Full Attribution Tracking)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `leads` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `name` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(32) NOT NULL,
  `email` VARCHAR(191) DEFAULT NULL,
  `form_type` VARCHAR(100) NOT NULL COMMENT 'Which form was submitted (e.g., Advisory Desk, Contact Form, Site Visit, AI Workforce, Property Inquiry)',
  `source_page` VARCHAR(255) NOT NULL COMMENT 'Page path URL where form was submitted (e.g., /projects/emerald-park, /ai, /business)',
  `referrer_url` TEXT DEFAULT NULL,
  `intent_purpose` VARCHAR(255) DEFAULT NULL COMMENT 'Reason for inquiry (e.g., Buy in Trichy, Advisory, Due Diligence, AI Agent)',
  `category` VARCHAR(100) DEFAULT 'General',
  `location` VARCHAR(191) DEFAULT 'Trichy',
  `message` TEXT DEFAULT NULL COMMENT 'Exact customer message, requirements, or budget notes',
  `status` ENUM('new', 'contacted', 'in_progress', 'converted', 'closed') NOT NULL DEFAULT 'new',
  `admin_notes` TEXT DEFAULT NULL,
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `user_agent` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_form_type` (`form_type`),
  INDEX `idx_source_page` (`source_page`),
  INDEX `idx_status` (`status`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for `projects` (Dynamic Real Estate Projects)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `projects` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `location` VARCHAR(255) NOT NULL,
  `type` VARCHAR(100) NOT NULL DEFAULT 'Residential Plots',
  `price_per_sqft` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  `starting_price` VARCHAR(100) NOT NULL DEFAULT '₹15 Lakhs',
  `status` VARCHAR(100) NOT NULL DEFAULT 'Ready to Register',
  `approval` VARCHAR(191) NOT NULL DEFAULT 'DTCP & RERA Approved',
  `total_units` INT NOT NULL DEFAULT 50,
  `available_units` INT NOT NULL DEFAULT 15,
  `amenities` TEXT DEFAULT NULL COMMENT 'Comma separated or JSON list of amenities',
  `description` TEXT DEFAULT NULL,
  `image_url` TEXT DEFAULT NULL,
  `hero_image_url` TEXT DEFAULT NULL,
  `featured` TINYINT(1) NOT NULL DEFAULT 0,
  `display_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_slug` (`slug`),
  INDEX `idx_featured` (`featured`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for `admins` (Admin Portal Security)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(64) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` VARCHAR(32) NOT NULL DEFAULT 'admin',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Seed Initial Projects (Requested Inventory)
-- --------------------------------------------------------
INSERT INTO `projects` (`id`, `title`, `slug`, `location`, `type`, `price_per_sqft`, `starting_price`, `status`, `approval`, `total_units`, `available_units`, `amenities`, `description`, `image_url`, `featured`, `display_order`)
VALUES
('proj-1', 'Jai Nagar', 'jai-nagar', 'Siruganur, Trichy — Chennai NH (NH-45)', 'DTCP Approved Residential Layout', 800.00, '₹9.6 Lakhs', 'Ready to Register', 'DTCP & RERA Approved', 52, 16, 'Grand Gated Arch, 40ft Tar Roads, 24/7 Security, 3-Phase Electricity, LED Lights', 'Prime DTCP-approved layout situated on the Chennai-Trichy National Highway (NH-45) near Siruganur with sweet groundwater at 25 feet.', '/projects/jai-nagar.jpg', 1, 1),
('proj-2', 'Abirami Nagar', 'abirami-nagar', 'Thirupattur, Trichy', 'Approved Residential Villa Plots', 350.00, '₹4.2 Lakhs', 'Ready to Register', 'Approved Layout with Clear Title', 45, 14, 'Cement Concrete Roads, Stormwater Drains, Street Lights, Flexible Monthly EMI Schemes', 'Affordable, vetted residential plots in Thirupattur, Trichy with easy monthly EMI options and sweet groundwater within 20 feet.', '/projects/abirami-nagar.jpg', 1, 2),
('proj-3', 'Farm Land', 'farm-land', 'Koonalai, Trichy — Chennai NH (NH-45)', 'Agro & Managed Farm Plots', 140.00, '₹7.0 Lakhs', 'Available', 'Verified Agricultural Title', 28, 11, 'Perimeter Fencing, Common Borewell, Drip Irrigation, On-Site Caretaker', 'Fertile agricultural plots at Koonalai designed for organic farming, weekend retreat farmhouses, and strategic land-banking at starting ₹140/sq.ft.', '/projects/farm-land.jpg', 1, 3),
('proj-4', 'Sentha City', 'sentha-city', 'Aayakudi, Trichy', 'Integrated Gated Community Plots', 400.00, '₹4.8 Lakhs', 'Ready to Register', 'DTCP Sanctioned Layout', 60, 18, 'Grand Entry Gateway, 33ft & 30ft Tar Roads, Children Play Area, Tree Avenues', 'Gated community layout situated in Aayakudi, Trichy at ₹400/sq.ft with wide internal roads and quick highway access.', '/projects/sentha-city.jpg', 1, 4),
('proj-5', 'Kasinath Nagar', 'kasinath-nagar', 'Thirupattur, Trichy', 'Approved Residential Layout', 0.00, 'Stay Tuned', 'Launching Soon', 'Approved Layout with Valid Sub-Division', 40, 40, 'Compound Wall, Secure Gates, Underground Stormwater Drains, Street Lights', 'Tremendous upcoming residential project in Thirupattur, Trichy. Stay tuned for official plot launch, booking opportunities, and introductory pricing.', '/projects/kasinath-nagar.jpg', 1, 5)
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `price_per_sqft` = VALUES(`price_per_sqft`), `location` = VALUES(`location`);

SET FOREIGN_KEY_CHECKS = 1;
