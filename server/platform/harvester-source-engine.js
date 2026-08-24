/* =====================================================
   JustDefenders ©

   File:
   C:\dev\justdefenders\frontend\server\platform\harvester-source-engine.js

   Purpose:
   MS-006 — Harvester Source Discovery & Collection Engine

   Programme:
   JustDefenders Product Platform

   Milestone:
   MS-006 — First Operational Harvest

   Authority:
   Controlled Source / Collection Gate

   Responsibilities:
   • Discover candidate sources from configured sources.
   • Discover additional candidate source URLs from authorised source pages.
   • Apply bounded collection rules.
   • Respect robots.txt where available.
   • Collect real external source material.
   • Preserve source attribution.
   • Produce structured raw collection results.
   • Provide a pluggable collection boundary for future adapters.

   Non-responsibilities:
   • Runtime lifecycle management.
   • Harvester service registration.
   • Canonical persistence.
   • Federation.
   • Source registry ownership.

   ===================================================== */

"use strict"

const fs = require("fs")
const path = require("path")
const {
  jlrClassicAdapter
} = require("./jlrclassic-adapter")

const DEFAULT_USER_AGENT =
  "JustDefenders-Harvester/1.0 (+https://justdefenders.com/)"

const DEFAULT_TIMEOUT_MS = 15000

const DEFAULT_MAX_BYTES = 2 * 1024 * 1024

const DEFAULT_MAX_DISCOVERY_LINKS = 100

const DEFAULT_MAX_DISCOVERY_DEPTH = 1

const DEFAULT_MAX_RESULTS_PER_SOURCE = 50

const DEFAULT_ALLOWED_PROTOCOLS = new Set([
  "http:",
  "https:"
])

const DEFAULT_HTML_CONTENT_TYPES = [
  "text/html",
  "application/xhtml+xml"
]

const DEFAULT_TEXT_CONTENT_TYPES = [
  "text/plain",
  "application/json",
  "application/xml",
  "text/xml",
  "application/rss+xml",
  "application/atom+xml"
]

const DEFAULT_BLOCKED_EXTENSIONS = new Set([
  ".7z",
  ".avi",
  ".bmp",
  ".css",
  ".doc",
  ".docx",
  ".gif",
  ".gz",
  ".ico",
  ".jpeg",
  ".jpg",
  ".js",
  ".mp3",
  ".mp4",
  ".pdf",
  ".png",
  ".rar",
  ".svg",
  ".tar",
  ".tgz",
  ".tif",
  ".tiff",
  ".webp",
  ".woff",
  ".woff2",
  ".xls",
  ".xlsx",
  ".zip"
])

const DEFAULT_DISCOVERY_TERMS = [
  "land rover",
  "defender",
  "90",
  "110",
  "130",
  "td5",
  "td4",
  "puma",
  "tdci",
  "parts",
  "maintenance",
  "repair",
  "forum",
  "club"
]

const DEFAULT_SOURCE_PATH_HINTS = [
  "/forum",
  "/forums",
  "/community",
  "/club",
  "/clubs",
  "/defender",
  "/land-rover",
  "/landrover",
  "/parts",
  "/technical",
  "/tech",
  "/workshop",
  "/knowledge",
  "/blog"
]

const DEFAULT_DISCOVERY_HOST_HINTS = [
  "landrover",
  "land-rover",
  "defender",
  "4wd",
  "4x4",
  "offroad",
  "club",
  "forum",
  "parts"
]

function normaliseString(value, fallback = "")
{
  const text = value == null
    ? ""
    : String(value).trim()

  return text || fallback
}

function normaliseSourceId(value)
{
  return normaliseString(value, "unknown")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
}

function normaliseUrl(value, baseUrl = null)
{
  const raw = normaliseString(value)

  if (!raw)
  {
    return null
  }

  try
  {
    const parsed = baseUrl
      ? new URL(raw, baseUrl)
      : new URL(raw)

    if (!DEFAULT_ALLOWED_PROTOCOLS.has(parsed.protocol))
    {
      return null
    }

    parsed.hash = ""

    return parsed.toString()
  }
  catch
  {
    return null
  }
}

function getUrlHost(value)
{
  try
  {
    return new URL(value).hostname.toLowerCase()
  }
  catch
  {
    return ""
  }
}

