export function getSupplierData(part: string){

  const feeds:any = {

    "ERR3340": [
      { supplier:"All Four x 4 Spares", price:140, deliveryDays:2, region:"AU" },
      { supplier:"Paddock Spares", price:135, deliveryDays:5, region:"UK" }
    ],

    "STC50529": [
      { supplier:"All Four x 4 Spares", price:95, deliveryDays:2, region:"AU" },
      { supplier:"Paddock Spares", price:90, deliveryDays:5, region:"UK" }
    ],

    "RTC6079": [
      { supplier:"All Four x 4 Spares", price:60, deliveryDays:4, region:"AU" },
      { supplier:"Paddock Spares", price:55, deliveryDays:6, region:"UK" }
    ]

  }

  return feeds[part] || []
}