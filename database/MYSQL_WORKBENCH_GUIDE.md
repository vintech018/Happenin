# MySQL Workbench Setup Guide - Step by Step

This guide will walk you through setting up the Happenin database in MySQL Workbench.

## Prerequisites
- MySQL Server installed and running
- MySQL Workbench installed
- Access to MySQL root user (or a user with CREATE DATABASE privileges)

---

## Step 1: Open MySQL Workbench

1. Launch **MySQL Workbench** from your applications
2. You should see your MySQL connections in the home screen
3. Double-click on your MySQL connection (usually named "Local instance MySQL" or similar)
4. Enter your MySQL root password when prompted
5. Wait for the connection to establish

---

## Step 2: Open SQL Files

You need to open the SQL files in this order:

### Option A: Open Files Directly
1. In MySQL Workbench, go to **File → Open SQL Script**
2. Navigate to: `/Users/vaibhav/Desktop/Happenin/database/`
3. Open files in this order:
   - `schema.sql` (first)
   - `sample_data.sql` (second)
   - `migrate_actors.sql` (optional - third)
   - `queries.sql` (optional - fourth)

### Option B: Create New Query Tab
1. Click the **SQL+** button (or press `Cmd+Shift+N` on Mac / `Ctrl+Shift+N` on Windows)
2. This opens a new SQL query tab
3. Copy and paste the contents of each SQL file one at a time

---

## Step 3: Execute schema.sql (Create Database and Tables)

1. **Open `schema.sql`**:
   - File → Open SQL Script → Select `schema.sql`
   - OR copy the entire contents of `schema.sql` into a new query tab

2. **Review the file** (optional):
   - The file starts with `DROP DATABASE IF EXISTS happenin_db;`
   - This will delete the database if it already exists
   - Then creates a new database and all tables

3. **Execute the script**:
   - Click the **⚡ Execute** button (lightning bolt icon) in the toolbar
   - OR press `Cmd+Shift+Enter` (Mac) / `Ctrl+Shift+Enter` (Windows)
   - OR go to **Query → Execute (All or Selection)**

4. **Check for errors**:
   - Look at the **Output** panel at the bottom
   - You should see "Operation completed successfully" or similar
   - If there are errors (red text), read the error message and fix the issue

5. **Verify database creation**:
   - In the left sidebar, click the **refresh** icon (circular arrow) next to "SCHEMAS"
   - You should now see `happenin_db` in the list of databases
   - Expand `happenin_db` → Tables
   - You should see all 15 tables listed

---

## Step 4: Execute sample_data.sql (Insert Data)

1. **Open `sample_data.sql`**:
   - File → Open SQL Script → Select `sample_data.sql`
   - OR open a new query tab and paste the contents

2. **Make sure you're using the correct database**:
   - At the top of the query tab, you should see: `USE happenin_db;`
   - If not, add this line at the very top:
     ```sql
     USE happenin_db;
     ```

3. **Execute the script**:
   - Click **⚡ Execute** button
   - OR press `Cmd+Shift+Enter` / `Ctrl+Shift+Enter`

4. **Check for errors**:
   - Look at the Output panel
   - You should see messages like "X row(s) affected" for each INSERT
   - If you see foreign key errors, make sure you ran `schema.sql` first

5. **Verify data insertion**:
   - Right-click on a table (e.g., `movies`) in the left sidebar
   - Select **Select Rows - Limit 1000**
   - You should see data in the table
   - Try this for: `movies`, `live_events`, `users`, `bookings`

---

## Step 5: Execute migrate_actors.sql (Optional - Normalize Actors)

1. **Open `migrate_actors.sql`**:
   - File → Open SQL Script → Select `migrate_actors.sql`

2. **Execute the script**:
   - Click **⚡ Execute** button

3. **Verify**:
   - Check the `actors` and `movie_actors` tables for data

---

## Step 6: Execute queries.sql (Optional - Create Views and Procedures)

1. **Open `queries.sql`**:
   - File → Open SQL Script → Select `queries.sql`
   - **Note**: This file is large and contains many queries
   - You can execute it all at once, or run individual queries

2. **Execute**:
   - Click **⚡ Execute** button
   - This will create views, stored procedures, and run example queries

3. **Verify**:
   - Check the left sidebar under `happenin_db`:
     - **Views** - should show `v_active_movie_showtimes`, `v_booking_details`, `v_revenue_summary`
     - **Stored Procedures** - should show `GetUserBookingSummary`, `CreateBooking`

