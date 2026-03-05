#!/bin/bash

# Wait for database to be ready
echo "Waiting for database to be ready..."
until python -c "import psycopg2; psycopg2.connect(host='db', port=5432, user='postgres', password='postgres')" 2>/dev/null; do
  echo "Database is not ready yet, waiting..."
  sleep 2
done

echo "Database is ready!"

# Setup cron job for database backups
echo "Setting up cron job for database backups..."
/app/scripts/setup_cron.sh

# Start cron service
echo "Starting cron service..."
service cron start

# Always restore the latest backup if available
BACKUP_DIR="/app/backups"
if [ -d "$BACKUP_DIR" ]; then
    LATEST_BACKUP=$(ls -t $BACKUP_DIR/database_backup_*.sql.gz 2>/dev/null | head -n1)
    if [ -n "$LATEST_BACKUP" ]; then
        echo "Found latest backup file: $LATEST_BACKUP"
        echo "Restoring database from latest backup..."
        
        /app/scripts/restore_db.sh
        if [ $? -eq 0 ]; then
            echo "Database restored successfully from latest backup!"
        else
            echo "Database restore failed, continuing with migrations..."
        fi
    else
        echo "No backup files found, proceeding with migrations..."
    fi
else
    echo "Backup directory does not exist, proceeding with migrations..."
fi

# Run migrations
echo "Running migrations..."
python manage.py migrate

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Make migrations and migrate again to ensure all changes are applied
python manage.py makemigrations --noinput
python manage.py migrate --noinput

# Start the application
echo "Starting the application..."
exec "$@"
