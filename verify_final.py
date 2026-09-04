from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    # 1. Start with the home page and trigger the booking modal
    page.goto("http://localhost:3003")
    page.wait_for_timeout(1000)
    page.click("text=Book Now")
    page.wait_for_timeout(1000)

    # 2. Go to the admin section, edit the first tour's image using Base64 upload
    page.goto("http://localhost:3003/admin")
    page.wait_for_timeout(1000)
    page.evaluate("localStorage.setItem('adminAuth', 'true');")
    page.goto("http://localhost:3003/admin/tours")
    page.wait_for_timeout(1000)

    # Edit the first tour
    page.click("text=Edit")
    page.wait_for_timeout(1000)

    if not os.path.exists("test_img.png"):
        import PIL.Image
        img = PIL.Image.new("RGB", (200, 100), color="blue")
        img.save("test_img.png")

    page.set_input_files("input[type='file']", "test_img.png")
    page.wait_for_timeout(1000)

    # Save the edit
    page.click("text=Save")
    page.wait_for_timeout(1000)

    page.screenshot(path="/home/jules/verification/screenshots/final_verification.png", full_page=True)
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()  # MUST close context to save the video
            browser.close()
