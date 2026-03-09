# Certificate Project - Complete Overview

## Project Structure and Organization

```mermaid
graph TB
    subgraph "Certificate Management System"
        subgraph "📁 Root Directory"
            README[📄 README.md]
            COMPOSE[📄 compose.yml]
            ENV[📄 .env files]
            SCRIPTS[📁 scripts/]
            DOCS[📁 docs/]
        end
        
        subgraph "📁 Backend (Django)"
            BACKEND[📁 backend/]
            BACKEND_SETTINGS[📄 settings.py]
            BACKEND_URLS[📄 urls.py]
            BACKEND_WSGI[📄 wsgi.py]
            
            subgraph "📁 attestations/ (App)"
                MODELS[📄 models/]
                VIEWS[📄 views/]
                SERIALIZERS[📄 serializers.py]
                ADMIN[📄 admin.py]
                URLS[📄 urls.py]
                
                subgraph "📁 models/"
                    EMP_MODEL[📄 employe.py]
                    POSTE_MODEL[📄 postehistorique.py]
                    CONGE_MODEL[📄 conge.py]
                    ATTEST_TRAVAIL[📄 attestation_travail.py]
                    ATTEST_CONGE[📄 attestation_conge.py]
                    CERTIF_TRAVAIL[📄 certificat_travail.py]
                end
                
                subgraph "📁 views/"
                    EMP_VIEW[📄 employes_views.py]
                    POSTE_VIEW[📄 postehistorique_views.py]
                    CONGE_VIEW[📄 conge_views.py]
                    LOGIN_VIEW[📄 login_views.py]
                end
            end
            
            subgraph "📁 management/commands/"
                IMPORT_CMD[📄 import_employees.py]
                CREATE_RH[📄 create_rh_users.py]
            end
            
            subgraph "📁 scripts/"
                BACKUP_SCRIPT[📄 backup_db.sh]
                RESTORE_SCRIPT[📄 restore_db.sh]
                CRON_SCRIPT[📄 setup_cron.sh]
                TEST_SCRIPT[📄 test_backup_restore.sh]
            end
        end
        
        subgraph "📁 Frontend (React)"
            FRONTEND[📁 frontend/]
            PACKAGE[📄 package.json]
            VITE[📄 vite.config.js]
            NGINX_CONF[📄 nginx.conf]
            
            subgraph "📁 src/"
                APP[📄 App.jsx]
                MAIN[📄 main.jsx]
                AUTH[📄 AuthContext.jsx]
                
                subgraph "📁 components/"
                    LOGIN[📄 Login.jsx]
                    DASHBOARD[📄 Dashboard.jsx]
                    SIDEBAR[📄 Sidebar.jsx]
                    STATS[📄 StatsGrid.jsx]
                    CHARTS[📄 ChartsSection.jsx]
                    DOCS_TABLE[📄 DocumentsTable.jsx]
                    
                    subgraph "📁 models/"
                        ATTEST_TRAVAIL_COMP[📄 AttestationTravail.jsx]
                        ATTEST_CONGE_COMP[📄 AttestationConge.jsx]
                        CERTIF_TRAVAIL_COMP[📄 CertificatTravail.jsx]
                        
                        subgraph "📁 assets/"
                            CSS[📁 css/]
                            JS[📁 js/]
                            IMG[📁 img/]
                        end
                    end
                end
            end
        end
        
        subgraph "📁 Odoo API (FastAPI)"
            ODOO_API[📁 odoo_api/]
            ODOO_MAIN[📄 main.py]
            ODOO_CLIENT[📄 odoo_client.py]
            ODOO_REQUIREMENTS[📄 requirements.txt]
            
            subgraph "📁 Connectors/"
                XML_RPC[📄 XML-RPC Bridge]
                ODOO_DB[📄 Odoo Database]
            end
        end
    end
    
    %% Connections
    README --> COMPOSE
    COMPOSE --> BACKEND
    COMPOSE --> FRONTEND
    COMPOSE --> ODOO_API
    
    BACKEND --> BACKEND_SETTINGS
    BACKEND --> BACKEND_URLS
    BACKEND --> BACKEND_WSGI
    
    BACKEND_SETTINGS --> MODELS
    BACKEND_URLS --> VIEWS
    VIEWS --> SERIALIZERS
    
    MODELS --> EMP_MODEL
    MODELS --> POSTE_MODEL
    MODELS --> CONGE_MODEL
    MODELS --> ATTEST_TRAVAIL
    MODELS --> ATTEST_CONGE
    MODELS --> CERTIF_TRAVAIL
    
    VIEWS --> EMP_VIEW
    VIEWS --> POSTE_VIEW
    VIEWS --> CONGE_VIEW
    VIEWS --> LOGIN_VIEW
    
    FRONTEND --> APP
    FRONTEND --> PACKAGE
    FRONTEND --> VITE
    FRONTEND --> NGINX_CONF
    
    APP --> LOGIN
    APP --> DASHBOARD
    APP --> SIDEBAR
    
    DASHBOARD --> STATS
    DASHBOARD --> CHARTS
    DASHBOARD --> DOCS_TABLE
    
    DOCS_TABLE --> ATTEST_TRAVAIL_COMP
    DOCS_TABLE --> ATTEST_CONGE_COMP
    DOCS_TABLE --> CERTIF_TRAVAIL_COMP
    
    ODOO_API --> ODOO_MAIN
    ODOO_API --> ODOO_CLIENT
    ODOO_MAIN --> XML_RPC
    XML_RPC --> ODOO_DB
    
    %% Styling
    classDef root fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef backend fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    classDef frontend fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef odoo fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef file fill:#ffffff,stroke:#000000,stroke-width:1px
    classDef folder fill:#f5f5f5,stroke:#9e9e9e,stroke-width:1px
    
    class README,COMPOSE,ENV,SCRIPTS,DOCS root
    class BACKEND,BACKEND_SETTINGS,BACKEND_URLS,BACKEND_WSGI,MODELS,VIEWS,SERIALIZERS,ADMIN,URLS,EMP_MODEL,POSTE_MODEL,CONGE_MODEL,ATTEST_TRAVAIL,ATTEST_CONGE,CERTIF_TRAVAIL,EMP_VIEW,POSTE_VIEW,CONGE_VIEW,LOGIN_VIEW,IMPORT_CMD,CREATE_RH,BACKUP_SCRIPT,RESTORE_SCRIPT,CRON_SCRIPT,TEST_SCRIPT backend
    class FRONTEND,PACKAGE,VITE,NGINX_CONF,APP,MAIN,AUTH,LOGIN,DASHBOARD,SIDEBAR,STATS,CHARTS,DOCS_TABLE,ATTEST_TRAVAIL_COMP,ATTEST_CONGE_COMP,CERTIF_TRAVAIL_COMP,CSS,JS,IMG frontend
    class ODOO_API,ODOO_MAIN,ODOO_CLIENT,ODOO_REQUIREMENTS,XML_RPC,ODOO_DB odoo
    class README,COMPOSE,ENV,SCRIPTS,DOCS,BACKEND_SETTINGS,BACKEND_URLS,BACKEND_WSGI,MODELS,VIEWS,SERIALIZERS,ADMIN,URLS,EMP_MODEL,POSTE_MODEL,CONGE_MODEL,ATTEST_TRAVAIL,ATTEST_CONGE,CERTIF_TRAVAIL,EMP_VIEW,POSTE_VIEW,CONGE_VIEW,LOGIN_VIEW,IMPORT_CMD,CREATE_RH,BACKUP_SCRIPT,RESTORE_SCRIPT,CRON_SCRIPT,TEST_SCRIPT,FRONTEND,PACKAGE,VITE,NGINX_CONF,APP,MAIN,AUTH,LOGIN,DASHBOARD,SIDEBAR,STATS,CHARTS,DOCS_TABLE,ATTEST_TRAVAIL_COMP,ATTEST_CONGE_COMP,CERTIF_TRAVAIL_COMP,CSS,JS,IMG,ODOO_API,ODOO_MAIN,ODOO_CLIENT,ODOO_REQUIREMENTS,XML_RPC,ODOO_DB file
```

