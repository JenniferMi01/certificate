# Docker Commands and Deployment Guide

## Docker Architecture Overview

```mermaid
graph TB
    subgraph "Development Environment"
        DevCompose[Docker Compose Dev] --> DevBackend[Backend Service]
        DevCompose --> DevFrontend[Frontend Service]
        DevCompose --> DevOdoo[Odoo API Service]
        DevCompose --> DevDB[PostgreSQL Service]
    end
    
    subgraph "Production Environment"
        ProdCompose[Docker Compose Prod] --> ProdBackend[Backend Service]
        ProdCompose --> ProdFrontend[Frontend Service]
        ProdCompose --> ProdOdoo[Odoo API Service]
        ProdCompose --> ProdDB[PostgreSQL Service]
    end
    
    subgraph "Docker Images"
        BackendImage[Backend Image<br/>Python + Django + Gunicorn]
        FrontendImage[Frontend Image<br/>React + Nginx]
        OdooImage[Odoo API Image<br/>FastAPI + Gunicorn]
        DBImage[PostgreSQL Image<br/>Official]
    end
    
    subgraph "Volumes & Storage"
        DBVol[PostgreSQL Volume<br/>Persistent Data]
        StaticVol[Static Files Volume<br/>Shared Storage]
        BackupVol[Backup Volume<br/>Automated Backups]
    end
    
    subgraph "Network & Ports"
        FrontendPort[Port 80:80<br/>Frontend Nginx]
        BackendPort[Port 8000:8000<br/>Django API]
        OdooPort[Port 5000:5000<br/>Odoo API]
        DBPort[Port 5432:5432<br/>PostgreSQL]
    end
    
    %% Connections
    DevBackend --> BackendImage
    DevFrontend --> FrontendImage
    DevOdoo --> OdooImage
    DevDB --> DBImage
    
    ProdBackend --> BackendImage
    ProdFrontend --> FrontendImage
    ProdOdoo --> OdooImage
    ProdDB --> DBImage
    
    DevDB --> DBVol
    DevBackend --> StaticVol
    DevBackend --> BackupVol
    
    ProdDB --> DBVol
    ProdBackend --> StaticVol
    ProdBackend --> BackupVol
    
    DevFrontend --> FrontendPort
    DevBackend --> BackendPort
    DevOdoo --> OdooPort
    DevDB --> DBPort
    
    ProdFrontend --> FrontendPort
    ProdBackend --> BackendPort
    ProdOdoo --> OdooPort
    ProdDB --> DBPort
    
    %% Styling
    classDef dev fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef prod fill:#ffebee,stroke:#d32f2f,stroke-width:2px
    classDef image fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef volume fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    classDef port fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    
    class DevCompose,DevBackend,DevFrontend,DevOdoo,DevDB dev
    class ProdCompose,ProdBackend,ProdFrontend,ProdOdoo,ProdDB prod
    class BackendImage,FrontendImage,OdooImage,DBImage image
    class DBVol,StaticVol,BackupVol volume
    class FrontendPort,BackendPort,OdooPort,DBPort port
```

## Essential Docker Commands

### Development Commands

```mermaid
flowchart TD
    Start[Development Start] --> Build[Build Images]
    Build --> Up[Start Services]
    Up --> Migrate[Run Migrations]
    Migrate --> Superuser[Create Superuser]
    Superuser --> Ready[Ready for Development]
    
    %% Development Operations
    Ready --> Code[Code Changes]
    Code -->|Auto-reload| Backend[Backend Auto-reload]
    Code -->|Hot Reload| Frontend[Frontend Hot Reload]
    
    %% Management Commands
    Ready --> Logs[View Logs]
    Ready --> Shell[Access Shell]
    Ready --> DB[Database Operations]
    
    %% Cleanup
    Ready --> Down[Stop Services]
    Down --> Clean[Clean Up]
    
    %% Detailed Commands
    Build -->|docker compose build| BuildCmd[Build Command]
    Up -->|docker compose up -d| UpCmd[Up Command]
    Migrate -->|docker compose exec backend python manage.py migrate| MigrateCmd[Migrate Command]
    Superuser -->|docker compose exec backend python manage.py createsuperuser| SuperuserCmd[Superuser Command]
    
    Logs -->|docker compose logs -f| LogsCmd[Logs Command]
    Shell -->|docker compose exec backend bash| ShellCmd[Shell Command]
    DB -->|docker compose exec db psql| DBCmd[DB Command]
    
    Down -->|docker compose down| DownCmd[Down Command]
    Clean -->|docker system prune| CleanCmd[Clean Command]
    
    %% Styling
    classDef command fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef operation fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    classDef management fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    
    class BuildCmd,UpCmd,MigrateCmd,SuperuserCmd,LogsCmd,ShellCmd,DBCmd,DownCmd,CleanCmd command
    class Backend,Frontend operation
    class Logs,Shell,DB management
```

