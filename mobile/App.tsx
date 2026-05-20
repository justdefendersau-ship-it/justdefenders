import React from "react"

import {
  ScrollView
} from "react-native"

import TelemetryScreen
from "./screens/TelemetryScreen"

import FieldModeScreen
from "./screens/FieldModeScreen"

import BarcodeScreen
from "./screens/BarcodeScreen"

// =====================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\mobile\App.tsx
//
// Timestamp:
// 2026-05-07 19:00
//
// Purpose:
// - Mobile vehicle companion
// =====================================================

export default function App(){

  return (

    <ScrollView style={{
      marginTop:40
    }}>

      <TelemetryScreen />

      <FieldModeScreen />

      <BarcodeScreen />

    </ScrollView>
  )
}
