import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getLabels } from "@/lib/blogger"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UR9 Blog - Stories & Ideas",
  description: "Explore breathtaking landscapes, iconic landmarks, and hidden gems around the globe",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getLabels()

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header labels={categories} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
