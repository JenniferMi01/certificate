# Architecture du Projet

## Diagramme d'Architecture Globale

```mermaid
graph TB
    subgraph "Client"
        Browser["Navigateur Web"]
    end

    subgraph "Docker Network"
        subgraph "Frontend Container"
            Nginx["Nginx :80"]
            SPA["React SPA<br/>(fichiers statiques)"]
        end

        subgraph "Backend Container"
            Gunicorn["Gunicorn :8000"]
            Django["Django REST Framework"]
        end

        subgraph "Odoo API Container"
            FastAPI["FastAPI :5000"]
            OdooClient["Odoo XML-RPC Client"]
        end

        subgraph "Database Container"
            PostgreSQL["PostgreSQL :5432"]
        end
    end

    subgraph "External"
        OdooServer["Serveur Odoo ERP"]
    end

    Browser -->|":8080"| Nginx
    Nginx -->|"/"| SPA
    Nginx -->|"/api/*"| Gunicorn
    Nginx -->|"/employees/*"| FastAPI
    Nginx -->|"/admin/*"| Gunicorn
    Nginx -->|"/static/*"| Gunicorn
    Django --> PostgreSQL
    OdooClient -->|"XML-RPC"| OdooServer
    FastAPI --> OdooClient
```

## Diagramme de Flux d'Authentification

```mermaid
sequenceDiagram
    participant U as Utilisateur
    participant F as Frontend (React)
    participant N as Nginx
    participant B as Backend (Django)
    participant DB as PostgreSQL

    U->>F: Saisir identifiants
    F->>N: POST /api/login/
    N->>B: Proxy vers backend:8000
    B->>DB: Verifier identifiants
    DB-->>B: Utilisateur valide
    B-->>N: {access, refresh}
    N-->>F: Tokens JWT
    F->>F: Stocker dans localStorage

    Note over F: Requetes suivantes

    F->>N: GET /api/me/ (Authorization: Bearer token)
    N->>B: Proxy avec headers
    B->>B: Verifier JWT
    B-->>N: {id, username, email}
    N-->>F: Donnees utilisateur

    Note over F: Expiration du token

    F->>N: POST /api/refresh/ {refresh}
    N->>B: Proxy
    B->>DB: Verifier refresh token
    B-->>N: {access: nouveau_token}
    N-->>F: Nouveau access token

    Note over F: Deconnexion

    F->>N: POST /api/logout/ {refresh}
    N->>B: Proxy
    B->>DB: Blacklister refresh token
    B-->>N: 205 Reset Content
    N-->>F: Succes
    F->>F: Supprimer tokens localStorage
```

## Diagramme de Generation de Document

```mermaid
sequenceDiagram
    participant U as Utilisateur
    participant F as Frontend
    participant N as Nginx
    participant O as Odoo API
    participant E as Serveur Odoo

    U->>F: Selectionner type de document
    U->>F: Rechercher employe (debounce 350ms)
    F->>N: GET /employees?search=nom
    N->>O: Proxy vers odoo_api:5000
    O->>E: XML-RPC search_read(hr.employee)
    E-->>O: Liste employes
    O-->>N: {count, data}
    N-->>F: Resultats

    U->>F: Selectionner un employe
    F->>N: GET /employees/{id}
    N->>O: Proxy
    O->>E: XML-RPC read(hr.employee, id)
    E-->>O: Details employe
    O-->>N: Employe complet
    N-->>F: Donnees employe

    U->>F: Cliquer "Generer PDF"
    F->>F: Rendu du document HTML
    F->>F: react-to-pdf conversion
    F->>U: Telechargement PDF
```

## Diagramme de Classes (Modeles Django)

