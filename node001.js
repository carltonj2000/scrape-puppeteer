const puppeteer = require("puppeteer");
const { secrets } = require("./secrets.js");

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto("http://10.0.0.200", { waitUntil: "networkidle2" });

    // const html = await page.content(); // get source code of page

    await page.type('input[name="Username"]', "admin");
    await page.type(
      'input[name="Password"]',
      secrets.home.digipower.desk.users.admin.password
    );
    await page.click('input[value="OK"]');

    await page.screenshot({ path: "logged-in-screen.png", fullPage: true });
    await browser.close();
  } catch (e) {
    console.error("node001.js", e);
  }
})();
