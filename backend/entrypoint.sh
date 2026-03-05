#!/bin/bash

# Wait for database to be ready
echo "Waiting for database to be ready..."
until python -c "import psycopg2; psycopg2.connect(host='db', port=5432, user='postgres', password='postgres')" 2>/dev/null; do
  echo "Database is not ready yet, waiting..."
  sleep 2
done

echo "Database is ready!"

# Run migrations
echo "Running migrations..."
python manage.py migrate

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Make migrations and migrate again to ensure all changes are applied
RUN python manage.py makemigrations --noinput
RUN python manage.py migrate --noinput

# Start the application
echo "Starting the application..."
exec "$@"