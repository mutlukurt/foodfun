import { chromium } from 'playwright';
import { spawn } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const APP_URL = 'http://localhost:5173';
const SCREENSHOT_DIR = 'assets/screenshots';
const TIMESTAMP = Date.now();
const FILENAME = `dark-homepage-${TIMESTAMP}.png`;
const FULL_PATH = join(SCREENSHOT_DIR, FILENAME);

// Ensure screenshots directory exists
if (!existsSync(SCREENSHOT_DIR)) {
  mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// Function to start dev server if not running
async function ensureDevServerRunning(): Promise<void> {
  try {
    const response = await fetch(APP_URL);
    if (response.ok) {
      console.log('✅ Dev server is already running');
      return;
    }
  } catch (error) {
    console.log('⚠️  Dev server not responding, starting it...');
  }

  return new Promise((resolve, reject) => {
    const devProcess = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      shell: true
    });

    // Wait for server to be ready
    let output = '';
    devProcess.stdout?.on('data', (data) => {
      output += data.toString();
      if (output.includes('Local:') || output.includes('localhost:')) {
        console.log('✅ Dev server started successfully');
        setTimeout(resolve, 2000); // Give it time to fully start
      }
    });

    devProcess.stderr?.on('data', (data) => {
      console.error('Dev server error:', data.toString());
    });

    // Timeout after 30 seconds
    setTimeout(() => {
      devProcess.kill();
      reject(new Error('Dev server failed to start within 30 seconds'));
    }, 30000);
  });
}

// Function to capture dark theme screenshot
async function captureDarkScreenshot(): Promise<void> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();

  try {
    console.log('🌐 Navigating to app...');
    await page.goto(APP_URL, { waitUntil: 'networkidle' });

    console.log('🌙 Forcing dark theme...');
    // Force dark theme via localStorage and data-theme attribute
    await page.addInitScript(() => {
      try {
        localStorage.setItem('theme', 'dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } catch (error) {
        console.error('Failed to set theme:', error);
      }
    });

    // Reload to apply theme
    await page.reload({ waitUntil: 'networkidle' });

    // Wait for fonts and images to load
    console.log('⏳ Waiting for content to settle...');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300);

    // Validate that dark theme is actually applied
    console.log('🔍 Validating dark theme...');
    const backgroundColor = await page.evaluate(() => {
      const body = document.body;
      const computedStyle = getComputedStyle(body);
      return computedStyle.backgroundColor;
    });

    console.log(`Background color: ${backgroundColor}`);

    // Check if it's too light (close to white)
    if (backgroundColor.includes('255, 255, 255') || backgroundColor.includes('rgb(255, 255, 255)')) {
      throw new Error('Theme validation failed: Background is still white/light');
    }

    // Additional validation - check if data-theme is set
    const themeAttribute = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme');
    });

    if (themeAttribute !== 'dark') {
      throw new Error(`Theme validation failed: data-theme is "${themeAttribute}", expected "dark"`);
    }

    console.log('✅ Dark theme validated successfully');

    // Take full page screenshot
    console.log('📸 Capturing screenshot...');
    await page.screenshot({
      path: FULL_PATH,
      fullPage: true
    });

    console.log(`✅ Screenshot saved: ${FULL_PATH}`);

  } catch (error) {
    console.error('❌ Error capturing screenshot:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Main execution
async function main() {
  try {
    console.log('🚀 Starting dark theme screenshot capture...');
    
    await ensureDevServerRunning();
    await captureDarkScreenshot();
    
    console.log('\n🎉 Screenshot capture completed successfully!');
    console.log(`📁 File: ${FULL_PATH}`);
    console.log(`🔗 README update needed: ![Dark theme homepage](${FULL_PATH})`);
    
  } catch (error) {
    console.error('💥 Failed to capture screenshot:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { captureDarkScreenshot, ensureDevServerRunning };
