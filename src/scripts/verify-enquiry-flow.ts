import { chromium } from 'playwright';

async function runTests() {
  console.log('--- STARTING ENQUIRY MODAL FLOW VERIFICATION ---');
  const browser = await chromium.launch({ headless: true });

  let testsPassed = 0;
  let testsFailed = 0;

  // TEST 1: 5-Second Auto Enquiry Popup on Homepage
  console.log('\n[TEST 1] Testing 5-second automatic popup on homepage (fresh session)...');
  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();

    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
    
    // Check initial state (should NOT be open immediately)
    const initialEnquiryModal = await page.locator('#auto-enquiry-modal').isVisible();
    if (initialEnquiryModal) {
      throw new Error('Enquiry modal opened immediately without waiting 5 seconds');
    }

    // Wait 5.5 seconds
    console.log('Waiting 5.5 seconds for auto popup...');
    await page.waitForTimeout(5500);

    // Verify Enquiry modal is visible
    const enquiryModalVisible = await page.locator('#auto-enquiry-modal').isVisible();
    const bookingModalVisible = await page.locator('#quick-book-modal').isVisible();

    if (enquiryModalVisible && !bookingModalVisible) {
      console.log('✓ PASS: Auto Enquiry modal opened after 5 seconds, Booking modal remained closed.');
      testsPassed++;
    } else {
      throw new Error(`Enquiry modal visible: ${enquiryModalVisible}, Booking modal visible: ${bookingModalVisible}`);
    }

    // Verify sessionStorage item set
    const sessionVal = await page.evaluate(() => sessionStorage.getItem('citycabs_auto_enquiry_shown'));
    if (sessionVal === 'true') {
      console.log('✓ PASS: sessionStorage["citycabs_auto_enquiry_shown"] set to "true".');
    } else {
      throw new Error(`sessionStorage value expected "true", got "${sessionVal}"`);
    }

    await context.close();
  } catch (err: any) {
    console.error('✗ FAIL [TEST 1]:', err.message);
    testsFailed++;
  }

  // TEST 2: Session Protection (No duplicate popup)
  console.log('\n[TEST 2] Testing session protection on reload...');
  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
    // Pre-populate sessionStorage
    await page.evaluate(() => sessionStorage.setItem('citycabs_auto_enquiry_shown', 'true'));
    await page.reload({ waitUntil: 'domcontentloaded' });

    console.log('Waiting 5.5 seconds on reloaded page...');
    await page.waitForTimeout(5500);

    const enquiryModalVisible = await page.locator('#auto-enquiry-modal').isVisible();
    if (!enquiryModalVisible) {
      console.log('✓ PASS: No auto popup on subsequent page load within same session.');
      testsPassed++;
    } else {
      throw new Error('Auto popup appeared despite sessionStorage flag set!');
    }

    await context.close();
  } catch (err: any) {
    console.error('✗ FAIL [TEST 2]:', err.message);
    testsFailed++;
  }

  // TEST 3: Right-Side Yellow Floating "INQUIRE NOW" Button
  console.log('\n[TEST 3] Testing right-side yellow "INQUIRE NOW" button...');
  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });

    // Click right-side "INQUIRE NOW" button
    const inquireButton = page.locator('button[aria-label="Inquire Now"]');
    if (!(await inquireButton.isVisible())) {
      throw new Error('Could not find floating Inquire Now button');
    }

    await inquireButton.click();
    await page.waitForTimeout(400);

    const enquiryModalVisible = await page.locator('#auto-enquiry-modal').isVisible();
    const bookingModalVisible = await page.locator('#quick-book-modal').isVisible();

    if (enquiryModalVisible && !bookingModalVisible) {
      console.log('✓ PASS: Floating INQUIRE NOW opens Enquiry modal, Booking modal remains closed.');
      testsPassed++;
    } else {
      throw new Error(`Expected Enquiry modal open, got enquiry: ${enquiryModalVisible}, booking: ${bookingModalVisible}`);
    }

    // Verify session flag set on manual click
    const sessionVal = await page.evaluate(() => sessionStorage.getItem('citycabs_auto_enquiry_shown'));
    if (sessionVal === 'true') {
      console.log('✓ PASS: Manual click marked session flag to avoid auto popup duplicate.');
    }

    // Close enquiry modal via Cancel button inside modal
    await page.locator('#auto-enquiry-modal button:has-text("Cancel")').click();
    await page.waitForTimeout(400);
    const modalClosed = !(await page.locator('#auto-enquiry-modal').isVisible());
    if (modalClosed) {
      console.log('✓ PASS: Enquiry modal Cancel button smoothly closes the modal.');
    } else {
      throw new Error('Enquiry modal did not close on Cancel click');
    }

    await context.close();
  } catch (err: any) {
    console.error('✗ FAIL [TEST 3]:', err.message);
    testsFailed++;
  }

  // TEST 4: Navbar "Book Ride" Button
  console.log('\n[TEST 4] Testing Navbar "Book Ride" button...');
  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });

    // Click Navbar Book Ride
    const bookRideBtn = page.locator('nav button:has-text("Book Ride")').first();
    await bookRideBtn.click();
    await page.waitForTimeout(400);

    const bookingModalVisible = await page.locator('#quick-book-modal').isVisible();
    const enquiryModalVisible = await page.locator('#auto-enquiry-modal').isVisible();

    if (bookingModalVisible && !enquiryModalVisible) {
      console.log('✓ PASS: Navbar "Book Ride" opens Booking Modal, Enquiry modal is closed.');
      testsPassed++;
    } else {
      throw new Error(`Booking modal: ${bookingModalVisible}, Enquiry modal: ${enquiryModalVisible}`);
    }

    await context.close();
  } catch (err: any) {
    console.error('✗ FAIL [TEST 4]:', err.message);
    testsFailed++;
  }

  // TEST 5 & 6: Tour Page CTAs (/mumbai-darshan)
  console.log('\n[TEST 5 & 6] Testing Tour page CTAs (/mumbai-darshan)...');
  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    await page.goto('http://localhost:3000/mumbai-darshan', { waitUntil: 'domcontentloaded' });

    // Test Enquiry CTA in Hero: "Submit Enquiry (Get Discount)"
    const heroEnquiryBtn = page.locator('button:has-text("Submit Enquiry (Get Discount)")').first();
    await heroEnquiryBtn.click();
    await page.waitForTimeout(400);

    let enquiryVisible = await page.locator('#auto-enquiry-modal').isVisible();
    let bookingVisible = await page.locator('#quick-book-modal').isVisible();

    // Check prefilled destination select
    const destValue = await page.locator('#auto-enquiry-modal select[name="destination"]').inputValue();

    if (enquiryVisible && !bookingVisible && destValue === 'Mumbai Darshan') {
      console.log(`✓ PASS [TEST 6]: Hero Enquiry button opened Enquiry modal with prefilled destination: "${destValue}".`);
      testsPassed++;
    } else {
      throw new Error(`Enquiry modal visible: ${enquiryVisible}, dest: ${destValue}`);
    }

    // Close modal via close button
    await page.locator('#auto-enquiry-modal button[aria-label="Close modal"]').click();
    await page.waitForTimeout(400);

    // Test Tour "Book Now" CTA
    const tourBookBtn = page.locator('button:has-text("Book Now")').first();
    await tourBookBtn.click();
    await page.waitForTimeout(400);

    bookingVisible = await page.locator('#quick-book-modal').isVisible();
    enquiryVisible = await page.locator('#auto-enquiry-modal').isVisible();

    if (bookingVisible && !enquiryVisible) {
      console.log('✓ PASS [TEST 5]: Tour "Book Now" button opened Booking modal.');
      testsPassed++;
    } else {
      throw new Error(`Tour Book Now test failed: bookingVisible=${bookingVisible}, enquiryVisible=${enquiryVisible}`);
    }

    await context.close();
  } catch (err: any) {
    console.error('✗ FAIL [TEST 5/6]:', err.message);
    testsFailed++;
  }

  // TEST 7: Quick Enquiry Submission End-to-End
  console.log('\n[TEST 7] Testing Quick Enquiry Form Submission & Tracking Separation...');
  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });

    // Open Enquiry Modal via floating button
    await page.locator('button[aria-label="Inquire Now"]').click();
    await page.waitForTimeout(400);

    // Fill the form inside the modal
    const testName = 'Verification Test User ' + Date.now();
    await page.locator('#auto-enquiry-modal input[name="fullName"]').fill(testName);
    await page.locator('#auto-enquiry-modal input[name="phone"]').fill('9876543210');
    
    // Submit form inside the modal
    console.log('Submitting enquiry form...');
    await page.locator('#auto-enquiry-modal button:has-text("Submit Inquiry")').click();

    // Wait for redirect to /enquiry-received
    await page.waitForURL('**/enquiry-received', { timeout: 8000 });
    console.log('Redirected to:', page.url());

    // Check dataLayer events on enquiry confirmation page
    const dataLayerEvents = await page.evaluate(() => {
      const win = window as any;
      return win.dataLayer || [];
    });

    const hasQuickEnquiry = dataLayerEvents.some((e: any) => e.event === 'quick_enquiry_submitted');
    const hasPrimaryConversion = dataLayerEvents.some((e: any) => 
      e.send_to === 'AW-18424689411' || e.event === 'conversion' || e.conversion_type === 'full_booking'
    );

    console.log('DataLayer events recorded:', JSON.stringify(dataLayerEvents, null, 2));

    if (hasQuickEnquiry && !hasPrimaryConversion) {
      console.log('✓ PASS: quick_enquiry_submitted fired, ZERO primary booking conversions fired!');
      testsPassed++;
    } else {
      throw new Error(`dataLayer check failed. quick_enquiry: ${hasQuickEnquiry}, primary conversion: ${hasPrimaryConversion}`);
    }

    // Verify record in Payload CMS
    const loginRes = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'mumbaicitycabs24@gmail.com', password: 'Shahrukh@123' }),
    });
    const loginData = await loginRes.json();
    const token = loginData.token;

    const bookingsRes = await fetch('http://localhost:3000/api/bookings', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const bookingsData = await bookingsRes.json();
    const row = bookingsData.docs?.find((d: any) => d.name === testName);

    if (row && row.leadType === 'quick_enquiry') {
      console.log(`✓ PASS: Payload CMS record verified: ID=${row.id}, leadType="${row.leadType}", name="${row.name}"`);
      testsPassed++;
    } else {
      throw new Error(`Payload CMS verification failed! Row: ${JSON.stringify(row)}`);
    }

    await context.close();
  } catch (err: any) {
    console.error('✗ FAIL [TEST 7]:', err.message);
    testsFailed++;
  }

  await browser.close();

  console.log('\n=============================================');
  console.log(`VERIFICATION SUMMARY: ${testsPassed} PASSED, ${testsFailed} FAILED`);
  console.log('=============================================');

  if (testsFailed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests().catch(err => {
  console.error('Fatal error running verification:', err);
  process.exit(1);
});
