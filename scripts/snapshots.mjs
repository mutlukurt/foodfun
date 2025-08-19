#!/usr/bin/env node

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = 'assets/screenshots';
const SCREENSHOTS = [
  {
    name: 'dark-homepage',
    description: 'Dark theme homepage',
    viewport: { width: 1440, height: 900 },
    scrollTo: null,
    theme: 'dark'
  }
];

async function getTargetUrl() {
  // Check if dev server is running on port 5175
  try {
    const response = await fetch('http://localhost:5175/foodfun/');
    if (response.ok) {
      console.log('🚀 Found dev server, using localhost:5175');
      return 'http://localhost:5175/foodfun/';
    }
  } catch (error) {
    // Dev server not running
  }
  
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
        console.log(`🌙 Setting dark theme for ${name}...`);
        
        // Set theme via JavaScript - more reliable approach
        await page.evaluate(() => {
          // Set localStorage first
          localStorage.setItem('theme', 'dark');
          
          // Apply theme immediately
          document.documentElement.setAttribute('data-theme', 'dark');
          
          // Also update meta theme-color if it exists
          const metaThemeColor = document.querySelector('meta[name="theme-color"]');
          if (metaThemeColor) {
            metaThemeColor.setAttribute('content', '#0D0F14');
          }
          
          // Force any CSS custom properties to update
          document.body.style.display = 'none';
          document.body.offsetHeight; // trigger reflow
          document.body.style.display = '';
        });
        
        // Wait longer for theme transition and any CSS changes
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`✅ Dark theme applied for ${name}`);
        
      } catch (error) {
        console.log(`⚠️  Could not set dark theme for ${name}: ${error.message}`);
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
