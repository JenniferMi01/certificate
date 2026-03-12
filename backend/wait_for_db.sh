#!/bin/bash

echo "Waiting for database..."

until pg_isready -h db -U certificate_user -d certificate_db; do
  echo "Database is unavailable - sleeping"
  sleep 1
done

echo "Database is ready!"

echo "Running migrations..."
python manage.py migrate --noinput

echo "Running seeders..."
python manage.py create_rh_users

echo "Starting development server..."
python manage.py runserver 0.0.0.0:8000
