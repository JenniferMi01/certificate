#!/bin/bash

# Setup cron job for database backup every 10 minutes

echo "Setting up cron job for database backup..."

# Create cron job file
CRON_FILE="/etc/cron.d/db-backup"
BACKUP_SCRIPT="/app/scripts/backup_db.sh"

# Create the cron job entry
cat > $CRON_FILE << EOF
# Database backup every 60 minutes
*/60 * * * * root $BACKUP_SCRIPT >> /var/log/db-backup.log 2>&1

# Clean up old log files (keep last 1000 lines)
0 0 * * * root tail -n 1000 /var/log/db-backup.log > /var/log/db-backup.log.tmp && mv /var/log/db-backup.log.tmp /var/log/db-backup.log
EOF

# Make sure the cron file is executable
chmod 644 $CRON_FILE

# Make sure the backup script is executable
chmod +x $BACKUP_SCRIPT

# Create log directory if it doesn't exist
mkdir -p /var/log

echo "Cron job setup completed!"
echo "Database backups will run every 10 minutes"
echo "Log file: /var/log/db-backup.log"