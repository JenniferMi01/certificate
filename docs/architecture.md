# Certificate Project Architecture

## System Overview

This document describes the architecture of the Certificate Management System for Gulfsat Madagascar and Blueline.

## Architecture Diagram

```mermaid
graph TB
    subgraph "External Access"
        User[User Browser] -->|HTTPS 443| LB[Load Balancer/Reverse Proxy]
        LB -->|HTTP 80| Nginx[Frontend Nginx]
    end

    subgraph "Frontend Layer"
        Nginx -->|SPA| React[React Application]
        React -->|API Calls| BackendAPI[Backend API]
        React -->|API Calls| OdooAPI[Odoo API]
    end

    subgraph "Backend Services"
        BackendAPI[Backend API<br/>Django + Gunicorn] -->|Database Queries| DB[(PostgreSQL)]
        BackendAPI -->|Static Files| Static[Static Files Volume]
        BackendAPI -->|Auth| JWT[JWT Authentication]
        
        OdooAPI[Odoo API<br/>FastAPI + Gunicorn] -->|XML-RPC| OdooERP[Odoo ERP]
        
        Backup[Backup Service<br/>Cron Jobs] -->|Backup Files| BackupVol[Backup Volume]
    end

    subgraph "Infrastructure"
        DB -->|Persistent Storage| DBVol[PostgreSQL Volume]
        Static -->|Shared Storage| StaticVol[Static Files Volume]
        BackupVol -->|Persistent Storage| BackupData[Backup Data Volume]
    end

    subgraph "Development & Deployment"
        Docker[Docker Compose] -->|Container Orchestration| AllServices[All Services]
        CI[CI/CD Pipeline] -->|Build & Deploy| Docker
    end

    %% Styling
    classDef frontend fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef backend fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef database fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef external fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef infrastructure fill:#f1f8e9,stroke:#33691e,stroke-width:2px

    class Nginx,React frontend
    class BackendAPI,OdooAPI,JWT backend
    class DB,BackupVol database
    class User,LB,OdooERP external
    class Docker,CI,AllServices,StaticVol,BackupData,Static infrastructure
```

## Component Details

### Frontend Layer
- **React Application**: Modern React 19 SPA with Vite 5 bundler
- **Nginx**: Reverse proxy and static file server
- **Mantine UI**: Component library for consistent UI
- **TailwindCSS**: Utility-first CSS framework

### Backend Services
- **Django API**: RESTful API with Django REST Framework
- **FastAPI Odoo Connector**: XML-RPC bridge to Odoo ERP
- **Gunicorn**: WSGI server for Python applications
- **PostgreSQL**: Primary database for application data

### Infrastructure
- **Docker Compose**: Container orchestration
- **Volumes**: Persistent storage for database, static files, and backups
- **Health Checks**: Service monitoring and auto-recovery
- **Environment Variables**: Configuration management

## Data Flow

1. **User Authentication**: JWT-based authentication through Django
2. **Employee Data**: Synced from Odoo ERP via FastAPI connector
3. **Document Generation**: PDF generation for certificates and attestations
4. **Backup System**: Automated database backups every 10 minutes

## Security Features
- JWT token authentication with expiration
- CORS configuration for cross-origin requests
- Database connection security
- Environment variable management
- Container isolation