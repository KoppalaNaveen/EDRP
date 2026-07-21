import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import path from 'path';

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
    
    // deviceScaleFactor: 2 avoids the Chrome 16384px maximum texture limit for very tall pages
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2
    });

    const targetUrl = `${baseUrl}/diagram`;
    console.log(`Navigating to ${targetUrl}...`);
    await page.goto(targetUrl, { waitUntil: 'networkidle0' });
    
    // Wait for animations and any network stuff to settle
    await new Promise(r => setTimeout(r, 4000));
    
    // Hide the "Possible network issues detected" toast if it appears
    await page.addStyleTag({ content: 'div:has(> div > span:contains("network issues")) { display: none !important; }' });
    
    const bodyHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    console.log(`Page height is ${bodyHeight}px`);
    
    // We adjust the viewport to full height so there is no scrollbar captured
    // deviceScaleFactor: 2 avoids the Chrome 16384px maximum texture limit for very tall pages
    await page.setViewport({
      width: 1920,
      height: bodyHeight,
      deviceScaleFactor: 2
    });
    
    const screenshotPath = path.resolve('C:\\Users\\admin\\Downloads\\UX Flow Diagram Design (Copy)\\full_ui_diagram.png');
    console.log(`Capturing full UI diagram to ${screenshotPath}...`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    
    // Generate a PDF version which preserves vector text for infinite zoom clarity
    const pdfPath = path.resolve('C:\\Users\\admin\\Downloads\\UX Flow Diagram Design (Copy)\\full_ui_diagram.pdf');
    console.log(`Capturing PDF diagram to ${pdfPath}...`);
    await page.pdf({ path: pdfPath, width: 1920, height: bodyHeight + 100, printBackground: true });
    
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
