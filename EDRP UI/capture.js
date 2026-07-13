import puppeteer from 'puppeteer';
import { spawn } from 'child_process';

const TARGET_PAGES = [
  { url: '/dashboard', name: 'admin_dashboard' },
  { url: '/dashboard/manager', name: 'manager_dashboard' },
  { url: '/dashboard/employee', name: 'employee_dashboard' }
];

async function capture() {
  console.log('Starting Vite server...');
  
  // Use cross-platform spawn for npm
  const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const serverProcess = spawn(npmCmd, ['run', 'dev'], { shell: true });
  
  let baseUrl = '';

  await new Promise((resolve, reject) => {
    serverProcess.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(output);
      const match = output.match(/(http:\/\/localhost:\d+\/?)/);
      if (match && !baseUrl) {
        baseUrl = match[1];
        resolve();
      }
    });

    serverProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    serverProcess.on('error', (err) => {
      reject(err);
    });
  });

  console.log(`Vite server running at ${baseUrl}`);
  
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Set a high device scale factor for zoom clarity
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 4 // Extremely high resolution
    });

    for (const target of TARGET_PAGES) {
      const fullUrl = `${baseUrl.replace(/\/$/, '')}${target.url}`;
      console.log(`Navigating to ${fullUrl}...`);
      await page.goto(fullUrl, { waitUntil: 'networkidle2' });
      
      // Wait for any animations to settle and charts to load
      await new Promise(r => setTimeout(r, 2000));
      
      const screenshotPath = `${target.name}.png`;
      const pdfPath = `${target.name}.pdf`;
      
      console.log(`Capturing screenshot ${screenshotPath}...`);
      // Capture a full page PNG
      await page.screenshot({ path: screenshotPath, fullPage: true });
      
      console.log(`Capturing PDF ${pdfPath}...`);
      // Calculate full page height for continuous PDF (no pagination)
      const bodyHandle = await page.$('body');
      const { height } = await bodyHandle.boundingBox();
      await bodyHandle.dispose();

      await page.pdf({ 
        path: pdfPath, 
        width: '1920px',
        height: `${Math.ceil(height) + 100}px`,
        printBackground: true 
      });
    }
    
    await browser.close();
  } catch (error) {
    console.error('Error during capture:', error);
  } finally {
    // Kill the server
    console.log('Killing Vite server...');
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', serverProcess.pid, '/f', '/t']);
    } else {
      serverProcess.kill('SIGKILL');
    }
  }
}

capture().then(() => {
  console.log('Done!');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
