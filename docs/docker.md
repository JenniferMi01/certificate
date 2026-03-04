# Guide Docker

Reference complete des commandes Docker pour le projet Certificate Management System.

## Services

| Service | Container | Image | Port |
|---------|-----------|-------|------|
| `db` | certificate_database | postgres:16-alpine | 15432:5432 |
| `backend` | certificate_backend | python:3.12-slim + gunicorn | 8000:8000 |
| `frontend` | certificate_frontend | nginx:alpine (build: bun + vite) | 8080:80 |
| `odoo_api` | certificate_odoo_api | python:3.12-slim + gunicorn/uvicorn | 5000:5000 |

## Commandes de Base

### Build et Demarrage

```bash
# Construire et demarrer tous les services
docker compose up --build -d

# Demarrer sans reconstruire
docker compose up -d

# Demarrer un service specifique
docker compose up -d backend
docker compose up -d frontend

# Construire sans demarrer
docker compose build

# Reconstruire un service specifique
docker compose build --no-cache backend
docker compose build --no-cache frontend
```

### Arret

```bash
# Arreter tous les services
docker compose down

# Arreter et supprimer les volumes (reset base de donnees)
docker compose down -v

# Arreter un service specifique
docker compose stop backend
```

### Redemarrage

```bash
# Redemarrer tous les services
docker compose restart

# Redemarrer un service specifique
docker compose restart backend

# Recreer un conteneur (applique les changements de compose.yml)
docker compose up -d --force-recreate backend
```

## Surveillance et Logs

### Logs

```bash
# Voir les logs de tous les services
docker compose logs

# Suivre les logs en temps reel
docker compose logs -f

# Logs d'un service specifique
docker compose logs backend
docker compose logs -f frontend

# Logs avec limite de lignes
docker compose logs --tail=100 backend

# Logs avec timestamp
docker compose logs -t backend
```

### Statut

```bash
# Voir l'etat de tous les services
docker compose ps

# Voir les processus dans un conteneur
docker compose top backend

# Voir l'utilisation des ressources
docker stats
```

## Gestion de la Base de Donnees

### Django Migrations

```bash
# Appliquer les migrations
docker compose exec backend python manage.py migrate

# Creer de nouvelles migrations
docker compose exec backend python manage.py makemigrations

# Voir le statut des migrations
docker compose exec backend python manage.py showmigrations

# Revenir a une migration specifique
docker compose exec backend python manage.py migrate attestations 0001
```

### Administration Django

```bash
# Creer un superutilisateur
docker compose exec backend python manage.py createsuperuser

# Ouvrir le shell Django
docker compose exec backend python manage.py shell

# Importer des employes depuis un CSV
docker compose exec backend python manage.py import_employees --csv-file /app/data.csv

# Import en mode test
docker compose exec backend python manage.py import_employees --csv-file /app/data.csv --dry-run

# Collecter les fichiers statiques
docker compose exec backend python manage.py collectstatic --noinput
```

### PostgreSQL Direct

```bash
# Se connecter a la base PostgreSQL
docker compose exec db psql -U postgres -d certificate_db

# Executer une requete SQL
docker compose exec db psql -U postgres -d certificate_db -c "SELECT * FROM attestations_employe LIMIT 5;"

# Exporter la base de donnees (backup)
docker compose exec db pg_dump -U postgres certificate_db > backup.sql

# Importer un backup
docker compose exec -T db psql -U postgres certificate_db < backup.sql

# Se connecter depuis la machine hote
psql -h localhost -p 15432 -U postgres -d certificate_db
```

## Acces aux Conteneurs

```bash
# Ouvrir un shell bash dans le backend
docker compose exec backend bash

# Ouvrir un shell dans le frontend (nginx)
docker compose exec frontend sh

# Ouvrir un shell dans l'API Odoo
docker compose exec odoo_api bash

# Ouvrir un shell dans la base de donnees
docker compose exec db bash
```

## Gestion des Images et Volumes

### Images

```bash
# Lister les images du projet
docker compose images

# Supprimer les images non utilisees
docker image prune

# Supprimer toutes les images du projet
docker compose down --rmi all
```

### Volumes

```bash
# Lister les volumes
docker volume ls

# Inspecter un volume
docker volume inspect certificate_postgres_data

# Supprimer tous les volumes orphelins
docker volume prune
```

## Debugging

### Verifier la sante des services

```bash
# Etat de sante de tous les conteneurs
docker compose ps

# Verifier les healthchecks
docker inspect --format='{{json .State.Health}}' certificate_database | python -m json.tool
docker inspect --format='{{json .State.Health}}' certificate_odoo_api | python -m json.tool
```

### Reseau

```bash
# Lister les reseaux Docker
docker network ls

# Inspecter le reseau du projet
docker network inspect certificate_default

# Tester la connectivite entre conteneurs
docker compose exec backend ping db
docker compose exec frontend ping backend
```

### Problemes Courants

**Port deja utilise :**
```bash
# Trouver le processus sur le port
sudo lsof -i :8080
# ou
sudo ss -tlnp | grep 8080

# Changer le port dans compose.yml (ex: "9090:80" au lieu de "8080:80")
```

**Conteneur en conflit :**
```bash
# Supprimer un conteneur existant
docker rm -f certificate_odoo_api

# Puis relancer
docker compose up -d
```

**Erreur de build (cache) :**
```bash
# Reconstruire sans cache
docker compose build --no-cache

# Nettoyer le cache de build
docker builder prune
```

**Base de donnees corrompue / reset :**
```bash
# Supprimer le volume et recreer
docker compose down -v
docker compose up --build -d
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py createsuperuser
```

## Mise a Jour en Production

```bash
# 1. Tirer les dernieres modifications
git pull origin main

# 2. Reconstruire les images modifiees
docker compose build

# 3. Redemarrer avec les nouvelles images
docker compose up -d

# 4. Appliquer les migrations si necessaire
docker compose exec backend python manage.py migrate
```

## Variables d'Environnement

Les variables sont definies dans `compose.yml` et `.env` :

```bash
# Verifier les variables d'un conteneur
docker compose exec backend env

# Verifier une variable specifique
docker compose exec backend printenv DATABASE_URL
```

## Architecture Docker

```
Host Machine
│
├── :8080  ──► certificate_frontend (nginx:alpine)
│                 ├── /          → fichiers statiques React
│                 ├── /api/*     → proxy → certificate_backend:8000
│                 ├── /employees → proxy → certificate_odoo_api:5000
│                 ├── /admin/*   → proxy → certificate_backend:8000
│                 └── /static/*  → proxy → certificate_backend:8000
│
├── :8000  ──► certificate_backend (python:3.12 + gunicorn)
│                 └── Django REST Framework → PostgreSQL
│
├── :5000  ──► certificate_odoo_api (python:3.12 + gunicorn/uvicorn)
│                 └── FastAPI → Odoo XML-RPC
│
└── :15432 ──► certificate_database (postgres:16-alpine)
                  └── Volume: postgres_data
```
