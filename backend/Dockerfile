FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Replace Debian mirror with Malagasy mirror
RUN sed -i 's|http://deb.debian.org/debian|http://mirror.malagasy.com/debian|g' /etc/apt/sources.list.d/debian.sources \
 && sed -i 's|http://security.debian.org/debian-security|http://mirror.malagasy.com/debian-security|g' /etc/apt/sources.list.d/debian.sources

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    postgresql-client \
    cron \
    && rm -rf /var/lib/apt/lists/*

# Setup cron service
RUN mkdir -p /var/log && touch /var/log/db-backup.log

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Make scripts executable
RUN chmod +x entrypoint.sh
RUN chmod +x scripts/backup_db.sh
RUN chmod +x scripts/restore_db.sh
RUN chmod +x scripts/setup_cron.sh
RUN chmod +x scripts/fix_postgres_auth.sh

EXPOSE 8000

# Use entrypoint script
ENTRYPOINT ["./entrypoint.sh"]
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]
