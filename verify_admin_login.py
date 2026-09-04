from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:3003/admin")

    # login with arbitrary data just to see if we can get to local storage mocked login
    # Wait for the email field
    page.fill("input[type='email']", "admin@citycabs24.com")
    page.fill("input[type='password']", "Shahrukh@123")
    page.click("button[type='submit']")
    page.wait_for_timeout(2000)

    # Try bypassing with local storage
    page.evaluate("localStorage.setItem('adminAuth', 'true');")
    page.goto("http://localhost:3003/admin/tours")
    page.wait_for_timeout(2000)

    page.screenshot(path="/home/jules/verification/screenshots/admin_tours.png", full_page=True)

    # Click edit on the first tour
    page.click("text=Edit")
    page.wait_for_timeout(1000)

    # Attach a mock file to the file input
    # Create a small blank image for test
    import os
    if not os.path.exists("test_img.png"):
        import PIL.Image
        img = PIL.Image.new("RGB", (100,100), color="red")
        img.save("test_img.png")

    page.set_input_files("input[type='file']", "test_img.png")
    page.wait_for_timeout(1000)

    page.screenshot(path="/home/jules/verification/screenshots/admin_edit.png")

    browser.close()
    print("Done")
