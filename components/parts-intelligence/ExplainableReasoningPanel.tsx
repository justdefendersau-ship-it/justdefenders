"use client";

// =====================================================
// JustDefenders ©
// Explainable Intelligence Panel
// =====================================================

import React, {

  useState

}
from "react"

export default function ExplainableReasoningPanel({

  reasoning

}:any){

  // ===================================================
  // STATE
  // ===================================================

  const [expanded,setExpanded] =
    useState(false)

  // ===================================================
  // CONFIDENCE
  // ===================================================

  const confidence =
    Math.round(
      (reasoning.confidence || 0) * 100
    )

  // ===================================================
  // RENDER
  // ===================================================

  return (

    <div className="jd-explain-shell">

      {/* ============================================= */}
      {/* TOP */}
      {/* ============================================= */}

      <div className="jd-explain-top">

        <div>

          <div className="jd-explain-title">

            {reasoning.title}

          </div>

          <div className="jd-explain-summary">

            {reasoning.summary}

          </div>

        </div>

        <div className="jd-explain-confidence">

          {confidence}%

        </div>

      </div>

      {/* ============================================= */}
      {/* BUTTON */}
      {/* ============================================= */}

      <button

        className="jd-explain-button"

        onClick={()=>
          setExpanded(
            !expanded
          )
        }
      >

        {

          expanded

            ? "Hide Operational Reasoning"

            : "WHY?"

        }

      </button>

      {/* ============================================= */}
      {/* EXPANDED */}
      {/* ============================================= */}

      {

        expanded
        &&
        (

          <div className="jd-explain-expanded">

            {/* ===================================== */}
            {/* REASONING */}
            {/* ===================================== */}

            <div className="jd-explain-section">

              <div className="jd-explain-heading">

                WHY THIS RECOMMENDATION EXISTS

              </div>

              <ul>

                {reasoning.reasoning.map(

                  (
                    item:string,
                    idx:number
                  )=>(

                    <li key={idx}>

                      {item}

                    </li>
                  )
                )}

              </ul>

            </div>

            {/* ===================================== */}
            {/* FACTORS */}
            {/* ===================================== */}

            <div className="jd-explain-section">

              <div className="jd-explain-heading">

                CONTRIBUTING FACTORS

              </div>

              <ul>

                {reasoning.contributingFactors.map(

                  (
                    item:string,
                    idx:number
                  )=>(

                    <li key={idx}>

                      {item}

                    </li>
                  )
                )}

              </ul>

            </div>

            {/* ===================================== */}
            {/* EVIDENCE */}
            {/* ===================================== */}

            <div className="jd-explain-section">

              <div className="jd-explain-heading">

                EVIDENCE SOURCES

              </div>

              <ul>

                {reasoning.evidenceSources.map(

                  (
                    item:string,
                    idx:number
                  )=>(

                    <li key={idx}>

                      {item}

                    </li>
                  )
                )}

              </ul>

            </div>

            {/* ===================================== */}
            {/* ACTIONS */}
            {/* ===================================== */}

            <div className="jd-explain-section">

              <div className="jd-explain-heading">

                RECOMMENDED ACTIONS

              </div>

              <ul>

                {reasoning.recommendedActions.map(

                  (
                    item:string,
                    idx:number
                  )=>(

                    <li key={idx}>

                      {item}

                    </li>
                  )
                )}

              </ul>

            </div>

            {/* ===================================== */}
            {/* RELATED */}
            {/* ===================================== */}

            <div className="jd-explain-related-grid">

              {/* ROUTES */}

              <div className="jd-explain-related-card">

                <div className="jd-explain-related-title">

                  Routes

                </div>

                <div>

                  {

                    reasoning.relatedRoutes?.join(", ")
                    ||
                    "N/A"

                  }

                </div>

              </div>

              {/* VEHICLES */}

              <div className="jd-explain-related-card">

                <div className="jd-explain-related-title">

                  Vehicles

                </div>

                <div>

                  {

                    reasoning.relatedVehicles?.join(", ")
                    ||
                    "N/A"

                  }

                </div>

              </div>

              {/* PARTS */}

              <div className="jd-explain-related-card">

                <div className="jd-explain-related-title">

                  Linked Parts

                </div>

                <div>

                  {

                    reasoning.relatedParts?.join(", ")
                    ||
                    "N/A"

                  }

                </div>

              </div>

            </div>

          </div>
        )
      }

    </div>
  )
}
