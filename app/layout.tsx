import "./globals.css"

export const metadata = {
  title: "JustDefenders",
  description: "Parts Intelligence Platform"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
