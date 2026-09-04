from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:3003/admin")
    page.wait_for_timeout(1000)

    # Click on Tours
    page.click("text=Tours & Pricing")
    page.wait_for_timeout(1000)

    # Click Edit on the first tour
    page.click("text=Edit")
    page.wait_for_timeout(1000)

    page.screenshot(path="/home/jules/verification/screenshots/admin_edit.png")
    browser.close()
    print("Screenshot saved to /home/jules/verification/screenshots/admin_edit.png")
