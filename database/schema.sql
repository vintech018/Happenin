-- ============================================
-- Happenin Ticket Booking System
-- Database Schema Definition
-- ============================================

-- Drop database if exists (for fresh setup)
DROP DATABASE IF EXISTS happenin_db;
CREATE DATABASE happenin_db;
USE happenin_db;

-- ============================================
-- Table: users
-- Description: Stores user account information
-- ============================================
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    date_of_birth DATE,
    gender ENUM('Male', 'Female', 'Other', 'Prefer not to say'),
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    pincode VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_email (email),
    INDEX idx_username (username)
);

-- ============================================
-- Table: venues
-- Description: Stores venue/theater information
-- ============================================
CREATE TABLE venues (
    venue_id INT PRIMARY KEY AUTO_INCREMENT,
    venue_name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    pincode VARCHAR(10),
    capacity INT NOT NULL,
    venue_type ENUM('Cinema', 'Stadium', 'Theater', 'Club', 'Open Air') NOT NULL,
    contact_phone VARCHAR(15),
    contact_email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_city (city)
);

-- ============================================
-- Table: movies
-- Description: Stores movie information
-- ============================================
CREATE TABLE movies (
    movie_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    year YEAR,
    genre VARCHAR(100),
    rating DECIMAL(3,1) CHECK (rating IS NULL OR (rating >= 0 AND rating <= 10)),
    director VARCHAR(100),
    stars TEXT,
    studio VARCHAR(100),
    description TEXT,
    poster_url VARCHAR(255),
    trailer_url VARCHAR(255),
    duration_minutes INT CHECK (duration_minutes IS NULL OR duration_minutes > 0),
    release_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_title (title),
    INDEX idx_year (year),
    INDEX idx_rating (rating)
);

-- ============================================
-- Table: live_events
-- Description: Stores live event information
-- ============================================
CREATE TABLE live_events (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    category ENUM('Comedy', 'Concert', 'Stand-up', 'Sports', 'Theater', 'Festival') NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    venue_id INT NOT NULL,
    organizer_name VARCHAR(100),
    image_url VARCHAR(255),
    base_price DECIMAL(10,2) NOT NULL CHECK (base_price >= 0),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (venue_id) REFERENCES venues(venue_id) ON DELETE RESTRICT,
    INDEX idx_category (category),
    INDEX idx_event_date (event_date),
    INDEX idx_venue (venue_id)
);

-- ============================================
-- Table: showtimes
-- Description: Stores movie showtime information
-- ============================================
CREATE TABLE showtimes (
    showtime_id INT PRIMARY KEY AUTO_INCREMENT,
    movie_id INT NOT NULL,
    venue_id INT NOT NULL,
    show_date DATE NOT NULL,
    show_time TIME NOT NULL,
    screen_number INT,
    format_type ENUM('2D', '3D', 'IMAX', 'IMAX 3D') DEFAULT '2D',
    base_price DECIMAL(10,2) NOT NULL CHECK (base_price >= 0),
    available_seats INT NOT NULL CHECK (available_seats >= 0),
    total_seats INT NOT NULL CHECK (total_seats > 0),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (venue_id) REFERENCES venues(venue_id) ON DELETE RESTRICT,
    INDEX idx_movie (movie_id),
    INDEX idx_venue (venue_id),
    INDEX idx_show_date (show_date),
    INDEX idx_show_datetime (show_date, show_time),
    INDEX idx_showtime_movie_date (movie_id, show_date)
);

