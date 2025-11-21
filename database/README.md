# Happenin Database - SQL Implementation

This directory contains the complete SQL database implementation for the Happenin Ticket Booking System.

## Files Overview

1. **schema.sql** - Complete database schema with all table definitions, constraints, and indexes
2. **sample_data.sql** - Sample data for testing and demonstration
3. **queries.sql** - Comprehensive SQL queries covering 20 use cases
4. **DATABASE_DOCUMENTATION.md** - Complete documentation report

## Setup Instructions

### Prerequisites
- MySQL 5.7+ or MariaDB 10.2+ (MySQL 8.0+ recommended for CHECK constraint support)
- MySQL command-line client or MySQL Workbench

### Step 1: Create Database and Schema
```bash
mysql -u root -p < schema.sql
```
**Expected Output:** Database `happenin_db` created with all tables, constraints, indexes, and triggers.

### Step 2: Insert Sample Data
```bash
mysql -u root -p happenin_db < sample_data.sql
```
**Expected Output:** Sample data inserted into all tables.

### Step 3: (Optional) Normalize Actors
```bash
mysql -u root -p happenin_db < migrate_actors.sql
```
**Expected Output:** Actors extracted from movies.stars and normalized into actors and movie_actors tables.

### Step 4: Run Queries
```bash
mysql -u root -p happenin_db < queries.sql
```
**Expected Output:** Views, stored procedures, and example queries executed.

### Setup Checklist
After running the setup, verify success:

```sql
-- Check table count (should be 15 tables)
SELECT COUNT(*) AS table_count 
FROM information_schema.tables 
WHERE table_schema = 'happenin_db';

-- Check foreign key constraints
SELECT COUNT(*) AS fk_count
FROM information_schema.TABLE_CONSTRAINTS
WHERE TABLE_SCHEMA = 'happenin_db' 
  AND CONSTRAINT_TYPE = 'FOREIGN KEY';

-- Check triggers
SHOW TRIGGERS FROM happenin_db;

-- Check sample data
SELECT 'Users' AS table_name, COUNT(*) AS row_count FROM users
UNION ALL SELECT 'Movies', COUNT(*) FROM movies
UNION ALL SELECT 'Bookings', COUNT(*) FROM bookings
UNION ALL SELECT 'Payments', COUNT(*) FROM payments;
```

### Using MySQL Workbench
1. Open MySQL Workbench
2. Connect to your MySQL server
3. Open and execute each SQL file in order:
   - schema.sql
   - sample_data.sql
   - migrate_actors.sql (optional)
   - queries.sql

## Database Structure

### Main Tables
- **users** - User accounts
- **venues** - Theaters, stadiums, event locations
- **movies** - Movie catalog
- **live_events** - Concerts, comedy shows, etc.
- **showtimes** - Movie screening schedules
- **seats** - Individual seat information
- **bookings** - Customer bookings
- **payments** - Payment transactions
- **coupons** - Discount codes
- **reviews** - User reviews and ratings
- **notifications** - System notifications
- **admin_users** - Administrative accounts

### Relationships
- Users → Bookings (One-to-Many)
- Movies → Showtimes (One-to-Many)
- Venues → Showtimes (One-to-Many)
- Venues → Live Events (One-to-Many)
- Bookings → Payments (One-to-One)
- Bookings → Booking_Seats (One-to-Many)
- And more...

## Use Cases Covered

The queries.sql file includes 20 comprehensive use cases:

1. Basic SELECT Queries
2. JOIN Operations (INNER, LEFT, RIGHT)
3. Aggregate Functions (COUNT, SUM, AVG, MIN, MAX)
4. Subqueries (Correlated and Non-correlated)
5. HAVING Clause
6. Date and Time Functions
7. String Functions
8. CASE Statements
9. Window Functions (RANK, DENSE_RANK, ROW_NUMBER)
10. UNION Operations
11. EXISTS and NOT EXISTS
12. UPDATE Operations
13. DELETE Operations
14. Stored Procedures
15. Views
16. Triggers
17. Indexes and Performance
18. Transactions
19. Constraints and Data Integrity
20. Advanced Queries (CLV, Peak Hours, etc.)

## Testing Queries

### Test Basic Queries
```sql
-- Get all active movies
SELECT * FROM movies WHERE is_active = TRUE;

-- Get upcoming showtimes
SELECT * FROM showtimes WHERE show_date >= CURDATE();

-- Get user bookings
SELECT * FROM bookings WHERE user_id = 1;
```