## Technology Stack Integration

```mermaid
graph LR
    subgraph "🌐 Frontend Layer"
        REACT[React 19]
        VITE[Vite 5]
        MANTINE[Mantine UI 8]
        TAILWIND[TailwindCSS 4]
        BUN[Bun Package Manager]
    end
    
    subgraph "🔗 Communication"
        NGINX[Nginx Reverse Proxy]
        CORS[CORS Configuration]
        JWT[JWT Authentication]
    end
    
    subgraph "⚙️ Backend Layer"
        DJANGO[Django 5.2]
        DRF[Django REST Framework 3.16]
        SIMPLEJWT[SimpleJWT]
        GUNICORN[Gunicorn WSGI]
    end
    
    subgraph "🗄️ Data Layer"
        POSTGRES[PostgreSQL 16]
        SQLITE[SQLite (Dev)]
    end
    
    subgraph "🔌 Integration Layer"
        FASTAPI[FastAPI]
        XMLRPC[XML-RPC Protocol]
        ODOO[Odoo ERP]
    end
    
    subgraph "📦 Containerization"
        DOCKER[Docker]
        COMPOSE[Docker Compose]
        VOLUMES[Volumes & Storage]
    end
    
    %% Connections
    REACT --> VITE
    VITE --> MANTINE
    MANTINE --> TAILWIND
    TAILWIND --> BUN
    
    BUN --> NGINX
    NGINX --> DJANGO
    NGINX --> FASTAPI
    CORS --> DJANGO
    JWT --> DJANGO
    
    DJANGO --> DRF
    DRF --> SIMPLEJWT
    SIMPLEJWT --> GUNICORN
    GUNICORN --> POSTGRES
    
    FASTAPI --> XMLRPC
    XMLRPC --> ODOO
    
    DOCKER --> COMPOSE
    COMPOSE --> VOLUMES
    VOLUMES --> POSTGRES
    
    %% Styling
    classDef frontend fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef backend fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    classDef data fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef integration fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef container fill:#e0f2f1,stroke:#00695c,stroke-width:2px
    
    class REACT,VITE,MANTINE,TAILWIND,BUN,NGINX,CORS,JWT frontend
    class DJANGO,DRF,SIMPLEJWT,GUNICORN backend
    class POSTGRES,SQLITE data
    class FASTAPI,XMLRPC,ODOO integration
    class DOCKER,COMPOSE,VOLUMES container
```