-- ============================================
-- Table: seat_categories
-- Description: Defines different seat categories and pricing
-- ============================================
CREATE TABLE seat_categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    price_multiplier DECIMAL(3,2) DEFAULT 1.00 CHECK (price_multiplier > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Table: seats
-- Description: Stores individual seat information
-- ============================================
CREATE TABLE seats (
    seat_id INT PRIMARY KEY AUTO_INCREMENT,
    venue_id INT NOT NULL,
    row_label VARCHAR(5) NOT NULL,
    seat_number INT NOT NULL,
    category_id INT NOT NULL,
    is_accessible BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (venue_id) REFERENCES venues(venue_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES seat_categories(category_id) ON DELETE RESTRICT,
    UNIQUE KEY unique_seat (venue_id, row_label, seat_number),
    INDEX idx_venue (venue_id),
    INDEX idx_category (category_id)
);

-- ============================================
-- Table: coupons
-- Description: Stores discount coupon information
-- ============================================
CREATE TABLE coupons (
    coupon_id INT PRIMARY KEY AUTO_INCREMENT,
    coupon_code VARCHAR(20) UNIQUE NOT NULL,
    discount_type ENUM('Percentage', 'Fixed') NOT NULL,
    discount_value DECIMAL(10,2) NOT NULL,
    min_purchase_amount DECIMAL(10,2) DEFAULT 0,
    max_discount_amount DECIMAL(10,2),
    valid_from DATE NOT NULL,
    valid_until DATE NOT NULL,
    usage_limit INT,
    used_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_code (coupon_code),
    INDEX idx_valid_dates (valid_from, valid_until)
);

-- ============================================
-- Table: bookings
-- Description: Stores booking information
-- ============================================
CREATE TABLE bookings (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    booking_type ENUM('Movie', 'Live Event') NOT NULL,
    movie_id INT,
    event_id INT,
    showtime_id INT,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    booking_status ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed') DEFAULT 'Pending',
    total_tickets INT NOT NULL CHECK (total_tickets > 0),
    subtotal DECIMAL(10,2) NOT NULL CHECK (subtotal >= 0),
    convenience_fees DECIMAL(10,2) DEFAULT 0 CHECK (convenience_fees >= 0),
    discount_amount DECIMAL(10,2) DEFAULT 0 CHECK (discount_amount >= 0),
    coupon_id INT,
    total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(15),
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE SET NULL,
    FOREIGN KEY (event_id) REFERENCES live_events(event_id) ON DELETE SET NULL,
    FOREIGN KEY (showtime_id) REFERENCES showtimes(showtime_id) ON DELETE SET NULL,
    FOREIGN KEY (coupon_id) REFERENCES coupons(coupon_id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_booking_date (booking_date),
    INDEX idx_status (booking_status),
    INDEX idx_movie (movie_id),
    INDEX idx_event (event_id),
    INDEX idx_booking_user_status (user_id, booking_status)
);

-- ============================================
-- Table: booking_seats
-- Description: Stores seat details for each booking
-- ============================================
CREATE TABLE booking_seats (
    booking_seat_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL,
    seat_id INT NOT NULL,
    seat_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE,
    FOREIGN KEY (seat_id) REFERENCES seats(seat_id) ON DELETE RESTRICT,
    INDEX idx_booking (booking_id),
    INDEX idx_seat (seat_id)
);

-- ============================================
-- Table: payments
-- Description: Stores payment transaction information
-- ============================================
CREATE TABLE payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL UNIQUE,
    payment_method ENUM('UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Wallet', 'Cash') NOT NULL,
    payment_status ENUM('Pending', 'Success', 'Failed', 'Refunded') DEFAULT 'Pending',
    transaction_id VARCHAR(100) UNIQUE,
    amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_gateway VARCHAR(50),
    failure_reason TEXT,
    refund_amount DECIMAL(10,2) DEFAULT 0 CHECK (refund_amount >= 0),
    refund_date TIMESTAMP NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE,
    INDEX idx_booking (booking_id),
    INDEX idx_status (payment_status),
    INDEX idx_transaction (transaction_id),
    INDEX idx_payment_date (payment_date),
    INDEX idx_payment_status_date (payment_status, payment_date)
);

-- ============================================
-- Table: reviews
-- Description: Stores user reviews and ratings
-- ============================================
CREATE TABLE reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    movie_id INT,
    event_id INT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES live_events(event_id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_movie (movie_id),
    INDEX idx_event (event_id),
    INDEX idx_rating (rating)
);

-- ============================================
-- Table: actors
-- Description: Stores actor information (normalized from movies.stars)
-- ============================================
CREATE TABLE actors (
    actor_id INT PRIMARY KEY AUTO_INCREMENT,
    actor_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_actor_name (actor_name)
);

-- ============================================
-- Table: movie_actors
-- Description: Junction table for movies and actors (many-to-many)
-- ============================================
CREATE TABLE movie_actors (
    movie_actor_id INT PRIMARY KEY AUTO_INCREMENT,
    movie_id INT NOT NULL,
    actor_id INT NOT NULL,
    role_name VARCHAR(100),
    is_lead BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (actor_id) REFERENCES actors(actor_id) ON DELETE CASCADE,
    UNIQUE KEY unique_movie_actor (movie_id, actor_id),
    INDEX idx_movie (movie_id),
    INDEX idx_actor (actor_id)
);

-- ============================================
-- Table: notifications
-- Description: Stores system notifications for users
-- ============================================
CREATE TABLE notifications (
    notification_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    notification_type ENUM('Booking Confirmation', 'Payment Success', 'Event Reminder', 'Cancellation', 'Offer') NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_read (is_read),
    INDEX idx_created (created_at)
);

-- ============================================
-- Table: admin_users
-- Description: Stores admin user accounts
-- ============================================
CREATE TABLE admin_users (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('Super Admin', 'Admin', 'Manager', 'Support') DEFAULT 'Admin',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_username (username)
);

-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger: Enforce booking-type consistency
-- Ensures that Movie bookings have movie_id and showtime_id set, 
-- while Live Event bookings have event_id set
DELIMITER //
CREATE TRIGGER trg_validate_booking_type
BEFORE INSERT ON bookings
FOR EACH ROW
BEGIN
    IF NEW.booking_type = 'Movie' THEN
        IF NEW.movie_id IS NULL OR NEW.showtime_id IS NULL THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Movie bookings must have movie_id and showtime_id set';
        END IF;
        IF NEW.event_id IS NOT NULL THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Movie bookings cannot have event_id set';
        END IF;
    ELSEIF NEW.booking_type = 'Live Event' THEN
        IF NEW.event_id IS NULL THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Live Event bookings must have event_id set';
        END IF;
        IF NEW.movie_id IS NOT NULL OR NEW.showtime_id IS NOT NULL THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Live Event bookings cannot have movie_id or showtime_id set';
        END IF;
    END IF;
END //
DELIMITER ;

-- Trigger: Enforce booking-type consistency on UPDATE
DELIMITER //
CREATE TRIGGER trg_validate_booking_type_update
BEFORE UPDATE ON bookings
FOR EACH ROW
BEGIN
    IF NEW.booking_type = 'Movie' THEN
        IF NEW.movie_id IS NULL OR NEW.showtime_id IS NULL THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Movie bookings must have movie_id and showtime_id set';
        END IF;
        IF NEW.event_id IS NOT NULL THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Movie bookings cannot have event_id set';
        END IF;
    ELSEIF NEW.booking_type = 'Live Event' THEN
        IF NEW.event_id IS NULL THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Live Event bookings must have event_id set';
        END IF;
        IF NEW.movie_id IS NOT NULL OR NEW.showtime_id IS NOT NULL THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Live Event bookings cannot have movie_id or showtime_id set';
        END IF;
    END IF;
END //
DELIMITER ;

-- Trigger: Update available seats when booking is confirmed
DELIMITER //
CREATE TRIGGER trg_update_seats_on_booking_confirm
AFTER UPDATE ON bookings
FOR EACH ROW
BEGIN
    -- Only update seats when status changes to Confirmed
    IF NEW.booking_status = 'Confirmed' AND OLD.booking_status != 'Confirmed' THEN
        IF NEW.showtime_id IS NOT NULL THEN
            UPDATE showtimes
            SET available_seats = available_seats - NEW.total_tickets
            WHERE showtime_id = NEW.showtime_id
              AND available_seats >= NEW.total_tickets;
        END IF;
    END IF;
    
    -- Restore seats when booking is cancelled
    IF NEW.booking_status = 'Cancelled' AND OLD.booking_status = 'Confirmed' THEN
        IF OLD.showtime_id IS NOT NULL THEN
            UPDATE showtimes
            SET available_seats = available_seats + OLD.total_tickets
            WHERE showtime_id = OLD.showtime_id;
        END IF;
    END IF;
END //
DELIMITER ;

-- Trigger: Log booking status changes
DELIMITER //
CREATE TRIGGER trg_log_booking_status_change
AFTER UPDATE ON bookings
FOR EACH ROW
BEGIN
    IF NEW.booking_status != OLD.booking_status AND NEW.user_id IS NOT NULL THEN
        INSERT INTO notifications (user_id, notification_type, title, message)
        VALUES (
            NEW.user_id,
            CASE 
                WHEN NEW.booking_status = 'Confirmed' THEN 'Booking Confirmation'
                WHEN NEW.booking_status = 'Cancelled' THEN 'Cancellation'
                WHEN NEW.booking_status = 'Completed' THEN 'Booking Confirmation'
                ELSE 'Booking Confirmation'
            END,
            CONCAT('Booking Status Changed to ', NEW.booking_status),
            CONCAT('Your booking #', NEW.booking_id, ' status has been updated to ', NEW.booking_status, '.')
        );
    END IF;
END //
DELIMITER ;

-- Trigger: Validate coupon before booking
DELIMITER //
CREATE TRIGGER trg_validate_coupon
BEFORE INSERT ON bookings
FOR EACH ROW
BEGIN
    IF NEW.coupon_id IS NOT NULL THEN
        IF NOT EXISTS (
            SELECT 1 FROM coupons 
            WHERE coupon_id = NEW.coupon_id 
              AND is_active = TRUE
              AND CURDATE() BETWEEN valid_from AND valid_until
              AND (usage_limit IS NULL OR used_count < usage_limit)
              AND NEW.subtotal >= min_purchase_amount
        ) THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Invalid, expired, or inapplicable coupon code';
        END IF;
    END IF;
END //
DELIMITER ;

