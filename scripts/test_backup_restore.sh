#!/bin/bash

# Test script to verify backup and restore functionality

echo "Testing backup and restore functionality..."

# Test 1: Check if backup script exists and is executable
if [ -x "/app/scripts/backup_db.sh" ]; then
    echo "✓ Backup script exists and is executable"
else
    echo "✗ Backup script not found or not executable"
    exit 1
fi

# Test 2: Check if restore script exists and is executable
if [ -x "/app/scripts/restore_db.sh" ]; then
    echo "✓ Restore script exists and is executable"
else
    echo "✗ Restore script not found or not executable"
    exit 1
fi

# Test 3: Check if cron setup script exists and is executable
if [ -x "/app/scripts/setup_cron.sh" ]; then
    echo "✓ Cron setup script exists and is executable"
else
    echo "✗ Cron setup script not found or not executable"
    exit 1
fi

# Test 4: Check if backup directory exists
if [ -d "/app/backups" ]; then
    echo "✓ Backup directory exists"
else
    echo "✗ Backup directory does not exist"
    exit 1
fi

# Test 5: Check if cron is installed
if command -v cron >/dev/null 2>&1; then
    echo "✓ Cron is installed"
else
    echo "✗ Cron is not installed"
    exit 1
fi

echo "All tests passed! ✓"
echo ""
echo "To manually test backup creation, run:"
echo "  /app/scripts/backup_db.sh"
echo ""
echo "To manually test restore, run:"
echo "  /app/scripts/restore_db.sh"
echo ""
echo "To check cron status, run:"
echo "  service cron status"
echo ""
echo "To view cron logs, run:"
echo "  tail -f /var/log/db-backup.log"