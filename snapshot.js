const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  console.log('Navigating to http://localhost:80...');
  await page.goto('http://localhost:80');
  await page.screenshot({ path: 'citycabs-snapshot.png', fullPage: true });
  console.log('Snapshot captured: citycabs-snapshot.png');
  await browser.close();
})();
