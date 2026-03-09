FROM python:3.12-slim

WORKDIR /app

# Replace Debian mirror with Malagasy mirror
RUN sed -i 's|http://deb.debian.org/debian|http://mirror.malagasy.com/debian|g' /etc/apt/sources.list.d/debian.sources \
 && sed -i 's|http://security.debian.org/debian-security|http://mirror.malagasy.com/debian-security|g' /etc/apt/sources.list.d/debian.sources

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Install Gunicorn
RUN pip install gunicorn

# Expose port
EXPOSE 5000

# Start the application with Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "3", "--timeout", "120", "--worker-class", "uvicorn.workers.UvicornWorker", "main:app"]
