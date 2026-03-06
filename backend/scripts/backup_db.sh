#!/bin/bash

# Database backup script
# This script creates a SQL dump of the PostgreSQL database

set -e

# Database connection parameters
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="certificate_db"
DB_USER="certificate_user"
DB_PASSWORD="cErt1f1c@teP@ssw0rd"

# Backup directory and filename
BACKUP_DIR="/app/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/database_backup_$TIMESTAMP.sql"

echo "Starting database backup..."

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Create the backup
echo "Creating backup: $BACKUP_FILE"
PGPASSWORD=$DB_PASSWORD pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f $BACKUP_FILE

if [ $? -eq 0 ]; then
    echo "Database backup completed successfully: $BACKUP_FILE"
    
    # Also create a compressed version
    gzip $BACKUP_FILE
    echo "Compressed backup created: $BACKUP_FILE.gz"
else
    echo "Database backup failed!"
    exit 1
fi

# Keep only the last 5 backups
echo "Cleaning up old backups (keeping last 5)..."
cd $BACKUP_DIR
ls -t database_backup_*.sql.gz | tail -n +6 | xargs -r rm -f

echo "Backup process completed."