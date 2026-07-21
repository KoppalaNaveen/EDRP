import puppeteer from 'puppeteer';
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--disable-gpu', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setContent('<div style="height: 8000px; width: 1920px; background: linear-gradient(red, blue);">Test</div>');
  await page.setViewport({ width: 1920, height: 8000, deviceScaleFactor: 4 });
  await page.screenshot({ path: 'test_large.png', fullPage: true });
  await browser.close();
  console.log('Success');
})();
