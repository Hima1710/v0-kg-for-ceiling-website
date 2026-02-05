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
  title: 'KG For Ceiling Sadat | جبس بورد مدينة السادات - ديكورات جبس بورد',
  description: 'أفضل شركة جبس بورد في مدينة السادات. متخصصون في تصميم وتنفيذ أسقف جبسية، قواطيع، ديكورات جبس بورد، وتشطيبات داخلية بأعلى جودة. اتصل الآن لعروض أسعار مجانية.',
  keywords: ['جبس بورد مدينة السادات', 'ديكورات جبس بورد', 'أسقف جبسية', 'قواطيع جبسية', 'تشطيبات داخلية', 'جبس بورد مصر', 'شركة جبس بورد السادات', 'gypsum board Sadat City', 'gypsum ceilings Egypt', 'interior finishing Sadat'],
  authors: [{ name: 'KG For Ceiling Sadat' }],
  creator: 'KG For Ceiling Sadat',
  publisher: 'KG For Ceiling Sadat',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kgforceiling.com'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'KG For Ceiling Sadat | جبس بورد مدينة السادات',
    description: 'أفضل شركة جبس بورد في مدينة السادات. متخصصون في أسقف جبسية، قواطيع، وديكورات جبس بورد بأعلى جودة.',
    url: 'https://kgforceiling.com',
    siteName: 'KG For Ceiling Sadat',
    images: [
      {
        url: '/og-image.jpg', // Add an Open Graph image
        width: 1200,
        height: 630,
        alt: 'KG For Ceiling Sadat - جبس بورد مدينة السادات',
      },
    ],
    locale: 'ar_EG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KG For Ceiling Sadat | جبس بورد مدينة السادات',
    description: 'أفضل شركة جبس بورد في مدينة السادات. متخصصون في أسقف جبسية وتشطيبات داخلية.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "KG For Ceiling Sadat",
    "description": "أفضل شركة جبس بورد في مدينة السادات. متخصصون في تصميم وتنفيذ أسقف جبسية، قواطيع، ديكورات جبس بورد، وتشطيبات داخلية بأعلى جودة.",
    "url": "https://kgforceiling.com",
    "telephone": "+20-XXX-XXXXXXX", // Replace with actual phone number
    "email": "info@kgforceiling.com", // Replace with actual email
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "مدينة السادات", // Replace with actual address
      "addressLocality": "مدينة السادات",
      "addressRegion": "المنوفية",
      "addressCountry": "EG",
      "postalCode": "XXXXX" // Replace with actual postal code
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.3529, // Approximate latitude for Sadat City
      "longitude": 30.5444 // Approximate longitude for Sadat City
    },
    "openingHours": "Mo-Sa 09:00-18:00", // Adjust as needed
    "priceRange": "$$",
    "image": "https://kgforceiling.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/kgforceiling", // Replace with actual social media
      "https://www.instagram.com/kgforceiling"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Gypsum Board Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "أسقف جبسية",
            "description": "تصميم وتنفيذ أسقف جبسية بأحدث التقنيات"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "قواطيع جبسية",
            "description": "قواطيع جبسية عازلة للصوت وحوائط ديكورية"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "ديكورات جبس بورد",
            "description": "تصميمات ديكورية مخصصة من كرانيش وزخارف"
          }
        }
      ]
    }
  };

  return (
    <html lang="ar" dir="rtl" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="GOOGLE_VERIFICATION_PLACEHOLDER" />
      </head>
      <body className={`${poppins.variable} ${cairo.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
