-- ============================================
-- Happenin Ticket Booking System
-- SQL Queries for Various Use Cases
-- ============================================

USE happenin_db;

-- ============================================
-- USE CASE 1: Basic SELECT Queries
-- ============================================

-- UC1.1: Retrieve all active movies with their details
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

-- UC1.2: Get all upcoming live events in the next 30 days
SELECT 
    e.event_id,
    e.title,
    e.category,
    e.event_date,
    e.event_time,
    v.venue_name,
    v.city,
    e.base_price
FROM live_events e
JOIN venues v ON e.venue_id = v.venue_id
WHERE e.event_date >= CURDATE()
  AND e.event_date <= DATE_ADD(CURDATE(), INTERVAL 30 DAY)
  AND e.is_active = TRUE
ORDER BY e.event_date, e.event_time;

-- UC1.3: List all users from a specific city
SELECT 
    user_id,
    username,
    full_name,
    email,
    phone,
    city,
    created_at
FROM users
WHERE city = 'Mumbai'
ORDER BY created_at DESC;

-- ============================================
-- USE CASE 2: JOIN Operations
-- ============================================

-- UC2.1: INNER JOIN - Get movie showtimes with venue and movie details
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

-- UC2.2: LEFT JOIN - Get all bookings with payment status (including unpaid)
SELECT 
    b.booking_id,
    b.booking_type,
    CASE 
        WHEN b.booking_type = 'Movie' THEN m.title
        ELSE e.title
    END AS event_name,
    b.customer_name,
    b.customer_email,
    b.total_amount,
    b.booking_status,
    p.payment_status,
    p.transaction_id,
    p.payment_method
FROM bookings b
LEFT JOIN movies m ON b.movie_id = m.movie_id
LEFT JOIN live_events e ON b.event_id = e.event_id
LEFT JOIN payments p ON b.booking_id = p.booking_id
ORDER BY b.booking_date DESC;

-- UC2.3: Multiple JOINs - Get detailed booking information
SELECT 
    b.booking_id,
    u.username,
    u.full_name AS user_name,
    CASE 
        WHEN b.booking_type = 'Movie' THEN CONCAT(m.title, ' (', s.show_date, ' ', s.show_time, ')')
        ELSE CONCAT(e.title, ' (', e.event_date, ' ', e.event_time, ')')
    END AS booking_details,
    v.venue_name,
    v.city AS venue_city,
    b.total_tickets,
    b.subtotal,
    b.discount_amount,
    b.total_amount,
    p.payment_status,
    p.payment_method,
    c.coupon_code,
    b.booking_date
FROM bookings b
LEFT JOIN users u ON b.user_id = u.user_id
LEFT JOIN movies m ON b.movie_id = m.movie_id
LEFT JOIN live_events e ON b.event_id = e.event_id
LEFT JOIN showtimes s ON b.showtime_id = s.showtime_id
LEFT JOIN venues v ON COALESCE(s.venue_id, e.venue_id) = v.venue_id
LEFT JOIN payments p ON b.booking_id = p.booking_id
LEFT JOIN coupons c ON b.coupon_id = c.coupon_id
ORDER BY b.booking_date DESC;

-- ============================================
-- USE CASE 3: Aggregate Functions
-- ============================================

-- UC3.1: Calculate total revenue by payment status
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

-- UC3.2: Get booking statistics by booking type
SELECT 
    booking_type,
    COUNT(*) AS total_bookings,
    SUM(total_tickets) AS total_tickets_sold,
    SUM(total_amount) AS total_revenue,
    AVG(total_amount) AS average_booking_value,
    COUNT(DISTINCT user_id) AS unique_customers
FROM bookings
WHERE booking_status = 'Confirmed'
GROUP BY booking_type;

-- UC3.3: Find most popular movies by booking count
SELECT 
    m.title,
    m.genre,
    m.rating,
    COUNT(b.booking_id) AS booking_count,
    SUM(b.total_tickets) AS tickets_sold,
    SUM(b.total_amount) AS revenue_generated
