# Low-Level Design (LLD)
## Project AstraMind

### 1. Database Design (PostgreSQL ER Diagram)
Stores structured relational data for users, infrastructure metadata, and historical records.

```mermaid
erDiagram
    USERS {
        uuid id PK
        string email
        string password_hash
        string role "Admin, Officer, Engineer"
        datetime created_at
    }
    
    INFRASTRUCTURE {
        uuid id PK
        string name
        string type "Bridge, Road, Dam, Hospital"
        float latitude
        float longitude
        string state
        string district
        float health_score
        float risk_score
    }
    
    SENSORS {
        uuid id PK
        uuid infra_id FK
        string sensor_type "Vibration, WaterLevel, Traffic"
        string status "Active, Inactive, Faulty"
        datetime last_ping
    }
    
    INCIDENTS {
        uuid id PK
        uuid infra_id FK
        string severity
        string description
        datetime reported_at
    }

    USERS ||--o{ INCIDENTS : reports
    INFRASTRUCTURE ||--o{ SENSORS : has
    INFRASTRUCTURE ||--o{ INCIDENTS : experiences
```

### 2. Knowledge Graph Design (Neo4j)
Captures the complex, multi-dimensional relationships of the digital twin.

```mermaid
graph TD
    %% Nodes
    Bridge((:Bridge))
    Road((:Road))
    River((:River))
    District((:District))
    Hospital((:Hospital))
    Sensor((:Sensor))
    WeatherEvent((:WeatherEvent))

    %% Relationships
    Bridge -- CONNECTS_TO --> Road
    Bridge -- CROSSES --> River
    Bridge -- LOCATED_IN --> District
    Hospital -- LOCATED_IN --> District
    Sensor -- MONITORS --> Bridge
    WeatherEvent -- AFFECTS --> District
```

### 3. Class Diagram (Core Backend Services)
```mermaid
classDiagram
    class Infrastructure {
        +UUID id
        +String name
        +Float health_score
        +updateHealthScore(newScore)
        +getSensors()
    }

    class Sensor {
        +UUID id
        +String type
        +Float current_value
        +transmitData()
    }

    class AgentCoordinator {
        +Dict agents
        +receiveQuery(query)
        +orchestrateTask()
        +synthesizeResult()
    }

    class RiskPredictor {
        +Model lstm_model
        +predict(infra_id, time_horizon)
        +calculateConfidence()
    }

    Infrastructure "1" *-- "many" Sensor : contains
    AgentCoordinator ..> RiskPredictor : uses
```

### 4. Sequence Diagram: Anomaly Detection to Alert
```mermaid
sequenceDiagram
    participant Sensor
    participant Ingestion as Kafka/Ingestion
    participant InfraAgent as Infrastructure Agent
    participant RiskAgent as Risk Prediction Agent
    participant Chief as Chief AI Coordinator
    participant Alert as Alert System
    participant UI as Digital Twin Dashboard

    Sensor->>Ingestion: Stream data (high vibration)
    Ingestion->>InfraAgent: Trigger anomaly event
    InfraAgent->>RiskAgent: Request failure probability
    RiskAgent-->>InfraAgent: 85% Failure Risk in 2 hours
    InfraAgent->>Chief: Escalate high-risk anomaly
    Chief->>Chief: Generate reasoning & mitigation plan
    Chief->>Alert: Dispatch SMS/Email to Engineers
    Chief->>UI: Update Map Marker (RED) & Show Alert
```

### 5. Use Case Diagram
```mermaid
usecaseDiagram
    actor "Govt Officer" as Govt
    actor "Engineer" as Eng
    actor "System Sensor" as Sys

    usecase "View National Dashboard" as UC1
    usecase "Run What-If Simulation" as UC2
    usecase "Inspect Bridge Health" as UC3
    usecase "Receive Maintenance Alert" as UC4
    usecase "Stream Telemetry Data" as UC5

    Govt --> UC1
    Govt --> UC2
    Eng --> UC3
    Eng --> UC4
    Sys --> UC5
```
