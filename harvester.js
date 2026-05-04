const fs = require("fs");
const path = require("path");

console.log("🚀 Harvester starting...");

let scrapeEbay;

try {
  ({ scrapeEbay } = require("./lib/scrapers/ebay.js"));
} catch (e) {
  console.error("❌ Failed to load scraper:", e);
  process.exit(1);
}

async function runHarvester() {

  console.log("🔍 Running eBay scrape...");

  try {
    const results = await scrapeEbay("defender starter motor");

    console.log("📦 Results fetched:", results.length);

    const filePath = path.join(__dirname, "data", "supplier-live.json");

    const data = {
      lastRun: new Date().toISOString(),
      eBay: results
    };

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log("✅ Data saved to:", filePath);

  } catch (err) {
    console.error("❌ Harvester error:", err);
  }
}

// 🔥 IMPORTANT — actually run it
runHarvester().then(() => {
  console.log("🏁 Harvester finished");
}).catch(err => {
  console.error("💥 Fatal error:", err);
});
