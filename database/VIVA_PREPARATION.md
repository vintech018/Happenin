# DBMS Viva Preparation Guide - Happenin Ticket Booking System

## Table of Contents
1. [Database Fundamentals](#1-database-fundamentals)
2. [ER Diagram & Data Modeling](#2-er-diagram--data-modeling)
3. [Normalization](#3-normalization)
4. [DDL Statements](#4-ddl-statements)
5. [DML Statements](#5-dml-statements)
6. [DCL Statements](#6-dcl-statements)
7. [JOIN Queries](#7-join-queries)
8. [Subqueries](#8-subqueries)
9. [Views](#9-views)
10. [Stored Procedures](#10-stored-procedures)
11. [Triggers](#11-triggers)
12. [Transactions & Concurrency](#12-transactions--concurrency)
13. [Database Security](#13-database-security)
14. [Advanced Topics](#14-advanced-topics)
15. [Project-Specific Questions](#15-project-specific-questions)

---

## 1. Database Fundamentals

### Q1: What is a Database?
**Answer:** A database is an organized collection of structured data stored electronically in a computer system. In our project, `happenin_db` stores information about users, movies, events, bookings, payments, etc.

### Q2: What is DBMS?
**Answer:** Database Management System (DBMS) is software that manages databases. It provides:
- Data storage and retrieval
- Data security and integrity
- Concurrent access control
- Backup and recovery

**In our project:** We use MySQL as our DBMS to manage the Happenin ticket booking system.

### Q3: Explain DBMS Architecture
**Answer:** DBMS has three levels:
1. **External/View Level**: What users see (views, reports)
2. **Conceptual/Logical Level**: Database structure (tables, relationships)
3. **Internal/Physical Level**: How data is stored (files, indexes)

**In our project:**
- External: Views like `v_booking_details`, `v_revenue_summary`
- Conceptual: Tables like `users`, `bookings`, `movies`
- Internal: Indexes, storage files managed by MySQL

### Q4: What is Data Independence?
**Answer:** Ability to modify schema at one level without affecting other levels:
- **Physical Independence**: Change storage without changing logical structure
- **Logical Independence**: Change logical structure without affecting views

**Example in our project:** We can add indexes or change storage engine without modifying table structure or views.

### Q5: What are Integrity Constraints?
**Answer:** Rules that ensure data accuracy and consistency:
- **Domain Constraints**: Valid data types (e.g., rating 0-10)
- **Entity Integrity**: Primary keys cannot be NULL
- **Referential Integrity**: Foreign keys must reference existing records
- **User-defined Constraints**: Business rules (e.g., CHECK constraints)

**In our project:**
```sql
-- Domain constraint
rating DECIMAL(3,1) CHECK (rating >= 0 AND rating <= 10)

-- Referential integrity
FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL

-- Entity integrity
PRIMARY KEY (booking_id)
```

---

## 2. ER Diagram & Data Modeling

### Q6: Explain ER Diagram Components
**Answer:**
- **Entities**: Real-world objects (Users, Movies, Bookings)
- **Attributes**: Properties of entities (user_id, username, email)
- **Relationships**: Associations between entities (Users makes Bookings)

**In our project:**
- **Entities**: users, movies, live_events, venues, bookings, payments, seats, coupons
- **Key Relationships**:
  - Users → Bookings (1:N)
  - Bookings → Payments (1:1)
  - Movies → Showtimes (1:N)
  - Venues → Showtimes (1:N)

### Q7: What are the types of Relationships?
**Answer:**
1. **One-to-One (1:1)**: One record in A relates to one in B
   - **Example**: Bookings → Payments (one booking has one payment)
2. **One-to-Many (1:N)**: One record in A relates to many in B
   - **Example**: Users → Bookings (one user has many bookings)
3. **Many-to-Many (N:M)**: Many in A relate to many in B
   - **Example**: Movies ↔ Actors (via movie_actors junction table)

**In our project:**
- **1:1**: `bookings.booking_id` → `payments.booking_id` (UNIQUE constraint)
- **1:N**: `users.user_id` → `bookings.user_id`
- **N:M**: `movies` ↔ `actors` via `movie_actors` table

### Q8: How did you convert ER to Relational Model?
**Answer:**
1. **Entities → Tables**: Each entity becomes a table
2. **Attributes → Columns**: Entity attributes become table columns
3. **Relationships → Foreign Keys**:
   - 1:1: Foreign key in either table (we put it in payments)
   - 1:N: Foreign key in the "many" side (user_id in bookings)
   - N:M: Junction table (movie_actors)

**Example from our project:**
```
ER: Users (1) ──< (N) Bookings
Relational: 
  - users table with user_id (PK)
  - bookings table with user_id (FK → users.user_id)
```

### Q9: What are Referential Integrity Constraints?
**Answer:** Rules ensuring foreign key values reference existing primary keys.

**In our project:**
```sql
FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE
FOREIGN KEY (venue_id) REFERENCES venues(venue_id) ON DELETE RESTRICT
```

**ON DELETE actions:**
- **CASCADE**: Delete child records when parent is deleted
- **RESTRICT**: Prevent deletion if child records exist
- **SET NULL**: Set foreign key to NULL when parent is deleted

---

## 3. Normalization

### Q10: What is Normalization?
**Answer:** Process of organizing data to reduce redundancy and improve integrity.

### Q11: Explain 1NF, 2NF, 3NF
**Answer:**

**1NF (First Normal Form):**
- All attributes have atomic values (no multi-valued attributes)
- Each row is unique
- **In our project**: All columns contain single values (e.g., `title`, `director` are separate columns)

**2NF (Second Normal Form):**
- Must be in 1NF
- All non-key attributes fully depend on primary key
- **In our project**: In `bookings` table, all attributes depend on `booking_id` (PK)

**3NF (Third Normal Form):**
- Must be in 2NF
- No transitive dependencies (non-key attributes don't depend on other non-key attributes)
- **In our project**: Venue details are in separate `venues` table, not duplicated in `bookings`

**Example from our project:**
```sql
-- Before normalization (denormalized):
bookings: booking_id, customer_name, venue_name, venue_address, movie_title

-- After 3NF:
bookings: booking_id, user_id (FK), movie_id (FK), venue_id (FK)
venues: venue_id, venue_name, address
movies: movie_id, title
```

### Q12: Why did you normalize actors?
**Answer:** Originally, `movies.stars` stored comma-separated actor names (violates 1NF). We normalized it:
- Created `actors` table (actor_id, actor_name)
- Created `movie_actors` junction table (movie_id, actor_id)
- Benefits: Easy to query actors, update actor info, avoid duplication

---

## 4. DDL Statements

### Q13: What are DDL statements?
**Answer:** Data Definition Language - used to define database structure.

**CREATE:**
```sql
CREATE TABLE bookings (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

**ALTER:**
```sql
ALTER TABLE bookings ADD COLUMN notes TEXT;
ALTER TABLE bookings MODIFY COLUMN total_amount DECIMAL(12,2);
```

**DROP:**
```sql
DROP TABLE IF EXISTS old_table;
DROP DATABASE IF EXISTS old_db;
```

**In our project:** All tables created in `schema.sql` using CREATE statements.

---

## 5. DML Statements

### Q14: What are DML statements?
**Answer:** Data Manipulation Language - used to manipulate data.

**INSERT:**
```sql
INSERT INTO users (username, email, password_hash, full_name)
VALUES ('john_doe', 'john@example.com', 'hash123', 'John Doe');
```

**UPDATE:**
```sql
UPDATE bookings 
SET booking_status = 'Confirmed' 
WHERE booking_id = 1;
```

**DELETE:**
```sql
DELETE FROM bookings 
WHERE booking_status = 'Cancelled' 
AND DATEDIFF(CURDATE(), DATE(booking_date)) > 30;
```

**SELECT (Simple):**
```sql
SELECT * FROM movies WHERE is_active = TRUE;
```

**SELECT (Compound WHERE):**
```sql
SELECT * FROM bookings 
WHERE booking_status = 'Confirmed' 
  AND booking_type = 'Movie'
  AND total_amount > 500;
```

---

## 6. DCL Statements

### Q15: What are DCL statements?
**Answer:** Data Control Language - used to control access.

**GRANT:**
```sql
GRANT SELECT, INSERT, UPDATE ON happenin_db.bookings TO 'app_user'@'localhost';
GRANT ALL PRIVILEGES ON happenin_db.* TO 'admin_user'@'localhost';
```

**REVOKE:**
```sql
REVOKE DELETE ON happenin_db.bookings FROM 'app_user'@'localhost';
```

**In our project:** We would use GRANT/REVOKE to:
- Give application read/write access to bookings
- Restrict admin access to sensitive tables
- Create read-only users for reporting

---

## 7. JOIN Queries

### Q16: Explain different types of JOINs
**Answer:**

**INNER JOIN:** Returns matching records from both tables
```sql
SELECT s.showtime_id, m.title, v.venue_name
FROM showtimes s
INNER JOIN movies m ON s.movie_id = m.movie_id
INNER JOIN venues v ON s.venue_id = v.venue_id;
```

**LEFT JOIN:** Returns all records from left table + matching from right
```sql
SELECT b.booking_id, p.payment_status
FROM bookings b
LEFT JOIN payments p ON b.booking_id = p.booking_id;
-- Shows bookings even without payments
```

**RIGHT JOIN:** Returns all records from right table + matching from left
```sql
SELECT v.venue_name, s.showtime_id
FROM showtimes s
RIGHT JOIN venues v ON s.venue_id = v.venue_id;
-- Shows all venues even without showtimes
```

**In our project:** We use INNER JOIN for showtimes with movies/venues, LEFT JOIN for bookings with payments.

---

## 8. Subqueries

### Q17: What are Subqueries?
**Answer:** Query nested inside another query.

**Simple Subquery:**
```sql
SELECT * FROM users
WHERE user_id IN (
    SELECT user_id FROM bookings 
    WHERE booking_status = 'Confirmed'
);
```

**Correlated Subquery:**
```sql
SELECT m.title
FROM movies m
WHERE EXISTS (
    SELECT 1 FROM bookings b
    WHERE b.movie_id = m.movie_id
    AND b.booking_status = 'Confirmed'
);
```

**Using IN:**
```sql
SELECT * FROM movies
WHERE movie_id IN (
    SELECT movie_id FROM bookings 
    WHERE total_amount > 1000
);
```

**Using EXISTS:**
```sql
SELECT * FROM movies m
WHERE EXISTS (
    SELECT 1 FROM bookings b
    WHERE b.movie_id = m.movie_id
);
```

**Using NOT EXISTS:**
```sql
SELECT * FROM movies m
WHERE NOT EXISTS (
    SELECT 1 FROM bookings b
    WHERE b.movie_id = m.movie_id
    AND b.booking_status = 'Confirmed'
);
```

**In our project:** We use subqueries to find high-value customers, movies without bookings, etc.

---

## 9. Views

### Q18: What are Views?
**Answer:** Virtual tables based on SELECT queries. They don't store data but provide a simplified interface.

**Advantages:**
- Simplify complex queries
- Security (hide sensitive columns)
- Consistency (same query logic)
- Abstraction (change underlying structure without affecting users)

**In our project:**
```sql
CREATE VIEW v_booking_details AS
SELECT 
    b.booking_id,
    u.username,
    m.title AS movie_title,
    v.venue_name,
    b.total_amount,
    p.payment_status
FROM bookings b
LEFT JOIN users u ON b.user_id = u.user_id
LEFT JOIN movies m ON b.movie_id = m.movie_id
LEFT JOIN venues v ON ...
LEFT JOIN payments p ON b.booking_id = p.booking_id;
```

**Our views:**
1. `v_active_movie_showtimes` - Active showtimes with availability
2. `v_booking_details` - Complete booking information
3. `v_revenue_summary` - Daily revenue breakdown

---

## 10. Stored Procedures

### Q19: What are Stored Procedures?
**Answer:** Precompiled SQL code stored in database, executed with CALL statement.

**Advantages:**
- Performance (precompiled)
- Reusability
- Security (hide implementation)
- Reduced network traffic

**Parts of Procedure:**
1. **Declaration**: Variables, cursors
2. **Body**: SQL statements, control structures
3. **Parameters**: IN, OUT, INOUT

**Parameter Modes:**
- **IN**: Input parameter (default)
- **OUT**: Output parameter
- **INOUT**: Both input and output

**In our project:**
```sql
CREATE PROCEDURE GetUserBookingSummary(IN user_id_param INT)
BEGIN
    SELECT 
        u.username,
        COUNT(b.booking_id) AS total_bookings,
        SUM(b.total_amount) AS total_spent
    FROM users u
    LEFT JOIN bookings b ON u.user_id = b.user_id
    WHERE u.user_id = user_id_param
    GROUP BY u.user_id;
END;
```

**Usage:**
```sql
CALL GetUserBookingSummary(1);
```

**CreateBooking Procedure:**
- Uses `SELECT FOR UPDATE` for concurrency control
- Prevents overbooking
- Returns booking_id and result message

---

## 11. Triggers

### Q20: What are Triggers?
**Answer:** Automatic procedures executed when specific events occur.

**Syntax:**
```sql
CREATE TRIGGER trigger_name
BEFORE/AFTER INSERT/UPDATE/DELETE
ON table_name
FOR EACH ROW
BEGIN
    -- trigger body
END;
```

**Types:**
- **BEFORE**: Executes before the event
- **AFTER**: Executes after the event
- **INSERT/UPDATE/DELETE**: Event type

**In our project:**

1. **trg_validate_booking_type** (BEFORE INSERT):
   - Validates booking type consistency
   - Movie bookings must have movie_id and showtime_id
   - Live Event bookings must have event_id

2. **trg_update_seats_on_booking_confirm** (AFTER UPDATE):
   - Updates available_seats when booking confirmed
   - Restores seats when booking cancelled

3. **trg_log_booking_status_change** (AFTER UPDATE):
   - Creates notifications on status changes

4. **trg_validate_coupon** (BEFORE INSERT):
   - Validates coupon before booking
   - Checks active status, validity dates, usage limits

**Example:**
```sql
CREATE TRIGGER trg_validate_booking_type
BEFORE INSERT ON bookings
FOR EACH ROW
BEGIN
    IF NEW.booking_type = 'Movie' THEN
        IF NEW.movie_id IS NULL OR NEW.showtime_id IS NULL THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Movie bookings must have movie_id and showtime_id';
        END IF;
    END IF;
END;
```

---

## 12. Transactions & Concurrency

### Q21: What is a Transaction?
**Answer:** A sequence of operations executed as a single unit. Follows ACID properties.

**ACID Properties:**
- **Atomicity**: All or nothing
- **Consistency**: Database remains consistent
- **Isolation**: Concurrent transactions don't interfere
- **Durability**: Committed changes are permanent

**In our project:**
```sql
START TRANSACTION;

INSERT INTO bookings (...);
SET @booking_id = LAST_INSERT_ID();

UPDATE showtimes SET available_seats = available_seats - 2;

INSERT INTO payments (booking_id, ...);

COMMIT; -- or ROLLBACK on error
```

### Q22: What is Serializability?
**Answer:** Property ensuring concurrent transactions produce same result as sequential execution.

**Types:**
- **Conflict Serializability**: Based on conflicting operations (read-write, write-write)
- **View Serializability**: Based on final database state

**In our project:** We use `SELECT FOR UPDATE` in CreateBooking procedure to ensure conflict serializability:
```sql
SELECT available_seats INTO v_available_seats
FROM showtimes
WHERE showtime_id = p_showtime_id
FOR UPDATE; -- Locks row until transaction completes
```

### Q23: What is Concurrency Control?
**Answer:** Mechanisms to manage simultaneous database access.

**Locking Techniques:**
- **Shared Lock (Read Lock)**: Multiple reads allowed
- **Exclusive Lock (Write Lock)**: Only one write allowed
- **Row-level Locking**: Lock specific rows (SELECT FOR UPDATE)

**In our project:** We use row-level locking to prevent overbooking:
```sql
-- In CreateBooking procedure
SELECT available_seats FROM showtimes
WHERE showtime_id = p_showtime_id
FOR UPDATE; -- Prevents other transactions from modifying this row
```

### Q24: What is Recoverability?
**Answer:** Ability to recover database to consistent state after failure.

**Recovery Techniques:**
- **Log-based Recovery**: Transaction logs
- **Checkpointing**: Periodic database snapshots
- **Shadow Paging**: Maintain shadow copies

**In our project:** MySQL handles recovery automatically using transaction logs and binary logs.

---

## 13. Database Security

### Q25: What are Database Threats?
**Answer:**
1. **SQL Injection**: Malicious SQL code injection
2. **Unauthorized Access**: Unauthorized users accessing data
3. **Data Breaches**: Theft of sensitive information
4. **Privilege Escalation**: Users gaining excessive privileges

### Q26: What is SQL Injection?
**Answer:** Attack where malicious SQL code is inserted into queries.

**Example (Vulnerable):**
```sql
-- DON'T DO THIS
SELECT * FROM users WHERE username = '$user_input';
-- If user_input = "admin' OR '1'='1", it becomes:
-- SELECT * FROM users WHERE username = 'admin' OR '1'='1';
```

**Prevention:**
- **Prepared Statements**: Use parameterized queries
- **Input Validation**: Validate and sanitize inputs
- **Least Privilege**: Grant minimum necessary privileges

**In our project:** We use stored procedures and parameterized queries to prevent SQL injection.

### Q27: What are Counter Measures?
**Answer:**
1. **Authentication**: Verify user identity (username/password)
2. **Authorization**: Control access (GRANT/REVOKE)
3. **Encryption**: Encrypt sensitive data (password_hash)
4. **Audit Logging**: Track database access
5. **Backup and Recovery**: Regular backups

**In our project:**
- Passwords stored as hashes (not plain text)
- User roles (admin_users table)
- Foreign key constraints for data integrity
- Triggers for audit logging (notifications)

---

## 14. Advanced Topics

### Q28: What are Control Structures?
**Answer:** Programming constructs in stored procedures.

**Conditional Statements:**
```sql
IF condition THEN
    statements;
ELSEIF condition THEN
    statements;
ELSE
    statements;
END IF;
```

**Iterative Control:**
```sql
WHILE condition DO
    statements;
END WHILE;

REPEAT
    statements;
UNTIL condition
END REPEAT;
```

**Sequential Control:**
```sql
-- Labels and GOTO (rarely used)
label: BEGIN
    statements;
END label;
```

**In our project:** Used in CreateBooking procedure for conditional logic and error handling.

### Q29: What are Cursors?
**Answer:** Database objects to iterate through result sets row by row.

**Example:**
```sql
DECLARE done INT DEFAULT FALSE;
DECLARE cur CURSOR FOR SELECT booking_id FROM bookings;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

OPEN cur;
read_loop: LOOP
    FETCH cur INTO booking_id_var;
    IF done THEN LEAVE read_loop; END IF;
    -- Process each row
END LOOP;
CLOSE cur;
```

**In our project:** Not extensively used, but can be used for batch processing.

### Q30: Explain Functional Dependencies
**Answer:** Relationship where one attribute determines another.

**Example:**
- `user_id` → `username` (user_id determines username)
- `booking_id` → `total_amount` (booking_id determines total_amount)

**In our project:**
- `user_id` → `email`, `username`, `full_name`
- `movie_id` → `title`, `director`, `genre`
- `booking_id` → `total_amount`, `booking_status`

**Usage:**
- Helps in normalization
- Identifies candidate keys
- Ensures data consistency

---

## 15. Project-Specific Questions

### Q31: Explain your database schema
**Answer:** 
- **15 tables**: users, venues, movies, live_events, showtimes, seats, seat_categories, bookings, booking_seats, payments, coupons, reviews, notifications, admin_users, actors, movie_actors
- **Key relationships**: Users→Bookings (1:N), Bookings→Payments (1:1), Movies→Showtimes (1:N)
- **Normalization**: 3NF - no redundancy, proper foreign keys
- **Constraints**: Primary keys, foreign keys, unique constraints, CHECK constraints

### Q32: How do you handle seat availability?
**Answer:**
1. **Trigger**: `trg_update_seats_on_booking_confirm` automatically updates `available_seats` when booking status changes
2. **Stored Procedure**: `CreateBooking` uses `SELECT FOR UPDATE` to lock rows and prevent overbooking
3. **Transaction**: All operations (booking creation, seat update, payment) in one transaction

### Q33: How do you ensure data integrity?
**Answer:**
1. **Foreign Key Constraints**: Referential integrity
2. **CHECK Constraints**: Validate ranges (rating 0-10, prices >= 0)
3. **Triggers**: Business rule validation (booking type, coupon validation)
4. **Unique Constraints**: Prevent duplicates (email, username, transaction_id)
5. **Transactions**: Atomic operations

### Q34: What indexes did you create and why?
**Answer:**
- **Single-column indexes**: On foreign keys (user_id, movie_id, venue_id) and frequently queried columns (email, booking_date)
- **Composite indexes**: 
  - `idx_booking_user_status` on (user_id, booking_status) - for user booking queries
  - `idx_showtime_movie_date` on (movie_id, show_date) - for showtime searches
  - `idx_payment_status_date` on (payment_status, payment_date) - for payment reports

**Why:** Improve query performance for common access patterns.

### Q35: Explain your normalization approach
**Answer:**
- **3NF**: All tables normalized to third normal form
- **Example**: Venue information in separate `venues` table, referenced by foreign keys
- **Actors normalization**: Separated from `movies.stars` into `actors` and `movie_actors` tables
- **Benefits**: Reduced redundancy, easier updates, better data integrity

### Q36: How do you handle concurrent bookings?
**Answer:**
- **SELECT FOR UPDATE**: Locks showtime row during booking creation
- **Transaction**: All operations atomic
- **Trigger**: Updates seat count after confirmation
- **Prevents**: Race conditions and overbooking

### Q37: What views did you create and why?
**Answer:**
1. **v_active_movie_showtimes**: Simplify querying active showtimes with availability percentage
2. **v_booking_details**: Complete booking info with all joins (users, movies, venues, payments)
3. **v_revenue_summary**: Daily revenue breakdown for reporting

**Why:** Simplify complex queries, provide consistent interface, improve security.

### Q38: Explain your trigger implementation
**Answer:**
1. **trg_validate_booking_type**: Ensures Movie bookings have movie_id/showtime_id, Live Events have event_id
2. **trg_update_seats_on_booking_confirm**: Auto-updates available_seats on status change
3. **trg_log_booking_status_change**: Creates notifications when booking status changes
4. **trg_validate_coupon**: Validates coupon before booking (active, valid dates, usage limits)

### Q39: How do you calculate booking amounts?
**Answer:**
- **Subtotal**: Base price × number of tickets
- **Convenience fees**: Fixed or percentage
- **Discount**: From coupon (percentage or fixed)
- **Total**: Subtotal + fees - discount

**Example:**
```sql
subtotal = base_price * total_tickets
convenience_fees = 90.00
discount_amount = subtotal * (discount_percentage / 100)
total_amount = subtotal + convenience_fees - discount_amount
```

### Q40: What are the key features of your database?
**Answer:**
1. **Comprehensive schema**: 15 tables covering all aspects
2. **Data integrity**: Foreign keys, CHECK constraints, triggers
3. **Performance**: Indexes on frequently queried columns
4. **Concurrency control**: SELECT FOR UPDATE, transactions
5. **Normalization**: 3NF design
6. **Security**: Password hashing, role-based access
7. **Extensibility**: Views, stored procedures, triggers

---

## Quick Reference - Key Points to Remember

### Database Name
- `happenin_db`

### Main Tables (15)
1. users
2. venues
3. movies
4. live_events
5. showtimes
6. seats
7. seat_categories
8. bookings
9. booking_seats
10. payments
11. coupons
12. reviews
13. notifications
14. admin_users
15. actors
16. movie_actors

### Key Relationships
- Users → Bookings (1:N)
- Bookings → Payments (1:1)
- Movies → Showtimes (1:N)
- Venues → Showtimes (1:N)
- Movies ↔ Actors (N:M via movie_actors)

### Triggers (5)
1. trg_validate_booking_type (BEFORE INSERT)
2. trg_validate_booking_type_update (BEFORE UPDATE)
3. trg_update_seats_on_booking_confirm (AFTER UPDATE)
4. trg_log_booking_status_change (AFTER UPDATE)
5. trg_validate_coupon (BEFORE INSERT)

### Stored Procedures (2)
1. GetUserBookingSummary(IN user_id)
2. CreateBooking(...) - with concurrency control

### Views (3)
1. v_active_movie_showtimes
2. v_booking_details
3. v_revenue_summary

### Normalization
- **Level**: 3NF (Third Normal Form)
- **Example**: Venues in separate table, referenced by foreign keys

### Concurrency Control
- **Method**: SELECT FOR UPDATE in CreateBooking procedure
- **Purpose**: Prevent overbooking

### Security Features
- Password hashing (not plain text)
- Foreign key constraints
- CHECK constraints for data validation
- Triggers for business rule enforcement

---

## Tips for Viva

1. **Be confident**: You know your project well
2. **Explain with examples**: Use your actual database schema
3. **Show understanding**: Connect concepts to your implementation
4. **Be honest**: If you don't know something, say so
5. **Think aloud**: Explain your thought process
6. **Reference your code**: Point to specific examples from your schema/queries

---

## Common Follow-up Questions

**Q: Why did you choose MySQL?**
A: MySQL is widely used, supports all required features (triggers, procedures, views), has good performance, and is open-source.

**Q: How would you improve this database?**
A: 
- Add full-text search indexes for movie titles
- Implement database replication for high availability
- Add audit logging table
- Implement row-level security
- Add materialized views for reporting

**Q: What challenges did you face?**
A:
- Ensuring booking type consistency (solved with triggers)
- Preventing overbooking (solved with SELECT FOR UPDATE)
- Normalizing actors data (solved with migration script)

**Q: How do you handle database backups?**
A: Use mysqldump for regular backups, MySQL binary logs for point-in-time recovery.

---

**Good Luck with your Viva! 🎓**

