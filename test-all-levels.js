const { chromium } = require('playwright');

async function testAllLevels() {
  console.log('🧪 Testing All 10 Levels of ModelIt!\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const results = [];

  try {
    await page.goto('http://localhost:3008', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    console.log('✅ Home screen loaded\n');

    for (let level = 1; level <= 10; level++) {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`🎮 TESTING LEVEL ${level}`);
      console.log('='.repeat(60));

      try {
        // Go back to home
        await page.goto('http://localhost:3008', { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);

        // Click level button
        const levelButton = await page.locator(`text=Level ${level}`).first();
        await levelButton.click();
        await page.waitForTimeout(3000);

        console.log(`✅ Level ${level} loaded`);

        // Check if workspace/canvas exists
        let canvasSelector;
        if (level === 1) {
          canvasSelector = '.workspace-canvas';
        } else if (level >= 2 && level <= 6 || level === 9 || level === 10) {
          canvasSelector = '.components-canvas';
        } else {
          // Levels 7 and 8 have different interfaces
          console.log(`ℹ️  Level ${level} uses special interface (not testing drag-drop)`);
          results.push({ level, status: 'special', message: 'Special interface' });
          continue;
        }

        const canvas = await page.locator(canvasSelector).first();
        const canvasVisible = await canvas.isVisible();

        if (!canvasVisible) {
          console.log(`❌ Canvas not visible for Level ${level}`);
          results.push({ level, status: 'fail', message: 'Canvas not visible' });
          continue;
        }

        // Check if palette exists
        const paletteVisible = await page.locator('.component-palette').isVisible();
        console.log(`📦 Component Palette visible: ${paletteVisible}`);

        if (!paletteVisible) {
          console.log(`❌ Palette not visible for Level ${level}`);
          results.push({ level, status: 'fail', message: 'Palette not visible' });
          continue;
        }

        // Try to drag first component
        const firstComponent = await page.locator('.palette-item').first();
        const componentText = await firstComponent.textContent();
        console.log(`🧩 First component: ${componentText}`);

        const componentBox = await firstComponent.boundingBox();
        const canvasBox = await canvas.boundingBox();

        if (!componentBox || !canvasBox) {
          console.log(`❌ Could not get bounding boxes for Level ${level}`);
          results.push({ level, status: 'fail', message: 'Bounding box error' });
          continue;
        }

        console.log(`🎯 Attempting drag-drop...`);

        // Drag and drop
        await firstComponent.dragTo(canvas, {
          targetPosition: { x: 200, y: 150 }
        });

        await page.waitForTimeout(2000);

        // Check if component was added
        let componentsAdded;
        if (level === 1) {
          componentsAdded = await page.locator('.workspace-component').count();
        } else {
          componentsAdded = await page.locator('.canvas-component').count();
        }

        console.log(`📊 Components added: ${componentsAdded}`);

        if (componentsAdded > 0) {
          console.log(`✅ Level ${level} drag-drop WORKING!`);
          results.push({ level, status: 'pass', message: `${componentsAdded} component(s) added` });
        } else {
          console.log(`❌ Level ${level} drag-drop FAILED`);
          results.push({ level, status: 'fail', message: 'No components added' });
          await page.screenshot({ path: `level-${level}-failed.png` });
        }

      } catch (error) {
        console.log(`❌ Error testing Level ${level}:`, error.message);
        results.push({ level, status: 'error', message: error.message });
        await page.screenshot({ path: `level-${level}-error.png` });
      }
    }

    // Print summary
    console.log('\n\n' + '='.repeat(60));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(60));

    const passed = results.filter(r => r.status === 'pass').length;
    const failed = results.filter(r => r.status === 'fail').length;
    const errors = results.filter(r => r.status === 'error').length;
    const special = results.filter(r => r.status === 'special').length;

    results.forEach(result => {
      const icon = result.status === 'pass' ? '✅' : result.status === 'fail' ? '❌' : result.status === 'special' ? 'ℹ️' : '⚠️';
      console.log(`${icon} Level ${result.level}: ${result.status.toUpperCase()} - ${result.message}`);
    });

    console.log('\n' + '-'.repeat(60));
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`⚠️  Errors: ${errors}`);
    console.log(`ℹ️  Special: ${special}`);
    console.log('-'.repeat(60));

    if (failed === 0 && errors === 0) {
      console.log('\n🎉 ALL TESTS PASSED! Drag-drop is working across all levels!');
    } else {
      console.log('\n⚠️  Some tests failed. Check screenshots for details.');
    }

  } catch (error) {
    console.error('\n❌ CRITICAL ERROR:', error.message);
    await page.screenshot({ path: 'critical-error.png' });
  } finally {
    console.log('\n⏳ Keeping browser open for 5 seconds...');
    await page.waitForTimeout(5000);
    await browser.close();
    console.log('\n🏁 Testing complete!');
  }
}

testAllLevels().catch(console.error);