FROM movies m
LEFT JOIN bookings b ON m.movie_id = b.movie_id AND b.booking_status = 'Confirmed'
GROUP BY m.movie_id, m.title, m.genre, m.rating
HAVING booking_count > 0
ORDER BY booking_count DESC, revenue_generated DESC;

-- UC3.4: Calculate average rating by movie genre
SELECT 
    genre,
    COUNT(DISTINCT movie_id) AS movie_count,
    AVG(rating) AS average_rating,
    MIN(rating) AS min_rating,
    MAX(rating) AS max_rating
FROM movies
WHERE rating IS NOT NULL
GROUP BY genre
ORDER BY average_rating DESC;

-- ============================================
-- USE CASE 4: Subqueries
-- ============================================

-- UC4.1: Find users who have made bookings above average booking value
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

-- UC4.2: Find movies with showtimes that have less than 50% seats available
SELECT 
    m.title,
    s.showtime_id,
    s.show_date,
    s.show_time,
    s.available_seats,
    s.total_seats,
    ROUND((s.available_seats / s.total_seats) * 100, 2) AS availability_percentage
FROM movies m
INNER JOIN showtimes s ON m.movie_id = s.movie_id
WHERE s.show_date >= CURDATE()
  AND (s.available_seats / s.total_seats) < 0.5
ORDER BY availability_percentage ASC;

-- UC4.3: Find venues that have hosted more events than the average
SELECT 
    v.venue_name,
    v.city,
    v.venue_type,
    COUNT(DISTINCT e.event_id) AS total_events,
    COUNT(DISTINCT s.showtime_id) AS total_showtimes
FROM venues v
LEFT JOIN live_events e ON v.venue_id = e.venue_id
LEFT JOIN showtimes s ON v.venue_id = s.venue_id
GROUP BY v.venue_id, v.venue_name, v.city, v.venue_type
HAVING COUNT(DISTINCT e.event_id) > (
    SELECT AVG(event_count)
    FROM (
        SELECT venue_id, COUNT(*) AS event_count
        FROM live_events
        GROUP BY venue_id
    ) AS venue_events
)
ORDER BY total_events DESC;

-- ============================================
-- USE CASE 5: HAVING Clause
-- ============================================

-- UC5.1: Find customers who have made more than 2 bookings
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

-- UC5.2: Find movies with average booking value above ₹500
SELECT 
    m.title,
    m.genre,
    COUNT(b.booking_id) AS booking_count,
    AVG(b.total_amount) AS avg_booking_value,
    SUM(b.total_amount) AS total_revenue
FROM movies m
INNER JOIN bookings b ON m.movie_id = b.movie_id
WHERE b.booking_status = 'Confirmed'
GROUP BY m.movie_id, m.title, m.genre
HAVING AVG(b.total_amount) > 500
ORDER BY avg_booking_value DESC;

-- UC5.3: Find coupons that have been used more than 10 times
SELECT 
    c.coupon_code,
    c.discount_type,
    c.discount_value,
    c.used_count,
    COUNT(b.booking_id) AS times_used,
    SUM(b.discount_amount) AS total_discount_given
FROM coupons c
LEFT JOIN bookings b ON c.coupon_id = b.coupon_id
WHERE b.booking_status = 'Confirmed'
GROUP BY c.coupon_id, c.coupon_code, c.discount_type, c.discount_value, c.used_count
HAVING COUNT(b.booking_id) > 10
ORDER BY times_used DESC;

-- ============================================
-- USE CASE 6: Date and Time Functions
-- ============================================

-- UC6.1: Get bookings made in the current month
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

-- UC6.2: Find events happening in the next 7 days
SELECT 
    e.event_id,
    e.title,
    e.category,
    e.event_date,
    e.event_time,
    v.venue_name,
    v.city,
    DATEDIFF(e.event_date, CURDATE()) AS days_until_event
