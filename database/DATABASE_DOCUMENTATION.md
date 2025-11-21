# Happenin Ticket Booking System
## Database Management System Implementation Report

---

**Project Title:** Happenin Ticket Booking System - SQL Database Implementation

**Course:** Database Management Systems

**Team Members:** [Your Team Names]

**Date:** October 2024

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [E-R Diagram](#2-e-r-diagram)
3. [Normalization Used](#3-normalization-used)
4. [Database Schema](#4-database-schema)
5. [Use Cases](#5-use-cases)
   - [Use Case 1: Basic SELECT Queries](#use-case-1-basic-select-queries)
   - [Use Case 2: JOIN Operations](#use-case-2-join-operations)
   - [Use Case 3: Aggregate Functions](#use-case-3-aggregate-functions)
   - [Use Case 4: Subqueries](#use-case-4-subqueries)
   - [Use Case 5: HAVING Clause](#use-case-5-having-clause)
   - [Use Case 6: Date and Time Functions](#use-case-6-date-and-time-functions)
   - [Use Case 7: String Functions](#use-case-7-string-functions)
   - [Use Case 8: CASE Statements](#use-case-8-case-statements)
   - [Use Case 9: Window Functions](#use-case-9-window-functions)
   - [Use Case 10: UNION Operations](#use-case-10-union-operations)
   - [Use Case 11: EXISTS and NOT EXISTS](#use-case-11-exists-and-not-exists)
   - [Use Case 12: UPDATE Operations](#use-case-12-update-operations)
   - [Use Case 13: DELETE Operations](#use-case-13-delete-operations)
   - [Use Case 14: Stored Procedures](#use-case-14-stored-procedures)
   - [Use Case 15: Views](#use-case-15-views)
   - [Use Case 16: Triggers](#use-case-16-triggers)
   - [Use Case 17: Indexes and Performance](#use-case-17-indexes-and-performance)
   - [Use Case 18: Transactions](#use-case-18-transactions)
   - [Use Case 19: Constraints and Data Integrity](#use-case-19-constraints-and-data-integrity)
   - [Use Case 20: Advanced Queries](#use-case-20-advanced-queries)

---

## 1. Introduction

The Happenin Ticket Booking System is a comprehensive database management solution designed to handle ticket bookings for movies and live events. This system manages multiple entities including users, venues, movies, live events, showtimes, bookings, payments, and coupons.

The database is designed to support:
- User registration and authentication
- Movie and live event management
- Showtime scheduling and seat management
- Booking processing and payment handling
- Coupon and discount management
- Review and rating system
- Notification system
- Administrative functions

The implementation demonstrates various Database Management System concepts including normalization, referential integrity, transactions, stored procedures, triggers, views, and complex query operations.

---

## 2. E-R Diagram

### Entity-Relationship Overview

The database consists of the following main entities:

**Core Entities:**
- **Users**: Customer account information
- **Venues**: Theater, stadium, and event location details
- **Movies**: Movie catalog with metadata
- **Live Events**: Concert, comedy, and other live event information
- **Showtimes**: Movie screening schedules
- **Bookings**: Customer booking records
- **Payments**: Payment transaction records
- **Seats**: Individual seat information
- **Coupons**: Discount coupon management
- **Reviews**: User reviews and ratings
- **Notifications**: System notifications
- **Admin Users**: Administrative accounts

### Relationships:

1. **Users → Bookings** (One-to-Many): A user can make multiple bookings
2. **Movies → Showtimes** (One-to-Many): A movie can have multiple showtimes
3. **Venues → Showtimes** (One-to-Many): A venue can host multiple showtimes
4. **Venues → Live Events** (One-to-Many): A venue can host multiple live events
5. **Showtimes → Bookings** (One-to-Many): A showtime can have multiple bookings
6. **Live Events → Bookings** (One-to-Many): An event can have multiple bookings
7. **Bookings → Payments** (One-to-One): Each booking has one payment
8. **Bookings → Booking_Seats** (One-to-Many): A booking can include multiple seats
9. **Seats → Booking_Seats** (One-to-Many): A seat can be booked multiple times (different showtimes)
10. **Coupons → Bookings** (One-to-Many): A coupon can be used in multiple bookings
11. **Users → Reviews** (One-to-Many): A user can write multiple reviews
12. **Movies → Reviews** (One-to-Many): A movie can have multiple reviews
13. **Live Events → Reviews** (One-to-Many): An event can have multiple reviews

### E-R Diagram Representation:

```
[Users] ──< [Bookings] >── [Movies]
                │                │
                │                └──< [Showtimes] >── [Venues]
                │
                ├──< [Booking_Seats] >── [Seats] >── [Venues]
                │
                ├── [Payments]
                │
                └── [Coupons]

[Live Events] >── [Venues]
     │
     └──< [Bookings]

[Users] ──< [Reviews] >── [Movies]
                    │
                    └── [Live Events]

[Users] ──< [Notifications]
```

---

## 3. Normalization Used

The database schema follows **Third Normal Form (3NF)** to eliminate redundancy and ensure data integrity.

### First Normal Form (1NF):
- All tables have atomic values (no multi-valued attributes)
- Each column contains single, indivisible values
- Example: `stars` field in movies table stores comma-separated values (could be further normalized, but kept for simplicity)

### Second Normal Form (2NF):
- All tables are in 1NF
- All non-key attributes are fully functionally dependent on the primary key
- Example: In `bookings` table, all attributes depend on `booking_id`

### Third Normal Form (3NF):
- All tables are in 2NF
- No transitive dependencies exist
- Example: Venue information is stored separately in `venues` table, referenced by foreign keys

### Normalization Examples:

**Before Normalization (Denormalized):**
```
Bookings Table:
- booking_id
- customer_name
- customer_email
- customer_phone
- venue_name
- venue_address
- venue_city
- movie_title
- movie_director
- show_date
- show_time
```

**After Normalization (3NF):**
```
Bookings Table:
- booking_id
- user_id (FK → Users)
- movie_id (FK → Movies)
- showtime_id (FK → Showtimes)
- customer_name
- customer_email
- customer_phone

Movies Table:
- movie_id
- title
- director
- ...

Showtimes Table:
- showtime_id
- movie_id (FK)
- venue_id (FK)
- show_date
- show_time

Venues Table:
- venue_id
- venue_name
- address
- city
- ...
```

### Benefits of Normalization:
1. **Reduced Data Redundancy**: Venue information stored once, referenced multiple times
2. **Data Integrity**: Changes to venue data automatically reflect in all related records
3. **Easier Maintenance**: Updates need to be made in one place only
4. **Improved Query Performance**: Indexes can be created on normalized tables
5. **Consistency**: Prevents data inconsistencies across the database

---

## 4. Database Schema

### Complete Database Schema

The database consists of **13 main tables** with proper relationships and constraints:

#### 4.1 Users Table
```sql
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
    is_active BOOLEAN DEFAULT TRUE
);
```

#### 4.2 Venues Table
```sql
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 4.3 Movies Table
```sql
CREATE TABLE movies (
    movie_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    year YEAR,
    genre VARCHAR(100),
    rating DECIMAL(3,1),
    director VARCHAR(100),
    stars TEXT,
    studio VARCHAR(100),
    description TEXT,
    poster_url VARCHAR(255),
    trailer_url VARCHAR(255),
    duration_minutes INT,
    release_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 4.4 Live Events Table
```sql
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
    base_price DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (venue_id) REFERENCES venues(venue_id) ON DELETE RESTRICT
);
```

#### 4.5 Showtimes Table
```sql
CREATE TABLE showtimes (
    showtime_id INT PRIMARY KEY AUTO_INCREMENT,
    movie_id INT NOT NULL,
    venue_id INT NOT NULL,
    show_date DATE NOT NULL,
    show_time TIME NOT NULL,
    screen_number INT,
    format_type ENUM('2D', '3D', 'IMAX', 'IMAX 3D') DEFAULT '2D',
    base_price DECIMAL(10,2) NOT NULL,
    available_seats INT NOT NULL,
    total_seats INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (venue_id) REFERENCES venues(venue_id) ON DELETE RESTRICT
);
```

#### 4.6 Seats Table
```sql
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
    UNIQUE KEY unique_seat (venue_id, row_label, seat_number)
);
```

#### 4.7 Bookings Table
```sql
CREATE TABLE bookings (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    booking_type ENUM('Movie', 'Live Event') NOT NULL,
    movie_id INT,
    event_id INT,
    showtime_id INT,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    booking_status ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed') DEFAULT 'Pending',
    total_tickets INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    convenience_fees DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    coupon_id INT,
    total_amount DECIMAL(10,2) NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(15),
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE SET NULL,
    FOREIGN KEY (event_id) REFERENCES live_events(event_id) ON DELETE SET NULL,
    FOREIGN KEY (showtime_id) REFERENCES showtimes(showtime_id) ON DELETE SET NULL,
    FOREIGN KEY (coupon_id) REFERENCES coupons(coupon_id) ON DELETE SET NULL
);
```

#### 4.8 Payments Table
```sql
CREATE TABLE payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL UNIQUE,
    payment_method ENUM('UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Wallet', 'Cash') NOT NULL,
    payment_status ENUM('Pending', 'Success', 'Failed', 'Refunded') DEFAULT 'Pending',
    transaction_id VARCHAR(100) UNIQUE,
    amount DECIMAL(10,2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_gateway VARCHAR(50),
    failure_reason TEXT,
    refund_amount DECIMAL(10,2) DEFAULT 0,
    refund_date TIMESTAMP NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE
);
```

#### 4.9 Additional Tables
- **seat_categories**: Defines seat categories and pricing multipliers
- **booking_seats**: Junction table for bookings and seats
- **coupons**: Discount coupon management
- **reviews**: User reviews and ratings
- **notifications**: System notifications
- **admin_users**: Administrative user accounts
- **actors**: Normalized actor information (separated from movies.stars)
- **movie_actors**: Junction table for movies and actors (many-to-many relationship)

### 4.10 Data Integrity Features

#### Triggers:
1. **trg_validate_booking_type** (BEFORE INSERT): Ensures booking-type consistency
   - Movie bookings must have movie_id and showtime_id set; event_id must be NULL
   - Live Event bookings must have event_id set; movie_id and showtime_id must be NULL

2. **trg_validate_booking_type_update** (BEFORE UPDATE): Same validation on updates

3. **trg_update_seats_on_booking_confirm** (AFTER UPDATE): 
   - Decrements available_seats when booking is confirmed
   - Restores available_seats when booking is cancelled

4. **trg_log_booking_status_change** (AFTER UPDATE): Creates notifications on status changes

5. **trg_validate_coupon** (BEFORE INSERT): Validates coupon before booking creation
   - Checks active status, validity dates, usage limits, minimum purchase amount

#### Stored Procedures:
1. **CreateBooking**: Creates bookings with concurrency control
   - Uses SELECT FOR UPDATE to prevent overbooking
   - Validates seat availability
   - Updates seat counts atomically within transaction
   - Returns booking_id and result message

2. **GetUserBookingSummary**: Retrieves comprehensive user booking statistics

### Key Constraints:
- **Primary Keys**: All tables have auto-incrementing primary keys
- **Foreign Keys**: Referential integrity maintained with ON DELETE CASCADE/RESTRICT/SET NULL
- **Unique Constraints**: Email, username, transaction_id, coupon_code, payments.booking_id (enforces 1:1 relationship)
- **CHECK Constraints**: 
  - Movie ratings: 0-10 (DECIMAL(3,1))
  - Review ratings: 1-5 (INT)
  - All prices and amounts: >= 0
  - Seat counts: available_seats >= 0, total_seats > 0
  - Price multipliers: > 0
  - Total tickets: > 0
  - Note: Requires MySQL 8.0.16+ for enforcement
- **Default Values**: Timestamps, boolean flags, status fields
- **Indexes**: 
  - Created on foreign keys and frequently queried columns
  - Composite indexes for performance:
    - `idx_booking_user_status` on bookings(user_id, booking_status)
    - `idx_showtime_movie_date` on showtimes(movie_id, show_date)
    - `idx_payment_status_date` on payments(payment_status, payment_date)
    - `idx_event_date_venue` on live_events(event_date, venue_id)

---

## 5. Use Cases

### Use Case 1: Basic SELECT Queries

**Problem Statement:** Retrieve all active movies with their details sorted by rating and release date to help customers browse available movies.

**SQL Query:**
```sql
SELECT 
    movie_id,
    title,
    year,
    genre,
    rating,
    director,
    release_date
FROM movies
WHERE is_active = TRUE
ORDER BY rating DESC, release_date DESC;
```

**Output Description:** Returns a list of all active movies with their basic information, sorted by highest rating first, then by most recent release date.

---

### Use Case 2: JOIN Operations

**Problem Statement:** Display movie showtimes with complete venue and movie information to help users find available screenings at their preferred locations.

**SQL Query:**
```sql
SELECT 
    s.showtime_id,
    m.title AS movie_title,
    v.venue_name,
    v.city,
    s.show_date,
    s.show_time,
    s.format_type,
    s.base_price,
    s.available_seats,
    s.total_seats
FROM showtimes s
INNER JOIN movies m ON s.movie_id = m.movie_id
INNER JOIN venues v ON s.venue_id = v.venue_id
WHERE s.show_date >= CURDATE()
ORDER BY s.show_date, s.show_time;
```

**Output Description:** Returns all upcoming showtimes with movie titles, venue names, cities, show dates/times, formats, prices, and seat availability.

---

### Use Case 3: Aggregate Functions

**Problem Statement:** Calculate total revenue, average transaction value, and transaction statistics grouped by payment status to analyze payment performance.

**SQL Query:**
```sql
SELECT 
    payment_status,
    COUNT(*) AS transaction_count,
    SUM(amount) AS total_revenue,
    AVG(amount) AS average_transaction,
    MIN(amount) AS min_transaction,
    MAX(amount) AS max_transaction
FROM payments
GROUP BY payment_status
ORDER BY total_revenue DESC;
```

**Output Description:** Provides summary statistics for each payment status including count, total revenue, average, minimum, and maximum transaction amounts.

---

### Use Case 4: Subqueries

**Problem Statement:** Identify users who have made bookings with values above the average booking value to identify high-value customers.

**SQL Query:**
```sql
SELECT 
    u.user_id,
    u.username,
    u.full_name,
    u.email,
    COUNT(b.booking_id) AS total_bookings,
    SUM(b.total_amount) AS total_spent,
    AVG(b.total_amount) AS avg_booking_value
FROM users u
INNER JOIN bookings b ON u.user_id = b.user_id
WHERE b.booking_status = 'Confirmed'
GROUP BY u.user_id, u.username, u.full_name, u.email
HAVING AVG(b.total_amount) > (
    SELECT AVG(total_amount)
    FROM bookings
    WHERE booking_status = 'Confirmed'
)
ORDER BY total_spent DESC;
```

**Output Description:** Lists users whose average booking value exceeds the system-wide average, along with their booking statistics.

---

### Use Case 5: HAVING Clause

**Problem Statement:** Find customers who have made more than 2 confirmed bookings to identify loyal customers for loyalty program enrollment.

**SQL Query:**
```sql
SELECT 
    u.user_id,
    u.username,
    u.full_name,
    u.email,
    COUNT(b.booking_id) AS booking_count,
    SUM(b.total_amount) AS total_spent
FROM users u
INNER JOIN bookings b ON u.user_id = b.user_id
WHERE b.booking_status = 'Confirmed'
GROUP BY u.user_id, u.username, u.full_name, u.email
HAVING COUNT(b.booking_id) > 2
ORDER BY booking_count DESC, total_spent DESC;
```

**Output Description:** Returns users with more than 2 confirmed bookings, sorted by booking count and total spending.

---

### Use Case 6: Date and Time Functions

**Problem Statement:** Retrieve all bookings made in the current month with formatted dates and days since booking to track monthly booking trends.

**SQL Query:**
```sql
SELECT 
    booking_id,
    customer_name,
    booking_type,
    total_amount,
    booking_date,
    DATE_FORMAT(booking_date, '%Y-%m-%d %H:%i:%s') AS formatted_date,
    DATEDIFF(CURDATE(), DATE(booking_date)) AS days_ago
FROM bookings
WHERE MONTH(booking_date) = MONTH(CURDATE())
  AND YEAR(booking_date) = YEAR(CURDATE())
ORDER BY booking_date DESC;
```

**Output Description:** Lists all bookings from the current month with human-readable date formats and days elapsed since booking.

---

### Use Case 7: String Functions

**Problem Statement:** Search for movies by partial title match (case-insensitive) to implement a search functionality for users.

**SQL Query:**
```sql
SELECT 
    movie_id,
    title,
    genre,
    rating,
    director
FROM movies
WHERE LOWER(title) LIKE '%deadpool%'
   OR LOWER(title) LIKE '%batman%'
   OR LOWER(title) LIKE '%dune%'
ORDER BY rating DESC;
```

**Output Description:** Returns movies matching the search terms regardless of case, sorted by rating.

---

### Use Case 8: CASE Statements

**Problem Statement:** Categorize bookings into value tiers (High, Medium, Standard, Low) based on total amount for marketing segmentation.

**SQL Query:**
```sql
SELECT 
    booking_id,
    customer_name,
    total_amount,
    CASE
        WHEN total_amount >= 5000 THEN 'High Value'
        WHEN total_amount >= 2000 THEN 'Medium Value'
        WHEN total_amount >= 500 THEN 'Standard Value'
        ELSE 'Low Value'
    END AS booking_category,
    booking_type
FROM bookings
WHERE booking_status = 'Confirmed'
ORDER BY total_amount DESC;
```

**Output Description:** Classifies each confirmed booking into value categories for targeted marketing campaigns.

---

### Use Case 9: Window Functions

**Problem Statement:** Rank movies by total revenue generated and assign revenue rankings to identify top-performing movies.

**SQL Query:**
```sql
SELECT 
    m.title,
    m.genre,
    COALESCE(SUM(b.total_amount), 0) AS total_revenue,
    RANK() OVER (ORDER BY COALESCE(SUM(b.total_amount), 0) DESC) AS revenue_rank,
    DENSE_RANK() OVER (ORDER BY COALESCE(SUM(b.total_amount), 0) DESC) AS revenue_dense_rank
FROM movies m
LEFT JOIN bookings b ON m.movie_id = b.movie_id AND b.booking_status = 'Confirmed'
GROUP BY m.movie_id, m.title, m.genre
ORDER BY total_revenue DESC;
```

**Output Description:** Provides revenue rankings for all movies using both RANK() and DENSE_RANK() window functions.

---

### Use Case 10: UNION Operations

**Problem Statement:** Combine movie and live event bookings into a unified view to display all user bookings regardless of type.

**SQL Query:**
```sql
SELECT 
    booking_id,
    'Movie' AS booking_type,
    m.title AS event_name,
    v.venue_name,
    v.city,
    booking_date,
    total_amount
FROM bookings b
JOIN movies m ON b.movie_id = m.movie_id
JOIN showtimes s ON b.showtime_id = s.showtime_id
JOIN venues v ON s.venue_id = v.venue_id
WHERE b.booking_type = 'Movie'
  AND b.booking_status = 'Confirmed'

UNION ALL

SELECT 
    booking_id,
    'Live Event' AS booking_type,
    e.title AS event_name,
    v.venue_name,
    v.city,
    booking_date,
    total_amount
FROM bookings b
JOIN live_events e ON b.event_id = e.event_id
JOIN venues v ON e.venue_id = v.venue_id
WHERE b.booking_type = 'Live Event'
  AND b.booking_status = 'Confirmed'

ORDER BY booking_date DESC;
```

**Output Description:** Returns a unified list of all confirmed bookings (both movies and live events) with consistent structure.

---

### Use Case 11: EXISTS and NOT EXISTS

**Problem Statement:** Find movies that have no confirmed bookings to identify underperforming content that may need promotion.

**SQL Query:**
```sql
SELECT 
    m.movie_id,
    m.title,
    m.genre,
    m.rating
FROM movies m
WHERE NOT EXISTS (
    SELECT 1
    FROM bookings b
    WHERE b.movie_id = m.movie_id
      AND b.booking_status = 'Confirmed'
)
AND m.is_active = TRUE
ORDER BY m.title;
```

**Output Description:** Lists all active movies that have never received a confirmed booking.

---

### Use Case 12: UPDATE Operations

**Problem Statement:** Automatically update booking status to 'Completed' for all past live events that are still marked as 'Confirmed'.

**SQL Query:**
```sql
UPDATE bookings b
JOIN live_events e ON b.event_id = e.event_id
SET b.booking_status = 'Completed'
WHERE b.booking_type = 'Live Event'
  AND b.booking_status = 'Confirmed'
  AND e.event_date < CURDATE();
```

**Output Description:** Updates booking status for past events to maintain accurate booking state.

---

### Use Case 13: DELETE Operations

**Problem Statement:** Remove cancelled bookings older than 30 days to maintain database cleanliness and improve performance.

**SQL Query:**
```sql
DELETE FROM bookings
WHERE booking_status = 'Cancelled'
  AND DATEDIFF(CURDATE(), DATE(booking_date)) > 30;
```

**Output Description:** Removes old cancelled bookings to free up storage space.

---

### Use Case 14: Stored Procedures

**Problem Statement:** Create a reusable procedure to retrieve comprehensive booking summary for any user to support customer service operations.

**SQL Query:**
```sql
DELIMITER //
CREATE PROCEDURE GetUserBookingSummary(IN user_id_param INT)
BEGIN
    SELECT 
        u.username,
        u.full_name,
        COUNT(b.booking_id) AS total_bookings,
        SUM(b.total_tickets) AS total_tickets,
        SUM(b.total_amount) AS total_spent,
        AVG(b.total_amount) AS avg_booking_value,
        MAX(b.booking_date) AS last_booking_date
    FROM users u
    LEFT JOIN bookings b ON u.user_id = b.user_id AND b.booking_status = 'Confirmed'
    WHERE u.user_id = user_id_param
    GROUP BY u.user_id, u.username, u.full_name;
END //
DELIMITER ;
```

**Usage:**
```sql
CALL GetUserBookingSummary(1);
```

**Output Description:** Returns a comprehensive summary of a user's booking history including counts, totals, and averages.

---

### Use Case 15: Views

**Problem Statement:** Create a view for active movie showtimes with calculated availability percentage to simplify frequent queries.

**SQL Query:**
```sql
CREATE OR REPLACE VIEW v_active_movie_showtimes AS
SELECT 
    s.showtime_id,
    m.title AS movie_title,
    m.genre,
    m.rating,
    v.venue_name,
    v.city,
    s.show_date,
    s.show_time,
    s.format_type,
    s.base_price,
    s.available_seats,
    s.total_seats,
    ROUND((s.available_seats / s.total_seats) * 100, 2) AS availability_percentage
FROM showtimes s
JOIN movies m ON s.movie_id = m.movie_id
JOIN venues v ON s.venue_id = v.venue_id
WHERE s.is_active = TRUE
  AND m.is_active = TRUE
  AND s.show_date >= CURDATE()
ORDER BY s.show_date, s.show_time;
```

**Usage:**
```sql
SELECT * FROM v_active_movie_showtimes WHERE availability_percentage < 50;
```

**Output Description:** Provides a simplified interface to query active showtimes with pre-calculated availability percentages.

---

### Use Case 16: Triggers

**Problem Statement:** Implement comprehensive data integrity triggers to enforce business rules and maintain data consistency across the database.

**Triggers Implemented:**

1. **Booking Type Validation Trigger** (trg_validate_booking_type):
```sql
-- Enforces booking-type consistency
-- Movie bookings: movie_id and showtime_id required, event_id must be NULL
-- Live Event bookings: event_id required, movie_id and showtime_id must be NULL
```

2. **Seat Availability Update Trigger** (trg_update_seats_on_booking_confirm):
```sql
-- Automatically updates available_seats when booking status changes
-- Decrements on confirmation, restores on cancellation
```

3. **Booking Status Notification Trigger** (trg_log_booking_status_change):
```sql
-- Creates notifications when booking status changes
```

4. **Coupon Validation Trigger** (trg_validate_coupon):
```sql
-- Validates coupon before booking creation
-- Checks: active status, validity dates, usage limits, minimum purchase
```

**Testing Triggers:**
```sql
-- This should FAIL (invalid: Movie booking with event_id set)
INSERT INTO bookings (
    booking_type, movie_id, event_id, showtime_id,
    total_tickets, subtotal, total_amount,
    customer_name, customer_email
) VALUES (
    'Movie', 1, 1, 1, 2, 500, 590, 'Test', 'test@example.com'
);
-- Expected: Error: "Movie bookings cannot have event_id set"
```

**Output Description:** Triggers ensure data integrity by validating business rules at the database level, preventing inconsistent data and maintaining referential integrity.

---

### Use Case 17: Indexes and Performance

**Problem Statement:** Create composite indexes on frequently queried column combinations to improve query performance.

**SQL Query:**
```sql
CREATE INDEX idx_booking_user_status ON bookings(user_id, booking_status);
CREATE INDEX idx_showtime_movie_date ON showtimes(movie_id, show_date);
CREATE INDEX idx_payment_status_date ON payments(payment_status, payment_date);
CREATE INDEX idx_event_date_venue ON live_events(event_date, venue_id);
```

**Output Description:** Improves query performance for common access patterns involving user bookings, showtime searches, payment queries, and event lookups.

---

### Use Case 18: Transactions

**Problem Statement:** Process a booking, update seat availability, and record payment atomically to ensure data consistency.

**SQL Query:**
```sql
START TRANSACTION;

INSERT INTO bookings (
    user_id, booking_type, movie_id, showtime_id,
    total_tickets, subtotal, total_amount,
    customer_name, customer_email, booking_status
) VALUES (
    1, 'Movie', 1, 1,
    2, 500.00, 590.00,
    'Test User', 'test@example.com', 'Confirmed'
);

SET @booking_id = LAST_INSERT_ID();

UPDATE showtimes
SET available_seats = available_seats - 2
WHERE showtime_id = 1;

INSERT INTO payments (
    booking_id, payment_method, payment_status,
    transaction_id, amount, payment_gateway
) VALUES (
    @booking_id, 'UPI', 'Success',
    CONCAT('TXN', UNIX_TIMESTAMP()), 590.00, 'Razorpay'
);

COMMIT;
```

**Output Description:** Ensures all three operations (booking creation, seat update, payment recording) succeed or fail together, maintaining data integrity.

---

### Use Case 19: Constraints and Data Integrity

**Problem Statement:** Verify all foreign key constraints are properly defined to ensure referential integrity across the database.

**SQL Query:**
```sql
SELECT 
    TABLE_NAME,
    CONSTRAINT_NAME,
    CONSTRAINT_TYPE
FROM information_schema.TABLE_CONSTRAINTS
WHERE TABLE_SCHEMA = 'happenin_db'
  AND CONSTRAINT_TYPE = 'FOREIGN KEY'
ORDER BY TABLE_NAME;
```

**Output Description:** Lists all foreign key constraints to verify referential integrity is maintained.

---

### Use Case 20: Advanced Queries

**Problem Statement:** Calculate customer lifetime value (CLV) to identify high-value customers for targeted marketing and loyalty programs.

**SQL Query:**
```sql
SELECT 
    u.user_id,
    u.username,
    u.full_name,
    COUNT(DISTINCT b.booking_id) AS total_bookings,
    SUM(b.total_amount) AS lifetime_value,
    AVG(b.total_amount) AS avg_booking_value,
    DATEDIFF(CURDATE(), MIN(b.booking_date)) AS customer_age_days,
    SUM(b.total_amount) / NULLIF(DATEDIFF(CURDATE(), MIN(b.booking_date)), 0) * 365 AS projected_annual_value
FROM users u
INNER JOIN bookings b ON u.user_id = b.user_id
WHERE b.booking_status = 'Confirmed'
GROUP BY u.user_id, u.username, u.full_name
ORDER BY lifetime_value DESC;
```

**Output Description:** Provides comprehensive customer value metrics including total spending, average booking value, customer age, and projected annual value.

---

## Conclusion

This database implementation demonstrates comprehensive understanding of Database Management System concepts including:

1. **Data Modeling**: E-R diagram design and normalization (3NF)
2. **Schema Design**: Table creation with proper constraints, relationships, and indexes
3. **Data Integrity**: 
   - Foreign key constraints with appropriate ON DELETE actions
   - CHECK constraints for data validation (MySQL 8.0+)
   - Triggers for business rule enforcement
   - Unique constraints for 1:1 relationships
4. **Data Manipulation**: INSERT, UPDATE, DELETE operations with transaction support
5. **Query Operations**: SELECT with various clauses, joins, subqueries, window functions
6. **Advanced Features**: 
   - Views for simplified querying
   - Stored procedures with concurrency control (SELECT FOR UPDATE)
   - Triggers for automatic data maintenance
   - Transactions for atomic operations
7. **Performance Optimization**: 
   - Indexes on foreign keys and frequently queried columns
   - Composite indexes for common query patterns
   - Query optimization techniques
8. **Concurrency Control**: SELECT FOR UPDATE in stored procedures to prevent overbooking
9. **Normalization**: Proper 3NF design with normalized actor relationships

### Key Improvements Made:
- ✅ Booking-type consistency enforced via triggers
- ✅ Concurrency-safe booking creation with SELECT FOR UPDATE
- ✅ CHECK constraints for numeric ranges and data validation
- ✅ Normalized actors table (separated from movies.stars)
- ✅ Composite indexes for performance optimization
- ✅ Unique constraint on payments.booking_id (1:1 relationship)
- ✅ Comprehensive trigger documentation and testing

The Happenin Ticket Booking System database is production-ready and can handle complex booking scenarios while maintaining data consistency, integrity, and performance.

### Database Validation:
To validate the database setup, run the validation queries provided in the README.md file. These verify:
- Table and constraint creation
- Trigger functionality
- Index creation
- Sample data integrity
- Foreign key relationships

---

**End of Document**

