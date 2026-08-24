/**
 * ============================================================
 * JustDefenders©
 *
 * File:
 * C:\dev\justdefenders\frontend\lib\federation\fetchRepcoProducts.ts
 *
 * Timestamp:
 * 16th August 2026 08:43 Sydney
 *
 * PURPOSE:
 * Live Repco Procurement Federation
 *
 * FEATURES:
 * - Cross-reference intelligence
 * - Equivalent-part federation
 * - Tactical procurement scoring
 * - Expedition-aware procurement logic
 * - Deduplicated supplier federation
 *
 * STRATEGY:
 * PP-001 / MVP / WP-015 / EU-008
 *
 * ENGINEERING BOUNDARY:
 * Preserve and reuse the existing genuine Repco acquisition
 * implementation.
 *
 * =================================================================
 */

import * as cheerio from "cheerio"

import {
  ProcurementProduct
} from "@/types/procurement"

import {
  resolveCrossReference
} from "@/lib/crossReference/crossReferenceIndex"

// ============================================================
// FETCH REPCO PRODUCTS
// ============================================================

export async function fetchRepcoProducts(

  searchTerm: string

): Promise<

  ProcurementProduct[]

> {

  try {

    // ========================================================
    // CROSS REFERENCE INTELLIGENCE
    // ========================================================

    const crossReference =

      resolveCrossReference(

        searchTerm

      )

    const federationTerms =

      crossReference

        ? [

            searchTerm,

            ...crossReference

              .equivalents

          ]

        : [searchTerm]

    console.log(

      "FEDERATION TERMS",

      federationTerms

    )

    // ========================================================
    // COLLECTED PRODUCTS
    // ========================================================

    const collectedProducts:

      ProcurementProduct[] = []

    // ========================================================
    // FEDERATED SEARCH
    // ========================================================

    for (

      const term of federationTerms

    ) {

      try {

        console.log(

          "REPCO SEARCH TERM",

          term

        )

        const url =

          `https://www.repco.com.au/search?text=${encodeURIComponent(term)}`

        const response =

          await fetch(

            url,

            {

              headers: {

                "User-Agent":

                  "Mozilla/5.0"

              },

              cache:

                "no-store"

            }

          )

        const html =

          await response.text()

        const $ =

          cheerio.load(

            html

          )

        // ====================================================
        // PRODUCT CARDS
        // ====================================================

        $("a[href*='/p/']").each(

          (

            index,

            element

          ) => {

            try {

              const href =

                $(element)

                  .attr("href")

                || ""

              const title =

                $(element)

                  .text()

                  .replace(/\s+/g, " ")

                  .trim()

              if (

                !title

                ||

                title.length < 5

              ) {

                return

              }

              // ==============================================
              // SKU EXTRACTION
              // ==============================================

              const skuMatch =

                href.match(

                  /\/p\/([A-Z0-9]+)$/i

                )

              const sku =

                skuMatch?.[1]

                ||

                `REPCO-${index}`

              // ==============================================
              // BRAND DETECTION
              // ==============================================

              const brand =

                title.split(" ")[0]

                || "Repco"

              // ==============================================
              // CATEGORY DETECTION
              // ==============================================

              const categoryPath =

                href

                  .split("/")

                  .slice(3,5)

                  .join(" ")

              // ==============================================
              // EXPEDITION SCORING
              // ==============================================

              const expeditionReady =

                /ryco|oex|drivetech|narva|penrite|rof15a|z89a|z9/i

                  .test(title)

              // ==============================================
              // PROCUREMENT SCORE
              // ==============================================

              let procurementScore = 15

              if (

                expeditionReady

              ) {

                procurementScore = 40

              }

              if (

                /z9|rof15a-s/i

                  .test(title)

              ) {

                procurementScore = 55

              }

              // ==============================================
              // CROSS-REFERENCE BOOST
              // ==============================================

              if (

                crossReference

                &&

                crossReference

                  .equivalents

                  .some(

                    equivalent =>

                      title

                        .toUpperCase()

                        .includes(

                          equivalent

                        )

                  )

              ) {

                procurementScore += 25

              }

              // ==============================================
              // BUILD PRODUCT
              // ==============================================

              const product:

                ProcurementProduct = {

                  supplier:

                    "Repco",

                  title,

                  brand,

                  sku,

                  category:

                    categoryPath,

                  url:

                    href.startsWith("http")

                      ? href

                      :

                      `https://www.repco.com.au${href}`,

                  expeditionReady,

                  inStock:

                    true,

                  procurementScore

                }

              collectedProducts.push(

                product

              )

            } catch (

              productError

            ) {

              console.error(

                "Repco Product Parse Error",

                productError

              )

            }

          }

        )

      } catch (

        searchError

      ) {

        console.error(

          "Repco Federation Search Failed",

          term,

          searchError

        )

      }

    }

    // ========================================================
    // DEDUPE
    // ========================================================

    const uniqueProducts =

      collectedProducts.filter(

        (

          product,

          index,

          self

        ) =>

          index ===

          self.findIndex(

            p =>

              p.sku ===

              product.sku

          )

      )

    // ========================================================
    // SORT
    // ========================================================

    uniqueProducts.sort(

      (

        a,

        b

      ) =>

        (

          b.procurementScore

          ||

          0

        )

        -

        (

          a.procurementScore

          ||

          0

        )

    )

    console.log(

      "FEDERATED REPCO RESULTS",

      uniqueProducts

    )

    return uniqueProducts

  } catch (

    err

  ) {

    console.error(

      "Repco Federation Fatal Error",

      err

    )

    return []

  }

}