function getUrlOrigin(value)
{
  try
  {
    return new URL(value).origin
  }
  catch
  {
    return null
  }
}

function isSameOrigin(left, right)
{
  const leftOrigin = getUrlOrigin(left)
  const rightOrigin = getUrlOrigin(right)

  return Boolean(
    leftOrigin &&
    rightOrigin &&
    leftOrigin === rightOrigin
  )
}

function isBlockedExtension(value)
{
  try
  {
    const pathname =
      new URL(value).pathname.toLowerCase()

    return Array.from(DEFAULT_BLOCKED_EXTENSIONS)
      .some(extension => pathname.endsWith(extension))
  }
  catch
  {
    return true
  }
}

function isCandidateSourceUrl(value)
{
  const url = normaliseUrl(value)

  if (!url)
  {
    return false
  }

  if (isBlockedExtension(url))
  {
    return false
  }

  return true
}

function scoreCandidateUrl(value)
{
  const url = normaliseUrl(value)

  if (!url)
  {
    return 0
  }

  let score = 0

  const host = getUrlHost(url)

  const lower =
    url.toLowerCase()

  for (const hint of DEFAULT_DISCOVERY_HOST_HINTS)
  {
    if (host.includes(hint))
    {
      score += 10
    }
  }

  for (const hint of DEFAULT_SOURCE_PATH_HINTS)
  {
    if (lower.includes(hint))
    {
      score += 5
    }
  }

  for (const term of DEFAULT_DISCOVERY_TERMS)
  {
    if (lower.includes(
      term
        .toLowerCase()
        .replace(/\s+/g, "-")
    ))
    {
      score += 2
    }
  }

  return Math.min(score, 100)
}

function extractTitle(html)
{
  const match =
    String(html || "").match(
      /<title[^>]*>([\s\S]*?)<\/title>/i
    )

  if (!match)
  {
    return null
  }

  return decodeHtmlEntities(
    stripTags(match[1])
      .replace(/\s+/g, " ")
      .trim()
  ) || null
}

function stripTags(value)
{
  return String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function decodeHtmlEntities(value)
{
  return String(value || "")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, "\"")
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, code) =>
      String.fromCharCode(Number(code))
    )
}

function extractLinks(html, baseUrl)
{
  const links = []

  const source =
    String(html || "")

  const expression =
    /<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi

  let match

  while ((match = expression.exec(source)) !== null)
  {
    const url =
      normaliseUrl(match[1], baseUrl)

    if (!url)
    {
      continue
    }

    links.push(url)
  }

  return Array.from(new Set(links))
}

function extractMetaDescription(html)
{
  const expression =
    /<meta\b[^>]*(?:name|property)\s*=\s*["'](?:description|og:description)["'][^>]*content\s*=\s*["']([^"']+)["'][^>]*>/i

  const match =
    String(html || "").match(expression)

  if (!match)
  {
    return null
  }

  return decodeHtmlEntities(
    match[1]
      .replace(/\s+/g, " ")
      .trim()
  ) || null
}

function extractText(html)
{
  return decodeHtmlEntities(
    stripTags(html)
  )
}

function containsDiscoveryTerms(text)
{
  const value =
    String(text || "").toLowerCase()

  return DEFAULT_DISCOVERY_TERMS
    .some(term =>
      value.includes(term.toLowerCase())
    )
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
    dispose: () => clearTimeout(timer)
  }
}

async function fetchResource(url, options = {})
{
  const timeoutMs =
    Number.isFinite(Number(options.timeoutMs))
      ? Number(options.timeoutMs)
      : DEFAULT_TIMEOUT_MS

  const maxBytes =
    Number.isFinite(Number(options.maxBytes))
      ? Number(options.maxBytes)
      : DEFAULT_MAX_BYTES

  const userAgent =
    normaliseString(
      options.userAgent,
      DEFAULT_USER_AGENT
    )

  const {
    controller,
    dispose
  } =
    createAbortController(timeoutMs)

  const startedAt =
    new Date().toISOString()

  try
  {
    const response =
      await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: {
          "User-Agent": userAgent,
          "Accept":
            "text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8,*/*;q=0.5",
          "Accept-Language":
            "en-AU,en;q=0.8"
        }
      })

    const contentType =
      normaliseString(
        response.headers.get("content-type")
      ).toLowerCase()

    const buffer =
      Buffer.from(
        await response.arrayBuffer()
      )

    if (buffer.length > maxBytes)
    {
      return {
        success: false,
        url,
        statusCode: response.status,
        contentType,
        startedAt,
        completedAt: new Date().toISOString(),
        error:
          `Response exceeded maximum size of ${maxBytes} bytes.`
      }
    }

    return {
      success: response.ok,
      url,
      finalUrl: response.url || url,
      statusCode: response.status,
      contentType,
      headers: Object.fromEntries(
        response.headers.entries()
      ),
      body: buffer.toString("utf8"),
      bytes: buffer.length,
      startedAt,
      completedAt: new Date().toISOString()
    }
  }
  catch (error)
  {
    return {
      success: false,
      url,
      statusCode: null,
      contentType: "",
      startedAt,
      completedAt: new Date().toISOString(),
      error:
        error && error.message
          ? error.message
          : "Source request failed."
    }
  }
  finally
  {
    dispose()
  }
}

