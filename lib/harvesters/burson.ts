/**
 * ============================================================
 * JustDefendersÃ‚Â©
 * File:
 * C:\dev\justdefenders\frontend\lib\harvesters\burson.ts
 *
 * Timestamp:
 * 16 August 2026 08:26 Sydney
 *
 * PURPOSE:
 * Burson Genuine Supplier Acquisition
 *
 * STRATEGY:
 * EU-008 Ã¢â‚¬â€ Genuine Supplier Acquisition Production Implementation
 *
 * CONTRACT:
 * PP-001 / MVP / WP-015 / EU-008
 *
 * ENGINEERING BOUNDARY:
 * Replace the previous synthetic/static Burson product representation
 * with genuine supplier acquisition while preserving the existing
 * BaseHarvester and NormalizedSupplierProduct contracts.
 *
 * ============================================================
 */

import { normalizeSupplierProduct } from "../procurement/normalizeSupplierProduct";
import {
  BaseHarvester,
  SupplierSearchParams
} from "./baseHarvester"

import {
  NormalizedSupplierProduct
} from "@/lib/procurement/types"

const BURSON_BASE_URL =
  "https://www.burson.com.au"

const BURSON_SEARCH_PATHS = [
  "/?s=",
  "/?post_type=product&s="
]

interface BursonCandidateProduct {
  title: string
  supplierSku?: string
  brand?: string
  price?: number
  currency?: string
  availability?: string
  sourceUrl: string
}

function normaliseText(
  value: string | undefined | null
): string {
  if (!value) {
    return ""
  }

  return value
    .replace(/\s+/g, " ")
    .trim()
}

function parsePrice(
  value: string
): number | undefined {
  const cleaned =
    value
      .replace(/,/g, "")
      .replace(/[^\d.]/g, "")

  if (!cleaned) {
    return undefined
  }

  const parsed =
    Number.parseFloat(
      cleaned
    )

  if (!Number.isFinite(parsed)) {
    return undefined
  }

  return parsed
}

function absoluteUrl(
  value: string,
  baseUrl: string
): string {
  try {
    return new URL(
      value,
      baseUrl
    ).toString()
  } catch {
    return value
  }
}

