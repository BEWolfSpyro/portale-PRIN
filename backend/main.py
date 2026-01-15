from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from jose import jwt
from datetime import datetime, timedelta
from fastapi import Depends, Header
from typing import Optional, Literal
from uuid import uuid4
import os

app = FastAPI(title="Portale Ricerca Scientifica API")

# CORS: permette al frontend (localhost e Vercel) di chiamare l'API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://portale-prin.vercel.app",
    ],
    #allow_origin_regex=r"^https://.*\.vercel\.app$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
),

# CONFIG
JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret-change-me")
JWT_ALG = "HS256"
JWT_EXPIRES_MIN = 60 * 24  # 24h

# Admin demo (poi lo mettiamo su DB)
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "admin@research.com")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "Admin123!")

# MODELLI
class LoginReq(BaseModel):
    email: str
    password: str

# =========================
# PUBBLICAZIONI (MODELLI + STORAGE)
# =========================

from typing import Optional, Literal
from uuid import uuid4

PublicationType = Literal["article", "report"]

class PublicationCreate(BaseModel):
    type: PublicationType
    title: str
    authors: str
    description: str
    url: Optional[str] = None
    file_name: Optional[str] = None

class PublicationOut(BaseModel):
    id: str
    type: PublicationType
    title: str
    authors: str
    description: str
    url: Optional[str] = None
    file_name: Optional[str] = None
    created_at: str

PUBLICATIONS: list[dict] = []


# =========================
# AUTH DEPENDENCY
# =========================

from fastapi import Depends, Header

def require_admin(authorization: Optional[str] = Header(default=None)):
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Token mancante")

    token = authorization.split(" ", 1)[1].strip()
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
    except Exception:
        raise HTTPException(status_code=401, detail="Token non valido o scaduto")

    if payload.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Non autorizzato")

    return payload


# =========================
# ENDPOINT PUBBLICI
# =========================

@app.get("/publications", response_model=list[PublicationOut])
def list_publications():
    return PUBLICATIONS


# =========================
# ENDPOINT ADMIN
# =========================

@app.post("/admin/publications", response_model=PublicationOut)
def create_publication(
    payload: PublicationCreate,
    _admin=Depends(require_admin),
):
    if payload.type == "article" and not payload.url:
        raise HTTPException(status_code=400, detail="Per un articolo serve la URL")
    if payload.type == "report" and not payload.file_name:
        raise HTTPException(status_code=400, detail="Per un report serve file_name")

    item = {
        "id": str(uuid4()),
        "type": payload.type,
        "title": payload.title.strip(),
        "authors": payload.authors.strip(),
        "description": payload.description.strip(),
        "url": payload.url,
        "file_name": payload.file_name,
        "created_at": datetime.utcnow().isoformat() + "Z",
    }

    PUBLICATIONS.insert(0, item)
    return item


@app.delete("/admin/publications/{pub_id}")
def delete_publication(
    pub_id: str,
    _admin=Depends(require_admin),
):
    global PUBLICATIONS
    before = len(PUBLICATIONS)
    PUBLICATIONS = [p for p in PUBLICATIONS if p["id"] != pub_id]
    if len(PUBLICATIONS) == before:
        raise HTTPException(status_code=404, detail="Non trovato")
    return {"status": "deleted"}


# ENDPOINT
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

