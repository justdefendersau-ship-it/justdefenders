const { chromium } = require("playwright");

async function scrapeEbay(partNumber) {

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  let results = [];

  try {
    const url = `https://www.ebay.com.au/sch/i.html?_nkw=${partNumber}`;

    // 🔥 Capture network responses
    page.on("response", async (response) => {
      try {
        const url = response.url();

        // eBay search data often comes in JSON/XHR
        if (url.includes("i.html") || url.includes("search")) {

          const text = await response.text();

          // Extract prices/titles from response payload
          const titles = [...text.matchAll(/"title":"([^"]+)"/g)];
          const prices = [...text.matchAll(/"price":"AU \$?([0-9.,]+)"/g)];

          for (let i = 0; i < Math.min(titles.length, prices.length, 5); i++) {
            results.push({
              supplier: "eBay",
              title: titles[i][1],
              totalAUD: parseFloat(prices[i][1].replace(/,/g, ""))
            });
          }
        }

      } catch (e) {
        // ignore parsing errors
      }
    });

    await page.goto(url, { waitUntil: "networkidle" });

    await page.waitForTimeout(6000);

    console.log("Captured results:", results.length);

    return results.slice(0, 5);

  } catch (e) {
    console.error("eBay error:", e);
    return [];
  } finally {
    await browser.close();
  }
}

module.exports = { scrapeEbay };
