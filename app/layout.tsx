'use client'

import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { base } from 'wagmi/chains'
import { http, createConfig } from 'wagmi'
import './globals.css'

const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
})

const queryClient = new QueryClient()

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>BaseNanoPlay - Ultra-Low Cost Onchain Game</title>
        <meta name="description" content="Low-cost onchain gaming with data tracking" />
        <meta name="base:app_id" content="69c23f56c28019cfbb9e8e6b" />
        <meta name="base:builder_code" content="bc_0chuh8ra" />
        <meta name="base:encoded_string" content="0x62635f30636875683872610b0080218021802180218021802180218021" />
        
        <meta property="og:url" content="https://basenanoplay.vercel.app" />
        <meta property="og:title" content="BaseNanoPlay - Ultra-Low Cost Onchain Game" />
        <meta property="og:description" content="Low-cost onchain gaming with data tracking" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://basenanoplay.vercel.app/og-image.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BaseNanoPlay - Ultra-Low Cost Onchain Game" />
        <meta name="twitter:description" content="Low-cost onchain gaming with data tracking" />
        <meta name="twitter:image" content="https://basenanoplay.vercel.app/og-image.png" />
        
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  )
}
