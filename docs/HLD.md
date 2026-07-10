# High-Level Design (HLD) & Architecture
## Project AstraMind

### 1. System Architecture Overview
AstraMind follows a modular, microservices-based, event-driven architecture designed for high availability and scalability.

```mermaid
graph TD
    %% User Interfaces
    subgraph Frontend
        WebUI[Next.js Web App]
        MobileApp[Mobile Dashboard]
    end

    %% API Gateway
    APIGW[API Gateway / Load Balancer]

    %% Backend Services
    subgraph Backend Services
        AuthSvc[Auth Service]
        IngestionSvc[Data Ingestion Service]
        DigitalTwinSvc[Digital Twin Service]
        AlertSvc[Notification Service]
    end

    %% AI Agent Orchestration
    subgraph LangGraph Multi-Agent System
        Chief[Chief AI Coordinator]
        InfraAgent[Infrastructure Agent]
        WeatherAgent[Weather Agent]
        VisionAgent[Vision AI Agent]
        RiskAgent[Risk Prediction Agent]
        NewsAgent[News Intelligence Agent]
        DecisionAgent[Decision Support Agent]
        KG_Agent[Knowledge Graph Agent]
        Chief --> InfraAgent & WeatherAgent & VisionAgent & RiskAgent & NewsAgent & DecisionAgent & KG_Agent
    end

    %% Message Broker
    Kafka[Apache Kafka / RabbitMQ]

    %% Databases
    subgraph Data Layer
        PostgreSQL[(PostgreSQL - Relational)]
        Redis[(Redis - Cache/Celery)]
        Neo4j[(Neo4j - Knowledge Graph)]
        Qdrant[(Qdrant - Vector DB)]
        MinIO[(MinIO/S3 - Object Storage)]
    end

    %% External Systems
    subgraph External Inputs
        Sensors[IoT Sensors]
        WeatherAPI[IMD / NASA]
        Satellite[Satellite Imagery]
        NewsAPI[News / Gov PDFs]
    end

    %% Connections
    Frontend --> APIGW
    APIGW --> AuthSvc & DigitalTwinSvc & AlertSvc
    Sensors & WeatherAPI & Satellite & NewsAPI --> IngestionSvc
    IngestionSvc --> Kafka
    Kafka --> Backend Services
    Backend Services --> Data Layer
    DigitalTwinSvc <--> Chief
    Chief <--> Data Layer
```

### 2. Agent Flow Architecture
The Multi-Agent system operates using LangGraph, maintaining state and enabling collaborative reasoning.

```mermaid
flowchart TD
    UserQuery[User/System Trigger] --> Chief
    Chief --> Route{Route to Specialized Agent}
    Route --> |Weather related| WeatherAgent
    Route --> |Damage images| VisionAgent
    Route --> |Sensor anomaly| InfraAgent
    Route --> |Graph Search| KG_Agent
    WeatherAgent --> Synthesize
    VisionAgent --> Synthesize
    InfraAgent --> Synthesize
    KG_Agent --> Synthesize
    Synthesize[Synthesize Context] --> RiskAgent[Risk Prediction Agent]
    RiskAgent --> DecisionAgent[Decision Support Agent]
    DecisionAgent --> Chief
    Chief --> Output[Generate Final Action/Report]
```

### 3. MCP Architecture
Model Context Protocol (MCP) Servers expose specific tools and data context to the agents safely.

```mermaid
graph LR
    subgraph MCP Clients
        InfraAgent
        WeatherAgent
        KG_Agent
    end

    subgraph MCP Servers
        InfraMCP[Infrastructure MCP]
        WeatherMCP[Weather MCP]
        MapMCP[Maps MCP]
        KGMCP[Knowledge Graph MCP]
        DBMCP[Database MCP]
    end

    InfraAgent -->|Read Sensor Tools| InfraMCP
    WeatherAgent -->|Fetch Forecast Tools| WeatherMCP
    KG_Agent -->|Cypher Queries| KGMCP
    InfraAgent -->|Geo Queries| MapMCP
```

### 4. Digital Twin Architecture
Maintains the live, synchronised state of physical assets.

```mermaid
graph TD
    PhysicalAsset[Physical Bridge/Road] -- IoT Data --> Ingestion[Data Ingestion Pipeline]
    Ingestion -- Realtime Stream --> StreamProcessor[Kafka + Redis]
    StreamProcessor --> StateManager[Digital Twin State Manager]
    StateManager --> |Update| Graph[(Neo4j KG)]
    StateManager --> |Update| Relational[(PostgreSQL)]
    StateManager -- WebSocket --> Client[3D Web Visualizer / Mapbox]
```

### 5. Deployment Architecture (AWS EKS)
```mermaid
architecture-beta
    group aws(Cloud: AWS)[AWS Cloud]
    
    service vpc(internet)[VPC] in aws
    service eks(kubernetes)[EKS Cluster] in aws
    service rds(database)[RDS PostgreSQL] in aws
    service s3(server)[S3 Bucket] in aws
    
    eks:R --> L:vpc
    eks:R --> L:rds
    eks:R --> L:s3
```
*(Note: standard flowchart preferred for detail)*
```mermaid
graph TD
    Internet --> CloudFront
    CloudFront --> ALB[Application Load Balancer]
    ALB --> EKS[Amazon EKS]
    
    subgraph EKS [EKS Kubernetes Cluster]
        Pod1[Frontend Pods]
        Pod2[FastAPI Backend Pods]
        Pod3[LangGraph Worker Pods]
    end
    
    EKS --> MSK[Amazon MSK / Kafka]
    EKS --> RDS[(RDS PostgreSQL)]
    EKS --> Elasticache[(ElastiCache Redis)]
    EKS --> S3[(Amazon S3)]
```