### Production Deployment Commands

```mermaid
flowchart TD
    Start[Production Deployment] --> Stop[Stop Current Services]
    Stop --> Backup[Backup Database]
    Backup --> Pull[Pull Latest Images]
    Pull --> Build[Build New Images]
    Build --> Migrate[Run Migrations]
    Migrate --> Start[Start Services]
    Start --> Health[Health Check]
    Health -->|Success| Live[Live in Production]
    Health -->|Failed| Rollback[Rollback]
    
    %% Maintenance Commands
    Live --> Monitor[Monitor Services]
    Monitor --> Logs[View Logs]
    Monitor --> Metrics[Check Metrics]
    
    Live --> BackupDB[Database Backup]
    Live --> Update[Update Images]
    Live --> Scale[Scale Services]
    
    %% Emergency Commands
    Live --> Emergency[Emergency Procedures]
    Emergency --> Restart[Restart Services]
    Emergency --> Restore[Restore from Backup]
    Emergency --> Debug[Debug Issues]
    
    %% Commands Details
    Stop -->|docker compose down| StopCmd[Stop Command]
    Backup -->|pg_dump| BackupCmd[Backup Command]
    Pull -->|docker compose pull| PullCmd[Pull Command]
    Build -->|docker compose build| BuildCmd[Build Command]
    Migrate -->|docker compose exec backend python manage.py migrate| MigrateCmd[Migrate Command]
    Start -->|docker compose up -d| StartCmd[Start Command]
    
    Logs -->|docker compose logs -f| LogsCmd[Logs Command]
    Metrics -->|docker stats| MetricsCmd[Metrics Command]
    BackupDB -->|docker compose exec db pg_dump| BackupDBCmd[Backup DB Command]
    Update -->|docker compose pull && docker compose up -d| UpdateCmd[Update Command]
    
    Restart -->|docker compose restart| RestartCmd[Restart Command]
    Restore -->|docker compose exec db psql| RestoreCmd[Restore Command]
    Debug -->|docker compose exec backend bash| DebugCmd[Debug Command]
    
    %% Styling
    classDef deploy fill:#ffebee,stroke:#d32f2f,stroke-width:2px
    classDef maintenance fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    classDef emergency fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef command fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    
    class StopCmd,BackupCmd,PullCmd,BuildCmd,MigrateCmd,StartCmd deploy
    class LogsCmd,MetricsCmd,BackupDBCmd,UpdateCmd maintenance
    class RestartCmd,RestoreCmd,DebugCmd emergency
    class Stop,Backup,Pull,Build,Migrate,Start,Health,Monitor,BackupDB,Update,Scale,Emergency,Restart,Restore,Debug command
```

## Service Management Commands

### Individual Service Control

```mermaid
graph LR
    subgraph "Backend Service"
        BackendStart[Start Backend] --> BackendUp[Backend Up]
        BackendUp --> BackendLogs[View Logs]
        BackendLogs --> BackendShell[Access Shell]
        BackendShell --> BackendRestart[Restart]
    end
    
    subgraph "Frontend Service"
        FrontendStart[Start Frontend] --> FrontendUp[Frontend Up]
        FrontendUp --> FrontendLogs[View Logs]
        FrontendLogs --> FrontendShell[Access Shell]
        FrontendShell --> FrontendRestart[Restart]
    end
    
    subgraph "Odoo API Service"
        OdooStart[Start Odoo API] --> OdooUp[Odoo API Up]
        OdooUp --> OdooLogs[View Logs]
        OdooLogs --> OdooShell[Access Shell]
        OdooShell --> OdooRestart[Restart]
    end
    
    subgraph "Database Service"
        DBStart[Start Database] --> DBUp[Database Up]
        DBUp --> DBLogs[View Logs]
        DBLogs --> DBShell[Access Shell]
        DBShell --> DBRestart[Restart]
    end
    
    %% Commands
    BackendStart -->|docker compose up backend -d| BackendCmd[Backend Command]
    FrontendStart -->|docker compose up frontend -d| FrontendCmd[Frontend Command]
    OdooStart -->|docker compose up odoo_api -d| OdooCmd[Odoo Command]
    DBStart -->|docker compose up db -d| DBCmd[DB Command]
    
    BackendLogs -->|docker compose logs backend| BackendLogsCmd[Backend Logs]
    FrontendLogs -->|docker compose logs frontend| FrontendLogsCmd[Frontend Logs]
    OdooLogs -->|docker compose logs odoo_api| OdooLogsCmd[Odoo Logs]
    DBLogs -->|docker compose logs db| DBLogsCmd[DB Logs]
    
    BackendShell -->|docker compose exec backend bash| BackendShellCmd[Backend Shell]
    FrontendShell -->|docker compose exec frontend bash| FrontendShellCmd[Frontend Shell]
    OdooShell -->|docker compose exec odoo_api bash| OdooShellCmd[Odoo Shell]
    DBShell -->|docker compose exec db bash| DBShellCmd[DB Shell]
    
    %% Styling
    classDef backend fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef frontend fill:#c8e6c9,stroke:#388e3c,stroke-width:2px
    classDef odoo fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef database fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    
    class BackendStart,BackendUp,BackendLogs,BackendShell,BackendRestart,BackendCmd,BackendLogsCmd,BackendShellCmd backend
    class FrontendStart,FrontendUp,FrontendLogs,FrontendShell,FrontendRestart,FrontendCmd,FrontendLogsCmd,FrontendShellCmd frontend
    class OdooStart,OdooUp,OdooLogs,OdooShell,OdooRestart,OdooCmd,OdooLogsCmd,OdooShellCmd odoo
    class DBStart,DBUp,DBLogs,DBShell,DBRestart,DBCmd,DBLogsCmd,DBShellCmd database
```

