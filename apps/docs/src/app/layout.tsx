/** @jsxImportSource react */
import React from 'react'
import { ShellClient } from '@/components/ShellClient'
import { t } from '@/theme'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Toffee Interactions — AI interaction components for React</title>
        <meta
          name="description"
          content="Shimmer text, streaming text, generative image reveals — AI interaction design components for React and Next.js."
        />
        <meta name="theme-color" content="#f5f0eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          background: t.bg,
          color: t.textPrimary,
          fontFamily: t.font,
          WebkitFontSmoothing: 'antialiased',
          overflow: 'hidden',
          overflowX: 'hidden',
        }}
      >
        <ShellClient>{children}</ShellClient>
      </body>
    </html>
  )
}
