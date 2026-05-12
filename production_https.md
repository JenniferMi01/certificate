
# Developer Documentation
## HTTP → HTTPS Migration Guide

Domain: `certificate-dev.blueline.mg`

---

# 1. Architecture Overview

```text
Internet
   │
HTTPS :443
   │
NGINX (frontend container)
   │
├── React SPA
├── Django API
├── Django Admin
└── Odoo API
```

---

# 2. Configure DNS

Create an `A` record:

```text
Type: A
Host: certificate-dev
Value: YOUR_SERVER_PUBLIC_IP
TTL: Auto
```

Verify:

```bash
ping certificate-dev.blueline.mg
nslookup certificate-dev.blueline.mg
```

---

# 3. Open Firewall Ports

```bash
sudo ufw allow 80
sudo ufw allow 443
sudo ufw reload
```

---

# 4. Install Certbot

```bash
sudo apt update
sudo apt install certbot -y
```

---

# 5. Update Docker Compose

Replace:

```yaml
frontend:
  ports:
    - "80:80"
```

With:

```yaml
frontend:
  ports:
    - "80:80"
    - "443:443"
```

Add SSL volume:

```yaml
frontend:
  volumes:
    - static_files:/app/staticfiles:ro
    - /etc/letsencrypt:/etc/letsencrypt:ro
```

---

# 6. Generate SSL Certificate

Stop containers:

```bash
docker compose down
```

Generate certificate:

```bash
sudo certbot certonly --standalone -d certificate-dev.blueline.mg
```

Certificate path:

```text
/etc/letsencrypt/live/certificate-dev.blueline.mg/
```

---

# 7. Nginx HTTP Redirect

```nginx
server {
    listen 80;
    server_name certificate-dev.blueline.mg;

    return 301 https://$host$request_uri;
}
```

---

# 8. Nginx HTTPS Configuration

```nginx
server {
    listen 443 ssl http2;
    server_name certificate-dev.blueline.mg;

    ssl_certificate /etc/letsencrypt/live/certificate-dev.blueline.mg/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/certificate-dev.blueline.mg/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;

    client_max_body_size 10M;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto https;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Real-IP $remote_addr;

    location /api/ {
        proxy_pass http://django_backend;
    }

    location /admin/ {
        proxy_pass http://django_backend;
    }

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

---

# 9. Django HTTPS Settings

```python
ALLOWED_HOSTS = [
    "certificate-dev.blueline.mg",
    "localhost",
    "127.0.0.1",
]

CSRF_TRUSTED_ORIGINS = [
    "https://certificate-dev.blueline.mg",
]

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

SECURE_SSL_REDIRECT = False
```

---

# 10. Rebuild Containers

```bash
docker compose down
docker compose up -d --build
```

---

# 11. SSL Renewal

```bash
sudo certbot renew --dry-run
```

Add cron:

```bash
0 3 * * * certbot renew --quiet && docker restart certificate_frontend
```

---

# 12. Production Security Recommendations

Remove exposed ports:

```yaml
backend:
  ports:
    - "8000:8000"

odoo_api:
  ports:
    - "5000:5000"
```

Keep only:

```yaml
frontend:
  ports:
    - "80:80"
    - "443:443"
```

This ensures all traffic passes through Nginx securely.
