# PostgreSQL Authentication Fix Solution

This solution provides automatic detection and fixing of PostgreSQL authentication issues that can occur in Docker environments.

## Problem Description

The error `password authentication failed for user "postgres"` with `scram-sha-256` authentication can occur due to:

1. **Password mismatch** - Database password doesn't match the expected password
2. **Permission issues** - Incorrect ownership/permissions on PostgreSQL data directory
3. **Authentication configuration** - pg_hba.conf doesn't allow the connection method
4. **Database corruption** - Data directory corruption or incomplete initialization

## Solution Overview

The fix includes:
- **Automatic detection** - Checks for authentication issues during startup
- **Multi-step repair** - Fixes common causes of authentication failures
- **Fallback mechanisms** - Uses multiple authentication methods
- **Logging and feedback** - Provides clear status messages

## Files Created

### `scripts/fix_postgres_auth.sh`
Main fix script that performs:
- Database connection testing
- Password reset
- Data directory permission fixes
- pg_hba.conf configuration updates
- PostgreSQL service restart

### Modified Files
- `backend/entrypoint.sh` - Added automatic authentication checking and fixing
- `backend/Dockerfile` - Made fix script executable

## How It Works

### 1. Detection Phase
When the backend container starts, it:
1. Waits for PostgreSQL to be ready
2. Tests database connection with expected credentials
3. If connection fails, triggers the fix script

### 2. Fix Phase
The fix script performs these steps:
1. **Permission Fix**: Ensures proper ownership of data directory
2. **Password Reset**: Resets PostgreSQL password to expected value
3. **Configuration Update**: Adds both `scram-sha-256` and `md5` authentication methods
4. **Service Restart**: Restarts PostgreSQL to apply changes
5. **Verification**: Tests connection again to confirm fix

### 3. Fallback Strategy
- Primary: `scram-sha-256` (secure, modern)
- Fallback: `md5` (compatible, legacy)

## Authentication Methods

### scram-sha-256
- **Modern and secure** authentication method
- **Default in PostgreSQL 10+**
- **Recommended for production**

### md5
- **Legacy authentication method**
- **Widely compatible**
- **Used as fallback when scram-sha-256 fails**

## pg_hba.conf Configuration

The fix ensures proper entries in `pg_hba.conf`:
```
# IPv4 local connections:
host    all             all             0.0.0.0/0               scram-sha-256
host    all             all             0.0.0.0/0               md5

# IPv6 local connections:
host    all             all             ::/0                    scram-sha-256
host    all             all             ::/0                    md5
```

## Usage

### Automatic (Recommended)
The fix runs automatically when authentication issues are detected during container startup.

### Manual
You can run the fix script manually:
```bash
./scripts/fix_postgres_auth.sh
```

### Testing
Test the fix by checking database connection:
```bash
python -c "import psycopg2; psycopg2.connect(host='db', port=5432, user='postgres', password='postgres', database='certificate_db')"
```

## Troubleshooting

### If Fix Doesn't Work
1. **Check Docker logs**:
   ```bash
   docker logs certificate_backend
   ```

2. **Manual database reset**:
   ```bash
   docker-compose down -v  # Remove volumes
   docker-compose up       # Recreate with fresh database
   ```

3. **Check PostgreSQL logs**:
   ```bash
   docker-compose logs db
   ```

### Common Issues

#### Permission Denied
- **Cause**: Incorrect ownership of data directory
- **Fix**: Script automatically fixes permissions

#### Password Still Wrong
- **Cause**: Password was changed outside of normal process
- **Fix**: Script resets password to expected value

#### Connection Timeout
- **Cause**: PostgreSQL not fully started
- **Fix**: Script waits and retries connection

#### Authentication Method Not Supported
- **Cause**: pg_hba.conf doesn't allow connection method
- **Fix**: Script adds both scram-sha-256 and md5 methods

## Prevention

### Best Practices
1. **Use consistent passwords** across all services
2. **Don't manually modify** PostgreSQL data directory
3. **Monitor logs** for early detection of issues
4. **Use proper shutdown** procedures for containers

### Docker Compose Configuration
Ensure proper volume configuration:
```yaml
volumes:
  postgres_data:
    driver: local
```

### Environment Variables
Use consistent database credentials:
```yaml
environment:
  POSTGRES_DB: certificate_db
  POSTGRES_USER: postgres
  POSTGRES_PASSWORD: postgres
```

## Monitoring

### Log Monitoring
Watch for these patterns in logs:
- `password authentication failed` - Authentication issue detected
- `PostgreSQL authentication issue fixed` - Fix successful
- `Could not automatically fix` - Manual intervention needed

### Health Checks
The Docker Compose configuration includes health checks:
```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U postgres"]
  interval: 5s
  timeout: 5s
  retries: 5
```

## Security Considerations

### Password Security
- Default password `postgres` is for development only
- Change to strong password in production
- Use environment variables for password management

### Authentication Methods
- `scram-sha-256` is more secure than `md5`
- `md5` is kept as fallback for compatibility
- Consider removing `md5` in production if not needed

### Data Directory Security
- Ensure proper file permissions (700 for data directory)
- Use appropriate user ownership (postgres:postgres)
- Regularly backup important data

## Production Deployment

### Password Management
1. **Use strong passwords** instead of default `postgres`
2. **Store passwords securely** using Docker secrets or environment files
3. **Rotate passwords regularly** following security policies

### Monitoring Setup
1. **Set up log aggregation** to monitor authentication issues
2. **Configure alerts** for authentication failures
3. **Regular health checks** to detect issues early

### Backup Strategy
1. **Regular backups** of PostgreSQL data
2. **Test restore procedures** regularly
3. **Off-site backup storage** for disaster recovery

This solution provides robust handling of PostgreSQL authentication issues while maintaining security and reliability in both development and production environments.