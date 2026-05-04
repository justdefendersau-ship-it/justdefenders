export default function SupplierCard({ item, isBest }) {

  return (
    <div className={`
      relative flex items-center gap-6 p-5 rounded-xl shadow-lg
      ${isBest ? "bg-blue-800 text-white" : "bg-white text-black"}
    `}>

      {/* BEST OPTION */}
      {isBest && (
        <div className="absolute top-2 right-4 text-xs font-bold uppercase">
          BEST OPTION
        </div>
      )}

      {/* SUPPLIER LOGO */}
      <div className="w-32 flex justify-center">
        <img
          src={getSupplierLogo(item.supplier)}
          alt="logo"
          className="h-8 object-contain"
        />
      </div>

      {/* IMAGE */}
      <div className="w-24 h-24 flex items-center justify-center">
        <img
          src={getProductImage(item)}
          alt="part"
          className="h-20 object-contain rounded"
        />
      </div>

      {/* DETAILS */}
      <div className="flex-1">
        <div className="text-lg font-semibold">
          {item.title}
        </div>

        {item.fits && (
          <div className="text-green-400 text-sm font-semibold mt-1">
            ✔ Fits your vehicle
          </div>
        )}

        <div className="text-sm mt-1">
          {getPriceLabel(item)}
        </div>

        <div className="text-sm opacity-80">
          Confidence: {formatConfidence(item.confidence)}
        </div>
      </div>

      {/* PRICE */}
      <div className="text-right w-32">
        <div className="text-2xl font-bold">
          ${item.totalAUD}
        </div>

        <div className="text-sm opacity-80">
          Score: {item.score || 0}
        </div>
      </div>

    </div>
  )
}

/* =========================
   HELPERS
========================= */

function getSupplierLogo(name) {

  if (!name) return "/logos/default.png"

  const n = name.toLowerCase()

  if (n.includes("repco")) return "/logos/repco.png"
  if (n.includes("lr")) return "/logos/lr.png"
  if (n.includes("ebay")) return "/logos/ebay.png"

  return "/logos/default.png"
}

function getProductImage(item) {

  // If API provides image later, use it
  if (item.image) return item.image

  // Fallback generic
  return "/images/part-placeholder.png"
}

function getPriceLabel(item) {

  if (item.priceRank === 1) return "✔ Cheapest option"
  if (item.priceRank <= 3) return "✔ Competitive pricing"
  if (item.qualityScore > 85) return "✔ Premium quality"

  return "⚠ Higher cost option"
}

function formatConfidence(value) {
  if (!value) return "Unknown"
  if (value > 85) return "High"
  if (value > 70) return "Medium"
  return "Low"
}
