from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from jose import jwt
from datetime import datetime, timedelta
from fastapi import Depends, Header
from typing import Optional, Literal
from uuid import uuid4
from pymongo import MongoClient
from bson import ObjectId
from fastapi import Request
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
),

# CONFIG
JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret-change-me")
JWT_ALG = "HS256"
JWT_EXPIRES_MIN = 60 * 24  # 24h
MONGODB_URI = os.getenv("MONGODB_URI")
MONGODB_DB = os.getenv("MONGODB_DB", "portale_prin")

mongo_client = MongoClient(MONGODB_URI)
db = mongo_client[MONGODB_DB]
publications_collection = db["publications"]

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


# =========================
# AUTH DEPENDENCY
# =========================

from fastapi import Depends, Header, Request

def require_admin(
    request: Request,
    authorization: Optional[str] = Header(default=None),
):
    # prova a leggere sia "authorization" che "Authorization"
    auth = authorization or request.headers.get("Authorization")

    if not auth or not auth.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Token mancante")

    token = auth.split(" ", 1)[1].strip()
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
    docs = list(publications_collection.find().sort("created_at", -1))
    for d in docs:
        d["id"] = str(d["_id"])
        del d["_id"]
    return docs


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

    doc = {
        "type": payload.type,
        "title": payload.title.strip(),
        "authors": payload.authors.strip(),
        "description": payload.description.strip(),
        "url": payload.url,
        "file_name": payload.file_name,
        "created_at": datetime.utcnow().isoformat() + "Z",
    }

    res = publications_collection.insert_one(doc)
    doc["id"] = str(res.inserted_id)
    return doc


@app.delete("/admin/publications/{pub_id}")
def delete_publication(
    pub_id: str,
    _admin=Depends(require_admin),
):
    res = publications_collection.delete_one({"_id": ObjectId(pub_id)})
    if res.deleted_count == 0:
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

@app.get("/")
def root():
    return {"status": "ok"}

