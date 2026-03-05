#!/bin/bash

# Database restore script
# This script restores a PostgreSQL database from a SQL dump

set -e

# Database connection parameters
DB_HOST="db"
DB_PORT="5432"
DB_NAME="certificate_db"
DB_USER="postgres"
DB_PASSWORD="postgres"

# Backup directory
BACKUP_DIR="/app/backups"

echo "Starting database restore..."

# Check if backup directory exists
if [ ! -d "$BACKUP_DIR" ]; then
    echo "Backup directory does not exist: $BACKUP_DIR"
    exit 1
fi

# Find the latest backup file
LATEST_BACKUP=$(ls -t $BACKUP_DIR/database_backup_*.sql.gz 2>/dev/null | head -n1)

if [ -z "$LATEST_BACKUP" ]; then
    echo "No backup files found in $BACKUP_DIR"
    exit 1
fi

echo "Found latest backup: $LATEST_BACKUP"

# Extract the backup file
echo "Extracting backup file..."
TEMP_FILE="${LATEST_BACKUP%.gz}"
gunzip -c "$LATEST_BACKUP" > "$TEMP_FILE"

if [ $? -ne 0 ]; then
    echo "Failed to extract backup file!"
    exit 1
fi

echo "Backup extracted to: $TEMP_FILE"

# Restore the database
echo "Restoring database..."
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f "$TEMP_FILE"

if [ $? -eq 0 ]; then
    echo "Database restore completed successfully!"
else
    echo "Database restore failed!"
    exit 1
fi

# Clean up temporary file
rm -f "$TEMP_FILE"

echo "Restore process completed."