## Development Workflow

```mermaid
flowchart TD
    Start[Project Start] --> Setup[Environment Setup]
    
    Setup -->|Backend| BackendSetup[Backend Setup]
    Setup -->|Frontend| FrontendSetup[Frontend Setup]
    Setup -->|Odoo API| OdooSetup[Odoo API Setup]
    
    BackendSetup --> BackendEnv[Create Virtual Environment]
    BackendEnv --> BackendInstall[Install Dependencies]
    BackendInstall --> BackendMigrate[Run Migrations]
    BackendMigrate --> BackendSuperuser[Create Superuser]
    
    FrontendSetup --> FrontendInstall[Install Dependencies]
    FrontendInstall --> FrontendDev[Start Development Server]
    
    OdooSetup --> OdooEnv[Create Virtual Environment]
    OdooEnv --> OdooInstall[Install Dependencies]
    OdooInstall --> OdooRun[Run Odoo API]
    
    BackendSuperuser --> DockerSetup[Docker Setup]
    FrontendDev --> DockerSetup
    OdooRun --> DockerSetup
    
    DockerSetup --> ComposeBuild[Build Docker Images]
    ComposeBuild --> ComposeUp[Start Services]
    ComposeUp --> Test[Testing]
    
    Test -->|Success| Deploy[Deployment]
    Test -->|Failed| Debug[Debug Issues]
    
    Deploy -->|Development| DevDeploy[Development Deployment]
    Deploy -->|Production| ProdDeploy[Production Deployment]
    
    DevDeploy --> Monitor[Monitoring]
    ProdDeploy --> Monitor
    
    Monitor --> Maintenance[Maintenance]
    Maintenance --> Backup[Backup Operations]
    Maintenance --> Updates[Updates & Patches]
    
    %% Styling
    classDef setup fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef docker fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    classDef deploy fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef monitor fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    
    class BackendSetup,FrontendSetup,OdooSetup,BackendEnv,BackendInstall,BackendMigrate,BackendSuperuser,FrontendInstall,FrontendDev,OdooEnv,OdooInstall,OdooRun setup
    class ComposeBuild,ComposeUp,DockerSetup docker
    class DevDeploy,ProdDeploy,Deploy deploy
    class Monitor,Maintenance,Backup,Updates monitor
```

