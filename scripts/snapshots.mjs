#!/usr/bin/env node

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = 'assets/screenshots';
const SCREENSHOTS = [
  {
    name: 'dashboard',
    description: 'Dashboard / Homepage (Light theme)',
    viewport: { width: 1440, height: 900 },
    scrollTo: null,
    theme: 'light'
  },
  {
    name: 'dashboard-dark',
    description: 'Dashboard / Homepage (Dark theme)',
    viewport: { width: 1440, height: 900 },
    scrollTo: null,
    theme: 'dark'
  },
  {
    name: 'workspace',
    description: 'Menu Workspace Section',
    viewport: { width: 1440, height: 900 },
    scrollTo: '#menu',
    theme: 'light'
  },
  {
    name: 'about-section',
    description: 'About Section',
    viewport: { width: 1440, height: 900 },
    scrollTo: '#about',
    theme: 'light'
  },
  {
    name: 'testimonials',
    description: 'Testimonials Section',
    viewport: { width: 1440, height: 900 },
    scrollTo: '#testimonials',
    theme: 'light'
  },
  {
    name: 'mobile-view',
    description: 'Mobile Responsive View',
    viewport: { width: 390, height: 844 },
    scrollTo: null,
    theme: 'light'
  }
];

async function getTargetUrl() {
  // Check if dev server is running on port 5173
  try {
    const response = await fetch('http://localhost:5173/');
    if (response.ok) {
      console.log('🚀 Found dev server, using localhost:5173');
      return 'http://localhost:5173/';
    }
  } catch (error) {
    // Dev server not running
  }
  
  // Check if dist exists (built version)
  if (fs.existsSync('dist')) {
    console.log('📁 Found dist/ directory, using built version');
    return 'http://localhost:4173/foodfun/';
  }
  
  // Fallback to live URL
  console.log('🌐 Using live URL');
  return 'https://mutlukurt.github.io/foodfun/';
}

async function takeScreenshot(page, screenshot, targetUrl) {
  const { name, description, viewport, scrollTo, theme } = screenshot;
  const filepath = path.join(SCREENSHOTS_DIR, `${name}.png`);
  
  try {
    console.log(`📸 Taking screenshot: ${description}`);
    
    // Set viewport
    await page.setViewport(viewport);
    
    // Navigate to page
    await page.goto(targetUrl, { 
      waitUntil: 'networkidle0', 
      timeout: 60000 
    });
    
    // Set theme if needed
    if (theme === 'dark') {
      try {
        // Try to find and click theme toggle button
        const themeToggle = await page.$('.theme-toggle');
        if (themeToggle) {
          await themeToggle.click();
          await new Promise(resolve => setTimeout(resolve, 500)); // Wait for theme transition
        } else {
          // Fallback: set theme via JavaScript
          await page.evaluate(() => {
            document.documentElement.setAttribute('data-theme', 'dark');
          });
        }
      } catch (error) {
        console.log(`⚠️  Could not set dark theme for ${name}, continuing...`);
      }
    }
    
    // Scroll to specific section if needed
    if (scrollTo) {
      try {
        const element = await page.$(scrollTo) || 
                       await page.$(`section[data-section="${scrollTo.replace('#', '')}"]`) ||
                       await page.$(`[id="${scrollTo.replace('#', '')}"]`);
        
        if (element) {
          await element.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'start' }));
          await new Promise(resolve => setTimeout(resolve, 400));
        } else {
          console.log(`⚠️  Could not find element ${scrollTo} for ${name}`);
        }
      } catch (error) {
        console.log(`⚠️  Could not scroll to ${scrollTo} for ${name}: ${error.message}`);
      }
    }
    
    // Take screenshot
    await page.screenshot({ 
      path: filepath, 
      fullPage: false, 
      type: 'png' 
    });
    
    console.log(`✅ ${description} saved to ${filepath}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Failed to take ${description}: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🎬 Starting FoodFun screenshots generation...');
  
  // Ensure screenshots directory exists
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
    console.log(`📁 Created ${SCREENSHOTS_DIR}/ directory`);
  }
  
  // Get target URL
  const targetUrl = await getTargetUrl();
  console.log(`🎯 Target URL: ${targetUrl}`);
  
  // Launch browser
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    console.log('🌐 Browser launched');
  } catch (error) {
    console.error('❌ Failed to launch browser:', error.message);
    process.exit(1);
  }
  
  let page;
  try {
    page = await browser.newPage();
    console.log('📄 New page created');
  } catch (error) {
    console.error('❌ Failed to create page:', error.message);
    await browser.close();
    process.exit(1);
  }
  
  // Take all screenshots
  let successCount = 0;
  let totalCount = SCREENSHOTS.length;
  
  for (const screenshot of SCREENSHOTS) {
    const success = await takeScreenshot(page, screenshot, targetUrl);
    if (success) successCount++;
  }
  
  // Cleanup
  await page.close();
  await browser.close();
  
  // Summary
  console.log(`\n📊 Screenshots completed: ${successCount}/${totalCount} successful`);
  
  if (successCount === totalCount) {
    console.log('🎉 All screenshots generated successfully!');
  } else {
    console.log('⚠️  Some screenshots failed. Check the output above for details.');
  }
  
  // Exit with success (even if some screenshots failed)
  process.exit(0);
}

// Handle errors gracefully
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Run the script
main().catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});
