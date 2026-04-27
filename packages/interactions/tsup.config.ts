import { defineConfig } from 'tsup'

export default defineConfig([
  // Server-safe entry (ToffeeProvider, types, tokens)
  {
    entry: { index: 'src/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom', '@emotion/react', '@emotion/cache', 'next', 'next/navigation'],
    esbuildOptions(options) {
      options.jsx = 'automatic'
      options.jsxImportSource = '@emotion/react'
    },
  },
  // Client-only entry (animated components)
  {
    entry: { client: 'src/client.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    splitting: false,
    sourcemap: true,
    external: ['react', 'react-dom', '@emotion/react', '@emotion/cache', 'next', 'next/navigation'],
    esbuildOptions(options) {
      options.jsx = 'automatic'
      options.jsxImportSource = '@emotion/react'
    },
  },
])
