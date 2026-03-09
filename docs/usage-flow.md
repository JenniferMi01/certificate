# Certificate System Usage Flow

## User Interaction Diagram

```mermaid
flowchart TD
    Start([User Access]) --> Login{Authentication}
    
    Login -->|Valid Credentials| Dashboard[Dashboard]
    Login -->|Invalid Credentials| Login
    
    Dashboard --> ViewDocs[View Documents]
    Dashboard --> CreateDoc{Create Document}
    
    CreateDoc -->|Attestation de Travail| AttestationTravail[Attestation de Travail]
    CreateDoc -->|Attestation de Conge| AttestationConge[Attestation de Conge]
    CreateDoc -->|Certificat de Travail| CertificatTravail[Certificat de Travail]
    
    ViewDocs --> FilterDocs[Filter/Search Documents]
    FilterDocs --> DisplayDocs[Display Results]
    
    AttestationTravail --> SelectEmployee[Select Employee]
    AttestationConge --> SelectEmployee
    CertificatTravail --> SelectEmployee
    
    SelectEmployee -->|From Database| EmployeeData[Employee Data]
    SelectEmployee -->|From Odoo| SyncOdoo[Sync from Odoo]
    
    SyncOdoo -->|API Call| OdooAPI[Odoo API]
    OdooAPI -->|XML-RPC| OdooERP[Odoo ERP System]
    
    EmployeeData --> FillForm[Fill Document Form]
    FillForm --> PreviewDoc[Preview Document]
    
    PreviewDoc -->|Approve| GenerateDoc[Generate Document]
    PreviewDoc -->|Modify| FillForm
    
    GenerateDoc --> SaveDB[Save to Database]
    GenerateDoc --> ExportDoc[Export Options]
    
    ExportDoc --> PDF[PDF Export]
    ExportDoc --> Print[Print Document]
    
    SaveDB -->|Success| Success[Document Created]
    SaveDB -->|Error| Error[Error Handling]
    
    Success --> Dashboard
    Error --> Dashboard
    
    %% Admin Functions
    Dashboard --> AdminPanel{Admin Panel}
    AdminPanel --> ManageUsers[Manage Users]
    AdminPanel --> ManageEmployees[Manage Employees]
    AdminPanel --> ViewLogs[View System Logs]
    
    ManageEmployees --> ImportData[Import Employee Data]
    ImportData -->|CSV File| ProcessImport[Process Import]
    ProcessImport -->|Success| ImportSuccess[Import Complete]
    ProcessImport -->|Error| ImportError[Import Failed]
    
    %% Styling
    classDef userAction fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef systemAction fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    classDef decision fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef external fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    
    class Start,Login,Dashboard,ViewDocs,CreateDoc,SelectEmployee,FillForm,PreviewDoc,GenerateDoc,ExportDoc userAction
    class SaveDB,Success,Error,ImportData,ProcessImport systemAction
    class AttestationTravail,AttestationConge,CertificatTravail,EmployeeData,FilterDocs,DisplayDocs,PDF,Print,ManageUsers,ManageEmployees,ViewLogs,ImportSuccess,ImportError decision
    class OdooAPI,OdooERP external
```

## Document Creation Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend API
    participant D as Database
    participant O as Odoo API
    participant E as Odoo ERP
    
    U->>F: Access Application
    F->>B: Authenticate User
    B->>D: Verify Credentials
    D-->>B: Authentication Result
    B-->>F: JWT Token
    F-->>U: Dashboard
    
    U->>F: Select Document Type
    F->>B: Get Employee List
    B->>D: Query Employees
    D-->>B: Employee Data
    B-->>F: Employee List
    
    alt Employee from Database
        F->>B: Get Employee Details
        B->>D: Query Employee
        D-->>B: Employee Info
        B-->>F: Employee Details
    else Sync from Odoo
        F->>O: Request Employee Data
        O->>E: XML-RPC Call
        E-->>O: Employee Data
        O-->>F: Employee Information
    end
    
    U->>F: Fill Document Form
    F->>B: Validate Form Data
    B-->>F: Validation Result
    
    U->>F: Preview Document
    F->>B: Generate Preview
    B-->>F: Preview Data
    
    U->>F: Confirm Generation
    F->>B: Create Document
    B->>D: Save Document
    D-->>B: Save Confirmation
    B-->>F: Document Created
    F-->>U: Document Ready
    
    U->>F: Export Document
    F->>B: Generate Export
    B-->>F: Export File
    F-->>U: Download Document
```

## User Roles and Permissions

```mermaid
graph TB
    subgraph "User Roles"
        Admin[Administrator] -->|Full Access| AllFeatures[All Features]
        RHUser[RH User] -->|Document Creation| DocCreation[Create Documents]
        RHUser -->|View Documents| DocView[View Documents]
        RHUser -->|Employee Management| EmpManage[Manage Employees]
        
        Viewer[Viewer] -->|Read Only| DocView
    end
    
    subgraph "Document Types"
        DocCreation --> AttestationTravail[Attestation de Travail]
        DocCreation --> AttestationConge[Attestation de Conge]
        DocCreation --> CertificatTravail[Certificat de Travail]
    end
    
    subgraph "System Features"
        AllFeatures --> UserManagement[User Management]
        AllFeatures --> SystemLogs[System Logs]
        AllFeatures --> BackupRestore[Backup & Restore]
        AllFeatures --> Settings[System Settings]
    end
    
    %% Styling
    classDef admin fill:#ffcdd2,stroke:#d32f2f,stroke-width:2px
    classDef rhuser fill:#c8e6c9,stroke:#388e3c,stroke-width:2px
    classDef viewer fill:#bbdefb,stroke:#1976d2,stroke-width:2px
    classDef document fill:#fff9c4,stroke:#fbc02d,stroke-width:2px
    
    class Admin,UserManagement,BackupRestore,Settings admin
    class RHUser,EmpManage rhuser
    class Viewer,DocView viewer
    class AttestationTravail,AttestationConge,CertificatTravail,DocCreation,DocView document
```

## Key User Journeys

### 1. New Employee Onboarding
1. Admin imports employee data from CSV or syncs from Odoo
2. System validates and stores employee information
3. Employee becomes available for document creation

### 2. Document Generation
1. User logs in and accesses dashboard
2. Selects document type (Attestation de Travail/Conge/Certificat)
3. Chooses employee (from database or syncs from Odoo)
4. Fills required information
5. Previews document
6. Generates and exports document

### 3. Document Management
1. User views existing documents
2. Filters/searches by criteria (employee, date, type)
3. Views document details
4. Downloads or prints documents

### 4. System Administration
1. Admin manages user accounts and permissions
2. Monitors system logs
3. Performs backup and restore operations
4. Configures system settings