FROM live_events e
JOIN venues v ON e.venue_id = v.venue_id
WHERE e.event_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)
  AND e.is_active = TRUE
ORDER BY e.event_date, e.event_time;

-- UC6.3: Calculate age of users and find users above 30
SELECT 
    user_id,
    username,
    full_name,
    date_of_birth,
    TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) AS age,
    city
FROM users
WHERE date_of_birth IS NOT NULL
  AND TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) > 30
ORDER BY age DESC;

-- ============================================
-- USE CASE 7: String Functions
-- ============================================

-- UC7.1: Search movies by title (case-insensitive partial match)
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

-- UC7.2: Extract and format customer information
SELECT 
    booking_id,
    customer_name,
    UPPER(LEFT(customer_name, 1)) AS first_initial,
    customer_email,
    SUBSTRING_INDEX(customer_email, '@', 1) AS email_username,
    SUBSTRING_INDEX(customer_email, '@', -1) AS email_domain,
    customer_phone,
    CONCAT('+91-', customer_phone) AS formatted_phone
FROM bookings
WHERE customer_phone IS NOT NULL;

-- ============================================
-- USE CASE 8: CASE Statements
-- ============================================

-- UC8.1: Categorize bookings by amount
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

-- UC8.2: Classify movies by rating
SELECT 
    movie_id,
    title,
    rating,
    CASE
        WHEN rating >= 8.0 THEN 'Excellent'
        WHEN rating >= 7.0 THEN 'Good'
        WHEN rating >= 6.0 THEN 'Average'
        WHEN rating >= 5.0 THEN 'Below Average'
        ELSE 'Poor'
    END AS rating_category,
    genre
FROM movies
WHERE rating IS NOT NULL
ORDER BY rating DESC;

-- UC8.3: Determine payment method popularity
SELECT 
    payment_method,
    COUNT(*) AS usage_count,
    SUM(amount) AS total_amount,
    CASE
        WHEN COUNT(*) >= 100 THEN 'Very Popular'
        WHEN COUNT(*) >= 50 THEN 'Popular'
        WHEN COUNT(*) >= 20 THEN 'Moderate'
        ELSE 'Less Used'
    END AS popularity_status
FROM payments
WHERE payment_status = 'Success'
GROUP BY payment_method
ORDER BY usage_count DESC;

-- ============================================
-- USE CASE 9: Window Functions (if MySQL 8.0+)
-- ============================================

-- UC9.1: Rank movies by revenue
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

-- UC9.2: Calculate running total of bookings by date
SELECT 
    DATE(booking_date) AS booking_day,
    COUNT(*) AS bookings_count,
    SUM(total_amount) AS daily_revenue,
    SUM(SUM(total_amount)) OVER (ORDER BY DATE(booking_date)) AS cumulative_revenue
FROM bookings
WHERE booking_status = 'Confirmed'
GROUP BY DATE(booking_date)
ORDER BY booking_day;

-- UC9.3: Find top 3 bookings per user
SELECT 
    user_id,
    booking_id,
    total_amount,
    booking_date,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY total_amount DESC) AS booking_rank
FROM bookings
WHERE booking_status = 'Confirmed'
HAVING booking_rank <= 3
ORDER BY user_id, booking_rank;

-- ============================================
-- USE CASE 10: UNION Operations
-- ============================================

-- UC10.1: Combine movie and event bookings in a unified view
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

-- ============================================
-- USE CASE 11: EXISTS and NOT EXISTS
-- ============================================

-- UC11.1: Find users who have made at least one booking
SELECT 
    u.user_id,
    u.username,
    u.full_name,
    u.email,
    u.city
FROM users u
WHERE EXISTS (
    SELECT 1
    FROM bookings b
    WHERE b.user_id = u.user_id
      AND b.booking_status = 'Confirmed'
)
ORDER BY u.username;

