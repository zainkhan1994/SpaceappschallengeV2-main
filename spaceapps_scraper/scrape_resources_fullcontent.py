import os
from playwright.sync_api import sync_playwright

OUTPUT_DIR = "spaceapps_resources_full"
os.makedirs(OUTPUT_DIR, exist_ok=True)

URL = "https://www.spaceappschallenge.org/resources/"

def scrape_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        print(f"Loading: {URL}")
        page.goto(URL, wait_until="networkidle")

        # Wait until the main content loads
        page.wait_for_selector("main", timeout=20000)

        # Save the **fully rendered** HTML with inline JS content
        html_path = os.path.join(OUTPUT_DIR, "index.html")
        html_content = page.content()
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(html_content)

        # Save a screenshot for reference
        page.screenshot(path=os.path.join(OUTPUT_DIR, "fullpage.png"), full_page=True)

        print(f"✅ Full rendered content saved to: {html_path}")
        browser.close()

if __name__ == "__main__":
    scrape_page()

