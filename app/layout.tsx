import React from "react"
import type { Metadata } from 'next'
import { Poppins, Cairo } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/lib/language-context'
import './globals.css'

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins"
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cairo"
});

export const metadata: Metadata = {
  title: 'KG For Ceiling Sadat | أسقف جبسية وتشطيبات داخلية',
  description: 'متخصصون في تصميم وتنفيذ الأسقف الجبسية والقواطيع والتشطيبات الداخلية بأعلى معايير الجودة في مدينة السادات. Professional gypsum board ceilings and interior finishing.',
  keywords: ['gypsum board', 'ceiling', 'interior finishing', 'partitions', 'Sadat City', 'Egypt', 'أسقف جبسية', 'تشطيبات', 'مدينة السادات'],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
    generator: 'v0.app'
}

export const viewport = {
  themeColor: '#A61D21',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${poppins.variable} ${cairo.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
