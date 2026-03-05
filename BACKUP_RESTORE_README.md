# Database Backup and Restore Solution

This solution implements automated database backups every 10 minutes with automatic cleanup and restoration on container startup.

## Features

- **Automated Backups**: Database backups run every 10 minutes via cron
- **Automatic Cleanup**: Keeps only the latest 5 backup files
- **Auto-Restore**: Always restores the latest backup when containers start
- **Compressed Storage**: Backup files are compressed with gzip
- **Logging**: All backup operations are logged

## Files Created/Modified

### Scripts
- `scripts/backup_db.sh` - Database backup script (modified to keep 5 files)
- `scripts/restore_db.sh` - Database restore script (existing)
- `scripts/setup_cron.sh` - Cron job setup script (new)
- `scripts/test_backup_restore.sh` - Test script (new)

### Configuration Files
- `backend/entrypoint.sh` - Updated to setup cron and restore latest backup
- `backend/Dockerfile` - Updated to include cron and make scripts executable
- `compose.yml` - Updated to mount backup volume

## How It Works

### 1. Backup Process
Every 10 minutes, cron runs `scripts/backup_db.sh` which:
- Creates a SQL dump of the PostgreSQL database
- Compresses it with gzip
- Stores it in `/app/backups/` with timestamp
- Keeps only the latest 5 backup files

### 2. Restore Process
When containers start up, `backend/entrypoint.sh`:
- Sets up the cron job
- Starts the cron service
- Restores the latest backup if available
- Runs Django migrations
- Starts the application

### 3. Volume Persistence
The `backup_data` volume ensures backup files persist across container restarts.

## Cron Schedule

```bash
*/10 * * * * root /app/scripts/backup_db.sh >> /var/log/db-backup.log 2>&1
```

This runs every 10 minutes and logs output to `/var/log/db-backup.log`.

## Testing

Run the test script to verify everything is working:

```bash
./scripts/test_backup_restore.sh
```

## Manual Operations

### Create a Backup
```bash
./scripts/backup_db.sh
```

### Restore from Latest Backup
```bash
./scripts/restore_db.sh
```

### Check Cron Status
```bash
service cron status
```

### View Backup Logs
```bash
tail -f /var/log/db-backup.log
```

### List Backup Files
```bash
ls -la /app/backups/
```

## Backup File Naming

Backup files are named with timestamps:
- `database_backup_YYYYMMDD_HHMMSS.sql.gz`

Example: `database_backup_20260305_150000.sql.gz`

## Troubleshooting

### No Backup Files Found
- Check if the cron service is running: `service cron status`
- Check cron logs: `tail -f /var/log/db-backup.log`
- Verify database connectivity from the container

### Restore Fails
- Check if backup files exist in `/app/backups/`
- Verify database is running and accessible
- Check restore script permissions

### Cron Job Not Running
- Verify cron service is started in entrypoint.sh
- Check cron configuration: `cat /etc/cron.d/db-backup`
- Verify script permissions are executable

## Security Notes

- Backup files contain sensitive database data
- Ensure proper access controls on the backup volume
- Consider encrypting backup files for production use
- Regularly test restore procedures

## Production Considerations

- Monitor disk space usage for backup storage
- Consider off-site backup storage for disaster recovery
- Implement backup verification procedures
- Set up monitoring and alerting for backup failures