function parseRobotsRules(body)
{
  const lines =
    String(body || "")
      .split(/\r?\n/)

  const rules = []

  let appliesToHarvester = false

  for (const rawLine of lines)
  {
    const line =
      rawLine
        .split("#")[0]
        .trim()

    if (!line)
    {
      continue
    }

    const separator =
      line.indexOf(":")

    if (separator === -1)
    {
      continue
    }

    const key =
      line
        .slice(0, separator)
        .trim()
        .toLowerCase()

    const value =
      line
        .slice(separator + 1)
        .trim()

    if (key === "user-agent")
    {
      appliesToHarvester =
        value === "*" ||
        value.toLowerCase().includes("justdefenders")

      continue
    }

    if (!appliesToHarvester)
    {
      continue
    }

    if (
      key === "disallow" &&
      value
    )
    {
      rules.push({
        type: "disallow",
        value
      })
    }

    if (
      key === "allow" &&
      value
    )
    {
      rules.push({
        type: "allow",
        value
      })
    }
  }

  return rules
}

function robotsPathMatches(url, rule)
{
  try
  {
    const pathname =
      new URL(url).pathname

    const normalisedRule =
      String(rule || "")
        .trim()

    if (!normalisedRule)
    {
      return false
    }

    if (normalisedRule === "/")
    {
      return true
    }

    const escaped =
      normalisedRule
        .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
        .replace(/\*/g, ".*")

    return new RegExp(
      `^${escaped}`
    ).test(pathname)
  }
  catch
  {
    return false
  }
}

function isRobotsAllowed(url, rules)
{
  if (!Array.isArray(rules) || rules.length === 0)
  {
    return true
  }

  const matchingRules =
    rules.filter(rule =>
      robotsPathMatches(
        url,
        rule.value
      )
    )

  if (matchingRules.length === 0)
  {
    return true
  }

  const allow =
    matchingRules.some(
      rule => rule.type === "allow"
    )

  const disallow =
    matchingRules.some(
      rule => rule.type === "disallow"
    )

  if (allow)
  {
    return true
  }

  return !disallow
}

async function loadRobotsPolicy(
  sourceUrl,
  options = {}
)
{
  const origin =
    getUrlOrigin(sourceUrl)

  if (!origin)
  {
    return {
      available: false,
      allowed: true,
      rules: [],
      error: "Invalid source origin."
    }
  }

  const robotsUrl =
    `${origin}/robots.txt`

  const response =
    await fetchResource(
      robotsUrl,
      options
    )

  if (!response.success)
  {
    return {
      available: false,
      allowed: true,
      rules: [],
      error: response.error || "robots.txt unavailable."
    }
  }

  const rules =
    parseRobotsRules(
      response.body
    )

  return {
    available: true,
    allowed:
      isRobotsAllowed(
        sourceUrl,
        rules
      ),
    rules,
    robotsUrl
  }
}

function extractSitemapLocations(body)
{
  const locations = []

  const expression =
    /<loc>\s*([^<]+)\s*<\/loc>/gi

  let match

  while ((match = expression.exec(String(body || ""))) !== null)
  {
    const value =
      normaliseUrl(match[1])

    if (value)
    {
      locations.push(value)
    }
  }

  return Array.from(new Set(locations))
}