```mermaid
classDiagram
    class User {
        +int id
        +str username
        +str email
        +str password
    }

    class Employe {
        +str matricule
        +str sexe
        +str nom
        +str prenom
        +date date_naissance
        +str lieu_naissance
        +str cin
        +date cin_date
        +str cin_lieu
        +str adresse
        +date date_embauche
        +bool contrat_cdi
        +bool en_poste
        +User user
        +nom_complet() str
    }

    class PosteHistorique {
        +Employe employe
        +str intitule
        +date date_debut
        +date date_fin
    }

    class Conge {
        +Employe employe
        +date date_debut
        +date date_fin
        +str motif
        +bool approuve
        +datetime date_demande
    }

    class AttestationTravail {
        +Employe employe
        +date date_generation
    }

    class AttestationConge {
        +Employe employe
        +date date_debut_conge
        +date date_fin_conge
        +str type_conge
        +date date_generation
    }

    class CertificatTravail {
        +Employe employe
        +date date_sortie
        +str motif_sortie
        +date date_generation
    }

    User "1" -- "0..1" Employe : user
    Employe "1" -- "*" PosteHistorique : employe
    Employe "1" -- "*" Conge : employe
    Employe "1" -- "*" AttestationTravail : employe
    Employe "1" -- "*" AttestationConge : employe
    Employe "1" -- "*" CertificatTravail : employe
```

## Diagramme d'Infrastructure Docker

```mermaid
graph LR
    subgraph "Ports Exposes"
        P8080["Host :8080"]
        P8000["Host :8000"]
        P5000["Host :5000"]
        P15432["Host :15432"]
    end

    subgraph "Docker Compose Services"
        FE["frontend<br/>nginx:alpine<br/>:80"]
        BE["backend<br/>python:3.12-slim<br/>gunicorn :8000"]
        OA["odoo_api<br/>python:3.12-slim<br/>gunicorn+uvicorn :5000"]
        DB["db<br/>postgres:16-alpine<br/>:5432"]
    end

    subgraph "Volumes"
        V1["postgres_data"]
        V2["static_files"]
    end

    P8080 --> FE
    P8000 --> BE
    P5000 --> OA
    P15432 --> DB

    FE -->|"proxy /api/*"| BE
    FE -->|"proxy /employees"| OA
    BE --> DB
    DB --- V1
    BE --- V2
```

## Diagramme des Routes Frontend

```mermaid
graph TD
    App["App.jsx<br/>AuthProvider + Router"]

    App --> Login["/login<br/>Login.jsx"]
    App --> Protected["ProtectedRoute"]

    Protected --> Dashboard["/dashboard<br/>Dashboard.jsx"]
    Protected --> AT["/attestation-travail<br/>AttestationTravail.jsx"]
    Protected --> AC["/attestation-conge<br/>AttestationConge.jsx"]
    Protected --> CT["/certificat-travail<br/>CertificatTravail.jsx"]
    Protected --> Hist["/historique<br/>Historique"]
    Protected --> Logout["/logout<br/>Redirect"]

    Dashboard --> StatsGrid
    Dashboard --> ChartsSection
    Dashboard --> DocumentsTable

    AT --> PDF1["PDF A4<br/>react-to-pdf"]
    AC --> PDF2["PDF A4<br/>react-to-pdf"]
    CT --> PDF3["PDF A4<br/>react-to-pdf"]
```

## Diagramme des Endpoints API

```mermaid
graph LR
    subgraph "Django Backend :8000"
        direction TB
        Auth["/api/login/<br/>/api/logout/<br/>/api/refresh/<br/>/api/me/"]
        Emp["/api/attestations/employes/"]
        Pos["/api/attestations/postes/"]
        Con["/api/attestations/conges/"]
        Doc["/api/attestations/<br/>attestation-travail/<br/>attestation-conge/<br/>certificat-travail/"]
        Adm["/admin/"]
    end

    subgraph "Odoo API :5000"
        direction TB
        Part["/partners"]
        EmpO["/employees"]
        EmpS["/employees/search"]
        EmpD["/employees/{id}"]
    end

    subgraph "Auth Level"
        JWT["JWT Required"]
        Open["Public"]
    end

    JWT -.-> Auth
    JWT -.-> Emp
    JWT -.-> Pos
    JWT -.-> Con
    Open -.-> Doc
    Open -.-> Part
    Open -.-> EmpO
    Open -.-> EmpS
    Open -.-> EmpD
```