## Volume and Data Management

```mermaid
graph TB
    subgraph "Volume Operations"
        CreateVol[Create Volumes] --> ListVol[List Volumes]
        ListVol --> InspectVol[Inspect Volumes]
        InspectVol --> RemoveVol[Remove Volumes]
    end
    
    subgraph "Database Operations"
        BackupDB[Backup Database] --> RestoreDB[Restore Database]
        RestoreDB --> VerifyDB[Verify Data]
        VerifyDB --> CleanupDB[Cleanup]
    end
    
    subgraph "File Operations"
        CopyFiles[Copy Files] --> ListFiles[List Files]
        ListFiles --> RemoveFiles[Remove Files]
    end
    
    %% Commands
    CreateVol -->|docker volume create| CreateVolCmd[Create Volume Command]
    ListVol -->|docker volume ls| ListVolCmd[List Volume Command]
    InspectVol -->|docker volume inspect| InspectVolCmd[Inspect Volume Command]
    RemoveVol -->|docker volume rm| RemoveVolCmd[Remove Volume Command]
    
    BackupDB -->|docker compose exec db pg_dump| BackupDBCmd[Backup DB Command]
    RestoreDB -->|docker compose exec db psql| RestoreDBCmd[Restore DB Command]
    VerifyDB -->|docker compose exec backend python manage.py check| VerifyDBCmd[Verify DB Command]
    
    CopyFiles -->|docker cp| CopyFilesCmd[Copy Files Command]
    ListFiles -->|docker compose exec backend ls| ListFilesCmd[List Files Command]
    RemoveFiles -->|docker compose exec backend rm| RemoveFilesCmd[Remove Files Command]
    
    %% Styling
    classDef volume fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    classDef database fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef file fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    
    class CreateVol,ListVol,InspectVol,RemoveVol,CreateVolCmd,ListVolCmd,InspectVolCmd,RemoveVolCmd volume
    class BackupDB,RestoreDB,VerifyDB,CleanupDB,BackupDBCmd,RestoreDBCmd,VerifyDBCmd database
    class CopyFiles,ListFiles,RemoveFiles,CopyFilesCmd,ListFilesCmd,RemoveFilesCmd file
```

## Quick Reference Commands

### Development Environment

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Access backend shell
docker compose exec backend bash

# Run Django migrations
docker compose exec backend python manage.py migrate

# Create superuser
docker compose exec backend python manage.py createsuperuser

# View running containers
docker compose ps

# Stop all services
docker compose down

# Rebuild all images
docker compose build

# View container stats
docker compose top
```

### Production Environment

```bash
# Deploy with production configuration
docker compose -f compose.yml up -d

# Backup database
docker compose exec db pg_dump -U certificate_user certificate_db > backup.sql

# Restore database
docker compose exec -T db psql -U certificate_user -d certificate_db < backup.sql

# Monitor logs
docker compose logs -f --tail=100

# Scale services
docker compose up -d --scale backend=3

# Health check
docker compose ps

# Emergency restart
docker compose restart

# Clean up unused resources
docker system prune -f
```

### Troubleshooting Commands

```bash
# Check container health
docker compose ps

# View detailed container info
docker inspect <container_name>

# Check network connectivity
docker compose exec backend ping odoo_api

# View resource usage
docker stats

# Check disk usage
docker system df

# Remove unused images
docker image prune

# Remove unused volumes
docker volume prune