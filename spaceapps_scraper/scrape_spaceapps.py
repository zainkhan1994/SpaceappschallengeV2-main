import os
import re
import requests
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
from tqdm import tqdm

BASE_URL = "https://www.spaceappschallenge.org/resources/"
OUTPUT_DIR = "spaceapps_site"
ASSETS_DIR = os.path.join(OUTPUT_DIR, "assets")

os.makedirs(ASSETS_DIR, exist_ok=True)

visited = set()
session = requests.Session()
session.headers.update({"User-Agent": "Mozilla/5.0"})

def download_file(url, folder):
    local_filename = os.path.join(folder, os.path.basename(urlparse(url).path))
    try:
        r = session.get(url, stream=True, timeout=10)
        r.raise_for_status()
        with open(local_filename, "wb") as f:
            for chunk in r.iter_content(1024):
                f.write(chunk)
        return os.path.relpath(local_filename, OUTPUT_DIR)
    except:
        return url

def scrape_page(url):
    if url in visited:
        return
    visited.add(url)

    print(f"Scraping: {url}")
    try:
        res = session.get(url)
        res.raise_for_status()
    except:
        return

    soup = BeautifulSoup(res.text, "html.parser")

    # Download images, CSS, JS
    for tag in soup.find_all(["img", "link", "script"]):
        attr = "src" if tag.name in ["img", "script"] else "href"
        link = tag.get(attr)
        if not link:
            continue
        full_url = urljoin(url, link)
        if full_url.startswith(BASE_URL) or full_url.startswith("https://www.spaceappschallenge.org/static/"):
            new_path = download_file(full_url, ASSETS_DIR)
            tag[attr] = new_path

    # Rewrite internal links to local .html files
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if href.startswith("/") or BASE_URL in href:
            a["href"] = "#"

    # Save HTML
    filename = os.path.join(OUTPUT_DIR, os.path.basename(urlparse(url).path) or "index.html")
    with open(filename, "w", encoding="utf-8") as f:
        f.write(str(soup))

    # Recursively follow links within /resources/
    for a in soup.find_all("a", href=True):
        href = urljoin(url, a["href"])
        if href.startswith(BASE_URL) and href not in visited:
            scrape_page(href)

def main():
    scrape_page(BASE_URL)
    print("\n✅ Done! Saved to:", OUTPUT_DIR)

if __name__ == "__main__":
    main()