async function discoverFromSitemap(
  sourceUrl,
  options = {}
)
{
  const origin =
    getUrlOrigin(sourceUrl)

  if (!origin)
  {
    return []
  }

  const sitemapCandidates = [
    `${origin}/sitemap.xml`,
    `${origin}/sitemap_index.xml`
  ]

  const results = []

  for (const sitemapUrl of sitemapCandidates)
  {
    const response =
      await fetchResource(
        sitemapUrl,
        options
      )

    if (!response.success)
    {
      continue
    }

    results.push(
      ...extractSitemapLocations(
        response.body
      )
    )
  }

  return Array.from(
    new Set(results)
  )
}

function buildCandidate(
  url,
  metadata = {}
)
{
  const normalised =
    normaliseUrl(url)

  if (!normalised)
  {
    return null
  }

  return {
    id:
      normaliseSourceId(
        getUrlHost(normalised)
      ),

    name:
      normaliseString(
        metadata.name,
        getUrlHost(normalised)
      ),

    url: normalised,

    sourceType:
      normaliseString(
        metadata.sourceType,
        "WEB"
      ),

    discoveryMethod:
      normaliseString(
        metadata.discoveryMethod,
        "configured"
      ),

    confidence:
      Number.isFinite(
        Number(metadata.confidence)
      )
        ? Number(metadata.confidence)
        : scoreCandidateUrl(normalised),

    discoveredAt:
      normaliseString(
        metadata.discoveredAt,
        new Date().toISOString()
      ),

    parentSource:
      normaliseString(
        metadata.parentSource,
        null
      ),

    status:
      "CANDIDATE"
  }
}

function deduplicateCandidates(candidates)
{
  const map =
    new Map()

  for (const candidate of candidates)
  {
    if (!candidate || !candidate.url)
    {
      continue
    }

    const key =
      candidate.url
        .replace(/\/$/, "")
        .toLowerCase()

    const existing =
      map.get(key)

    if (!existing)
    {
      map.set(key, candidate)
      continue
    }

    if (
      Number(candidate.confidence || 0) >
      Number(existing.confidence || 0)
    )
    {
      map.set(key, candidate)
    }
  }

  return Array.from(map.values())
}

async function discoverFromSource(
  source,
  options = {}
)
{
  const sourceUrl =
    normaliseUrl(
      source.url ||
      source.endpoint ||
      source.location
    )

  if (!sourceUrl)
  {
    return {
      source,
      candidates: [],
      errors: [
        "Source does not provide a valid URL."
      ]
    }
  }

  const maxLinks =
    Number.isFinite(
      Number(options.maxDiscoveryLinks)
    )
      ? Number(options.maxDiscoveryLinks)
      : DEFAULT_MAX_DISCOVERY_LINKS

  const robots =
    await loadRobotsPolicy(
      sourceUrl,
      options
    )

  if (!robots.allowed)
  {
    return {
      source,
      candidates: [],
      errors: [
        "Collection disallowed by robots.txt."
      ],
      robots
    }
  }

  const response =
    await fetchResource(
      sourceUrl,
      options
    )

  if (!response.success)
  {
    return {
      source,
      candidates: [],
      errors: [
        response.error ||
        `Source returned HTTP ${response.statusCode}.`
      ],
      robots
    }
  }

  const contentType =
    response.contentType

  const candidates = []

  candidates.push(
    buildCandidate(
      sourceUrl,
      {
        name:
          source.supplier ||
          source.name ||
          getUrlHost(sourceUrl),

        sourceType:
          source.sourceType ||
          "WEB",

        discoveryMethod:
          "configured",

        confidence: 100,

        discoveredAt:
          new Date().toISOString()
      }
    )
  )

  if (
    DEFAULT_HTML_CONTENT_TYPES.some(
      value =>
        contentType.includes(value)
    )
  )
  {
    const links =
      extractLinks(
        response.body,
        response.finalUrl || sourceUrl
      )
        .filter(isCandidateSourceUrl)
        .slice(0, maxLinks)

    for (const link of links)
    {
      const textScore =
        scoreCandidateUrl(link)

      const relevant =
        textScore > 0 ||
        containsDiscoveryTerms(link)

      if (!relevant)
      {
        continue
      }

      if (
        !isSameOrigin(
          sourceUrl,
          link
        )
      )
      {
        candidates.push(
          buildCandidate(
            link,
            {
              sourceType: "DISCOVERED_WEB",
              discoveryMethod:
                "external-link",
              confidence:
                Math.min(
                  100,
                  30 + textScore
                ),
              parentSource:
                sourceUrl
            }
          )
        )

        continue
      }

      candidates.push(
        buildCandidate(
          link,
          {
            sourceType: "WEB",
            discoveryMethod:
              "source-link",
            confidence:
              Math.min(
                100,
                40 + textScore
              ),
            parentSource:
              sourceUrl
          }
        )
      )
    }
  }

  const sitemapLinks =
    await discoverFromSitemap(
      sourceUrl,
      options
    )

  for (const sitemapLink of sitemapLinks)
  {
    if (
      candidates.length >=
      maxLinks + 1
    )
    {
      break
    }

    if (!isCandidateSourceUrl(sitemapLink))
    {
      continue
    }

    candidates.push(
      buildCandidate(
        sitemapLink,
        {
          sourceType: "WEB",
          discoveryMethod:
            "sitemap",
          confidence:
            Math.min(
              100,
              35 +
              scoreCandidateUrl(
                sitemapLink
              )
            ),
          parentSource:
            sourceUrl
        }
      )
    )
  }

  return {
    source,
    candidates:
      deduplicateCandidates(
        candidates
      ).slice(
        0,
        maxLinks + 1
      ),
    errors: [],
    robots,
    fetched: {
      url:
        response.finalUrl ||
        sourceUrl,

      statusCode:
        response.statusCode,

      contentType:
        response.contentType,

      bytes:
        response.bytes,

      title:
        extractTitle(
          response.body
        ),

      description:
        extractMetaDescription(
          response.body
        )
    }
  }
}

function createCollectionAdapter(
  name,
  matcher,
  collect
)
{
  return {
    name,
    canHandle:
      typeof matcher === "function"
        ? matcher
        : () => false,

    collect:
      typeof collect === "function"
        ? collect
        : async () => ({
            success: false,
            error:
              "Collection adapter is not implemented."
          })
  }
}

const defaultAdapters = [
  jlrClassicAdapter,

  createCollectionAdapter(
    "web",
    candidate =>
      Boolean(
        normaliseUrl(
          candidate.url ||
          candidate.endpoint
        )
      ),
    async (
      candidate,
      options = {}
    ) =>
    {
      const url =
        normaliseUrl(
          candidate.url ||
          candidate.endpoint
        )

      if (!url)
      {
        return {
          success: false,
          error:
            "Candidate does not provide a valid URL."
        }
      }

      const robots =
        await loadRobotsPolicy(
          url,
          options
        )

      if (!robots.allowed)
      {
        return {
          success: false,
          skipped: true,
          reason:
            "Collection disallowed by robots.txt.",
          robots
        }
      }

      const response =
        await fetchResource(
          url,
          options
        )

      if (!response.success)
      {
        return {
          success: false,
          skipped: false,
          statusCode:
            response.statusCode,

          error:
            response.error ||
            "Web collection failed.",

          robots
        }
      }

      const contentType =
        response.contentType

      const html =
        DEFAULT_HTML_CONTENT_TYPES
          .some(
            value =>
              contentType.includes(value)
          )

      const text =
        html
          ? extractText(
              response.body
            )
          : response.body

      return {
        success: true,

        status:
          "EXECUTED",

        source:
          candidate.name ||
          candidate.supplier ||
          getUrlHost(url),

        sourceId:
          candidate.id ||
          normaliseSourceId(
            getUrlHost(url)
          ),

        sourceUrl:
          url,

        finalUrl:
          response.finalUrl ||
          url,

        contentType,

        statusCode:
          response.statusCode,

        capturedAt:
          response.completedAt,

        bytes:
          response.bytes,

        title:
          html
            ? extractTitle(
                response.body
              )
            : null,

        description:
          html
            ? extractMetaDescription(
                response.body
              )
            : null,

        payload: {
          source:
            candidate.name ||
            candidate.supplier ||
            getUrlHost(url),

          sourceId:
            candidate.id ||
            normaliseSourceId(
              getUrlHost(url)
            ),

          url,

          title:
            html
              ? extractTitle(
                  response.body
                )
              : null,

          description:
            html
              ? extractMetaDescription(
                  response.body
                )
              : null,

          content:
            text.slice(
              0,
              Number.isFinite(
                Number(
                  options.maxTextCharacters
                )
              )
                ? Number(
                    options.maxTextCharacters
                  )
                : 50000
            ),

          country:
            candidate.country ||
            null,

          sourceType:
            candidate.sourceType ||
            "WEB"
        },

        metadata: {
          robots,
          discoveryMethod:
            candidate.discoveryMethod ||
            "configured",

          confidence:
            Number.isFinite(
              Number(candidate.confidence)
            )
              ? Number(candidate.confidence)
              : null
        }
      }
    }
  )
]

