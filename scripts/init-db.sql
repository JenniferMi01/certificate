-- Initialize PostgreSQL database with proper user and permissions

-- Create the postgres user if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'postgres') THEN
        CREATE USER postgres WITH SUPERUSER PASSWORD 'postgres';
    END IF;
END
$$;

-- Ensure the user has proper permissions
ALTER USER postgres CREATEDB;
ALTER USER postgres CREATEROLE;

-- Create the database if it doesn't exist
SELECT 'CREATE DATABASE certificate_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'certificate_db')\gexec

-- Grant all privileges on the database to postgres
GRANT ALL PRIVILEGES ON DATABASE certificate_db TO postgres;

-- Connect to the database and set up proper permissions
\c certificate_db

-- Grant all privileges on schema public to postgres
GRANT ALL PRIVILEGES ON SCHEMA public TO postgres;

-- Grant all privileges on all tables in public schema to postgres
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;

-- Grant all privileges on all sequences in public schema to postgres
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO postgres;

-- Set password authentication method for local connections
-- This ensures the postgres user can authenticate properly
ALTER SYSTEM SET password_encryption = 'scram-sha-256';
SELECT pg_reload_conf();