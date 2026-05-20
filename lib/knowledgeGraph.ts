/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\knowledgeGraph.ts

   Timestamp:
   2026-05-07 12:30

   Purpose:
   - Persistent knowledge graph
   - Intelligence relationships
   - Graph persistence
===================================================== */

import { createClient }
from "@supabase/supabase-js"

// =====================================================
// CLIENT
// =====================================================

const supabase =
  createClient(

    process.env.NEXT_PUBLIC_SUPABASE_URL || "",

    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  )

// =====================================================
// STORE KNOWLEDGE
// =====================================================

export async function storeKnowledgeNode(

  node:any
){

  try {

    const {

      error

    } = await supabase

      .from("knowledge_nodes")

      .upsert({

        part_number:
          node.part_number,

        category:
          node.category,

        source:
          node.source,

        title:
          node.title,

        insights:
          node.insights,

        confidence:
          node.confidence,

        metadata:
          node.metadata || {},

        updated_at:
          new Date().toISOString()
      })

    if(error){

      console.error(
        "GRAPH STORE ERROR:",
        error
      )
    }

  } catch(err){

    console.error(
      "GRAPH FAILURE:",
      err
    )
  }
}

// =====================================================
// RELATIONSHIPS
// =====================================================

export async function storeRelationship(

  fromPart:string,

  toPart:string,

  relationship:string
){

  try {

    const {

      error

    } = await supabase

      .from("knowledge_relationships")

      .upsert({

        from_part:
          fromPart,

        to_part:
          toPart,

        relationship_type:
          relationship,

        updated_at:
          new Date().toISOString()
      })

    if(error){

      console.error(
        "RELATIONSHIP ERROR:",
        error
      )
    }

  } catch(err){

    console.error(
      "RELATIONSHIP FAILURE:",
      err
    )
  }
}

// =====================================================
// GET KNOWLEDGE
// =====================================================

export async function getKnowledgeGraph(
  part:string
){

  try {

    const {

      data,

      error

    } = await supabase

      .from("knowledge_nodes")

      .select("*")

      .eq(
        "part_number",
        part
      )

    if(error){

      console.error(
        error
      )

      return []
    }

    return data || []

  } catch(err){

    console.error(err)

    return []
  }
}