function selectAdapter(
  candidate,
  adapters = defaultAdapters
)
{
  for (const adapter of adapters)
  {
    try
    {
      if (
        adapter.canHandle(candidate)
      )
      {
        return adapter
      }
    }
    catch
    {
      continue
    }
  }

  return null
}

async function collectSource(
  candidate,
  options = {}
)
{
  const adapters =
    Array.isArray(options.adapters) &&
    options.adapters.length > 0
      ? options.adapters
      : defaultAdapters

  const adapter =
    selectAdapter(
      candidate,
      adapters
    )

  if (!adapter)
  {
    return {
      success: false,

      status:
        "FAILED",

      source:
        candidate.name ||
        candidate.supplier ||
        "unknown",

      sourceId:
        candidate.id ||
        null,

      sourceUrl:
        candidate.url ||
        null,

      recordsCollected:
        0,

      capturedAt:
        new Date().toISOString(),

      error:
        "No collection adapter supports this source."
    }
  }

  try
  {
    const result =
      await adapter.collect(
        candidate,
        options
      )

    return {
      ...result,

      adapter:
        adapter.name,

      source:
        result.source ||
        candidate.name ||
        candidate.supplier ||
        "unknown",

      sourceId:
        result.sourceId ||
        candidate.id ||
        null,

      sourceUrl:
        result.sourceUrl ||
        candidate.url ||
        null,

      recordsCollected:
        result.success
          ? 1
          : 0
    }
  }
  catch (error)
  {
    return {
      success: false,

      status:
        "FAILED",

      source:
        candidate.name ||
        candidate.supplier ||
        "unknown",

      sourceId:
        candidate.id ||
        null,

      sourceUrl:
        candidate.url ||
        null,

      recordsCollected:
        0,

      capturedAt:
        new Date().toISOString(),

      error:
        error && error.message
          ? error.message
          : "Collection adapter failed."
    }
  }
}

async function discoverSources(
  sources = [],
  options = {}
)
{
  const configured =
    Array.isArray(sources)
      ? sources
      : []

  const discoveryResults = []

  for (const source of configured)
  {
    const result =
      await discoverFromSource(
        source,
        options
      )

    discoveryResults.push(
      result
    )
  }

  const candidates =
    deduplicateCandidates(
      discoveryResults.flatMap(
        result =>
          Array.isArray(result.candidates)
            ? result.candidates
            : []
      )
    )

  return {
    discoveredAt:
      new Date().toISOString(),

    configuredSources:
      configured.length,

    sources:
      candidates,

    sourceResults:
      discoveryResults,

    summary: {
      configured:
        configured.length,

      candidates:
        candidates.length,

      externalCandidates:
        candidates.filter(
          candidate =>
            candidate.discoveryMethod ===
            "external-link"
        ).length,

      sitemapCandidates:
        candidates.filter(
          candidate =>
            candidate.discoveryMethod ===
            "sitemap"
        ).length
    }
  }
}

async function collectSources(
  candidates = [],
  options = {}
)
{
  const sourceCandidates =
    Array.isArray(candidates)
      ? candidates
      : []

  const maxResults =
    Number.isFinite(
      Number(
        options.maxResultsPerSource
      )
    )
      ? Number(
          options.maxResultsPerSource
        )
      : DEFAULT_MAX_RESULTS_PER_SOURCE

  const results = []

  for (
    let index = 0;
    index < sourceCandidates.length &&
    index < maxResults;
    index++
  )
  {
    const candidate =
      sourceCandidates[index]

    const result =
      await collectSource(
        candidate,
        options
      )

    results.push(
      result
    )
  }

  return {
    executedAt:
      new Date().toISOString(),

    results,

    summary: {
      total:
        sourceCandidates.length,

      attempted:
        results.length,

      completed:
        results.filter(
          result =>
            result.success === true
        ).length,

      skipped:
        results.filter(
          result =>
            result.skipped === true
        ).length,

      failed:
        results.filter(
          result =>
            result.success !== true &&
            result.skipped !== true
        ).length,

      recordsCollected:
        results.reduce(
          (
            total,
            result
          ) =>
            total +
            Number(
              result.recordsCollected || 0
            ),
          0
        )
    }
  }
}

