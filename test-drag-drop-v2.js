const { chromium } = require('playwright');

async function testDragDrop() {
  console.log('🧪 Testing ModelIt! Drag-Drop with Console Logging...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Listen to console logs from the browser
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    if (type === 'error') {
      console.log(`🔴 [Browser Error]: ${text}`);
    } else if (text.includes('GameEngine') || text.includes('Workspace') || text.includes('Palette')) {
      console.log(`🌐 [Browser]: ${text}`);
    }
  });

  try {
    console.log('📍 Navigating to http://localhost:3008...');
    await page.goto('http://localhost:3008', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    console.log('✅ Home screen loaded\n');

    // Click Level 1
    console.log('🎮 Starting Level 1...');
    const level1Button = await page.locator('text=Level 1').first();
    await level1Button.click();
    await page.waitForTimeout(3000); // Give time for GameEngine setup

    console.log('✅ Level 1 loaded\n');

    // Scroll to make sure palette is visible
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1000);

    console.log('📜 Scrolled to bottom to show palette\n');

    // Check window.currentLevelAddComponent
    const hasGlobalCallback = await page.evaluate(() => {
      return typeof window.currentLevelAddComponent === 'function';
    });
    console.log(`🔍 window.currentLevelAddComponent exists: ${hasGlobalCallback}\n`);

    if (!hasGlobalCallback) {
      console.log('❌ CRITICAL: Global callback not set up!');
    }

    // Get the first component from palette
    const firstComponent = await page.locator('.palette-item').first();
    const componentText = await firstComponent.textContent();
    console.log(`🧩 First component in palette: ${componentText}`);

    // Get workspace canvas
    const canvas = await page.locator('.workspace-canvas').first();

    // Get bounding boxes
    const componentBox = await firstComponent.boundingBox();
    const canvasBox = await canvas.boundingBox();

    if (!componentBox || !canvasBox) {
      throw new Error('Could not get bounding boxes');
    }

    console.log(`\n🎯 Performing drag-drop...`);
    console.log(`   Palette component at: (${componentBox.x}, ${componentBox.y})`);
    console.log(`   Canvas at: (${canvasBox.x}, ${canvasBox.y})`);
    console.log(`   Target drop point: (${canvasBox.x + 200}, ${canvasBox.y + 150})\n`);

    // Perform drag and drop using Playwright's drag and drop
    await firstComponent.dragTo(canvas, {
      targetPosition: { x: 200, y: 150 }
    });

    await page.waitForTimeout(2000);

    // Check if component was added to workspace
    const workspaceComponents = await page.locator('.workspace-component').count();
    console.log(`\n📊 Components in workspace: ${workspaceComponents}`);

    if (workspaceComponents > 0) {
      console.log('✅ SUCCESS: Drag-drop is working!');
      await page.screenshot({ path: 'drag-drop-success.png' });
      console.log('📸 Success screenshot saved');
    } else {
      console.log('❌ FAILED: Drag-drop did not add component to workspace');
      await page.screenshot({ path: 'drag-drop-failed-v2.png' });
      console.log('📸 Failure screenshot saved');
    }

    console.log('\n⏳ Keeping browser open for 15 seconds for inspection...');
    await page.waitForTimeout(15000);

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    await page.screenshot({ path: 'test-error-v2.png' });
    console.log('📸 Error screenshot saved');
  } finally {
    await browser.close();
    console.log('\n🏁 Test complete!');
  }
}

testDragDrop().catch(console.error);
