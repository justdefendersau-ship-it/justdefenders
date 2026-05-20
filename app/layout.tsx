// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\layout.tsx
// Timestamp: 16 May 2026 07:40 Sydney
// ====================================================================

import "./globals.css"

import type {
  Metadata
} from "next"

export const metadata: Metadata = {

  title:
    "JustDefenders",

  description:
    "Operational Intelligence Platform"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (

    <html lang="en">

      <body>

        {
          children
        }

      </body>

    </html>
  )
}