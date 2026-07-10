from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from typing import Any

from db.session import get_db
from db import crud
from api.schemas import UserCreate, UserResponse, Token, LoginRequest
from core.security import verify_password, create_access_token
from core.config import settings
from datetime import datetime

router = APIRouter()

@router.post("/signup", response_model=UserResponse)
async def signup(user_in: UserCreate, db: AsyncSession = Depends(get_db)) -> Any:
    """
    Register a new user.
    """
    user = await crud.get_user_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="A user with this email already exists in the system.",
        )
    user = await crud.get_user_by_username(db, username=user_in.username)
    if user:
        raise HTTPException(
            status_code=400,
            detail="A user with this username already exists in the system.",
        )
        
    user = await crud.create_user(db, user_in)
    return user


@router.post("/login", response_model=Token)
async def login(login_data: LoginRequest, db: AsyncSession = Depends(get_db)) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests.
    Supports either email or username as the identifier.
    """
    # Check if identifier is email or username
    if "@" in login_data.identifier:
        user = await crud.get_user_by_email(db, email=login_data.identifier)
    else:
        user = await crud.get_user_by_username(db, username=login_data.identifier)
        
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email/username or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
        
    # Update last login
    user.last_login = datetime.utcnow()
    await db.commit()
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    return {
        "access_token": create_access_token(
            subject=str(user.id), expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }
