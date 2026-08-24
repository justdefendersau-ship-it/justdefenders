/*
==============================================================================
JustDefenders ©

File
C:\dev\justdefenders\frontend\server\platform\jlrclassic-adapter.js

Timestamp
15th August 2026, 16:58 Sydney

Work Package
PR-019B

Component
MS-006 — JLR Classic Primary Source Adapter

Purpose
Primary JLR Classic acquisition adapter for the MVP/Alpha parts-intelligence
acquisition path.

Primary source
Jaguar Land Rover Classic Parts

Authoritative base
https://parts.jaguarlandroverclassic.com/

Relationship to Harvester

    Harvester Runtime
        |
        v
    Harvester-Cycle
        |
        v
    MS-006 source engine
        |
        v
    this adapter
        |
        v
    JLR Classic
        |
        v
    raw acquisition result
        |
        v
    PR-019C normalisation

Validation sources are deliberately NOT invoked by this adapter.

    Level 1 validation : LR Workshop
    Level 2 validation : Britcar

Supplier-block behaviour

    HTTP 401 / 403
        -> BLOCKED / skipped
        -> zero records
        -> preserved HTTP evidence
        -> does not fabricate acquisition

Responsibilities

    • Recognise the authorised JLR Classic source.
    • Accept a part-number or free-text query.
    • Prefer an explicit product URL when supplied.
    • Otherwise resolve the part number through the JLR Classic Klevu search boundary.
    • Perform bounded HTTP acquisition.
    • Preserve source and request provenance.
    • Extract part number, title, price, currency, availability and image
      information where the public page exposes them.
    • Preserve raw product URL and final URL.
    • Return the existing MS-006 collection contract.
    • Never fabricate a product result.

Non-responsibilities

    • Harvester lifecycle.
    • Source registration.
    • Queue ownership.
    • Persistence.
    • Federation.
    • LR Workshop validation.
    • Britcar validation.
    • Procurement ranking.

Important

    The existing /api/jlr/route.ts proved the JLR Classic HTTP acquisition
    boundary. This adapter generalises that acquisition path and moves it
    into the existing MS-006 adapter contract rather than maintaining a
    second search-time acquisition mechanism.
==============================================================================
*/

"use strict"

const DEFAULT_SOURCE_ID =
  "jlrclassic"

const DEFAULT_SOURCE_NAME =
  "Jaguar Land Rover Classic Parts"

const DEFAULT_BASE_URL =
  "https://parts.jaguarlandroverclassic.com"

const DEFAULT_SEARCH_PATH =
  "/search/"

const DEFAULT_KLEVU_SEARCH_URL =
  "https://eucs31v2.ksearchnet.com/cs/v2/search"

const DEFAULT_KLEVU_API_KEY =
  "klevu-167855240111416152"

const DEFAULT_KLEVU_INTEGRATION_VERSION =
  "2.13.3"

const DEFAULT_KLEVU_INTEGRATION_TYPE =
  "jsv2"

const DEFAULT_TIMEOUT_MS =
  15000

const DEFAULT_MAX_BYTES =
  2 * 1024 * 1024

const DEFAULT_MAX_RESULTS =
  25

const DEFAULT_USER_AGENT =
  "JustDefenders-Harvester/1.0 (+https://justdefenders.com/)"

function text(value, fallback = "")
{
  const result =
    value == null
      ? ""
      : String(value)
        .replace(/\s+/g, " ")
        .trim()

  return result || fallback
}

function normalisePartNumber(value)
{
  return text(value)
    .toUpperCase()
    .replace(/\s+/g, "")
}

function normaliseUrl(value, base = DEFAULT_BASE_URL)
{
  const raw =
    text(value)

  if(!raw)
  {
    return null
  }

  try
  {
    const url =
      new URL(raw, base)

    if(
      url.protocol !== "http:" &&
      url.protocol !== "https:"
    )
    {
      return null
    }

    url.hash = ""

    return url.toString()
  }
  catch
  {
    return null
  }
}

function getHost(url)
{
  try
  {
    return new URL(url).hostname.toLowerCase()
  }
  catch
  {
    return ""
  }
}

function isJLRClassicHost(url)
{
  return getHost(url) ===
    "parts.jaguarlandroverclassic.com"
}

function decodeEntities(value)
{
  return String(value || "")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, code) =>
      String.fromCharCode(
        Number(code)
      )
    )
}

function stripTags(value)
{
  return decodeEntities(
    String(value || "")
      .replace(
        /<script[\s\S]*?<\/script>/gi,
        " "
      )
      .replace(
        /<style[\s\S]*?<\/style>/gi,
        " "
      )
      .replace(
        /<[^>]+>/g,
        " "
      )
  )
  .replace(/\s+/g, " ")
  .trim()
}

function extractFirst(
  value,
  expressions
)
{
  const source =
    String(value || "")

  for(
    const expression
    of expressions
  )
  {
    const match =
      source.match(expression)

    if(
      match &&
      match[1]
    )
    {
      return decodeEntities(
        match[1]
      )
      .replace(/\s+/g, " ")
      .trim()
    }
  }

  return null
}

function extractPartNumbers(textValue)
{
  const matches =
    String(textValue || "")
      .match(
        /\b(?:[A-Z]{1,5}\d{3,8}[A-Z]{0,4}|\d{3,8}[A-Z]{0,3})\b/gi
      ) || []

  return Array.from(
    new Set(
      matches.map(
        normalisePartNumber
      )
    )
  )
}

function extractPrice(textValue)
{
  const match =
    String(textValue || "")
      .match(
        /(?:£|GBP\s*)\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)/i
      )

  if(!match)
  {
    return {
      price: null,
      currency: null
    }
  }

  const price =
    Number(
      match[1].replace(/,/g, "")
    )

  if(!Number.isFinite(price))
  {
    return {
      price: null,
      currency: null
    }
  }

  return {
    price,
    currency: "GBP"
  }
}

function extractAvailability(textValue)
{
  const value =
    String(textValue || "")

  if(
    /out of stock/i.test(value)
  )
  {
    return "OUT_OF_STOCK"
  }

  if(
    /no longer available/i.test(value)
  )
  {
    return "NO_LONGER_AVAILABLE"
  }

  if(
    /in stock/i.test(value)
  )
  {
    return "IN_STOCK"
  }

  if(
    /add to basket|add to bag|available to order/i.test(value)
  )
  {
    return "ORDERABLE"
  }

  return null
}

function extractImage(html, baseUrl)
{
  const candidate =
    extractFirst(
      html,
      [
        /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
        /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
        /<img[^>]+src=["']([^"']+)["'][^>]*>/i
      ]
    )

  return candidate
    ? normaliseUrl(
        candidate,
        baseUrl
      )
    : null
}

function extractJsonLdObjects(html)
{
  const results = []

  const expression =
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi

  let match

  while(
    (
      match =
        expression.exec(
          String(html || "")
        )
    ) !== null
  )
  {
    const raw =
      match[1]
        .trim()

    if(!raw)
    {
      continue
    }

    try
    {
      const parsed =
        JSON.parse(raw)

      if(Array.isArray(parsed))
      {
        results.push(
          ...parsed
        )
      }
      else
      {
        results.push(
          parsed
        )
      }
    }
    catch
    {
      continue
    }
  }

  return results
}

function findJsonLdProduct(html)
{
  const objects =
    extractJsonLdObjects(
      html
    )

  return (
    objects.find(
      item =>
        item &&
        (
          item["@type"] === "Product" ||
          (
            Array.isArray(item["@type"]) &&
            item["@type"].includes("Product")
          )
        )
    ) ||
    null
  )
}

function buildSearchUrl(query)
{
  const url =
    new URL(
      DEFAULT_SEARCH_PATH,
      DEFAULT_BASE_URL
    )

  url.searchParams.set(
    "q",
    text(query)
  )

  return url.toString()
}

function buildProductUrl(productUrl)
{
  const normalized =
    normaliseUrl(
      productUrl
    )

  if(
    !normalized ||
    !isJLRClassicHost(
      normalized
    ) ||
    isJLRClassicHomeUrl(
      normalized
    )
  )
  {
    return null
  }

  return normalized
}

function extractSearchProductCandidates(
  html,
  query
)
{
  const requestedPart =
    normalisePartNumber(
      query
    )

  if(!requestedPart)
  {
    return []
  }

  const source =
    String(
      html || ""
    )

  const candidates = []
  const seen = new Set()

  const addCandidate =
    (
      url,
      evidence,
      matchedBy
    ) =>
    {
      const normalized =
        normaliseUrl(
          url
        )

      if(
        !normalized ||
        !isJLRClassicHost(
          normalized
        ) ||
        isJLRClassicHomeUrl(
          normalized
        ) ||
        normalized.includes(
          "/catalogsearch/"
        ) ||
        normalized.endsWith(
          "/parts.html"
        ) ||
        seen.has(
          normalized
        )
      )
      {
        return
      }

      const compactEvidence =
        normalisePartNumber(
          evidence
        )

      const pathMatch =
        normalisePartNumber(
          new URL(
            normalized
          ).pathname
        ).includes(
          requestedPart
        )

      const evidenceMatch =
        compactEvidence.includes(
          requestedPart
        )

      if(
        pathMatch ||
        evidenceMatch
      )
      {
        seen.add(
          normalized
        )

        candidates.push(
          {
            productUrl:
              normalized,

            matchedBy:
              pathMatch
                ? "product-url"
                : matchedBy,

            evidence:
              text(
                evidence
              )
          }
        )
      }
    }

  const anchorExpression =
    /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi

  let match

  while(
    (
      match =
        anchorExpression.exec(
          source
        )
    ) !== null
  )
  {
    const start =
      Math.max(
        0,
        match.index - 500
      )

    const end =
      Math.min(
        source.length,
        match.index +
        match[0].length +
        500
      )

    const surroundingHtml =
      source.slice(
        start,
        end
      )

    addCandidate(
      decodeEntities(
        match[1]
      ),
      [
        match[1],
        stripTags(
          match[2]
        ),
        stripTags(
          surroundingHtml
        )
      ].join(
        " "
      ),
      "search-anchor"
    )
  }

  const jsonProducts =
    extractJsonLdObjects(
      source
    )

  for(
    const item of jsonProducts
  )
  {
    if(
      !item ||
      (
        item["@type"] !== "Product" &&
        !(
          Array.isArray(
            item["@type"]
          ) &&
          item["@type"].includes(
            "Product"
          )
        )
      )
    )
    {
      continue
    }

    addCandidate(
      item.url ||
      item["@id"] ||
      "",
      [
        item.sku,
        item.mpn,
        item.name,
        item.url
      ]
        .filter(
          Boolean
        )
        .join(
          " "
        ),
      "json-ld"
    )
  }

  return candidates
}

async function resolveProductUrlByQuery(
  query,
  options = {}
)
{
  const requestedQuery =
    text(
      query
    )

  const normalizedQuery =
    normalisePartNumber(
      requestedQuery
    )

  if(!normalizedQuery)
  {
    return {
      success:
        false,

      blocked:
        false,

      searchUrl:
        null,

      productUrl:
        null,

      error:
        "Cannot resolve an empty JLR Classic query."
    }
  }

  const searchUrl =
    DEFAULT_KLEVU_SEARCH_URL

  const timeoutMs =
    Number.isFinite(
      Number(options.timeoutMs)
    )
      ? Number(options.timeoutMs)
      : DEFAULT_TIMEOUT_MS

  const maxBytes =
    Number.isFinite(
      Number(options.maxBytes)
    )
      ? Number(options.maxBytes)
      : DEFAULT_MAX_BYTES

  const userAgent =
    text(
      options.userAgent,
      DEFAULT_USER_AGENT
    )

  const requestBody =
  {
    context:
    {
      apiKeys:
        [
          DEFAULT_KLEVU_API_KEY
        ]
    },

    suggestions:
    [
      {
        id:
          "autosuggestion",

        query:
          requestedQuery,

        typeOfRequest:
          "AUTO_SUGGESTIONS",

        limit:
          5
      }
    ],

    recordQueries:
    [
      {
        id:
          "categoryCompressed",

        typeOfRequest:
          "SEARCH",

        settings:
        {
          query:
          {
            term:
              requestedQuery
          },

          typeOfRecords:
            [
              "KLEVU_CATEGORY"
            ],

          fields:
            [
              "id",
              "name",
              "shortDesc",
              "url",
              "typeOfRecord"
            ],

          limit:
            3,

          sort:
            "RELEVANCE"
        }
      },

      {
        id:
          "cmsCompressed",

        typeOfRequest:
          "SEARCH",

        settings:
        {
          query:
          {
            term:
              requestedQuery
          },

          typeOfRecords:
            [
              "KLEVU_CMS"
            ],

          fields:
            [
              "id",
              "name",
              "shortDesc",
              "url",
              "typeOfRecord"
            ],

          limit:
            3,

          sort:
            "RELEVANCE"
        }
      },

      {
        id:
          "productList",

        typeOfRequest:
          "SEARCH",

        settings:
        {
          query:
          {
            term:
              requestedQuery
          },

          typeOfRecords:
            [
              "KLEVU_PRODUCT"
            ],

          limit:
            3,

          sort:
            "RELEVANCE",

          fallbackQueryId:
            "productListFallback"
        }
      },

      {
        id:
          "productListFallback",

        typeOfRequest:
          "SEARCH",

        isFallbackQuery:
          "true",

        settings:
        {
          query:
          {
            term:
              "*"
          },

          typeOfRecords:
            [
              "KLEVU_PRODUCT"
            ],

          limit:
            3,

          searchPrefs:
            [
              "excludeDescription"
            ],

          sort:
            "RELEVANCE"
        }
      }
    ]
  }

  const {
    controller,
    dispose
  } =
    createAbortController(
      timeoutMs
    )

  const startedAt =
    new Date().toISOString()

  let response

  try
  {
    response =
      await fetch(
        searchUrl,
        {
          method:
            "POST",

          redirect:
            "follow",

          signal:
            controller.signal,

          headers:
          {
            "x-klevu-api-key":
              DEFAULT_KLEVU_API_KEY,

            "User-Agent":
              userAgent,

            "Accept":
              "application/json",

            "Content-Type":
              "application/json; charset=UTF-8",

            "Origin":
              DEFAULT_BASE_URL,

            "Referer":
              `${DEFAULT_BASE_URL}/`,

            "x-klevu-integration-version":
              DEFAULT_KLEVU_INTEGRATION_VERSION,

            "x-klevu-integration-type":
              DEFAULT_KLEVU_INTEGRATION_TYPE
          },

          body:
            JSON.stringify(
              requestBody
            )
        }
      )

    const buffer =
      Buffer.from(
        await response.arrayBuffer()
      )

    const responseBody =
      buffer.length <= maxBytes
        ? buffer.toString("utf8")
        : ""

    const contentType =
      text(
        response.headers.get(
          "content-type"
        )
      ).toLowerCase()

    if(!response.ok)
    {
      const blocked =
        response.status === 401 ||
        response.status === 403

      return {
        success:
          false,

        blocked,

        statusCode:
          response.status,

        statusText:
          response.statusText || "",

        searchUrl,

        finalUrl:
          searchUrl,

        productUrl:
          null,

        contentType,

        bytes:
          buffer.length,

        error:
          responseBody ||
          `HTTP ${response.status}`
      }
    }

    if(!responseBody)
    {
      return {
        success:
          false,

        blocked:
          false,

        statusCode:
          response.status,

        statusText:
          response.statusText || "",

        searchUrl,

        finalUrl:
          searchUrl,

        productUrl:
          null,

        contentType,

        bytes:
          buffer.length,

        error:
          "JLR Classic Klevu search returned no response body or exceeded the configured byte limit."
      }
    }

    let parsed

    try
    {
      parsed =
        JSON.parse(
          responseBody
        )
    }
    catch(error)
    {
      return {
        success:
          false,

        blocked:
          false,

        statusCode:
          response.status,

        statusText:
          response.statusText || "",

        searchUrl,

        finalUrl:
          searchUrl,

        productUrl:
          null,

        contentType,

        bytes:
          buffer.length,

        error:
          `JLR Classic Klevu returned invalid JSON: ${error.message}`
      }
    }

    const queryResults =
      Array.isArray(
        parsed.queryResults
      )
        ? parsed.queryResults
        : []

    const productList =
      queryResults.find(
        result =>
          result &&
          result.id === "productList"
      )

    const records =
      productList &&
      Array.isArray(
        productList.records
      )
        ? productList.records
        : []

    const matchingRecords =
      records.filter(
        record =>
        {
          if(!record)
          {
            return false
          }

          const candidates =
            [
              record.sku,
              record.mpn,
              record.id
            ]
              .filter(Boolean)
              .map(
                normalisePartNumber
              )

          return candidates.includes(
            normalizedQuery
          )
        }
      )

    const hostValidatedMatches =
      matchingRecords
        .map(
          record =>
          {
            const productUrl =
              normaliseUrl(
                record.url
              )

            if(
              !productUrl ||
              !isJLRClassicHost(
                productUrl
              ) ||
              isJLRClassicHomeUrl(
                productUrl
              )
            )
            {
              return null
            }

            return {
              productUrl,

              matchedBy:
                record.sku &&
                normalisePartNumber(
                  record.sku
                ) === normalizedQuery
                  ? "klevu-sku"
                  : record.mpn &&
                    normalisePartNumber(
                      record.mpn
                    ) === normalizedQuery
                    ? "klevu-mpn"
                    : "klevu-id",

              sku:
                text(
                  record.sku
                ),

              id:
                text(
                  record.id
                ),

              name:
                text(
                  record.name
                ),

              evidence:
                text(
                  [
                    record.sku,
                    record.mpn,
                    record.id,
                    record.name,
                    record.url
                  ]
                    .filter(Boolean)
                    .join(" ")
                )
            }
          }
        )
        .filter(
          Boolean
        )

    if(
      hostValidatedMatches.length === 0
    )
    {
      return {
        success:
          false,

        blocked:
          false,

        statusCode:
          response.status,

        statusText:
          response.statusText || "",

        searchUrl,

        finalUrl:
          searchUrl,

        productUrl:
          null,

        matchedBy:
          null,

        candidateCount:
          records.length,

        query:
          requestedQuery,

        capturedAt:
          new Date().toISOString(),

        error:
          `JLR Classic Klevu returned no exact product URL for part number ${requestedQuery}.`
      }
    }

    const match =
      hostValidatedMatches[0]

    return {
      success:
        true,

      blocked:
        false,

      statusCode:
        response.status,

      statusText:
        response.statusText || "",

      searchUrl,

      finalUrl:
        searchUrl,

      productUrl:
        match.productUrl,

      matchedBy:
        match.matchedBy,

      evidence:
        match.evidence,

      candidateCount:
        records.length,

      query:
        requestedQuery,

      klevuRecordId:
        match.id,

      klevuSku:
        match.sku,

      klevuName:
        match.name,

      capturedAt:
        new Date().toISOString(),

      startedAt
    }
  }
  catch(error)
  {
    return {
      success:
        false,

      blocked:
        false,

      statusCode:
        null,

      statusText:
        "",

      searchUrl,

      finalUrl:
        searchUrl,

      productUrl:
        null,

      error:
        error &&
        error.message
          ? error.message
          : "JLR Classic Klevu request failed."
    }
  }
  finally
  {
    dispose()
  }
}

function isJLRClassicHomeUrl(value)
{
  const normalised =
    normaliseUrl(value)

  if(!normalised)
  {
    return false
  }

  try
  {
    const parsed =
      new URL(normalised)

    return (
      parsed.hostname.toLowerCase() ===
        "parts.jaguarlandroverclassic.com" &&
      (
        parsed.pathname === "/" ||
        parsed.pathname === ""
      )
    )
  }
  catch
  {
    return false
  }
}

function buildRequestUrl(
  candidate
)
{
  const explicitProductUrl =
    buildProductUrl(
      candidate.productUrl
    )

  if(explicitProductUrl)
  {
    return explicitProductUrl
  }

  const candidateUrl =
    buildProductUrl(
      candidate.url ||
      candidate.sourceUrl
    )

  if(candidateUrl)
  {
    return candidateUrl
  }

  return null
}

function createAbortController(timeoutMs)
{
  const controller =
    new AbortController()

  const timer =
    setTimeout(
      () => controller.abort(),
      timeoutMs
    )

  return {
    controller,

    dispose()
    {
      clearTimeout(timer)
    }
  }
}

async function fetchHtml(
  url,
  options = {}
)
{
  const timeoutMs =
    Number.isFinite(
      Number(options.timeoutMs)
    )
      ? Number(options.timeoutMs)
      : DEFAULT_TIMEOUT_MS

  const maxBytes =
    Number.isFinite(
      Number(options.maxBytes)
    )
      ? Number(options.maxBytes)
      : DEFAULT_MAX_BYTES

  const userAgent =
    text(
      options.userAgent,
      DEFAULT_USER_AGENT
    )

  const {
    controller,
    dispose
  } =
    createAbortController(
      timeoutMs
    )

  const startedAt =
    new Date().toISOString()

  try
  {
    const response =
      await fetch(
        url,
        {
          method: "GET",
          redirect: "follow",
          signal: controller.signal,

          headers:
          {
            "User-Agent":
              userAgent,

            "Accept":
              "text/html,application/xhtml+xml;q=0.9,text/plain;q=0.8,*/*;q=0.5",

            "Accept-Language":
              "en-AU,en;q=0.8"
          }
        }
      )

    const buffer =
      Buffer.from(
        await response.arrayBuffer()
      )

    const contentType =
      text(
        response.headers.get(
          "content-type"
        )
      ).toLowerCase()

    return {
      success:
        response.ok,

      statusCode:
        response.status,

      statusText:
        response.statusText || "",

      finalUrl:
        response.url || url,

      contentType,

      bytes:
        buffer.length,

      body:
        buffer.length <= maxBytes
          ? buffer.toString("utf8")
          : "",

      startedAt,

      completedAt:
        new Date().toISOString(),

      error:
        response.ok
          ? null
          : (
              `HTTP ${response.status}` +
              (
                response.statusText
                  ? ` ${response.statusText}`
                  : ""
              )
            )
    }
  }
  catch(error)
  {
    return {
      success: false,

      statusCode: null,

      statusText: "",

      finalUrl: url,

      contentType: "",

      bytes: 0,

      body: "",

      startedAt,

      completedAt:
        new Date().toISOString(),

      error:
        error &&
        error.message
          ? error.message
          : "JLR Classic request failed."
    }
  }
  finally
  {
    dispose()
  }
}

function parseProductRecord(
  html,
  requestUrl,
  finalUrl,
  query
)
{
  const jsonProduct =
    findJsonLdProduct(
      html
    )

  const pageText =
    stripTags(
      html
    )

  const title =
    text(
      jsonProduct &&
      jsonProduct.name,
      extractFirst(
        html,
        [
          /<title[^>]*>([\s\S]*?)<\/title>/i,
          /<h1[^>]*>([\s\S]*?)<\/h1>/i
        ]
      ) || "JLR Classic Part"
    )

  const sku =
    text(
      jsonProduct &&
      (
        jsonProduct.sku ||
        jsonProduct.mpn
      ),
      extractFirst(
        html,
        [
          /(?:itemprop|name)=["'](?:sku|mpn)["'][^>]*>\s*([^<]+)/i,
          /(?:part\s*(?:number|no\.?)|product\s*code)\s*[:#]?\s*([A-Z0-9][A-Z0-9\- ]{2,20})/i
        ]
      ) ||
      extractPartNumbers(
        `${title} ${pageText}`
      )[0] ||
      normalisePartNumber(
        query
      )
    )

  let price =
    null

  let currency =
    null

  if(
    jsonProduct &&
    jsonProduct.offers
  )
  {
    const offers =
      Array.isArray(
        jsonProduct.offers
      )
        ? jsonProduct.offers[0]
        : jsonProduct.offers

    if(offers)
    {
      const parsedPrice =
        Number(
          offers.price
        )

      if(
        Number.isFinite(
          parsedPrice
        )
      )
      {
        price =
          parsedPrice
      }

      currency =
        text(
          offers.priceCurrency
        ) ||
        null
    }
  }

  if(
    price === null
  )
  {
    const parsed =
      extractPrice(
        pageText
      )

    price =
      parsed.price

    currency =
      parsed.currency
  }

  const availability =
    (
      jsonProduct &&
      jsonProduct.offers &&
      !Array.isArray(
        jsonProduct.offers
      )
        ? jsonProduct.offers.availability
        : null
    ) ||
    extractAvailability(
      pageText
    )

  const image =
    (
      jsonProduct &&
      (
        Array.isArray(
          jsonProduct.image
        )
          ? jsonProduct.image[0]
          : jsonProduct.image
      )
    ) ||
    extractImage(
      html,
      finalUrl
    )

  const description =
    text(
      jsonProduct &&
      jsonProduct.description,
      extractFirst(
        html,
        [
          /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i,
          /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i
        ]
      ) || ""
    )

  const partNumbers =
    Array.from(
      new Set(
        [
          sku,
          ...extractPartNumbers(
            `${title} ${pageText}`
          )
        ]
          .filter(Boolean)
          .map(
            normalisePartNumber
          )
      )
    )

  return {
    source:
      DEFAULT_SOURCE_NAME,

    sourceId:
      DEFAULT_SOURCE_ID,

    sourceUrl:
      DEFAULT_BASE_URL,

    productUrl:
      finalUrl,

    requestUrl,

    partNumber:
      normalisePartNumber(
        sku
      ),

    partNumbers,

    title,

    description,

    price,

    currency,

    availability,

    image:

      normaliseUrl(
        image,
        finalUrl
      ),

    query:

      text(
        query
      ),

    capturedAt:
      new Date().toISOString()
  }
}

function isJLRClassicSource(
  candidate
)
{
  if(!candidate)
  {
    return false
  }

  const id =
    text(
      candidate.id
    ).toLowerCase()

  const name =
    text(
      candidate.name ||
      candidate.supplier
    ).toLowerCase()

  const url =
    text(
      candidate.url ||
      candidate.endpoint ||
      candidate.sourceUrl
    ).toLowerCase()

  return (
    id === DEFAULT_SOURCE_ID ||
    name.includes(
      "jaguar land rover classic"
    ) ||
    name.includes(
      "jlr classic"
    ) ||
    url.includes(
      "parts.jaguarlandroverclassic.com"
    )
  )
}

function getQuery(candidate)
{
  return (
    text(
      candidate.partNumber
    ) ||
    text(
      candidate.part_number
    ) ||
    text(
      candidate.query
    ) ||
    text(
      candidate.searchTerm
    ) ||
    text(
      candidate.sku
    )
  )
}

async function collect(
  candidate,
  options = {}
)
{
  if(
    !isJLRClassicSource(
      candidate
    )
  )
  {
    return {
      success: false,

      status:
        "FAILED",

      source:
        DEFAULT_SOURCE_NAME,

      sourceId:
        DEFAULT_SOURCE_ID,

      recordsCollected: 0,

      error:
        "Candidate is not a JLR Classic source."
    }
  }

  const query =
    getQuery(
      candidate
    )

  let requestUrl =
    buildRequestUrl(
      candidate
    )

  let queryResolution =
    null

  if(!requestUrl)
  {
    queryResolution =
      await resolveProductUrlByQuery(
        query,
        options
      )

    if(
      queryResolution.blocked
    )
    {
      return {
        success: true,

        status:
          "BLOCKED",

        skipped: true,

        reason:
          `JLR Classic query resolution was blocked with HTTP ${queryResolution.statusCode}`,

        source:
          DEFAULT_SOURCE_NAME,

        sourceId:
          DEFAULT_SOURCE_ID,

        sourceUrl:
          DEFAULT_BASE_URL,

        searchUrl:
          queryResolution.searchUrl,

        finalUrl:
          queryResolution.finalUrl,

        statusCode:
          queryResolution.statusCode,

        statusText:
          queryResolution.statusText,

        recordsCollected:
          0,

        error:
          queryResolution.error
      }
    }

    if(
      !queryResolution.success
    )
    {
      return {
        success: false,

        status:
          "FAILED",

        skipped: false,

        source:
          DEFAULT_SOURCE_NAME,

        sourceId:
          DEFAULT_SOURCE_ID,

        sourceUrl:
          DEFAULT_BASE_URL,

        searchUrl:
          queryResolution.searchUrl,

        finalUrl:
          queryResolution.finalUrl,

        statusCode:
          queryResolution.statusCode,

        statusText:
          queryResolution.statusText,

        recordsCollected:
          0,

        error:
          queryResolution.error
      }
    }

    requestUrl =
      queryResolution.productUrl
  }

  const response =
    await fetchHtml(
      requestUrl,
      options
    )

  if(
    !response.success
  )
  {
    const blocked =
      response.statusCode === 401 ||
      response.statusCode === 403

    if(blocked)
    {
      return {
        success: true,

        status:
          "BLOCKED",

        skipped: true,

        reason:
          `JLR Classic refused automated acquisition with HTTP ${response.statusCode}` +
          (
            response.statusText
              ? ` ${response.statusText}`
              : ""
          ),

        error:
          response.error,

        source:
          DEFAULT_SOURCE_NAME,

        sourceId:
          DEFAULT_SOURCE_ID,

        sourceUrl:
          DEFAULT_BASE_URL,

        requestUrl,

        finalUrl:
          response.finalUrl ||
          requestUrl,

        statusCode:
          response.statusCode,

        statusText:
          response.statusText,

        capturedAt:
          response.completedAt,

        recordsCollected:
          0
      }
    }

    return {
      success: false,

      status:
        "FAILED",

      skipped: false,

      source:
        DEFAULT_SOURCE_NAME,

      sourceId:
        DEFAULT_SOURCE_ID,

      sourceUrl:
        DEFAULT_BASE_URL,

      requestUrl,

      finalUrl:
        response.finalUrl ||
        requestUrl,

      statusCode:
        response.statusCode,

      statusText:
        response.statusText,

      error:
        response.error ||
        "JLR Classic acquisition failed.",

      capturedAt:
        response.completedAt,

      recordsCollected:
        0
    }
  }

  const resolvedUrl =
    response.finalUrl ||
    requestUrl

  if(
    query &&
    isJLRClassicHomeUrl(resolvedUrl)
  )
  {
    return {
      success: false,

      status:
        "FAILED",

      skipped: false,

      source:
        DEFAULT_SOURCE_NAME,

      sourceId:
        DEFAULT_SOURCE_ID,

      sourceUrl:
        DEFAULT_BASE_URL,

      requestUrl,

      finalUrl:
        resolvedUrl,

      statusCode:
        response.statusCode,

      statusText:
        response.statusText,

      error:
        "JLR Classic resolved the query to the source homepage instead of a product boundary.",

      capturedAt:
        response.completedAt,

      recordsCollected:
        0
    }
  }

  const record =
    parseProductRecord(
      response.body,
      requestUrl,
      resolvedUrl,
      query
    )

  return {
    success: true,

    status:
      "EXECUTED",

    skipped: false,

    source:
      DEFAULT_SOURCE_NAME,

    sourceId:
      DEFAULT_SOURCE_ID,

    sourceUrl:
      DEFAULT_BASE_URL,

    requestUrl,

    finalUrl:
      response.finalUrl ||
      requestUrl,

    contentType:
      response.contentType,

    statusCode:
      response.statusCode,

    bytes:
      response.bytes,

    capturedAt:
      response.completedAt,

    provenance:
    {
      source:
        DEFAULT_SOURCE_NAME,

      sourceId:
        DEFAULT_SOURCE_ID,

      sourceUrl:
        DEFAULT_BASE_URL,

      requestUrl,

      finalUrl:
        response.finalUrl ||
        requestUrl,

      method:
        "GET",

      query:
        query ||
        null,

      acquiredAt:
        response.completedAt
    },

    queryResolution,

    recordsCollected:
      1,

    records:
      [
        record
      ]
  }
}

const jlrClassicAdapter =
{
  name:
    DEFAULT_SOURCE_ID,

  canHandle:
    isJLRClassicSource,

  collect
}

module.exports =
{
  jlrClassicAdapter,

  isJLRClassicSource,

  collectJLRClassic:
    collect,

  buildJLRClassicSearchUrl:
    buildSearchUrl,

  buildJLRClassicProductUrl:
    buildProductUrl,

  resolveProductUrlByQuery,

  buildJLRClassicRequestUrl:
    buildRequestUrl
}
