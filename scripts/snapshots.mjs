#!/usr/bin/env node

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = 'docs';
const BASE_URL = 'http://localhost:5173/foodfun/';
const SCREENSHOTS = [
  {
    name: 'home-light',
    description: 'Homepage hero & navbar (Light Theme)',
    viewport: { width: 1440, height: 900 },
    scrollTo: null,
    theme: 'light'
  },
  {
    name: 'home-dark',
    description: 'Homepage hero & navbar (Dark Theme)',
    viewport: { width: 1440, height: 900 },
    scrollTo: null,
    theme: 'dark'
  },
  {
    name: 'menu-light',
    description: 'Menu section with aligned cards/buttons (Light Theme)',
    viewport: { width: 1440, height: 900 },
    scrollTo: '#menu',
    theme: 'light'
  },
  {
    name: 'menu-dark',
    description: 'Menu section with aligned cards/buttons (Dark Theme)',
    viewport: { width: 1440, height: 900 },
    scrollTo: '#menu',
    theme: 'dark'
  },
  {
    name: 'reviews-light',
    description: 'Reviews section with carousel (Light Theme)',
    viewport: { width: 1440, height: 900 },
    scrollTo: '#testimonials',
    theme: 'light'
  },
  {
    name: 'reviews-dark',
    description: 'Reviews section with carousel (Dark Theme)',
    viewport: { width: 1440, height: 900 },
    scrollTo: '#testimonials',
    theme: 'dark'
  },
  {
    name: 'subscribe-light',
    description: 'Newsletter/subscribe section (Light Theme)',
    viewport: { width: 1440, height: 900 },
    scrollTo: '#subscribe',
    theme: 'light'
  },
  {
    name: 'subscribe-dark',
    description: 'Newsletter/subscribe section (Dark Theme)',
    viewport: { width: 1440, height: 900 },
    scrollTo: '#subscribe',
    theme: 'dark'
  }
];

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
    
    // Set theme and reload page
    try {
      console.log(`🎨 Setting ${theme} theme for ${name}...`);
      
      await page.evaluate((theme) => {
        // Set localStorage first
        localStorage.setItem('theme', theme);
        
        // Apply theme immediately
        document.documentElement.setAttribute('data-theme', theme);
        
        // Also update meta theme-color if it exists
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
          const color = theme === 'dark' ? '#0D0F14' : '#ffffff';
          metaThemeColor.setAttribute('content', color);
        }
      }, theme);
      
      // Reload the page to ensure theme is fully applied
      await page.reload({ waitUntil: 'networkidle0' });
      
      // Wait for theme transition and any CSS changes
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`✅ ${theme} theme applied for ${name}`);
      
    } catch (error) {
      console.log(`⚠️  Could not set ${theme} theme for ${name}: ${error.message}`);
    }
    
    // Scroll to specific section if needed
    if (scrollTo) {
      try {
        console.log(`📍 Scrolling to ${scrollTo}...`);
        const element = await page.$(scrollTo) || 
                       await page.$(`section[data-section="${scrollTo.replace('#', '')}"]`) ||
                       await page.$(`[id="${scrollTo.replace('#', '')}"]`);
        
        if (element) {
          await element.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'start' }));
          // Wait for any animations or loading to complete
          await new Promise(resolve => setTimeout(resolve, 800));
          console.log(`✅ Scrolled to ${scrollTo}`);
        } else {
          console.log(`⚠️  Could not find element ${scrollTo} for ${name}`);
        }
      } catch (error) {
        console.log(`⚠️  Could not scroll to ${scrollTo} for ${name}: ${error.message}`);
      }
    }
    
    // Wait for fonts/images and network idle before capture
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Take screenshot
    await page.screenshot({ 
      path: filepath, 
      fullPage: false, 
      type: 'png' 
    });
    
    // Get file size for verification
    const stats = fs.statSync(filepath);
    const fileSizeInKB = Math.round(stats.size / 1024);
    
    console.log(`✅ ${description} saved to ${filepath} (${fileSizeInKB}KB)`);
    return true;
    
  } catch (error) {
    console.error(`❌ Failed to take ${description}: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🎬 Starting FoodFun screenshots generation...');
  console.log(`🎯 Base URL: ${BASE_URL}`);
  
  // Ensure docs directory exists
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
    console.log(`📁 Created ${SCREENSHOTS_DIR}/ directory`);
  }
  
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
    const success = await takeScreenshot(page, screenshot, BASE_URL);
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
