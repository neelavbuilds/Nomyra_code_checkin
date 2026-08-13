"""Backend API tests for Nomyra Travels."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://nomyra-explore.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "nomadaccidental@gmail.com"
ADMIN_PASSWORD = "Qwerty@1998"


@pytest.fixture(scope="session")
def s():
    return requests.Session()


@pytest.fixture(scope="session")
def admin_token(s):
    r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, r.text
    return r.json()["access_token"]


@pytest.fixture(scope="session")
def admin_headers(admin_token):
    return {"Authorization": f"Bearer {admin_token}"}


# --- public content
class TestPublic:
    def test_root(self, s):
        r = s.get(f"{API}/")
        assert r.status_code == 200
        assert r.json().get("status") == "ok"

    def test_settings(self, s):
        r = s.get(f"{API}/settings")
        assert r.status_code == 200
        data = r.json()
        assert data["phone"] == "+917002492612"
        assert data["email"] == "nomadaccidental@gmail.com"
        assert data["whatsapp_cloud_enabled"] is False

    def test_packages(self, s):
        r = s.get(f"{API}/packages")
        assert r.status_code == 200
        pkgs = r.json()
        assert len(pkgs) >= 3
        assert all("slug" in p and "title" in p for p in pkgs)

    def test_package_detail(self, s):
        pkgs = s.get(f"{API}/packages").json()
        r = s.get(f"{API}/packages/{pkgs[0]['slug']}")
        assert r.status_code == 200
        assert r.json()["slug"] == pkgs[0]["slug"]

    def test_destinations_by_state(self, s):
        r = s.get(f"{API}/destinations", params={"state": "Meghalaya"})
        assert r.status_code == 200
        d = r.json()
        assert len(d) >= 1
        assert all(x["state"] == "Meghalaya" for x in d)

    def test_experiences(self, s):
        r = s.get(f"{API}/experiences")
        assert r.status_code == 200
        assert len(r.json()) >= 1

    def test_gallery(self, s):
        r = s.get(f"{API}/gallery")
        assert r.status_code == 200

    def test_testimonials(self, s):
        r = s.get(f"{API}/testimonials")
        assert r.status_code == 200

    def test_blog_12_posts(self, s):
        r = s.get(f"{API}/blog")
        assert r.status_code == 200
        posts = r.json()
        assert len(posts) == 12, f"Expected 12 blog posts, got {len(posts)}"

    def test_blog_detail(self, s):
        posts = s.get(f"{API}/blog").json()
        r = s.get(f"{API}/blog/{posts[0]['slug']}")
        assert r.status_code == 200

    def test_about(self, s):
        assert s.get(f"{API}/about").status_code == 200

    def test_why_us(self, s):
        assert s.get(f"{API}/why-us").status_code == 200


# --- enquiries
class TestEnquiries:
    def test_create_enquiry_and_admin_view(self, s, admin_headers):
        payload = {
            "full_name": "TEST_User",
            "phone": "9999999999",
            "whatsapp": "9999999999",
            "destination": "Meghalaya",
            "travelers": "2",
            "travel_date": "2026-03-01",
            "days": "5",
            "travel_style": "Adventure",
            "experiences": ["Trekking"],
            "message": "TEST enquiry",
        }
        r = s.post(f"{API}/enquiries", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data
        assert data["whatsapp_notified"] is False
        assert "wa.me/917002492612" in data["whatsapp_url"]

        # verify in admin
        listing = s.get(f"{API}/admin/enquiries", headers=admin_headers)
        assert listing.status_code == 200
        ids = [e["id"] for e in listing.json()]
        assert data["id"] in ids

        # update status
        p = s.patch(f"{API}/admin/enquiries/{data['id']}", json={"status": "contacted"}, headers=admin_headers)
        assert p.status_code == 200

        # cleanup
        d = s.delete(f"{API}/admin/enquiries/{data['id']}", headers=admin_headers)
        assert d.status_code == 200

    def test_enquiry_validation_missing_name(self, s):
        r = s.post(f"{API}/enquiries", json={"full_name": "", "phone": "9999"})
        assert r.status_code == 422

    def test_enquiry_invalid_phone(self, s):
        r = s.post(f"{API}/enquiries", json={"full_name": "Somebody", "phone": "abcdef"})
        assert r.status_code == 422


# --- auth
class TestAuth:
    def test_login_success(self, s):
        r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert r.status_code == 200
        assert "access_token" in r.json()

    def test_me_with_bearer(self, s, admin_headers):
        r = s.get(f"{API}/auth/me", headers=admin_headers)
        assert r.status_code == 200
        assert r.json()["email"] == ADMIN_EMAIL

    def test_me_without_token(self, s):
        r = requests.get(f"{API}/auth/me")
        assert r.status_code == 401

    def test_admin_endpoint_requires_auth(self, s):
        r = requests.get(f"{API}/admin/enquiries")
        assert r.status_code == 401

    def test_login_wrong_password(self, s):
        # ONE wrong-password test only (avoid lockout)
        r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong-pw-once"})
        assert r.status_code in (401, 429)


# --- admin CRUD
class TestAdminCrud:
    def test_gallery_crud(self, s, admin_headers):
        payload = {"category": "TEST_cat", "image": "https://example.com/x.jpg", "caption": "TEST", "alt": "t", "order": 999}
        r = s.post(f"{API}/admin/gallery", json=payload, headers=admin_headers)
        assert r.status_code == 200, r.text
        item_id = r.json()["id"]

        # edit
        upd = s.put(f"{API}/admin/gallery/{item_id}", json={"caption": "TEST updated"}, headers=admin_headers)
        assert upd.status_code == 200

        # list contains it
        lst = s.get(f"{API}/admin/gallery", headers=admin_headers)
        assert lst.status_code == 200
        assert any(x["id"] == item_id and x["caption"] == "TEST updated" for x in lst.json())

        # delete
        d = s.delete(f"{API}/admin/gallery/{item_id}", headers=admin_headers)
        assert d.status_code == 200


# --- SEO
class TestSeo:
    def test_sitemap(self, s):
        r = s.get(f"{BASE_URL}/api/sitemap.xml")
        assert r.status_code == 200
        assert "<urlset" in r.text
        assert "/packages/" in r.text
        assert "/blog/" in r.text

    def test_robots(self, s):
        r = s.get(f"{BASE_URL}/api/robots.txt")
        assert r.status_code == 200
        assert "User-agent" in r.text
        assert "Sitemap:" in r.text
