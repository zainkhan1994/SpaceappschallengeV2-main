import os
from playwright.sync_api import sync_playwright

OUTPUT_DIR = "spaceapps_resources"
os.makedirs(OUTPUT_DIR, exist_ok=True)

URL = "https://www.spaceappschallenge.org/resources/"

def scrape_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        print(f"Loading: {URL}")
        page.goto(URL, wait_until="networkidle")

        # Save full HTML
        html_path = os.path.join(OUTPUT_DIR, "index.html")
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(page.content())

        # Take a full-page screenshot for reference
        screenshot_path = os.path.join(OUTPUT_DIR, "fullpage.png")
        page.screenshot(path=screenshot_path, full_page=True)

        # Download all images on the page
        os.makedirs(os.path.join(OUTPUT_DIR, "images"), exist_ok=True)
        img_elements = page.query_selector_all("img")
        for i, img in enumerate(img_elements):
            src = img.get_attribute("src")
            if not src:
                continue
            url = page.urljoin(src) if "http" not in src else src
            try:
                img_bytes = page.request.get(url).body()
                img_path = os.path.join(OUTPUT_DIR, "images", f"image_{i}.png")
                with open(img_path, "wb") as img_file:
                    img_file.write(img_bytes)
            except:
                continue

        print(f"✅ Done! HTML, images, and screenshot saved to '{OUTPUT_DIR}'")
        browser.close()

if __name__ == "__main__":
    scrape_page()

