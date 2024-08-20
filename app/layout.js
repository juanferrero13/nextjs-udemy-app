"use client"
import "./globals.css"
import "bootstrap-material-design/dist/css/bootstrap-material-design.min.css"
import TopNav from "@/components/TopNav"
import { Toaster } from "react-hot-toast"
import { SessionProvider } from "next-auth/react"

// export const metadata = {
//   title: "Nextecom",
//   description: "Ecommerce app using NextJs Full Stack",
// }

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <title>NEXT.JS</title>
      <SessionProvider>
        <body>
          <TopNav />
          <Toaster />
          {children}
        </body>
      </SessionProvider>
    </html>
  )
}