async function discoverAndCollect(
  sources = [],
  options = {}
)
{
  const discovery =
    await discoverSources(
      sources,
      options
    )

  const candidates =
    Array.isArray(
      options.authorisedSources
    )
      ? options.authorisedSources
      : discovery.sources

  const collection =
    await collectSources(
      candidates,
      options
    )

  return {
    success:
      collection.summary.failed === 0,

    discoveredAt:
      discovery.discoveredAt,

    discovery,

    collection,

    completedAt:
      new Date().toISOString()
  }
}

function createSourceDefinition(
  input = {}
)
{
  const url =
    normaliseUrl(
      input.url ||
      input.endpoint ||
      input.location
    )

  return {
    id:
      input.id ||
      normaliseSourceId(
        input.name ||
        getUrlHost(url)
      ),

    name:
      normaliseString(
        input.name ||
        input.supplier,
        getUrlHost(url)
      ),

    supplier:
      normaliseString(
        input.supplier,
        input.name
      ),

    url,

    endpoint:
      normaliseString(
        input.endpoint,
        url
      ),

    sourceType:
      normaliseString(
        input.sourceType,
        "WEB"
      ),

    country:
      normaliseString(
        input.country,
        "UNKNOWN"
      ),

    enabled:
      input.enabled !== false,

    authorised:
      input.authorised === true,

    discoveryMethod:
      normaliseString(
        input.discoveryMethod,
        "configured"
      ),

    collectionScope:
      Array.isArray(
        input.collectionScope
      )
        ? input.collectionScope
        : [],

    collectionRestrictions:
      Array.isArray(
        input.collectionRestrictions
      )
        ? input.collectionRestrictions
        : []
  }
}

function createEngine(
  options = {}
)
{
  const configuration = {
    timeoutMs:
      Number.isFinite(
        Number(options.timeoutMs)
      )
        ? Number(options.timeoutMs)
        : DEFAULT_TIMEOUT_MS,

    maxBytes:
      Number.isFinite(
        Number(options.maxBytes)
      )
        ? Number(options.maxBytes)
        : DEFAULT_MAX_BYTES,

    maxDiscoveryLinks:
      Number.isFinite(
        Number(
          options.maxDiscoveryLinks
        )
      )
        ? Number(
            options.maxDiscoveryLinks
          )
        : DEFAULT_MAX_DISCOVERY_LINKS,

    maxDiscoveryDepth:
      Number.isFinite(
        Number(
          options.maxDiscoveryDepth
        )
      )
        ? Number(
            options.maxDiscoveryDepth
          )
        : DEFAULT_MAX_DISCOVERY_DEPTH,

    maxResultsPerSource:
      Number.isFinite(
        Number(
          options.maxResultsPerSource
        )
      )
        ? Number(
            options.maxResultsPerSource
          )
        : DEFAULT_MAX_RESULTS_PER_SOURCE,

    userAgent:
      normaliseString(
        options.userAgent,
        DEFAULT_USER_AGENT
      )
  }

  return {
    configuration,

    createSourceDefinition,

    discoverSources:
      (sources, overrides = {}) =>
        discoverSources(
          sources,
          {
            ...configuration,
            ...overrides
          }
        ),

    collectSources:
      (sources, overrides = {}) =>
        collectSources(
          sources,
          {
            ...configuration,
            ...overrides
          }
        ),

    discoverAndCollect:
      (sources, overrides = {}) =>
        discoverAndCollect(
          sources,
          {
            ...configuration,
            ...overrides
          }
        ),

    collectSource:
      (source, overrides = {}) =>
        collectSource(
          source,
          {
            ...configuration,
            ...overrides
          }
        )
  }
}

module.exports = {
  createEngine,

  createSourceDefinition,

  discoverSources,

  collectSources,

  discoverAndCollect,

  collectSource,

  defaultAdapters
}