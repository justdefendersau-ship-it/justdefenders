/* =====================================================
   JustDefenders ©
===================================================== */

export const mockParts = [

  {

    id:1,

    keyword:"oil filter",

    partNumber:"ERR3340",

    description:"Oil Filter",

    recommendationRibbon:
      "BEST OVERALL",

    image:"/parts/oil-filter.png",

    compatibility:[
      "300Tdi",
      "Td5"
    ],

    operationalSummary:{

      bestPrice:"$9.90",

      fastestDelivery:"2 Days",

      touringGrade:"Yes",

      supplierCount:2,

      recommendedSupplier:
        "MR Automotive"
    },

    alternatives:[

      {
        brand:"OEM",
        quality:"OEM",
        touring:true
      },

      {
        brand:"Ryco",
        quality:"OEM Equivalent",
        touring:true
      },

      {
        brand:"Wesfil",
        quality:"Budget",
        touring:false
      }
    ],

    suppliers:[

      {

        name:"MR Automotive",

        type:"🏬 Physical Store",

        state:"QLD",

        delivery:"2 Days",

        price:14.95,

        quality:"OEM Equivalent",

        stock:"In Stock",

        recommendation:
          "Touring Recommended",

        badges:[

          "TOURING RECOMMENDED",
          "OEM PREFERRED",
          "FASTEST DELIVERY"
        ]
      },

      {

        name:"Karcraft",

        type:"🌐 Online",

        state:"NSW",

        delivery:"4 Days",

        price:9.90,

        quality:"Budget",

        stock:"In Stock",

        recommendation:
          "Lowest Acquisition Cost",

        badges:[

          "BEST VALUE",
          "LOWEST COST"
        ]
      }
    ]
  },

  {

    id:2,

    keyword:"wheel bearing",

    partNumber:"RTC3429",

    description:"Front Wheel Bearing Kit",

    recommendationRibbon:
      "REMOTE AREA READY",

    image:"/parts/wheel-bearing.png",

    compatibility:[
      "300Tdi",
      "County"
    ],

    operationalSummary:{

      bestPrice:"$129",

      fastestDelivery:"1 Day",

      touringGrade:"Yes",

      supplierCount:1,

      recommendedSupplier:
        "Rovacraft"
    },

    alternatives:[

      {
        brand:"Timken",
        quality:"Touring Grade",
        touring:true
      },

      {
        brand:"Britpart",
        quality:"Budget",
        touring:false
      }
    ],

    suppliers:[

      {

        name:"Rovacraft",

        type:"🏬 Physical Store",

        state:"QLD",

        delivery:"1 Day",

        price:129.00,

        quality:"Touring Grade",

        stock:"Low Stock",

        recommendation:
          "Remote Area Recommended",

        badges:[

          "REMOTE AREA READY",
          "TOURING GRADE",
          "LOW STOCK",
          "LOCAL PICKUP"
        ]
      }
    ]
  }
]