function extractProductCandidates(
  html: string,
  sourceUrl: string
): BursonCandidateProduct[] {
  const candidates:
    BursonCandidateProduct[] = []

  const cardPattern =
    /<article\b[^>]*>([\s\S]*?)<\/article>/gi

  const anchorPattern =
    /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i

  const titlePattern =
    /<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/i

  const pricePattern =
    /(?:AUD\s*)?\$\s*([0-9]+(?:\.[0-9]{1,2})?)/i

  const skuPattern =
    /(?:SKU|Part(?:\s|-)?Number|Product\s*Code)\s*[:#]?\s*([A-Z0-9][A-Z0-9._/-]{2,})/i

  let cardMatch:
    RegExpExecArray | null

  while (
    (cardMatch =
      cardPattern.exec(html)) !== null
  ) {
    const card =
      cardMatch[1]

    const anchorMatch =
      anchorPattern.exec(card)

    const titleMatch =
      titlePattern.exec(card)

    if (
      !anchorMatch &&
      !titleMatch
    ) {
      continue
    }

    const title =
      normaliseText(
        titleMatch?.[1]
          ?.replace(/<[^>]+>/g, " ")
      )

    if (!title) {
      continue
    }

    const href =
      anchorMatch?.[1]

    const priceMatch =
      pricePattern.exec(card)

    const skuMatch =
      skuPattern.exec(card)

    candidates.push({
      title,
      supplierSku:
        normaliseText(
          skuMatch?.[1]
        ) || undefined,
      price:
        priceMatch
          ? parsePrice(
              priceMatch[0]
            )
          : undefined,
      currency:
        priceMatch
          ? "AUD"
          : undefined,
      sourceUrl:
        absoluteUrl(
          href || sourceUrl,
          sourceUrl
        )
    })
  }

  return candidates
}

function extractJsonLdProducts(
  html: string,
  sourceUrl: string
): BursonCandidateProduct[] {
  const candidates:
    BursonCandidateProduct[] = []

  const scriptPattern =
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi

  let scriptMatch:
    RegExpExecArray | null

  while (
    (scriptMatch =
      scriptPattern.exec(html)) !== null
  ) {
    const raw =
      scriptMatch[1]
        .trim()

    if (!raw) {
      continue
    }

    try {
      const value =
        JSON.parse(raw)

      const objects =
        Array.isArray(value)
          ? value
          : [value]

      for (const object of objects) {
        if (
          object &&
          typeof object === "object" &&
          object["@type"] === "Product"
        ) {
          const offers =
            object.offers

          const offer =
            Array.isArray(offers)
              ? offers[0]
              : offers

          const price =
            offer &&
            typeof offer === "object" &&
            typeof offer.price !== "undefined"
              ? Number.parseFloat(
                  String(
                    offer.price
                  )
                )
              : undefined

          const numericPrice =
            typeof price === "number" &&
            Number.isFinite(price)
              ? price
              : undefined

          const url =
            typeof object.url === "string"
              ? object.url
              : sourceUrl

          const name =
            normaliseText(
              typeof object.name === "string"
                ? object.name
                : ""
            )

          if (!name) {
            continue
          }

          candidates.push({
            title: name,
            supplierSku:
              normaliseText(
                typeof object.sku === "string"
                  ? object.sku
                  : ""
              ) || undefined,
            brand:
              normaliseText(
                typeof object.brand === "string"
                  ? object.brand
                  : typeof object.brand?.name === "string"
                    ? object.brand.name
                    : ""
              ) || undefined,
            price:
              numericPrice,
            currency:
              numericPrice !== undefined
                ? "AUD"
                : undefined,
            availability:
              typeof offer?.availability === "string"
                ? offer.availability
                : undefined,
            sourceUrl:
              absoluteUrl(
                url,
                sourceUrl
              )
          })
        }
      }
    } catch {
      // Ignore malformed JSON-LD blocks and continue with other
      // genuine supplier page content.
    }
  }

  return candidates
}

function deduplicateProducts(
  products: BursonCandidateProduct[]
): BursonCandidateProduct[] {
  const seen =
    new Set<string>()

  const result:
    BursonCandidateProduct[] = []

  for (const product of products) {
    const key =
      [
        product.supplierSku || "",
        product.title,
        product.sourceUrl
      ]
        .join("|")
        .toLowerCase()

    if (
      seen.has(key)
    ) {
      continue
    }

    seen.add(key)
    result.push(product)
  }

  return result
}

function buildSupplierProduct(
  product: BursonCandidateProduct
): NormalizedSupplierProduct {
  const sourceTimestamp =
    new Date().toISOString()

  const result = {
    supplier: {
      supplierId: "burson",
      supplierName: "Burson Auto Parts",
      supplierType: "Aftermarket",
      region: "AU",
      website: BURSON_BASE_URL,
      verified: true,
      expeditionReady: true,
      federationEnabled: true
    },

    telemetry: {
      latencyMs: 0,
      fetchedAt: sourceTimestamp,
      federationNode: "burson",
      health: "HEALTHY",
      retries: 0,
      cacheHit: false
    },

    oemPartNumber:
      product.supplierSku || product.title,

    supplierSku:
      product.supplierSku ||
      undefined,

    brand:
      product.brand ||
      undefined,

    title:
      product.title,

    description:
      product.title,

    price:
      product.price,

    currency:
      product.currency ||
      "AUD",

    stockStatus:
      product.availability ||
      "UNKNOWN",

    stockLevel: 0,
    deliveryEstimate: "UNKNOWN",
    fitmentScore:
      50,

    procurementScore:
      undefined,

    expeditionScore:
      undefined,

    confidenceScore:
      100,

    supersededBy: [],

    interchangeableWith: [],

    sourceUrl:
      product.sourceUrl,

    tags: [
      "Burson Auto Parts",
      "Genuine Supplier Acquisition",
      "EU-008"
    ]
  }
const normalizedResult = normalizeSupplierProduct({
  supplier: result.supplier?.supplierName,
  brand: result.brand || "Land Rover",
  title: result.title,
  sku: result.supplierSku || result.oemPartNumber,
  category: "General",
  url: result.sourceUrl,
  price: result.price ?? 0,
  inStock: String(result.stockStatus || "").toUpperCase() === "IN_STOCK",
  expeditionReady: result.supplier?.expeditionReady,
  procurementScore: result.procurementScore ?? 0,
  fitmentScore: result.fitmentScore,
  deliveryEstimate: result.deliveryEstimate
})

  const normalizedSupplierProduct: NormalizedSupplierProduct = {
    ...result,
    supplierSku:
      result.supplierSku ||
      result.oemPartNumber,
    brand:
      normalizedResult.brand,
    title:
      normalizedResult.title,
    description:
      result.description ||
      normalizedResult.title,
    price:
      normalizedResult.price,
    stockStatus:
      normalizedResult.inStock
        ? "IN_STOCK"
        : "OUT_OF_STOCK",
    deliveryEstimate:
      normalizedResult.deliveryEstimate,
    fitmentScore:
      normalizedResult.fitmentScore,
    procurementScore:
      normalizedResult.procurementScore,
    sourceUrl:
      result.sourceUrl,
    telemetry: {
      ...result.telemetry,
      health:
        result.telemetry.health === "HEALTHY"
          ? "HEALTHY"
          : "DEGRADED",
    },
    oemPartNumber:
      result.oemPartNumber,
    currency:
      result.currency || "AUD",
    stockLevel:
      result.stockLevel ?? 0,
    expeditionScore:
      result.expeditionScore ?? 0,
    confidenceScore:
      result.confidenceScore ?? 0,
    supersededBy:
      result.supersededBy || [],
    interchangeableWith:
      result.interchangeableWith || [],
    tags:
      result.tags || []
  }

  return normalizedSupplierProduct
}

export class BursonHarvester
  extends BaseHarvester {

  supplierId =
    "burson"

  supplierName =
    "Burson Auto Parts"

  async search(
    params: SupplierSearchParams
  ): Promise<NormalizedSupplierProduct[]> {

    const query =
      normaliseText(
        params.query
      )

    if (!query) {
      return []
    }

    const startedAt =
      Date.now()

    const candidates:
      BursonCandidateProduct[] = []

    let successfulAcquisition =
      false

    let retries =
      0

    for (
      const searchPath of BURSON_SEARCH_PATHS
    ) {
      const url =
        `${BURSON_BASE_URL}${searchPath}${encodeURIComponent(query)}`

      try {
        const response =
          await fetch(
            url,
            {
              method: "GET",
              headers: {
                "Accept":
                  "text/html,application/xhtml+xml",
                "User-Agent":
                  "JustDefenders/1.0"
              },
              cache:
                "no-store"
            }
          )

        if (!response.ok) {
          retries++
          continue
        }

        const html =
          await response.text()

        if (!html) {
          retries++
          continue
        }

        const pageCandidates =
          [
            ...extractProductCandidates(
              html,
              url
            ),
            ...extractJsonLdProducts(
              html,
              url
            )
          ]

        if (
          pageCandidates.length > 0
        ) {
          successfulAcquisition =
            true

          candidates.push(
            ...pageCandidates
          )
        }
      } catch {
        retries++
      }
    }

    const uniqueProducts =
      deduplicateProducts(
        candidates
      )

    if (
      !successfulAcquisition ||
      uniqueProducts.length === 0
    ) {
      return []
    }

    const latency =
      Date.now() -
      startedAt

    return uniqueProducts.map(
      product => {

        const result =
          buildSupplierProduct(
            product
          )

        const telemetry =
          (
            result as unknown as {
              telemetry?: {
                latencyMs?: number
                retries?: number
                fetchedAt?: string
                health?: string
                cacheHit?: boolean
              }
            }
          ).telemetry

        if (telemetry) {
          telemetry.latencyMs =
            latency

          telemetry.retries =
            retries

          telemetry.health =
            "HEALTHY"
        }

        return result
      }
    )
  }
}








