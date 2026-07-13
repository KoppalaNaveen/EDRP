import puppeteer from 'puppeteer';

const TARGET_PAGES = [
  { url: '/dashboard', name: 'admin_dashboard' },
  { url: '/dashboard/manager', name: 'manager_dashboard' },
  { url: '/dashboard/employee', name: 'employee_dashboard' }
];

async function capture() {
  const baseUrl = 'http://localhost:5173';
  
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Set a high device scale factor for zoom clarity
    await page.setViewport({
      width: 1440,
      height: 900,
      deviceScaleFactor: 6
    });

    for (const target of TARGET_PAGES) {
      const fullUrl = `${baseUrl}${target.url}`;
      console.log(`Navigating to ${fullUrl}...`);
      await page.goto(fullUrl, { waitUntil: 'networkidle0' });
      
      // Wait for any animations to settle
      await new Promise(r => setTimeout(r, 1000));
      
      const screenshotPath = `${target.name}.png`;
      const pdfPath = `${target.name}.pdf`;
      
      console.log(`Capturing screenshot ${screenshotPath}...`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      
      console.log(`Capturing PDF ${pdfPath}...`);
      await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });
    }
    
    await browser.close();
  } catch (error) {
    console.error('Error during capture:', error);
  }
}

capture().then(() => {
  console.log('Done!');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
