from typing import Optional
from pydantic import BaseModel
from jose import jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm


SECRET_KEY = "1cace9caab5418b70aa008e8674324b87e6063160d45d012d945bf0800f489fe"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

users_db = {
    "harry": {
        "username": "harry",
        "email": "harry@hogwarts.com",
        "hashed_password": "$2b$12$nbxNeyN5efE0dhSa4n3Q7eHJU..7VXSubA5dnZwF9GWXntFvgaM..",
    },
    "hermione": {
        "username": "hermione",
        "email": "hermione@hogwarts.com",
        "hashed_password": "$2b$12$5jjhGDWGvQbNN2YM2w34AuuBqkD0OTxd74mxZCrZ3n6WcmcYXgjhq",
    },
}


# CORS middleware
origins = ["https://openform.netlify.app", "http:localhost:3000"]

# Authentication
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/token")


class User(BaseModel):
    username: str
    email: str


class UserInDB(User):
    hashed_password: str


# helper functions for authentication
def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


def generate_password_hash(password: str):
    return pwd_context.hash(password)


def get_user(database, username: str):
    if username in database:
        user_dict = database[username]
        return UserInDB(**user_dict)


def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt


# Initialize App
app = FastAPI()


# middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    print(form_data)
    user = authenticate_user(users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"user": user.username, "token": access_token}


@app.get("/api/hello")
async def hello(token: str = Depends(oauth2_scheme)):
    return {"message": f"Hello from fastapi!"}


@app.get("/api/lol")
async def lol():
    return {"message": f"LOL means laugh out loud!"}
