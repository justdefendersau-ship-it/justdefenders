import React, {
  useState
} from "react"

import {
  View,
  Text,
  Button
} from "react-native"

import {

  lookupPartBarcode

}
from "../services/barcodeService"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\mobile\screens\BarcodeScreen.tsx
//
// Timestamp:
// 2026-05-07 19:00
//
// Purpose:
// - Barcode scanning
// =====================================================

export default function BarcodeScreen(){

  const [part,setPart] =
    useState("")

  // =====================================================
  // SCAN
  // =====================================================

  function scan(){

    const result =

      lookupPartBarcode(
        "5013008040012"
      )

    setPart(result || "")
  }

  return (

    <View style={{
      padding:20
    }}>

      <Text style={{
        fontSize:28,
        fontWeight:"bold"
      }}>

        Barcode Scanner

      </Text>

      <Button
        title="Simulate Scan"

        onPress={scan}
      />

      {part && (

        <Text style={{
          marginTop:30
        }}>

          Part:
          {" "}
          {part}

        </Text>
      )}

    </View>
  )
}
