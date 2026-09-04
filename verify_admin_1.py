from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:3003/admin")
    page.wait_for_timeout(2000)
    page.screenshot(path="/home/jules/verification/screenshots/admin_1.png", full_page=True)
    browser.close()
    print("Screenshot saved to /home/jules/verification/screenshots/admin_1.png")
