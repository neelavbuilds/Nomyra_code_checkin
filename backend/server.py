from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env', override=False)

import os
import logging
from urllib.parse import quote
from datetime import datetime, timezone, timedelta
from typing import List, Optional, Annotated, Any

import bcrypt
import jwt
import httpx
from bson import ObjectId
from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from fastapi.responses import PlainTextResponse
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict, BeforeValidator, EmailStr
from starlette.middleware.cors import CORSMiddleware

import seed_data

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("nomyra")

client = AsyncIOMotorClient(os.environ['MONGO_URL'])
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Nomyra Travels API")
api = APIRouter(prefix="/api")

JWT_ALGORITHM = "HS256"


# ---------------------------------------------------------------- models
def _to_str(v: Any) -> Any:
    return str(v) if isinstance(v, ObjectId) else v


PyObjectId = Annotated[str, BeforeValidator(_to_str)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: Optional[PyObjectId] = None

    def to_mongo(self) -> dict:
        doc = self.model_dump(exclude_none=True)
        doc.pop("id", None)
        return doc

    @classmethod
    def from_mongo(cls, doc: Optional[dict]):
        if not doc:
            return None
        data = {k: v for k, v in doc.items() if k != "_id"}
        data["id"] = str(doc["_id"]) if doc.get("_id") is not None else None
        return cls(**data)


class Package(BaseDocument):
    slug: str
    order: int = 0
    code: str = ""
    title: str
    subtitle: str = ""
    description: str = ""
    image: str = ""
    image_alt: str = ""
    highlights: List[str] = []
    cta_label: str = "Enquire"
    duration: str = ""
    featured: bool = True
    variant: str = "standard"


class Destination(BaseDocument):
    slug: str
    order: int = 0
    state: str
    region: str = ""
    name: str
    tagline: str = ""
    description: str = ""
    image: str = ""
    image_alt: str = ""
    highlights: List[str] = []
    span: str = "standard"


class Experience(BaseDocument):
    slug: str
    order: int = 0
    category: str = ""
    location: str = ""
    title: str
    summary: str = ""
    description: str = ""
    image: str = ""
    image_alt: str = ""
    image_position: str = ""
    highlights: List[str] = []
    cta_label: str = "Explore Experience"
    difficulty: str = ""
    best_time: str = ""


class Testimonial(BaseDocument):
    order: int = 0
    name: str
    trip: str = ""
    quote: str
    photo: str = ""
    is_placeholder: bool = True


class GalleryItem(BaseDocument):
    order: int = 0
    category: str
    image: str
    caption: str = ""
    alt: str = ""


class BlogPost(BaseDocument):
    slug: str
    title: str
    excerpt: str = ""
    body: str = ""
    cover_image: str = ""
    cover_alt: str = ""
    category: str = ""
    read_time: str = ""
    tags: List[str] = []
    meta_title: str = ""
    meta_description: str = ""
    published: bool = True
    published_at: Optional[str] = None


class EnquiryCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=80)
    phone: str = Field(min_length=6, max_length=20)
    whatsapp: str = Field(default="", max_length=20)
    destination: str = ""
    travelers: str = ""
    travel_date: str = ""
    days: str = ""
    travel_style: str = ""
    experiences: List[str] = []
    message: str = Field(default="", max_length=2000)
    source: str = "website"


class Enquiry(BaseDocument):
    full_name: str
    phone: str
    whatsapp: str = ""
    destination: str = ""
    travelers: str = ""
    travel_date: str = ""
    days: str = ""
    travel_style: str = ""
    experiences: List[str] = []
    message: str = ""
    source: str = "website"
    status: str = "new"
    whatsapp_notified: bool = False
    created_at: str


class LoginInput(BaseModel):
    email: EmailStr
    password: str


# ---------------------------------------------------------------- auth
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def create_access_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email, "type": "access",
               "exp": datetime.now(timezone.utc) + timedelta(hours=12)}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


def create_refresh_token(user_id: str) -> str:
    payload = {"sub": user_id, "type": "refresh",
               "exp": datetime.now(timezone.utc) + timedelta(days=7)}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