---

## Step 7: Test Your Database

### Test 1: View All Movies
```sql
USE happenin_db;
SELECT * FROM movies;
```

### Test 2: View All Live Events
```sql
SELECT * FROM live_events;
```

### Test 3: View Upcoming Showtimes
```sql
SELECT * FROM showtimes WHERE show_date >= CURDATE() LIMIT 10;
```

### Test 4: Test a View
```sql
SELECT * FROM v_active_movie_showtimes LIMIT 10;
```

### Test 5: Test a Stored Procedure
```sql
CALL GetUserBookingSummary(1);
```

### Test 6: Test Booking Type Validation Trigger
```sql
-- This should FAIL (invalid booking type)
INSERT INTO bookings (
    booking_type, movie_id, event_id, showtime_id,
    total_tickets, subtotal, total_amount,
    customer_name, customer_email
) VALUES (
    'Movie', 1, 1, 1, 2, 500, 590, 'Test', 'test@example.com'
);
-- Expected: Error about booking type inconsistency
```

---

## Common Issues and Solutions

### Issue 1: "Access Denied" Error
**Solution**: 
- Make sure you're connected with a user that has CREATE DATABASE privileges
- Try connecting as root user

### Issue 2: "Table already exists" Error
**Solution**: 
- The schema.sql file has `DROP DATABASE IF EXISTS` at the top
- Make sure you run the entire schema.sql file from the beginning
- Or manually drop: `DROP DATABASE IF EXISTS happenin_db;`

### Issue 3: "Foreign key constraint fails"
**Solution**: 
- Make sure you ran `schema.sql` BEFORE `sample_data.sql`
- Check that parent records exist (e.g., venues before showtimes)

### Issue 4: "Unknown database 'happenin_db'"
**Solution**: 
- Make sure you ran `schema.sql` first
- Or manually create: `CREATE DATABASE happenin_db;`
- Then add `USE happenin_db;` at the top of your script

### Issue 5: Script execution is slow
**Solution**: 
- Large scripts may take time
- Check the progress in the Output panel
- Be patient, especially for the seats insertion

### Issue 6: "Syntax error near..."
**Solution**: 
- Check that you copied the entire SQL file correctly
- Make sure there are no missing semicolons
- Check for special characters that might have been corrupted

---

## Quick Reference: Keyboard Shortcuts

- **Execute All**: `Cmd+Shift+Enter` (Mac) / `Ctrl+Shift+Enter` (Windows)
- **Execute Selection**: `Cmd+Enter` (Mac) / `Ctrl+Enter` (Windows)
- **New Query Tab**: `Cmd+Shift+N` (Mac) / `Ctrl+Shift+N` (Windows)
- **Format SQL**: `Cmd+B` (Mac) / `Ctrl+B` (Windows)
- **Comment/Uncomment**: `Cmd+/` (Mac) / `Ctrl+/` (Windows)

---

## Verification Checklist

After running all scripts, verify:

- [ ] Database `happenin_db` exists in SCHEMAS list
- [ ] All 15 tables are visible under `happenin_db` → Tables
- [ ] `movies` table has 7 rows
- [ ] `live_events` table has 10 rows
- [ ] `users` table has 6 rows
- [ ] `showtimes` table has multiple rows
- [ ] `seats` table has rows (200+ for venue 1, 300+ for venue 2, etc.)
- [ ] `bookings` table has 5 rows
- [ ] Views are visible under `happenin_db` → Views
- [ ] Stored Procedures are visible under `happenin_db` → Stored Procedures
- [ ] Triggers are visible (right-click table → Table Inspector → Triggers tab)

---

## Next Steps

Once your database is set up:

1. **Explore the data**: Right-click tables → Select Rows
2. **Run queries**: Try the example queries in `queries.sql`
3. **Test triggers**: Try creating invalid bookings to see validation
4. **Test procedures**: Call `GetUserBookingSummary(1)`
5. **Use views**: Query `v_active_movie_showtimes` for easy access

---

## Need Help?

If you encounter issues:
1. Check the error message in the Output panel
2. Verify you ran files in the correct order
3. Make sure MySQL Server is running
4. Check that you have the correct permissions
5. Review the README.md file for additional troubleshooting

---

**Happy Querying! 🎬🎫**



