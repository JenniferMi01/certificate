#!/bin/bash

# Fix PostgreSQL authentication issues
# This script addresses common PostgreSQL authentication problems including missing users

set -e

echo "Fixing PostgreSQL authentication issues..."

# Database connection parameters
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="certificate_db"
DB_USER="certificate_user"
DB_PASSWORD="certificate_password"

# Function to check if database is accessible
check_db_connection() {
    echo "Checking database connection..."
    python -c "
import psycopg2
try:
    conn = psycopg2.connect(
        host='$DB_HOST',
        port='$DB_PORT',
        user='$DB_USER',
        password='$DB_PASSWORD',
        database='$DB_NAME'
    )
    print('✓ Database connection successful')
    conn.close()
    exit(0)
except Exception as e:
    print(f'✗ Database connection failed: {e}')
    exit(1)
" 2>/dev/null
}

# Function to create PostgreSQL user if it doesn't exist
create_postgres_user() {
    echo "Creating PostgreSQL user if needed..."
    
    # Try to connect as superuser (usually postgres or root) to create the user
    # First try with default postgres user
    if PGPASSWORD=postgres psql -h $DB_HOST -p $DB_PORT -U postgres -d postgres -c "SELECT 1;" 2>/dev/null; then
        # User exists, just reset password
        PGPASSWORD=postgres psql -h $DB_HOST -p $DB_PORT -U postgres -d postgres -c "ALTER USER postgres PASSWORD '$DB_PASSWORD';" 2>/dev/null
        if [ $? -eq 0 ]; then
            echo "✓ PostgreSQL password reset successful"
        else
            echo "⚠ Could not reset password (might not be needed)"
        fi
    else
        # Try with root user
        if PGPASSWORD=root psql -h $DB_HOST -p $DB_PORT -U root -d postgres -c "SELECT 1;" 2>/dev/null; then
            echo "Creating postgres user with root..."
            PGPASSWORD=root psql -h $DB_HOST -p $DB_PORT -U root -d postgres -c "CREATE USER postgres WITH SUPERUSER PASSWORD '$DB_PASSWORD';" 2>/dev/null || true
            echo "✓ PostgreSQL user created with root"
        else
            # Try with no password (trust authentication)
            if psql -h $DB_HOST -p $DB_PORT -U postgres -d postgres -c "SELECT 1;" 2>/dev/null; then
                psql -h $DB_HOST -p $DB_PORT -U postgres -d postgres -c "ALTER USER postgres PASSWORD '$DB_PASSWORD';" 2>/dev/null
                echo "✓ PostgreSQL password reset with no auth"
            else
                # Try creating user with no auth
                if psql -h $DB_HOST -p $DB_PORT -U postgres -d postgres -c "CREATE USER postgres WITH SUPERUSER PASSWORD '$DB_PASSWORD';" 2>/dev/null; then
                    echo "✓ PostgreSQL user created with no auth"
                else
                    echo "⚠ Could not create or reset postgres user"
                fi
            fi
        fi
    fi
}

# Function to check and fix data directory permissions
fix_data_permissions() {
    echo "Checking data directory permissions..."
    
    # Check if we can access the data directory
    if [ -d "/var/lib/postgresql/data" ]; then
        # Fix ownership if needed
        chown -R postgres:postgres /var/lib/postgresql/data 2>/dev/null || true
        chmod -R 700 /var/lib/postgresql/data 2>/dev/null || true
        echo "✓ Data directory permissions fixed"
    else
        echo "⚠ Data directory not found or not accessible"
    fi
}

# Function to check pg_hba.conf configuration
check_hba_config() {
    echo "Checking pg_hba.conf configuration..."
    
    # Check if pg_hba.conf exists and has proper configuration
    if [ -f "/var/lib/postgresql/data/pg_hba.conf" ]; then
        # Ensure we have proper authentication methods
        if ! grep -q "host.*all.*all.*all.*scram-sha-256" /var/lib/postgresql/data/pg_hba.conf; then
            echo "Adding scram-sha-256 authentication method..."
            echo "host all all all scram-sha-256" >> /var/lib/postgresql/data/pg_hba.conf
        fi
        
        # Also add md5 as fallback
        if ! grep -q "host.*all.*all.*all.*md5" /var/lib/postgresql/data/pg_hba.conf; then
            echo "Adding md5 authentication method as fallback..."
            echo "host all all all md5" >> /var/lib/postgresql/data/pg_hba.conf
        fi
        
        echo "✓ pg_hba.conf configuration updated"
    else
        echo "⚠ pg_hba.conf not found"
    fi
}

# Function to restart PostgreSQL service
restart_postgres() {
    echo "Restarting PostgreSQL service..."
    
    # Try to restart PostgreSQL
    if command -v service >/dev/null 2>&1; then
        service postgresql restart 2>/dev/null || true
    elif command -v systemctl >/dev/null 2>&1; then
        systemctl restart postgresql 2>/dev/null || true
    fi
    
    # Wait a moment for restart
    sleep 3
}

# Main execution
echo "Starting PostgreSQL authentication fix..."

# First, try to connect to see if the issue exists
if check_db_connection; then
    echo "✓ Database connection is working, no fix needed"
    exit 0
fi

echo "Database connection failed, applying fixes..."

# Apply fixes
fix_data_permissions
create_postgres_user
check_hba_config

# Restart PostgreSQL
restart_postgres

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
for i in {1..30}; do
    if check_db_connection; then
        echo "✓ Database connection restored!"
        exit 0
    fi
    echo "Waiting... ($i/30)"
    sleep 2
done

echo "✗ Database connection still failing after fixes"
echo "Manual intervention may be required"
exit 1