/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\lib\intelligence\globalDefenderKnowledgeNetwork.ts
 *
 * Timestamp:
 * 17 May 2026 20:10 Sydney
 *
 * PURPOSE:
 * Global Defender Operational Intelligence Network
 *
 * STRATEGY:
 * External knowledge aggregation layer for:
 * - procurement intelligence
 * - technical intelligence
 * - expedition intelligence
 * - operational maintenance intelligence
 * - regional community knowledge
 * ============================================================
 */

export interface GlobalDefenderKnowledgeSource {

  id: string

  name: string

  category:
    | "forum"
    | "community"
    | "technical"
    | "social"
    | "parts"

  region: string

  primaryLanguage: string

  url: string

  operationalRelevance: number

  expeditionRelevance: number

  technicalDepth: number

  procurementValue: number

  aiIngestionPriority: number

  tags: string[]
}

// ============================================================
// GLOBAL DEFENDER KNOWLEDGE NETWORK
// ============================================================

export const GLOBAL_DEFENDER_KNOWLEDGE_NETWORK:
GlobalDefenderKnowledgeSource[] = [

  // ==========================================================
  // GLOBAL / ENGLISH SPEAKING
  // ==========================================================

  {
    id: "defender2",

    name: "Defender2.net",

    category: "forum",

    region: "Global",

    primaryLanguage: "English",

    url:
      "https://www.defender2.net",

    operationalRelevance: 95,

    expeditionRelevance: 94,

    technicalDepth: 97,

    procurementValue: 82,

    aiIngestionPriority: 98,

    tags: [
      "classic-defender",
      "l663",
      "technical",
      "global"
    ]
  },

  {
    id: "defender-source",

    name: "Defender Source",

    category: "forum",

    region: "North America",

    primaryLanguage: "English",

    url:
      "https://www.defendersource.com",

    operationalRelevance: 92,

    expeditionRelevance: 90,

    technicalDepth: 96,

    procurementValue: 88,

    aiIngestionPriority: 96,

    tags: [
      "nas",
      "north-america",
      "technical"
    ]
  },

  {
    id: "lr4x4",

    name: "LR4x4",

    category: "forum",

    region: "United Kingdom",

    primaryLanguage: "English",

    url:
      "https://lr4x4.com",

    operationalRelevance: 97,

    expeditionRelevance: 93,

    technicalDepth: 99,

    procurementValue: 84,

    aiIngestionPriority: 99,

    tags: [
      "technical",
      "deep-dive",
      "archive"
    ]
  },

  {
    id: "landyzone",

    name: "LandyZone",

    category: "forum",

    region: "United Kingdom",

    primaryLanguage: "English",

    url:
      "https://www.landyzone.co.uk",

    operationalRelevance: 87,

    expeditionRelevance: 85,

    technicalDepth: 84,

    procurementValue: 78,

    aiIngestionPriority: 82,

    tags: [
      "community",
      "uk",
      "defender"
    ]
  },

  {
    id: "reddit-landroverdefender",

    name: "Reddit Land Rover Defender",

    category: "social",

    region: "Global",

    primaryLanguage: "English",

    url:
      "https://www.reddit.com/r/LandroverDefender",

    operationalRelevance: 81,

    expeditionRelevance: 88,

    technicalDepth: 70,

    procurementValue: 68,

    aiIngestionPriority: 75,

    tags: [
      "reddit",
      "community",
      "visual"
    ]
  },

  // ==========================================================
  // AUSTRALIA
  // ==========================================================

  {
    id: "aulro",

    name: "AULRO",

    category: "forum",

    region: "Australia",

    primaryLanguage: "English",

    url:
      "https://www.aulro.com",

    operationalRelevance: 99,

    expeditionRelevance: 99,

    technicalDepth: 96,

    procurementValue: 93,

    aiIngestionPriority: 100,

    tags: [
      "australia",
      "expedition",
      "touring",
      "remote",
      "defender"
    ]
  },

  {
    id: "defenders-of-australia",

    name: "Defenders of Australia Club",

    category: "community",

    region: "Australia",

    primaryLanguage: "English",

    url:
      "https://www.defendersofaustralia.club",

    operationalRelevance: 90,

    expeditionRelevance: 95,

    technicalDepth: 72,

    procurementValue: 70,

    aiIngestionPriority: 78,

    tags: [
      "australia",
      "club",
      "touring"
    ]
  },

  // ==========================================================
  // LATAM
  // ==========================================================

  {
    id: "landroverclub-argentina",

    name: "Land Rover Club Argentina",

    category: "forum",

    region: "Argentina",

    primaryLanguage: "Spanish",

    url:
      "https://www.landroverclub.com.ar",

    operationalRelevance: 80,

    expeditionRelevance: 86,

    technicalDepth: 79,

    procurementValue: 62,

    aiIngestionPriority: 72,

    tags: [
      "argentina",
      "spanish",
      "latam"
    ]
  },

  // ==========================================================
  // GERMANY / DACH
  // ==========================================================

  {
    id: "blacklandy",

    name: "BlackLandy",

    category: "forum",

    region: "Germany",

    primaryLanguage: "German",

    url:
      "https://www.blacklandy.eu",

    operationalRelevance: 89,

    expeditionRelevance: 84,

    technicalDepth: 94,

    procurementValue: 76,

    aiIngestionPriority: 88,

    tags: [
      "germany",
      "dach",
      "technical"
    ]
  },

  // ==========================================================
  // NORWAY
  // ==========================================================

  {
    id: "lrforum",

    name: "LRforum",

    category: "forum",

    region: "Norway",

    primaryLanguage: "Norwegian",

    url:
      "https://www.lrforum.com",

    operationalRelevance: 75,

    expeditionRelevance: 88,

    technicalDepth: 78,

    procurementValue: 60,

    aiIngestionPriority: 68,

    tags: [
      "norway",
      "cold-weather",
      "expedition"
    ]
  },

  // ==========================================================
  // TECHNICAL
  // ==========================================================

  {
    id: "lr-workshop",

    name: "LR Workshop",

    category: "technical",

    region: "Global",

    primaryLanguage: "English",

    url:
      "https://www.lrworkshop.com",

    operationalRelevance: 98,

    expeditionRelevance: 91,

    technicalDepth: 100,

    procurementValue: 99,

    aiIngestionPriority: 100,

    tags: [
      "parts",
      "technical",
      "diagrams",
      "part-numbers"
    ]
  }
]