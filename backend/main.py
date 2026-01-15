from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from jose import jwt
from datetime import datetime, timedelta
import os

app = FastAPI(title="Portale Ricerca Scientifica API")

# CORS: permette al frontend (localhost e Vercel) di chiamare l'API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://portale-prin.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret-change-me")
JWT_ALG = "HS256"
JWT_EXPIRES_MIN = 60 * 24  # 24h

# Admin demo (poi lo mettiamo su DB)
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "admin@research.com")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "Admin123!")


class LoginReq(BaseModel):
    email: str
    password: str


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/auth/login")
def login(payload: LoginReq):
    if payload.email != ADMIN_EMAIL or payload.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Credenziali non valide")

    exp = datetime.utcnow() + timedelta(minutes=JWT_EXPIRES_MIN)
    token = jwt.encode(
        {"sub": payload.email, "role": "admin", "exp": exp},
        JWT_SECRET,
        algorithm=JWT_ALG,
    )
    return {"access_token": token, "token_type": "bearer"}