-- UC11.2: Find movies that have no bookings
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

-- UC11.3: Find coupons that have never been used
SELECT 
    c.coupon_id,
    c.coupon_code,
    c.discount_type,
    c.discount_value,
    c.valid_from,
    c.valid_until
FROM coupons c
WHERE NOT EXISTS (
    SELECT 1
    FROM bookings b
    WHERE b.coupon_id = c.coupon_id
)
AND c.is_active = TRUE
ORDER BY c.coupon_code;

-- ============================================
-- USE CASE 12: UPDATE Operations
-- ============================================

-- UC12.1: Update booking status to 'Completed' for past events
UPDATE bookings b
JOIN live_events e ON b.event_id = e.event_id
SET b.booking_status = 'Completed'
WHERE b.booking_type = 'Live Event'
  AND b.booking_status = 'Confirmed'
  AND e.event_date < CURDATE();

-- UC12.2: Update available seats after a booking
UPDATE showtimes s
JOIN bookings b ON s.showtime_id = b.showtime_id
SET s.available_seats = s.available_seats - b.total_tickets
WHERE b.booking_id = 1
  AND b.booking_status = 'Confirmed';

-- UC12.3: Increment coupon usage count
UPDATE coupons c
JOIN bookings b ON c.coupon_id = b.coupon_id
SET c.used_count = c.used_count + 1
WHERE b.booking_status = 'Confirmed'
  AND b.coupon_id IS NOT NULL;

-- ============================================
-- USE CASE 13: DELETE Operations
-- ============================================

-- UC13.1: Delete cancelled bookings older than 30 days
DELETE FROM bookings
WHERE booking_status = 'Cancelled'
  AND DATEDIFF(CURDATE(), DATE(booking_date)) > 30;

-- UC13.2: Delete expired coupons
DELETE FROM coupons
WHERE valid_until < CURDATE()
  AND is_active = FALSE;

-- ============================================
-- USE CASE 14: Stored Procedures
-- ============================================

-- UC14.1: Procedure to get booking summary for a user
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

-- UC14.2: Procedure to create a new booking with concurrency control
-- Uses SELECT FOR UPDATE to prevent overbooking
DELIMITER //
CREATE PROCEDURE CreateBooking(
    IN p_user_id INT,
    IN p_booking_type ENUM('Movie', 'Live Event'),
    IN p_movie_id INT,
    IN p_event_id INT,
    IN p_showtime_id INT,
    IN p_total_tickets INT,
    IN p_subtotal DECIMAL(10,2),
    IN p_total_amount DECIMAL(10,2),
    IN p_customer_name VARCHAR(100),
    IN p_customer_email VARCHAR(100),
    OUT p_booking_id INT,
    OUT p_result_message VARCHAR(255)
)
BEGIN
    DECLARE v_available_seats INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_result_message = CONCAT('Error: ', SQLERRM);
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- For movie bookings, check and lock seat availability
    IF p_booking_type = 'Movie' AND p_showtime_id IS NOT NULL THEN
        -- Lock the row for update to prevent concurrent modifications
        SELECT available_seats INTO v_available_seats
        FROM showtimes
        WHERE showtime_id = p_showtime_id
        FOR UPDATE;
        
        -- Check if enough seats are available
        IF v_available_seats < p_total_tickets THEN
            ROLLBACK;
            SET p_result_message = CONCAT('Insufficient seats available. Only ', v_available_seats, ' seats remaining.');
            SET p_booking_id = NULL;
        ELSE
            -- Insert the booking
            INSERT INTO bookings (
                user_id, booking_type, movie_id, event_id, showtime_id,
                total_tickets, subtotal, total_amount,
                customer_name, customer_email, booking_status
            ) VALUES (
                p_user_id, p_booking_type, p_movie_id, p_event_id, p_showtime_id,
                p_total_tickets, p_subtotal, p_total_amount,
                p_customer_name, p_customer_email, 'Pending'
            );
            
            SET p_booking_id = LAST_INSERT_ID();
            
            -- Update available seats immediately (trigger will handle on confirmation)
            UPDATE showtimes
            SET available_seats = available_seats - p_total_tickets
            WHERE showtime_id = p_showtime_id;
            
            SET p_result_message = 'Booking created successfully';
            COMMIT;
        END IF;
    ELSE
        -- For live events, just insert the booking
        INSERT INTO bookings (
            user_id, booking_type, movie_id, event_id, showtime_id,
            total_tickets, subtotal, total_amount,
            customer_name, customer_email, booking_status
        ) VALUES (
            p_user_id, p_booking_type, p_movie_id, p_event_id, p_showtime_id,
            p_total_tickets, p_subtotal, p_total_amount,
            p_customer_name, p_customer_email, 'Pending'
        );
        
        SET p_booking_id = LAST_INSERT_ID();
        SET p_result_message = 'Booking created successfully';
        COMMIT;
    END IF;
