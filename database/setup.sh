#!/bin/bash

# Happenin Database Setup Script
# This script sets up the complete database with schema and sample data

echo "=========================================="
echo "Happenin Database Setup"
echo "=========================================="
echo ""

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "Error: MySQL client is not installed."
    echo "Please install MySQL and try again."
    exit 1
fi

# Prompt for MySQL root password
read -sp "Enter MySQL root password: " MYSQL_PASSWORD
echo ""

# Database name
DB_NAME="happenin_db"

echo "Step 1: Creating database and schema..."
mysql -u root -p$MYSQL_PASSWORD < schema.sql
if [ $? -eq 0 ]; then
    echo "✓ Database and schema created successfully"
else
    echo "✗ Error creating database/schema"
    exit 1
fi

echo ""
echo "Step 2: Inserting sample data..."
mysql -u root -p$MYSQL_PASSWORD $DB_NAME < sample_data.sql
if [ $? -eq 0 ]; then
    echo "✓ Sample data inserted successfully"
else
    echo "✗ Error inserting sample data"
    exit 1
fi

echo ""
echo "Step 3: Creating views, procedures, and triggers..."
mysql -u root -p$MYSQL_PASSWORD $DB_NAME < queries.sql
if [ $? -eq 0 ]; then
    echo "✓ Views, procedures, and triggers created successfully"
else
    echo "⚠ Warning: Some queries may have failed (this is normal if objects already exist)"
fi

echo ""
echo "=========================================="
echo "Database setup complete!"
echo "=========================================="
echo ""
echo "Database: $DB_NAME"
echo "You can now connect to the database using:"
echo "  mysql -u root -p $DB_NAME"
echo ""
echo "Or use MySQL Workbench to explore the database."
echo ""



