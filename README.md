# Certificate Management System

Systeme de gestion des attestations et certificats RH pour **Gulfsat Madagascar** et **Blueline**.

## Apercu

Application web trois tiers permettant de generer des documents officiels RH :
- **Attestation de Travail** - Preuve d'emploi actuel
- **Attestation de Conge** - Confirmation de periode de conge
- **Certificat de Travail** - Document de fin de contrat

Le systeme s'integre avec **Odoo ERP** pour synchroniser les donnees employes en temps reel.

## Stack Technique

| Composant | Technologie |
|-----------|-------------|
| Frontend | React 19, Vite 5, Mantine UI 8, TailwindCSS 4 |
| Backend | Django 5.2, Django REST Framework 3.16, SimpleJWT |
| Odoo API | FastAPI, XML-RPC (Odoo connector) |
| Base de donnees | PostgreSQL 16 (production), SQLite (developpement) |
| Serveur web | Nginx (reverse proxy + SPA) |
| WSGI | Gunicorn |
| Package Manager | Bun (frontend), pip (backend) |
| Conteneurisation | Docker, Docker Compose |

## Structure du Projet

```
certificate/
├── backend/                  # Django REST API
│   ├── backend/              # Configuration Django (settings, urls, wsgi)
│   ├── attestations/         # App principale (models, views, serializers)
│   ├── static/               # Fichiers statiques source
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/                 # Application React
│   ├── src/
│   │   ├── components/       # Composants React (Dashboard, Login, models/)
│   │   ├── utils/            # Fonctions utilitaires
│   │   ├── AuthContext.jsx   # Contexte d'authentification JWT
│   │   └── App.jsx           # Routes et layout
│   ├── nginx.conf            # Configuration Nginx production
│   ├── package.json
│   └── Dockerfile
├── odoo_api/                 # Connecteur Odoo (FastAPI)
│   ├── main.py               # Endpoints FastAPI
│   ├── odoo_client.py        # Client XML-RPC Odoo
│   ├── requirements.txt
│   └── Dockerfile
├── compose.yml               # Orchestration Docker
├── .env                      # Variables d'environnement
└── README.md
```

## Demarrage Rapide

### Prerequis