END //
DELIMITER ;

-- ============================================
-- USE CASE 15: Views
-- ============================================

-- UC15.1: Create view for active movie showtimes
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

-- UC15.2: Create view for booking details with all related information
CREATE OR REPLACE VIEW v_booking_details AS
SELECT 
    b.booking_id,
    u.username,
    u.full_name AS user_name,
    b.booking_type,
    CASE 
        WHEN b.booking_type = 'Movie' THEN m.title
        ELSE e.title
    END AS event_name,
    v.venue_name,
    v.city AS venue_city,
    b.total_tickets,
    b.subtotal,
    b.convenience_fees,
    b.discount_amount,
    c.coupon_code,
    b.total_amount,
    b.booking_status,
    p.payment_status,
    p.payment_method,
    p.transaction_id,
    b.booking_date
FROM bookings b
LEFT JOIN users u ON b.user_id = u.user_id
LEFT JOIN movies m ON b.movie_id = m.movie_id
LEFT JOIN live_events e ON b.event_id = e.event_id
LEFT JOIN showtimes s ON b.showtime_id = s.showtime_id
LEFT JOIN venues v ON COALESCE(s.venue_id, e.venue_id) = v.venue_id
LEFT JOIN payments p ON b.booking_id = p.booking_id
LEFT JOIN coupons c ON b.coupon_id = c.coupon_id;

-- UC15.3: Create view for revenue summary
CREATE OR REPLACE VIEW v_revenue_summary AS
SELECT 
    DATE(booking_date) AS booking_date,
    booking_type,
    COUNT(*) AS booking_count,
    SUM(total_tickets) AS tickets_sold,
    SUM(subtotal) AS subtotal_revenue,
    SUM(convenience_fees) AS fees_revenue,
    SUM(discount_amount) AS total_discounts,
    SUM(total_amount) AS total_revenue
FROM bookings
WHERE booking_status = 'Confirmed'
GROUP BY DATE(booking_date), booking_type
ORDER BY booking_date DESC;

-- ============================================
-- USE CASE 16: Triggers
-- ============================================
-- Note: Triggers are defined in schema.sql for data integrity
-- This section documents trigger functionality and usage

-- UC16.1: Trigger Documentation - Booking Type Validation
-- Trigger: trg_validate_booking_type (BEFORE INSERT)
-- Trigger: trg_validate_booking_type_update (BEFORE UPDATE)
-- Purpose: Ensures booking_type consistency
-- - Movie bookings must have movie_id and showtime_id set, event_id must be NULL
-- - Live Event bookings must have event_id set, movie_id and showtime_id must be NULL

-- UC16.2: Trigger Documentation - Seat Availability Update
-- Trigger: trg_update_seats_on_booking_confirm (AFTER UPDATE)
-- Purpose: Automatically updates available_seats when booking status changes
-- - Decrements seats when booking is confirmed
-- - Restores seats when booking is cancelled

