import { chromium } from "playwright";

export async function scrapeEbay(partNumber: string) {

  const browser = await chromium.launch({ headless: false });

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36",
    locale: "en-AU"
  });

  const page = await context.newPage();

  try {
    const url = `https://www.ebay.com.au/sch/i.html?_nkw=${partNumber}`;

    await page.goto(url, { waitUntil: "networkidle" });

    // Give JS time to fully render
    await page.waitForTimeout(6000);

    // 🔥 Grab FULL rendered HTML
    const html = await page.content();

    // 🔥 Extract titles + prices using regex (stable against DOM quirks)
    const titleMatches = [...html.matchAll(/s-item__title[^>]*>([^<]+)</g)];
    const priceMatches = [...html.matchAll(/s-item__price[^>]*>\s*AU\s*\$?([0-9.,]+)/g)];

    const results = [];

    for (let i = 0; i < Math.min(titleMatches.length, priceMatches.length, 5); i++) {

      const title = titleMatches[i]?.[1]?.trim();
      const priceRaw = priceMatches[i]?.[1];

      if (!title || title.includes("Shop on eBay")) continue;

      const value = parseFloat(priceRaw.replace(/,/g, ""));

      results.push({
        supplier: "eBay",
        title,
        totalAUD: value
      });
    }

    console.log("RESULTS FOUND:", results.length);

    return results;

  } catch (e) {
    console.error("eBay error:", e);
    return [];
  } finally {
    await browser.close();
  }
}
