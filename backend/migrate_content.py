"""One-off content migration: swap in client-supplied photos and rename the Chaw Pau trek."""
import asyncio
import os
from pathlib import Path
from dotenv import load_dotenv

ROOT = Path(__file__).parent
load_dotenv(ROOT / ".env")

from motor.motor_asyncio import AsyncIOMotorClient  # noqa: E402
import seed_data  # noqa: E402

IMG = seed_data.IMG


async def main():
    db = AsyncIOMotorClient(os.environ["MONGO_URL"])[os.environ["DB_NAME"]]

    by_slug = {e["slug"]: e for e in seed_data.EXPERIENCES}
    for slug, doc in by_slug.items():
        await db.experiences.update_one({"slug": slug}, {"$set": dict(doc)}, upsert=True)
    await db.experiences.delete_one({"slug": "chaw-pau-trek"})

    await db.gallery.update_one(
        {"caption": "Riverside camp, Shnongpdeng"},
        {"$set": {"image": IMG["camp_stars"], "caption": "Starry night, Shnongpdeng",
                  "alt": "Tent glowing under a starry sky beside the Umngot river at Shnongpdeng Meghalaya"}},
    )

    for post in seed_data.BLOG:
        await db.blog.update_one({"slug": post["slug"]}, {"$set": dict(post)})

    print("experiences:", [d["slug"] async for d in db.experiences.find({}, {"slug": 1})])


asyncio.run(main())