-- UC16.3: Trigger Documentation - Booking Status Notification
-- Trigger: trg_log_booking_status_change (AFTER UPDATE)
-- Purpose: Creates notifications when booking status changes

-- UC16.4: Trigger Documentation - Coupon Validation
-- Trigger: trg_validate_coupon (BEFORE INSERT)
-- Purpose: Validates coupon before booking creation
-- Checks: active status, validity dates, usage limits, minimum purchase amount

-- Example: Test trigger by attempting invalid booking
-- This should fail due to booking type inconsistency:
-- INSERT INTO bookings (booking_type, movie_id, event_id, showtime_id, total_tickets, subtotal, total_amount, customer_name, customer_email)
-- VALUES ('Movie', NULL, 1, 1, 2, 500, 590, 'Test', 'test@example.com');

-- ============================================
-- USE CASE 17: Indexes and Performance
-- ============================================
-- Note: Composite indexes are already defined in schema.sql
-- This section documents index usage and performance optimization

-- UC17.1: Index Documentation
-- The following composite indexes are defined in schema.sql:
-- - idx_booking_user_status ON bookings(user_id, booking_status)
-- - idx_showtime_movie_date ON showtimes(movie_id, show_date) 
-- - idx_payment_status_date ON payments(payment_status, payment_date)
-- - idx_event_date_venue ON live_events(event_date, venue_id)

-- These indexes improve query performance for:
-- - Finding user bookings by status
-- - Searching showtimes by movie and date
-- - Filtering payments by status and date
-- - Finding events by date and venue

-- UC17.2: Analyze table to update statistics
ANALYZE TABLE bookings;
ANALYZE TABLE showtimes;
ANALYZE TABLE payments;

-- ============================================
-- USE CASE 18: Transactions
-- ============================================

-- UC18.1: Transaction to process booking and payment atomically
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

-- ============================================
-- USE CASE 19: Constraints and Data Integrity
-- ============================================

-- UC19.1: Add check constraint for booking amounts (if supported)
-- Note: MySQL doesn't support CHECK constraints in older versions
-- This is a conceptual example

-- UC19.2: Ensure referential integrity with foreign keys
-- (Already defined in schema, but showing verification)
SELECT 
    TABLE_NAME,
    CONSTRAINT_NAME,
    CONSTRAINT_TYPE
FROM information_schema.TABLE_CONSTRAINTS
WHERE TABLE_SCHEMA = 'happenin_db'
  AND CONSTRAINT_TYPE = 'FOREIGN KEY'
ORDER BY TABLE_NAME;

-- ============================================
-- USE CASE 20: Advanced Queries
-- ============================================

-- UC20.1: Find the best performing venue by revenue
SELECT 
    v.venue_id,
    v.venue_name,
    v.city,
    COUNT(DISTINCT b.booking_id) AS total_bookings,
    SUM(b.total_amount) AS total_revenue,
    AVG(b.total_amount) AS avg_booking_value
FROM venues v
LEFT JOIN showtimes s ON v.venue_id = s.venue_id
LEFT JOIN bookings b ON s.showtime_id = b.showtime_id AND b.booking_status = 'Confirmed'
LEFT JOIN live_events e ON v.venue_id = e.venue_id
LEFT JOIN bookings b2 ON e.event_id = b2.event_id AND b2.booking_status = 'Confirmed'
GROUP BY v.venue_id, v.venue_name, v.city
ORDER BY total_revenue DESC
LIMIT 1;

-- UC20.2: Calculate customer lifetime value
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

-- UC20.3: Find peak booking hours
SELECT 
    HOUR(booking_date) AS booking_hour,
    COUNT(*) AS booking_count,
    SUM(total_amount) AS revenue,
    AVG(total_amount) AS avg_booking_value
FROM bookings
WHERE booking_status = 'Confirmed'
GROUP BY HOUR(booking_date)
ORDER BY booking_count DESC;