## API Endpoints Map

```mermaid
graph TB
    subgraph "🔐 Authentication"
        LOGIN[POST /api/login/]
        LOGOUT[POST /api/logout/]
        REFRESH[POST /api/refresh/]
        VERIFY[POST /api/token/verify/]
        ME[GET /api/me/]
        SIGNUP[POST /api/attestations/signup/]
    end
    
    subgraph "👥 Employee Management"
        EMP_LIST[GET /api/attestations/employes/]
        EMP_CREATE[POST /api/attestations/employes/]
        EMP_DETAIL[GET /api/attestations/employes/{id}/]
        EMP_UPDATE[PUT /api/attestations/employes/{id}/]
        EMP_DELETE[DELETE /api/attestations/employes/{id}/]
    end
    
    subgraph "📋 Post History"
        POSTE_LIST[GET /api/attestations/postes/]
        POSTE_CREATE[POST /api/attestations/postes/]
        POSTE_DETAIL[GET /api/attestations/postes/{id}/]
        POSTE_UPDATE[PUT /api/attestations/postes/{id}/]
        POSTE_DELETE[DELETE /api/attestations/postes/{id}/]
    end
    
    subgraph "🏖️ Leave Management"
        CONGE_LIST[GET /api/attestations/conges/]
        CONGE_CREATE[POST /api/attestations/conges/]
        CONGE_DETAIL[GET /api/attestations/conges/{id}/]
        CONGE_UPDATE[PUT /api/attestations/conges/{id}/]
        CONGE_DELETE[DELETE /api/attestations/conges/{id}/]
    end
    
    subgraph "📄 Document Generation"
        ATTEST_TRAVAIL[GET/POST /api/attestations/attestation-travail/]
        ATTEST_CONGE[GET/POST /api/attestations/attestation-conge/]
        CERTIF_TRAVAIL[GET/POST /api/attestations/certificat-travail/]
    end
    
    subgraph "🔗 Odoo Integration"
        ODOO_PARTNERS[GET /partners]
        ODOO_EMPLOYEES[GET /employees]
        ODOO_EMP_DETAIL[GET /employees/{id}]
        ODOO_SEARCH[GET /employees/search?name=&number=]
    end
    
    %% Connections
    LOGIN --> EMP_LIST
    ME --> EMP_LIST
    SIGNUP --> EMP_LIST
    
    EMP_LIST --> POSTE_LIST
    EMP_LIST --> CONGE_LIST
    EMP_LIST --> ATTEST_TRAVAIL
    EMP_LIST --> ATTEST_CONGE
    EMP_LIST --> CERTIF_TRAVAIL
    
    POSTE_LIST --> ATTEST_TRAVAIL
    CONGE_LIST --> ATTEST_CONGE
    
    ODOO_EMPLOYEES --> EMP_LIST
    ODOO_SEARCH --> EMP_LIST
    
    %% Styling
    classDef auth fill:#ffebee,stroke:#d32f2f,stroke-width:2px
    classDef employee fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    classDef document fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef integration fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    
    class LOGIN,LOGOUT,REFRESH,VERIFY,ME,SIGNUP auth
    class EMP_LIST,EMP_CREATE,EMP_DETAIL,EMP_UPDATE,EMP_DELETE,POSTE_LIST,POSTE_CREATE,POSTE_DETAIL,POSTE_UPDATE,POSTE_DELETE employee
    class CONGE_LIST,CONGE_CREATE,CONGE_DETAIL,CONGE_UPDATE,CONGE_DELETE document
    class ATTEST_TRAVAIL,ATTEST_CONGE,CERTIF_TRAVAIL integration
    class ODOO_PARTNERS,ODOO_EMPLOYEES,ODOO_EMP_DETAIL,ODOO_SEARCH integration
```

## Security Architecture

