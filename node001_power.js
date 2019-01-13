const puppeteer = require("puppeteer");
const { secrets } = require("./secrets.js");

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: true, slowMo: 50 });
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

    /* pdf generation only works when headless is true above */
    /*
    await page.pdf({
      path: "logged-in-screen.pdf",
      format: "Letter",
      margin: { top: "1in", bottom: "1in", left: "1in", right: "1in" }
    });
    */

    const name = "Carlton";
    const html = `<h1>Hello ${name}. How are you coding`;
    const page2 = await browser.newPage();
    await page2.setContent(html);
    /* pdf generation only works when headless is true above */
    await page2.pdf({
      path: "template.pdf",
      format: "Letter",
      margin: { top: "1in", bottom: "1in", left: "1in", right: "1in" }
    });
    /*
     */
    await browser.close();
  } catch (e) {
    console.error("node001.js", e);
  }
})();
