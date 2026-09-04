from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:3003/admin")

    page.evaluate("localStorage.setItem('adminAuth', 'true');")
    page.goto("http://localhost:3003/admin/tours")
    page.wait_for_timeout(2000)

    # Click edit on the first tour
    page.click("text=Edit")
    page.wait_for_timeout(1000)

    page.set_input_files("input[type='file']", "test_img.png")
    page.wait_for_timeout(1000)

    # Save the edit
    page.click("text=Save")
    page.wait_for_timeout(1000)

    page.screenshot(path="/home/jules/verification/screenshots/admin_saved.png")

    browser.close()
    print("Done")
