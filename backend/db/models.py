from sqlalchemy import Column, String, Float, DateTime, Boolean, ForeignKey, Enum, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime
import uuid
import enum

Base = declarative_base()


class UserRole(str, enum.Enum):
    ADMIN = "admin"
    GOVT_OFFICER = "govt_officer"
    ENGINEER = "engineer"
    DISASTER_TEAM = "disaster_team"
    HOSPITAL_AUTH = "hospital_authority"
    POWER_AUTH = "power_authority"
    CITIZEN = "citizen"


class InfraType(str, enum.Enum):
    BRIDGE = "bridge"
    ROAD = "road"
    DAM = "dam"
    HOSPITAL = "hospital"
    POWER_PLANT = "power_plant"
    AIRPORT = "airport"
    RAILWAY = "railway"


class AlertSeverity(str, enum.Enum):
    CRITICAL = "critical"
    WARNING = "warning"
    INFO = "info"


# ===================== USERS =====================
class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String(100), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255))
    role = Column(String(50), default=UserRole.CITIZEN)
    department = Column(String(100))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime)


# ===================== INFRASTRUCTURE =====================
class Infrastructure(Base):
    __tablename__ = "infrastructure"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False, index=True)
    infra_type = Column(String(50), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    state = Column(String(100), nullable=False, index=True)
    district = Column(String(100))
    health_score = Column(Float, default=100.0)
    risk_score = Column(Float, default=0.0)
    status = Column(String(50), default="healthy")
    sensor_count = Column(Float, default=0)
    last_inspection = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    sensors = relationship("Sensor", back_populates="infrastructure")
    incidents = relationship("Incident", back_populates="infrastructure")


# ===================== SENSORS =====================
class Sensor(Base):
    __tablename__ = "sensors"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    infra_id = Column(UUID(as_uuid=True), ForeignKey("infrastructure.id"), nullable=False)
    sensor_type = Column(String(50), nullable=False)  # vibration, water_level, temperature, traffic
    current_value = Column(Float)
    unit = Column(String(30))
    status = Column(String(30), default="active")  # active, inactive, faulty
    last_ping = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)

    infrastructure = relationship("Infrastructure", back_populates="sensors")


# ===================== INCIDENTS =====================
class Incident(Base):
    __tablename__ = "incidents"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    infra_id = Column(UUID(as_uuid=True), ForeignKey("infrastructure.id"), nullable=False)
    severity = Column(String(30), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    source_agent = Column(String(100))  # which AI agent reported this
    is_acknowledged = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime)

    infrastructure = relationship("Infrastructure", back_populates="incidents")


# ===================== ALERTS =====================
class Alert(Base):
    __tablename__ = "alerts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    severity = Column(String(30), nullable=False)
    message = Column(Text, nullable=False)
    source_agent = Column(String(100))
    region = Column(String(100))
    is_acknowledged = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
