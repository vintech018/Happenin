# Quick Reference Guide - Happenin Database

## Database: `happenin_db`

## Common Queries

### Get All Active Movies
```sql
SELECT * FROM movies WHERE is_active = TRUE;
```

### Get Upcoming Showtimes
```sql
SELECT * FROM showtimes WHERE show_date >= CURDATE();
```

### Get User Bookings
```sql
SELECT * FROM bookings WHERE user_id = 1;
```

### Get Revenue Summary
```sql
SELECT * FROM v_revenue_summary;
```

### Get Booking Details
```sql
SELECT * FROM v_booking_details WHERE booking_status = 'Confirmed';
```

## Stored Procedures

### Get User Booking Summary
```sql
CALL GetUserBookingSummary(1);
```

### Create New Booking
```sql
CALL CreateBooking(
    1,                          -- user_id
    'Movie',                    -- booking_type
    1,                          -- movie_id
    NULL,                       -- event_id
    1,                          -- showtime_id
    2,                          -- total_tickets
    500.00,                     -- subtotal
    590.00,                     -- total_amount
    'John Doe',                 -- customer_name
    'john@example.com',         -- customer_email
    @booking_id                 -- output parameter
);
SELECT @booking_id;
```

## Views

1. **v_active_movie_showtimes** - Active movie showtimes with availability
2. **v_booking_details** - Complete booking information with joins
3. **v_revenue_summary** - Daily revenue breakdown by booking type

## Triggers

1. **trg_update_seats_on_booking** - Updates seat availability on booking confirmation
2. **trg_log_booking_status_change** - Creates notification on status change
3. **trg_validate_coupon** - Validates coupon before booking creation

## Table Relationships Quick Reference

```
USERS (1) ──< (N) BOOKINGS (1) ── (1) PAYMENTS
                │
                ├── (N) BOOKING_SEATS (N) ── (1) SEATS
                │
                ├── (N) MOVIES (1) ──< (N) SHOWTIMES
                │
                └── (N) LIVE_EVENTS

VENUES (1) ──< (N) SHOWTIMES
    │
    ├──< (N) LIVE_EVENTS
    │
    └──< (N) SEATS

COUPONS (1) ──< (N) BOOKINGS

USERS (1) ──< (N) REVIEWS >── (N) MOVIES
                          └── (N) LIVE_EVENTS
```

## Sample Data Counts

After running sample_data.sql:
- Users: 6
- Venues: 9
- Movies: 7
- Live Events: 7
- Showtimes: 30+
- Seats: 200+
- Bookings: 5
- Payments: 5
- Coupons: 5

## Useful MySQL Commands

### Connect to Database
```bash
mysql -u root -p happenin_db
```

### Show All Tables
```sql
SHOW TABLES;
```

### Describe Table Structure
```sql
DESCRIBE bookings;
```

### Show Table Constraints
```sql
SELECT * FROM information_schema.TABLE_CONSTRAINTS 
WHERE TABLE_SCHEMA = 'happenin_db' AND TABLE_NAME = 'bookings';
```

### Show Indexes
```sql
SHOW INDEXES FROM bookings;
```

### Export Database
```bash
mysqldump -u root -p happenin_db > happenin_backup.sql
```

### Import Database
```bash
mysql -u root -p happenin_db < happenin_backup.sql
```

## Common Issues and Solutions

### Issue: Foreign Key Constraint Fails
**Solution:** Ensure parent records exist before inserting child records

### Issue: Duplicate Entry Error
**Solution:** Check UNIQUE constraints (email, username, transaction_id)

### Issue: Trigger Not Firing
**Solution:** Verify trigger exists: `SHOW TRIGGERS;`

### Issue: View Returns No Data
**Solution:** Check underlying tables have data and view conditions are met

## Performance Tips

1. Use indexes on frequently queried columns
2. Use EXPLAIN to analyze query performance
3. Use views for complex queries
4. Use stored procedures for repeated operations
5. Use transactions for multiple related operations

## Security Notes

- Never store plain text passwords (use password_hash)
- Use prepared statements in application code
- Limit database user permissions
- Regularly backup the database
- Monitor for SQL injection vulnerabilities



