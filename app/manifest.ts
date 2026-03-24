import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BaseNanoPlay',
    short_name: 'BaseNanoPlay',
    description: '用户低成本参与链上游戏并记录数据行为',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#1e3a8a',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
