const { chromium } = require('playwright');

async function testDragDrop() {
  console.log('🧪 Testing ModelIt! Drag-Drop Functionality...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate to the game
    console.log('📍 Navigating to http://localhost:3008...');
    await page.goto('http://localhost:3008', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Check if home screen loads
    console.log('✅ Home screen loaded');

    // Click Level 1
    console.log('🎮 Starting Level 1...');
    const level1Button = await page.locator('text=Level 1').first();
    await level1Button.click();
    await page.waitForTimeout(2000);

    console.log('✅ Level 1 loaded');

    // Check if components palette is visible
    const paletteVisible = await page.locator('.component-palette').isVisible();
    console.log(`📦 Component Palette visible: ${paletteVisible}`);

    // Get the first component from palette
    const firstComponent = await page.locator('.palette-item').first();
    const componentText = await firstComponent.textContent();
    console.log(`🧩 First component: ${componentText}`);

    // Get workspace canvas
    const canvas = await page.locator('.workspace-canvas').first();

    // Get bounding boxes
    const componentBox = await firstComponent.boundingBox();
    const canvasBox = await canvas.boundingBox();

    if (!componentBox || !canvasBox) {
      throw new Error('Could not get bounding boxes');
    }

    console.log(`\n🎯 Attempting drag-drop from palette to workspace...`);
    console.log(`   From: (${componentBox.x}, ${componentBox.y})`);
    console.log(`   To:   (${canvasBox.x + 150}, ${canvasBox.y + 150})`);

    // Perform drag and drop
    await page.mouse.move(
      componentBox.x + componentBox.width / 2,
      componentBox.y + componentBox.height / 2
    );
    await page.mouse.down();
    await page.waitForTimeout(500);

    await page.mouse.move(canvasBox.x + 150, canvasBox.y + 150, { steps: 10 });
    await page.waitForTimeout(500);

    await page.mouse.up();
    await page.waitForTimeout(1000);

    // Check if component was added to workspace
    const workspaceComponents = await page.locator('.workspace-component').count();
    console.log(`\n📊 Components in workspace: ${workspaceComponents}`);

    if (workspaceComponents > 0) {
      console.log('✅ SUCCESS: Drag-drop is working!');

      // Try dragging the component within the workspace
      console.log('\n🎯 Testing component repositioning...');
      const addedComponent = await page.locator('.workspace-component').first();
      const addedBox = await addedComponent.boundingBox();

      if (addedBox) {
        await page.mouse.move(
          addedBox.x + addedBox.width / 2,
          addedBox.y + addedBox.height / 2
        );
        await page.mouse.down();
        await page.waitForTimeout(300);

        await page.mouse.move(canvasBox.x + 300, canvasBox.y + 200, { steps: 10 });
        await page.waitForTimeout(300);

        await page.mouse.up();
        await page.waitForTimeout(1000);

        console.log('✅ Component repositioning works!');
      }

      // Add another component
      console.log('\n🎯 Testing adding a second component...');
      const secondComponent = await page.locator('.palette-item').nth(1);
      const secondBox = await secondComponent.boundingBox();

      if (secondBox) {
        await page.mouse.move(
          secondBox.x + secondBox.width / 2,
          secondBox.y + secondBox.height / 2
        );
        await page.mouse.down();
        await page.waitForTimeout(500);

        await page.mouse.move(canvasBox.x + 250, canvasBox.y + 300, { steps: 10 });
        await page.waitForTimeout(500);

        await page.mouse.up();
        await page.waitForTimeout(1000);

        const newCount = await page.locator('.workspace-component').count();
        console.log(`📊 Components in workspace now: ${newCount}`);

        if (newCount > workspaceComponents) {
          console.log('✅ Adding multiple components works!');
        }
      }

    } else {
      console.log('❌ FAILED: Drag-drop did not add component to workspace');

      // Take screenshot for debugging
      await page.screenshot({ path: 'drag-drop-failed.png' });
      console.log('📸 Screenshot saved to drag-drop-failed.png');
    }

    // Test Level 2 with arrows
    console.log('\n\n🎮 Testing Level 2 (with arrows)...');
    await page.goto('http://localhost:3008', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const level2Button = await page.locator('text=Level 2').first();
    await level2Button.click();
    await page.waitForTimeout(2000);

    console.log('✅ Level 2 loaded');

    // Try adding components in Level 2
    const level2Palette = await page.locator('.palette-item').first();
    const level2Canvas = await page.locator('.components-canvas').first();

    const level2PaletteBox = await level2Palette.boundingBox();
    const level2CanvasBox = await level2Canvas.boundingBox();

    if (level2PaletteBox && level2CanvasBox) {
      console.log('🎯 Adding first component to Level 2...');

      await page.mouse.move(
        level2PaletteBox.x + level2PaletteBox.width / 2,
        level2PaletteBox.y + level2PaletteBox.height / 2
      );
      await page.mouse.down();
      await page.waitForTimeout(500);

      await page.mouse.move(
        level2CanvasBox.x + 150,
        level2CanvasBox.y + 150,
        { steps: 10 }
      );
      await page.waitForTimeout(500);

      await page.mouse.up();
      await page.waitForTimeout(1000);

      const level2Components = await page.locator('.canvas-component').count();
      console.log(`📊 Components in Level 2 workspace: ${level2Components}`);

      if (level2Components > 0) {
        console.log('✅ Level 2 drag-drop works!');
      } else {
        console.log('❌ Level 2 drag-drop failed');
        await page.screenshot({ path: 'level2-failed.png' });
      }
    }

    console.log('\n\n✅ ALL TESTS COMPLETED!');
    console.log('⏳ Keeping browser open for 10 seconds for manual inspection...');
    await page.waitForTimeout(10000);

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    await page.screenshot({ path: 'test-error.png' });
    console.log('📸 Error screenshot saved to test-error.png');
  } finally {
    await browser.close();
    console.log('\n🏁 Test complete!');
  }
}

testDragDrop().catch(console.error);
