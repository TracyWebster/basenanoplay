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
        <title>BaseNanoPlay - 超低成本链上游戏</title>
        <meta name="description" content="用户低成本参与链上游戏并记录数据行为" />
        <meta name="base:app_id" content="69c23f56c28019cfbb9e8e6b" />
        
        <meta property="og:title" content="BaseNanoPlay - 超低成本链上游戏" />
        <meta property="og:description" content="用户低成本参与链上游戏并记录数据行为" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BaseNanoPlay - 超低成本链上游戏" />
        <meta name="twitter:description" content="用户低成本参与链上游戏并记录数据行为" />
        <meta name="twitter:image" content="/og-image.png" />
        
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
