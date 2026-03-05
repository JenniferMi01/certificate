#!/bin/bash

# Wait for database to be ready
echo "Waiting for database to be ready..."
until python -c "import psycopg2; psycopg2.connect(host='db', port=5432, user='postgres', password='postgres')" 2>/dev/null; do
  echo "Database is not ready yet, waiting..."
  sleep 2
done

echo "Database is ready!"

# Check if we need to restore from backup
BACKUP_DIR="/app/backups"
if [ -d "$BACKUP_DIR" ]; then
    LATEST_BACKUP=$(ls -t $BACKUP_DIR/database_backup_*.sql.gz 2>/dev/null | head -n1)
    if [ -n "$LATEST_BACKUP" ]; then
        echo "Found backup file: $LATEST_BACKUP"
        echo "Checking if database needs to be restored..."
        
        # Check if database is empty (no tables)
        TABLE_COUNT=$(PGPASSWORD=postgres psql -h db -p 5432 -U postgres -d certificate_db -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" 2>/dev/null | xargs)
        
        if [ "$TABLE_COUNT" = "0" ]; then
            echo "Database appears to be empty, restoring from backup..."
            /app/scripts/restore_db.sh
            if [ $? -eq 0 ]; then
                echo "Database restored successfully!"
            else
                echo "Database restore failed, continuing with migrations..."
            fi
        else
            echo "Database already has tables, skipping restore"
        fi
    fi
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
