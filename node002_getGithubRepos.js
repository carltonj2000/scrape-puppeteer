const puppeteer = require("puppeteer");

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto("https://github.com/carltonj2000?tab=repositories", {
      waitUntil: "networkidle2"
    });
    await page.waitForSelector("#user-repositories-list li");

    const repos = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll("#user-repositories-list li h3 a")
      ).map(repo => repo.href)
    );
    // await page.screenshot({ path: "filename.png", fullPage: true });
    const html = await page.content(); // get source code of page

    await browser.close();
    console.log(repos);
  } catch (e) {
    console.error("node001.js", e);
  }
})();
