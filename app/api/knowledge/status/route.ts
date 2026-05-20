import { NextResponse }
from "next/server"

import {
  evaluateKnowledgeGraph
}
from "@/backend/knowledge-graph/enterpriseKnowledgeGraph"

export async function GET(){

  return NextResponse.json(
    evaluateKnowledgeGraph()
  )
}
