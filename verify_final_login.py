from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    page.goto("http://localhost:3003/admin/login")
    page.wait_for_timeout(1000)

    page.fill("input[type='email']", "admin@citycabs24.com")
    page.fill("input[type='password']", "Shahrukh@123")
    page.click("button[type='submit']")
    page.wait_for_timeout(2000)

    page.screenshot(path="/home/jules/verification/screenshots/final_login.png", full_page=True)
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