- [Docker](https://docs.docker.com/get-docker/) et Docker Compose
- Acces au serveur Odoo (configurer dans `.env`)

### Installation

1. **Cloner le depot**
```bash
git clone <repository-url>
cd certificate
```

2. **Configurer les variables d'environnement**
```bash
cp .env.example .env
# Editer .env avec vos identifiants Odoo
```

3. **Lancer avec Docker**
```bash
docker compose up --build -d
```

4. **Initialiser la base de donnees**
```bash
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py createsuperuser
```

5. **Acceder a l'application**

| Service | URL |
|---------|-----|
| Frontend | http://localhost:8080 |
| Backend API | http://localhost:8000/api/ |
| Django Admin | http://localhost:8000/admin/ |
| Odoo API | http://localhost:5000 |
| PostgreSQL | localhost:15432 |

### Developpement local (sans Docker)

**Backend :**
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**Frontend :**
```bash
cd frontend
bun install
bun run dev
```

**Odoo API :**
```bash
cd odoo_api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 5000
```

## Endpoints API

### Authentification

| Methode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/login/` | Obtenir un token JWT (access + refresh) |
| POST | `/api/logout/` | Invalider le refresh token |
| POST | `/api/refresh/` | Renouveler l'access token |
| POST | `/api/token/verify/` | Verifier la validite d'un token |
| GET | `/api/me/` | Informations de l'utilisateur connecte |
| POST | `/api/attestations/signup/` | Creer un compte utilisateur |

### Employes

| Methode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/attestations/employes/` | Liste des employes |
| POST | `/api/attestations/employes/` | Creer un employe |
| GET | `/api/attestations/employes/{id}/` | Detail d'un employe |
| PUT | `/api/attestations/employes/{id}/` | Modifier un employe |
| DELETE | `/api/attestations/employes/{id}/` | Supprimer un employe |

### Historique de Postes

| Methode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/attestations/postes/` | Liste des historiques |
| POST | `/api/attestations/postes/` | Creer un historique |
| GET | `/api/attestations/postes/{id}/` | Detail |
| PUT | `/api/attestations/postes/{id}/` | Modifier |
| DELETE | `/api/attestations/postes/{id}/` | Supprimer |

### Conges

| Methode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/attestations/conges/` | Liste des conges |
| POST | `/api/attestations/conges/` | Creer un conge |
| GET | `/api/attestations/conges/{id}/` | Detail |
| PUT | `/api/attestations/conges/{id}/` | Modifier |
| DELETE | `/api/attestations/conges/{id}/` | Supprimer |

### Documents (sans authentification)

| Methode | Endpoint | Description |
|---------|----------|-------------|
| GET/POST | `/api/attestations/attestation-travail/` | Attestations de travail |
| GET/POST | `/api/attestations/attestation-conge/` | Attestations de conge |
| GET/POST | `/api/attestations/certificat-travail/` | Certificats de travail |

### Odoo API (connecteur)

| Methode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/partners` | Liste des partenaires Odoo |
| GET | `/employees` | Liste des employes Odoo |
| GET | `/employees/{id}` | Detail d'un employe Odoo |
| GET | `/employees/search?name=&number=` | Recherche d'employes |

## Variables d'Environnement

### Fichier `.env` (racine)

| Variable | Description | Exemple |
|----------|-------------|---------|
| `ODOO_URL` | URL du serveur Odoo | `http://odoo.example.com` |
| `ODOO_DB` | Nom de la base Odoo | `MyOdooDB` |
| `ODOO_USER` | Utilisateur Odoo | `user@example.com` |
| `ODOO_PASSWORD` | Mot de passe Odoo | `password` |

### Backend (via `compose.yml`)

| Variable | Description | Defaut |
|----------|-------------|--------|
| `SECRET_KEY` | Cle secrete Django | *(obligatoire en production)* |
| `DEBUG` | Mode debug (`0` ou `1`) | `0` |
| `ALLOWED_HOSTS` | Hotes autorises (separes par `,`) | `localhost,127.0.0.1,backend` |
| `DATABASE_URL` | URL PostgreSQL | `postgresql://user:pass@db:5432/dbname` |
| `CORS_ALLOWED_ORIGINS` | Origines CORS (separes par `,`) | `http://localhost:8080` |

### Frontend (build time)

| Variable | Description | Defaut |
|----------|-------------|--------|
| `VITE_API_BASE_DJANGO` | URL du backend Django | `http://localhost:8000` |
| `VITE_API_BASE_ODOO` | URL de l'API Odoo | `http://localhost:5000` |

## Modeles de Donnees

Voir [docs/architecture.md](docs/architecture.md) pour les diagrammes complets.

### Resume

- **Employe** - Matricule, identite, CIN, date d'embauche, statut CDI
- **PosteHistorique** - Historique des postes occupes par employe
- **Conge** - Demandes de conge avec approbation
- **AttestationTravail** - Documents d'attestation de travail generes
- **AttestationConge** - Documents d'attestation de conge generes
- **CertificatTravail** - Certificats de travail generes

## Commandes Docker

Voir [docs/docker.md](docs/docker.md) pour la reference complete des commandes Docker.

## Commandes de Gestion

```bash
# Importer des employes depuis un CSV
docker compose exec backend python manage.py import_employees --csv-file data.csv

# Importer en mode test (sans ecriture)
docker compose exec backend python manage.py import_employees --csv-file data.csv --dry-run

# Generer le diagramme de classes
docker compose exec backend python manage.py graph_models attestations -o class_diagram.png
```

## Securite

- Authentification JWT avec expiration (access: 1 jour, refresh: 7 jours)
- Token blacklist a la deconnexion
- Protection CORS configuree par origines
- Validation de mots de passe Django (longueur, complexite)
- Protection CSRF activee
- ORM Django contre les injections SQL
