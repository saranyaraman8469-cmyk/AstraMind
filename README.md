# Project AstraMind
India's AI Digital Twin for Critical Infrastructure Intelligence.

## Overview
AstraMind is a cloud-native AI Operating System that continuously monitors critical infrastructure (roads, railways, bridges, etc.) using IoT sensors, satellite imagery, and weather data. It leverages a Multi-Agent System (LangGraph), Computer Vision (YOLOv11), and Time-Series Forecasting to predict failures before they happen.

## Architecture & Documentation
For detailed architecture, please refer to the documents in the `/docs` folder:
- [Software Requirement Specification (SRS)](docs/SRS.md)
- [High-Level Design (HLD)](docs/HLD.md)
- [Low-Level Design (LLD)](docs/LLD.md)

## How to Run the Project Locally

The project consists of three main layers: Databases/Message Brokers, FastAPI Backend, and Next.js Frontend. You need to run them in the following order.

### 1. Start the Databases (Docker Compose)
AstraMind relies on multiple databases (PostgreSQL, Neo4j, Redis, Qdrant, RabbitMQ). Ensure you have Docker Desktop running.

```bash
# From the root directory
docker-compose up -d
```
*Note: Wait a few moments for all containers to fully initialize.*

### 2. Run the FastAPI Backend
The backend handles the AI agents, data ingestion, and API routes.

```bash
# Navigate to the backend directory
cd backend

# Create a Python virtual environment
python -m venv venv

# Activate the virtual environment (Windows PowerShell)
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI server
uvicorn main:app --reload
```
The backend API will be available at: http://localhost:8000
Interactive API Documentation (Swagger): http://localhost:8000/docs

### 3. Run the Next.js Frontend
The frontend is a modern React/Next.js dashboard with Tailwind CSS.

Open a **new terminal window** (keep the backend running in the other):
```bash
# Navigate to the frontend directory
cd frontend

# Install Node.js dependencies
npm install

# Start the development server
npm run dev
```
The frontend dashboard will be available at: http://localhost:3000

## Next Development Steps
- **Data Ingestion**: Implement IoT streaming to Kafka/RabbitMQ.
- **Frontend Dashboard**: Build out the 3D Map views.
- **Agent Tuning**: Refine the LangGraph logic in `agents/chief_coordinator.py`.