```mermaid
graph TB
    subgraph "🛡️ Security Layers"
        subgraph "🌐 Network Security"
            FIREWALL[Firewall Rules]
            HTTPS[HTTPS/TLS Encryption]
            CORS[CORS Configuration]
        end
        
        subgraph "🔐 Authentication & Authorization"
            JWT_TOKEN[JWT Tokens]
            TOKEN_EXPIRY[Token Expiry]
            TOKEN_BLACKLIST[Token Blacklist]
            PERMISSIONS[Django Permissions]
            GROUPS[Django Groups]
        end
        
        subgraph "🔒 Data Security"
            DB_ENCRYPTION[Database Encryption]
            PASSWORD_HASH[Password Hashing]
            CSRF[CSRF Protection]
            SQL_INJECTION[SQL Injection Protection]
        end
        
        subgraph "🛡️ Application Security"
            INPUT_VALIDATION[Input Validation]
            XSS_PROTECTION[XSS Protection]
            RATE_LIMITING[Rate Limiting]
            LOGGING[Security Logging]
        end
        
        subgraph "📦 Container Security"
            DOCKER_SCANNING[Image Scanning]
            VOLUME_ISOLATION[Volume Isolation]
            NETWORK_ISOLATION[Network Isolation]
            PRIVILEGE_RESTRICTION[Privilege Restriction]
        end
    end
    
    %% Connections
    FIREWALL --> JWT_TOKEN
    HTTPS --> JWT_TOKEN
    CORS --> JWT_TOKEN
    
    JWT_TOKEN --> PERMISSIONS
    TOKEN_EXPIRY --> PERMISSIONS
    TOKEN_BLACKLIST --> PERMISSIONS
    PERMISSIONS --> GROUPS
    
    DB_ENCRYPTION --> INPUT_VALIDATION
    PASSWORD_HASH --> INPUT_VALIDATION
    CSRF --> INPUT_VALIDATION
    SQL_INJECTION --> INPUT_VALIDATION
    
    INPUT_VALIDATION --> RATE_LIMITING
    XSS_PROTECTION --> RATE_LIMITING
    RATE_LIMITING --> LOGGING
    
    DOCKER_SCANNING --> VOLUME_ISOLATION
    VOLUME_ISOLATION --> NETWORK_ISOLATION
    NETWORK_ISOLATION --> PRIVILEGE_RESTRICTION
    
    %% Styling
    classDef network fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef auth fill:#ffebee,stroke:#d32f2f,stroke-width:2px
    classDef data fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    classDef app fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef container fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    
    class FIREWALL,HTTPS,CORS network
    class JWT_TOKEN,TOKEN_EXPIRY,TOKEN_BLACKLIST,PERMISSIONS,GROUPS auth
    class DB_ENCRYPTION,PASSWORD_HASH,CSRF,SQL_INJECTION data
    class INPUT_VALIDATION,XSS_PROTECTION,RATE_LIMITING,LOGGING app
    class DOCKER_SCANNING,VOLUME_ISOLATION,NETWORK_ISOLATION,PRIVILEGE_RESTRICTION container
```

## Key Features Summary

### 📋 Document Types
- **Attestation de Travail** - Proof of current employment
- **Attestation de Conge** - Leave confirmation document  
- **Certificat de Travail** - Employment termination certificate

### 🔗 Integration Features
- **Odoo ERP Synchronization** - Real-time employee data sync
- **XML-RPC Protocol** - Secure communication with Odoo
- **Automated Data Import** - CSV import functionality

### 🛡️ Security Features
- **JWT Authentication** - Secure token-based auth
- **Role-based Access** - Admin, RH User, and Viewer roles
- **CORS Protection** - Cross-origin request security
- **Database Security** - Encrypted connections and data

### 🐳 Deployment Features
- **Docker Containerization** - Multi-service architecture
- **Automated Backups** - 10-minute interval database backups
- **Health Monitoring** - Service health checks
- **Volume Persistence** - Data persistence across restarts

### 🎨 User Interface
- **Modern React SPA** - Responsive single-page application
- **Mantine UI Components** - Professional component library
- **TailwindCSS Styling** - Utility-first CSS framework
- **Real-time Updates** - Live data synchronization

This comprehensive overview provides a complete picture of the Certificate Management System architecture, technology stack, and key features.