// ====================================================================
// JustDefenders ©
// File:
// C:\dev\justdefenders\frontend\app\layout.tsx
//
// Timestamp:
// 26 May 2026 14:10 Sydney
//
// PURPOSE:
// Root application layout.
// Restores global styling pipeline.
// ====================================================================

import "./globals.css"

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (

    <html lang="en">

      <body>

        {children}

      </body>

    </html>
  )
}