def set_auth_cookies(response: Response, access: str, refresh: str) -> None:
    response.set_cookie("access_token", access, httponly=True, secure=True, samesite="none", max_age=43200, path="/")
    response.set_cookie("refresh_token", refresh, httponly=True, secure=True, samesite="none", max_age=604800, path="/")


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        header = request.headers.get("Authorization", "")
        if header.startswith("Bearer "):
            token = header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    if payload.get("type") != "access":
        raise HTTPException(status_code=401, detail="Invalid token type")
    user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    user["_id"] = str(user["_id"])
    user.pop("password_hash", None)
    return user


async def require_admin(user: dict = Depends(get_current_user)) -> dict:
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user


MAX_ATTEMPTS = 5
LOCKOUT_MINUTES = 15


async def check_lockout(identifier: str) -> None:
    rec = await db.login_attempts.find_one({"identifier": identifier})
    if rec and rec.get("count", 0) >= MAX_ATTEMPTS:
        last = rec.get("last_attempt")
        if last and datetime.fromisoformat(last) > datetime.now(timezone.utc) - timedelta(minutes=LOCKOUT_MINUTES):
            raise HTTPException(status_code=429, detail="Too many failed attempts. Try again in 15 minutes.")
        await db.login_attempts.delete_one({"identifier": identifier})


async def record_failure(identifier: str) -> None:
    await db.login_attempts.update_one(
        {"identifier": identifier},
        {"$inc": {"count": 1}, "$set": {"last_attempt": datetime.now(timezone.utc).isoformat()}},
        upsert=True,
    )


@api.post("/auth/login")
async def login(body: LoginInput, request: Request, response: Response):
    email = body.email.lower().strip()
    identifier = f"{request.client.host if request.client else 'unknown'}:{email}"
    await check_lockout(identifier)
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(body.password, user["password_hash"]):
        await record_failure(identifier)
        raise HTTPException(status_code=401, detail="Invalid email or password")
    await db.login_attempts.delete_one({"identifier": identifier})
    uid = str(user["_id"])
    access = create_access_token(uid, email)
    set_auth_cookies(response, access, create_refresh_token(uid))
    return {"access_token": access, "user": {"id": uid, "email": email, "name": user.get("name", "Admin"), "role": user.get("role", "admin")}}


@api.get("/auth/me")
async def me(user: dict = Depends(get_current_user)):
    return {"id": user["_id"], "email": user["email"], "name": user.get("name", "Admin"), "role": user.get("role", "admin")}


@api.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"ok": True}