### Test Stored Procedures
```sql
-- Get user booking summary
CALL GetUserBookingSummary(1);
```

### Test Views
```sql
-- Query active showtimes view
SELECT * FROM v_active_movie_showtimes;

-- Query booking details view
SELECT * FROM v_booking_details WHERE booking_status = 'Confirmed';

-- Query revenue summary view
SELECT * FROM v_revenue_summary ORDER BY booking_date DESC;
```

## Database Statistics

After loading sample data:
- **Users**: 6 sample users
- **Venues**: 9 venues (cinemas, stadiums, clubs)
- **Movies**: 7 movies
- **Live Events**: 7 events
- **Showtimes**: 30+ showtimes
- **Seats**: 200+ seats
- **Bookings**: 5 sample bookings
- **Payments**: 5 payment records
- **Coupons**: 5 active coupons

## Notes

- All timestamps use MySQL's TIMESTAMP type with automatic defaults
- Foreign keys use appropriate ON DELETE actions (CASCADE, RESTRICT, SET NULL)
- Indexes are created on frequently queried columns
- Triggers maintain data consistency (seat availability, notifications)
- Views simplify common queries
- Stored procedures encapsulate business logic

## Validation and Testing

### How to Validate Database Integrity

Run these commands to verify database setup:

```sql
USE happenin_db;

-- 1. Check all tables exist (should return 15)
SHOW TABLES;

-- 2. Verify foreign key constraints
SELECT 
    TABLE_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME
FROM information_schema.TABLE_CONSTRAINTS
WHERE TABLE_SCHEMA = 'happenin_db'
  AND CONSTRAINT_TYPE = 'FOREIGN KEY'
ORDER BY TABLE_NAME;

-- 3. Check triggers are created
SHOW TRIGGERS;

-- 4. Verify indexes
SHOW INDEX FROM bookings;
SHOW INDEX FROM showtimes;
SHOW INDEX FROM payments;

-- 5. Test booking type validation trigger
-- This should FAIL (invalid: Movie booking with event_id set)
INSERT INTO bookings (
    booking_type, movie_id, event_id, showtime_id,
    total_tickets, subtotal, total_amount,
    customer_name, customer_email
) VALUES (
    'Movie', 1, 1, 1, 2, 500, 590, 'Test', 'test@example.com'
);

-- 6. Test data counts
SELECT 
    'Users' AS table_name, COUNT(*) AS count FROM users
UNION ALL SELECT 'Movies', COUNT(*) FROM movies
UNION ALL SELECT 'Live Events', COUNT(*) FROM live_events
UNION ALL SELECT 'Showtimes', COUNT(*) FROM showtimes
UNION ALL SELECT 'Bookings', COUNT(*) FROM bookings
UNION ALL SELECT 'Payments', COUNT(*) FROM payments
UNION ALL SELECT 'Coupons', COUNT(*) FROM coupons;

-- 7. Verify CHECK constraints (MySQL 8.0+)
SELECT 
    TABLE_NAME,
    CONSTRAINT_NAME,
    CHECK_CLAUSE
FROM information_schema.CHECK_CONSTRAINTS
WHERE CONSTRAINT_SCHEMA = 'happenin_db';
```

## Troubleshooting

### Error: "Table already exists"
Drop the database and recreate:
```sql
DROP DATABASE IF EXISTS happenin_db;
```
Then run setup again.

### Error: "Foreign key constraint fails"
- Ensure you run schema.sql before sample_data.sql
- Check that parent records exist before inserting child records
- Verify foreign key order in sample_data.sql

### Error: "Unknown column"
Check that all tables were created successfully:
```sql
SHOW TABLES;
DESCRIBE table_name;
```

### Error: "Trigger already exists"
Triggers are defined in schema.sql. If you see this error, the triggers are already created. You can drop and recreate:
```sql
DROP TRIGGER IF EXISTS trg_validate_booking_type;
-- Then re-run schema.sql
```

### CHECK Constraints Not Enforced
- MySQL 8.0.16+ enforces CHECK constraints
- Older versions may ignore them (still include for documentation)
- Use triggers as fallback for older MySQL versions

## Documentation

For complete documentation, see **DATABASE_DOCUMENTATION.md** which includes:
- E-R Diagram
- Normalization explanation
- Complete schema documentation
- All 20 use cases with problem statements and queries

