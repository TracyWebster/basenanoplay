import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'BaseNanoPlay - Ultra-Low Cost Onchain Game',
  description: 'Low-cost onchain gaming with data tracking',
  openGraph: {
    title: 'BaseNanoPlay - Ultra-Low Cost Onchain Game',
    description: 'Low-cost onchain gaming with data tracking',
    url: 'https://basenanoplay.vercel.app',
    type: 'website',
    images: [
      {
        url: 'https://basenanoplay.vercel.app/og-image.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BaseNanoPlay - Ultra-Low Cost Onchain Game',
    description: 'Low-cost onchain gaming with data tracking',
    images: ['https://basenanoplay.vercel.app/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Base 平台验证（必须）*/}
        <meta name="base:app_id" content="69c23f56c28019cfbb9e8e6b" />
        
        {/* Talent 平台验证（必须）*/}
        <meta name="talentapp:project_verification" content="bd32aa9cb568a5be3524f8c22a86fbde2bb732fc0a0195e782bcfaac03efd39d9f32b0e5a891a3a4baad685dbc3ae59b2cad714e7669bbc7058911103539d137" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