@api.post("/auth/refresh")
async def refresh(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    if payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid token type")
    user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    access = create_access_token(str(user["_id"]), user["email"])
    response.set_cookie("access_token", access, httponly=True, secure=True, samesite="none", max_age=43200, path="/")
    return {"access_token": access}


# ---------------------------------------------------------------- settings
def site_settings() -> dict:
    return {
        "business_name": os.environ.get("BUSINESS_NAME", "Nomyra Travels"),
        "phone": os.environ.get("BUSINESS_PHONE", ""),
        "whatsapp": os.environ.get("BUSINESS_WHATSAPP", ""),
        "email": os.environ.get("BUSINESS_EMAIL", ""),
        "location": os.environ.get("BUSINESS_LOCATION", "Northeast India"),
        "site_url": os.environ.get("SITE_URL", ""),
        "instagram": os.environ.get("INSTAGRAM_URL", ""),
        "facebook": os.environ.get("FACEBOOK_URL", ""),
        "youtube": os.environ.get("YOUTUBE_URL", ""),
        "whatsapp_cloud_enabled": os.environ.get("WHATSAPP_CLOUD_ENABLED", "false").lower() == "true",
    }


@api.get("/settings")
async def get_settings():
    return site_settings()


@api.get("/")
async def root():
    return {"service": "Nomyra Travels API", "status": "ok"}


# ---------------------------------------------------------------- content (public)
async def _list(collection: str, model, query: Optional[dict] = None, sort_field: str = "order"):
    docs = await db[collection].find(query or {}).sort(sort_field, 1).limit(200).to_list(200)
    return [model.from_mongo(d) for d in docs]


@api.get("/packages", response_model=List[Package])
async def list_packages():
    return await _list("packages", Package)


@api.get("/packages/{slug}", response_model=Package)
async def get_package(slug: str):
    doc = await db.packages.find_one({"slug": slug})
    if not doc:
        raise HTTPException(status_code=404, detail="Package not found")
    return Package.from_mongo(doc)


@api.get("/destinations", response_model=List[Destination])
async def list_destinations(state: Optional[str] = None):
    query = {"state": state} if state else {}
    return await _list("destinations", Destination, query)


@api.get("/destinations/{slug}", response_model=Destination)
async def get_destination(slug: str):
    doc = await db.destinations.find_one({"slug": slug})
    if not doc:
        raise HTTPException(status_code=404, detail="Destination not found")
    return Destination.from_mongo(doc)


@api.get("/experiences", response_model=List[Experience])
async def list_experiences(category: Optional[str] = None):
    query = {"category": category} if category else {}
    return await _list("experiences", Experience, query)


@api.get("/experiences/{slug}", response_model=Experience)
async def get_experience(slug: str):
    doc = await db.experiences.find_one({"slug": slug})
    if not doc:
        raise HTTPException(status_code=404, detail="Experience not found")
    return Experience.from_mongo(doc)


@api.get("/testimonials", response_model=List[Testimonial])
async def list_testimonials():
    return await _list("testimonials", Testimonial)


@api.get("/gallery", response_model=List[GalleryItem])
async def list_gallery(category: Optional[str] = None):
    query = {"category": category} if category else {}
    return await _list("gallery", GalleryItem, query)


BLOG_LIST_FIELDS = {
    "slug": 1, "title": 1, "excerpt": 1, "cover_image": 1, "cover_alt": 1,
    "category": 1, "read_time": 1, "tags": 1, "published": 1,
}


@api.get("/blog", response_model=List[BlogPost])
async def list_blog():
    docs = await db.blog.find({"published": True}, BLOG_LIST_FIELDS).limit(200).to_list(200)
    return [BlogPost.from_mongo(d) for d in docs]


@api.get("/blog/{slug}", response_model=BlogPost)
async def get_blog(slug: str):
    doc = await db.blog.find_one({"slug": slug})
    if not doc:
        raise HTTPException(status_code=404, detail="Article not found")
    return BlogPost.from_mongo(doc)


@api.get("/about")
async def get_about():
    doc = await db.site_content.find_one({"key": "about"}, {"_id": 0})
    return doc["value"] if doc else seed_data.ABOUT


@api.get("/why-us")
async def get_why_us():
    doc = await db.site_content.find_one({"key": "why_us"}, {"_id": 0})
    return doc["value"] if doc else seed_data.WHY_US


# ---------------------------------------------------------------- enquiries
def build_whatsapp_message(e: dict) -> str:
    lines = [
        "*New Nomyra Travels Enquiry*",
        "",
        f"Name: {e.get('full_name', '')}",
        f"Phone: {e.get('phone', '')}",
    ]
    if e.get("whatsapp"):
        lines.append(f"WhatsApp: {e['whatsapp']}")
    if e.get("destination"):
        lines.append(f"Destination: {e['destination']}")
    if e.get("travelers"):
        lines.append(f"Travelers: {e['travelers']}")
    if e.get("travel_date"):
        lines.append(f"Travel Date: {e['travel_date']}")
    if e.get("days"):
        lines.append(f"Duration: {e['days']}")
    if e.get("travel_style"):
        lines.append(f"Travel Style: {e['travel_style']}")
    if e.get("experiences"):
        lines.append(f"Experiences: {', '.join(e['experiences'])}")
    if e.get("message"):
        lines += ["", "Message:", f'"{e["message"]}"']
    return "\n".join(lines)


async def notify_admin_whatsapp(enquiry: dict) -> bool:
    """Meta WhatsApp Cloud API notification. Disabled until credentials are configured."""
    if os.environ.get("WHATSAPP_CLOUD_ENABLED", "false").lower() != "true":
        logger.info("WhatsApp Cloud API disabled; skipping admin notification")
        return False
    token = os.environ.get("WHATSAPP_ACCESS_TOKEN", "")
    phone_id = os.environ.get("WHATSAPP_PHONE_NUMBER_ID", "")
    admin_number = os.environ.get("WHATSAPP_ADMIN_NUMBER", "")
    if not (token and phone_id and admin_number):
        logger.warning("WhatsApp Cloud API enabled but credentials missing")
        return False
    payload = {
        "messaging_product": "whatsapp",
        "to": admin_number.lstrip("+"),
        "type": "text",
        "text": {"preview_url": False, "body": build_whatsapp_message(enquiry)},
    }
    try:
        async with httpx.AsyncClient(timeout=15) as http:
            r = await http.post(
                f"https://graph.facebook.com/v21.0/{phone_id}/messages",
                headers={"Authorization": f"Bearer {token}"},
                json=payload,
            )
        if r.status_code >= 400:
            logger.error("WhatsApp API error %s: %s", r.status_code, r.text)
            return False
        return True
    except Exception as exc:
        logger.error("WhatsApp API request failed: %s", exc)
        return False


@api.post("/enquiries")
async def create_enquiry(body: EnquiryCreate):
    if not any(ch.isdigit() for ch in body.phone):
        raise HTTPException(status_code=422, detail="Please enter a valid phone number")
    enquiry = Enquiry(**body.model_dump(), created_at=datetime.now(timezone.utc).isoformat())
    doc = enquiry.to_mongo()
    result = await db.enquiries.insert_one(doc)
    notified = await notify_admin_whatsapp(doc)
    if notified:
        await db.enquiries.update_one({"_id": result.inserted_id}, {"$set": {"whatsapp_notified": True}})
    admin_number = (os.environ.get("WHATSAPP_ADMIN_NUMBER") or os.environ.get("BUSINESS_WHATSAPP", "")).lstrip("+")
    return {
        "id": str(result.inserted_id),
        "whatsapp_notified": notified,
        "whatsapp_url": f"https://wa.me/{admin_number}?text={quote(build_whatsapp_message(doc))}",
        "message": "Thank you for reaching out to Nomyra Travels. We have received your enquiry and will get back to you shortly.",
    }


@api.get("/admin/enquiries", response_model=List[Enquiry])
async def admin_enquiries(skip: int = 0, limit: int = 50, _: dict = Depends(require_admin)):
    docs = await db.enquiries.find({}).sort("created_at", -1).skip(skip).limit(min(limit, 200)).to_list(200)
    return [Enquiry.from_mongo(d) for d in docs]


@api.patch("/admin/enquiries/{enquiry_id}")
async def update_enquiry_status(enquiry_id: str, payload: dict, _: dict = Depends(require_admin)):
    status = payload.get("status")
    if status not in {"new", "contacted", "converted", "closed"}:
        raise HTTPException(status_code=422, detail="Invalid status")
    await db.enquiries.update_one({"_id": ObjectId(enquiry_id)}, {"$set": {"status": status}})
    return {"ok": True}


@api.delete("/admin/enquiries/{enquiry_id}")
async def delete_enquiry(enquiry_id: str, _: dict = Depends(require_admin)):
    await db.enquiries.delete_one({"_id": ObjectId(enquiry_id)})
    return {"ok": True}


# ---------------------------------------------------------------- generic admin CRUD
COLLECTIONS = {
    "packages": Package,
    "destinations": Destination,
    "experiences": Experience,
    "testimonials": Testimonial,
    "gallery": GalleryItem,
    "blog": BlogPost,
}


def _model_for(collection: str):
    model = COLLECTIONS.get(collection)
    if not model:
        raise HTTPException(status_code=404, detail="Unknown collection")
    return model


@api.get("/admin/{collection}")
async def admin_list(collection: str, skip: int = 0, limit: int = 100, _: dict = Depends(require_admin)):
    model = _model_for(collection)
    docs = await db[collection].find({}).skip(skip).limit(min(limit, 200)).to_list(200)
    return [model.from_mongo(d).model_dump() for d in docs]


@api.post("/admin/{collection}")
async def admin_create(collection: str, payload: dict, _: dict = Depends(require_admin)):
    model = _model_for(collection)
    item = model(**payload)
    result = await db[collection].insert_one(item.to_mongo())
    return {"id": str(result.inserted_id)}


@api.put("/admin/{collection}/{item_id}")
async def admin_update(collection: str, item_id: str, payload: dict, _: dict = Depends(require_admin)):
    model = _model_for(collection)
    existing = await db[collection].find_one({"_id": ObjectId(item_id)})
    if not existing:
        raise HTTPException(status_code=404, detail="Item not found")
    merged = {**{k: v for k, v in existing.items() if k != "_id"}, **payload}
    item = model(**merged)
    await db[collection].update_one({"_id": ObjectId(item_id)}, {"$set": item.to_mongo()})
    return {"ok": True}


@api.delete("/admin/{collection}/{item_id}")
async def admin_delete(collection: str, item_id: str, _: dict = Depends(require_admin)):
    _model_for(collection)
    await db[collection].delete_one({"_id": ObjectId(item_id)})
    return {"ok": True}


# ---------------------------------------------------------------- SEO
def _site_url() -> str:
    return (os.environ.get("SITE_URL") or "").rstrip("/")


@app.get("/robots.txt", response_class=PlainTextResponse)
@api.get("/robots.txt", response_class=PlainTextResponse)
async def robots():
    return f"User-agent: *\nAllow: /\n\nSitemap: {_site_url()}/sitemap.xml\n"


@app.get("/sitemap.xml")
@api.get("/sitemap.xml")
async def sitemap():
    base = _site_url()
    urls = ["/", "/packages", "/meghalaya", "/arunachal", "/experiences", "/gallery",
            "/about", "/contact", "/blog", "/privacy-policy", "/terms"]
    for coll, prefix in (("packages", "/packages/"), ("destinations", "/destinations/"),
                         ("experiences", "/experiences/"), ("blog", "/blog/")):
        for doc in await db[coll].find({}, {"slug": 1}).limit(500).to_list(500):
            if doc.get("slug"):
                urls.append(f"{prefix}{doc['slug']}")
    today = datetime.now(timezone.utc).date().isoformat()
    body = "".join(
        f"<url><loc>{base}{u}</loc><lastmod>{today}</lastmod>"
        f"<changefreq>weekly</changefreq><priority>{'1.0' if u == '/' else '0.7'}</priority></url>"
        for u in urls
    )
    xml = f'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{body}</urlset>'
    return Response(content=xml, media_type="application/xml")


# ---------------------------------------------------------------- startup
async def seed():
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    for coll in ("packages", "destinations", "experiences", "blog"):
        await db[coll].create_index("slug", unique=True)

    admin_email = os.environ["ADMIN_EMAIL"].lower()
    admin_password = os.environ["ADMIN_PASSWORD"]
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        await db.users.insert_one({"email": admin_email, "password_hash": hash_password(admin_password),
                                   "name": "Nomyra Admin", "role": "admin",
                                   "created_at": datetime.now(timezone.utc).isoformat()})
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one({"email": admin_email},
                                  {"$set": {"password_hash": hash_password(admin_password)}})

    content = (
        ("packages", seed_data.PACKAGES),
        ("destinations", seed_data.DESTINATIONS),
        ("experiences", seed_data.EXPERIENCES),
        ("testimonials", seed_data.TESTIMONIALS),
        ("gallery", seed_data.GALLERY),
        ("blog", seed_data.BLOG),
    )
    for coll, items in content:
        if await db[coll].count_documents({}) == 0 and items:
            await db[coll].insert_many([dict(i) for i in items])
            logger.info("Seeded %s (%d items)", coll, len(items))

    for key, value in (("about", seed_data.ABOUT), ("why_us", seed_data.WHY_US)):
        if await db.site_content.count_documents({"key": key}) == 0:
            await db.site_content.insert_one({"key": key, "value": value})


@app.on_event("startup")
async def on_startup():
    await seed()


@app.on_event("shutdown")
async def on_shutdown():
    client.close()


app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
