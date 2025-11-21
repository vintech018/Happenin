# DBMS Viva - Quick Reference Cheat Sheet

## 🎯 Project Overview
- **Database Name**: `happenin_db`
- **Purpose**: Ticket booking system for movies and live events
- **DBMS**: MySQL
- **Normalization**: 3NF (Third Normal Form)
- **Total Tables**: 15

---

## 📊 Key Tables & Relationships

### Core Tables
- `users` - User accounts
- `venues` - Theaters/stadiums
- `movies` - Movie catalog
- `live_events` - Concerts/comedy shows
- `showtimes` - Movie screening schedules
- `bookings` - Customer bookings
- `payments` - Payment transactions
- `seats` - Individual seats
- `coupons` - Discount codes

### Key Relationships
```
Users (1) ──< (N) Bookings (1) ── (1) Payments
Movies (1) ──< (N) Showtimes (N) ── (1) Venues
Bookings (N) ── (N) Seats (via booking_seats)
Movies (N) ── (N) Actors (via movie_actors)
```

---

## 🔑 Important Concepts

### Normalization
- **1NF**: Atomic values, no multi-valued attributes
- **2NF**: 1NF + full functional dependency on PK
- **3NF**: 2NF + no transitive dependencies
- **Our Project**: 3NF - venues in separate table, referenced by FK

### ACID Properties
- **Atomicity**: All or nothing
- **Consistency**: Database remains consistent
- **Isolation**: Concurrent transactions don't interfere
- **Durability**: Committed changes permanent

### JOIN Types
- **INNER JOIN**: Matching records only
- **LEFT JOIN**: All left + matching right
- **RIGHT JOIN**: All right + matching left
- **FULL OUTER JOIN**: All from both (MySQL doesn't support directly)

---

## 💾 SQL Quick Reference

### DDL (Data Definition Language)
```sql
CREATE TABLE, ALTER TABLE, DROP TABLE
CREATE DATABASE, DROP DATABASE
CREATE INDEX, DROP INDEX
```

### DML (Data Manipulation Language)
```sql
SELECT, INSERT, UPDATE, DELETE
```

### DCL (Data Control Language)
```sql
GRANT privileges ON database.table TO 'user'@'host';
REVOKE privileges ON database.table FROM 'user'@'host';
```

---

## 🎯 Project-Specific Features

### Triggers (5)
1. `trg_validate_booking_type` - Validates booking type consistency
2. `trg_validate_booking_type_update` - Same for UPDATE
3. `trg_update_seats_on_booking_confirm` - Updates seat availability
4. `trg_log_booking_status_change` - Creates notifications
5. `trg_validate_coupon` - Validates coupon before booking

### Stored Procedures (2)
1. `GetUserBookingSummary(IN user_id)` - User booking stats
2. `CreateBooking(...)` - Creates booking with concurrency control

### Views (3)
1. `v_active_movie_showtimes` - Active showtimes with availability
2. `v_booking_details` - Complete booking information
3. `v_revenue_summary` - Daily revenue breakdown

### Indexes
- Single-column: On foreign keys and frequently queried columns
- Composite: 
  - `idx_booking_user_status` (user_id, booking_status)
  - `idx_showtime_movie_date` (movie_id, show_date)
  - `idx_payment_status_date` (payment_status, payment_date)

---

## 🔒 Constraints in Our Project

### Primary Keys
- All tables have auto-incrementing PKs
- Examples: `user_id`, `booking_id`, `movie_id`

### Foreign Keys
- `bookings.user_id` → `users.user_id`
- `bookings.movie_id` → `movies.movie_id`
- `showtimes.venue_id` → `venues.venue_id`
- ON DELETE: CASCADE, RESTRICT, SET NULL

### Unique Constraints
- `users.email`, `users.username`
- `payments.transaction_id`
- `coupons.coupon_code`
- `payments.booking_id` (enforces 1:1 relationship)

### CHECK Constraints
- `movies.rating`: 0-10
- `reviews.rating`: 1-5
- All prices: >= 0
- `showtimes.total_seats`: > 0

---

## 🔄 Concurrency Control

### Method Used
```sql
SELECT available_seats FROM showtimes
WHERE showtime_id = p_showtime_id
FOR UPDATE;  -- Locks row until transaction completes
```

### Purpose
- Prevents overbooking
- Ensures data consistency
- Handles concurrent bookings

---

## 🛡️ Security Features

1. **Password Hashing**: Stored as `password_hash`, not plain text
2. **Foreign Key Constraints**: Referential integrity
3. **CHECK Constraints**: Data validation
4. **Triggers**: Business rule enforcement
5. **Prepared Statements**: Prevent SQL injection (in application code)

---

## 📝 Common SQL Patterns

### Subquery with IN
```sql
SELECT * FROM movies
WHERE movie_id IN (
    SELECT movie_id FROM bookings WHERE total_amount > 1000
);
```

### Subquery with EXISTS
```sql
SELECT * FROM movies m
WHERE EXISTS (
    SELECT 1 FROM bookings b
    WHERE b.movie_id = m.movie_id
);
```

### Aggregate with HAVING
```sql
SELECT user_id, COUNT(*) AS booking_count
FROM bookings
GROUP BY user_id
HAVING COUNT(*) > 2;
```

### Window Function (RANK)
```sql
SELECT title, revenue,
    RANK() OVER (ORDER BY revenue DESC) AS rank
FROM movies;
```

---

## 🎓 Key Points to Remember

### ER to Relational Model
- Entities → Tables
- Attributes → Columns
- Relationships → Foreign Keys
- 1:1 → FK in either table
- 1:N → FK in "many" side
- N:M → Junction table

### Functional Dependencies
- `user_id` → `username`, `email`
- `booking_id` → `total_amount`, `booking_status`
- Helps in normalization

### Transaction Example
```sql
START TRANSACTION;
INSERT INTO bookings (...);
UPDATE showtimes SET available_seats = ...;
INSERT INTO payments (...);
COMMIT;  -- or ROLLBACK
```

---

## ❓ Expected Questions & One-Line Answers

**Q: What is normalization?**
A: Organizing data to reduce redundancy and improve integrity (1NF, 2NF, 3NF).

**Q: Why 3NF?**
A: Eliminates transitive dependencies, reduces redundancy, ensures data integrity.

**Q: What is a trigger?**
A: Automatic procedure executed when specific events occur (INSERT/UPDATE/DELETE).

**Q: What is a view?**
A: Virtual table based on SELECT query, doesn't store data.

**Q: What is a stored procedure?**
A: Precompiled SQL code stored in database, executed with CALL.

**Q: What is a transaction?**
A: Sequence of operations executed as single unit (ACID properties).

**Q: What is concurrency control?**
A: Managing simultaneous database access to prevent conflicts.

**Q: What is SQL injection?**
A: Attack where malicious SQL code is inserted into queries.

**Q: How do you prevent overbooking?**
A: Use SELECT FOR UPDATE to lock rows, check availability in transaction.

**Q: What is referential integrity?**
A: Foreign keys must reference existing primary keys.

---

## 🚀 Last-Minute Tips

1. ✅ Know your table names and relationships
2. ✅ Remember your trigger names and purposes
3. ✅ Understand your normalization approach
4. ✅ Be ready to explain concurrency control
5. ✅ Know your views and stored procedures
6. ✅ Understand ACID properties
7. ✅ Be confident about your implementation choices

---

**You've got this! 💪**

