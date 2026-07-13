import puppeteer from 'puppeteer';
import { spawn } from 'child_process';

const TARGET_PAGES = [
  { url: '/dashboard', name: 'admin_dashboard' },
  { url: '/dashboard/manager', name: 'manager_dashboard' },
  { url: '/dashboard/employee', name: 'employee_dashboard' }
];

async function capture() {
  console.log('Starting Vite server...');
  const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const serverProcess = spawn(npmCmd, ['run', 'dev'], { shell: true });
  
  serverProcess.stdout.on('data', (data) => process.stdout.write(data.toString()));
  serverProcess.stderr.on('data', (data) => process.stderr.write(data.toString()));

  console.log('Waiting 4 seconds for Vite to start...');
  await new Promise(r => setTimeout(r, 4000));

  const baseUrl = 'http://localhost:5173';
  console.log(`Assuming Vite server running at ${baseUrl}`);
  
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
      const fullUrl = `${baseUrl}${target.url}`;
      console.log(`Navigating to ${fullUrl}...`);
      await page.goto(fullUrl, { waitUntil: 'networkidle2' });
      
      // Wait for any animations to settle and charts to load
      await new Promise(r => setTimeout(r, 2000));
      
      const screenshotPath = `${target.name}.png`;
      console.log(`Capturing full dashboard UI image to ${screenshotPath}...`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
    }
    
    await browser.close();
  } catch (error) {
    console.error('Error during capture:', error);
  } finally {
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
