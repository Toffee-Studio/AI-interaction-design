# @toffee-studio/ai-interaction-design

AI interaction design components for React and Next.js by [Toffee Studio](https://github.com/Toffee-Studio).

Shimmer text, token-streaming, generative image reveals — all with a unified API and first-class Next.js App Router support.

---

## Install

```bash
npm install @toffee-studio/ai-interaction-design @emotion/react
```

---

## Quick Start

### 1. Wrap with ToffeeProvider (Next.js App Router)

```tsx
// app/layout.tsx
'use client'
import { ToffeeProvider } from '@toffee-studio/ai-interaction-design'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToffeeProvider>{children}</ToffeeProvider>
      </body>
    </html>
  )
}
```

### 2. Use a component

```tsx
'use client'
import { ShimmerText } from '@toffee-studio/ai-interaction-design/client'

export function LoadingLabel() {
  return (
    <ShimmerText speed="slow" tone="brand" variant="strong">
      Generating response...
    </ShimmerText>
  )
}
```

> **Note:** All animated components must be used inside a Client Component (`'use client'`). Import them from `@toffee-studio/ai-interaction-design/client`.

---

## Components

### ShimmerText

A moving gradient shimmer over text — ideal for "AI thinking" labels, loading placeholders, or generative content previews.

```tsx
<ShimmerText
  variant="strong"
  speed="slow"
  tone="brand"
  direction="ltr"
  shimmerWidth="wide"
  repeat="loop"
>
  Generating response...
</ShimmerText>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Text content |
| `variant` | `'default' \| 'soft' \| 'strong'` | `'default'` | Visual intensity |
| `speed` | `'slow' \| 'normal' \| 'fast' \| number` | `'normal'` | Animation speed |
| `tone` | `'neutral' \| 'brand' \| 'muted'` | `'brand'` | Color palette |
| `direction` | `'ltr' \| 'rtl' \| 'diagonal'` | `'ltr'` | Shimmer sweep direction |
| `shimmerWidth` | `'narrow' \| 'normal' \| 'wide'` | `'normal'` | Width of the light band |
| `repeat` | `'loop' \| 'once' \| 'hover'` | `'loop'` | When the shimmer plays |
| `delay` | `number` | `0` | Delay in ms before animation starts |
| `shimmerColor` | `string` | — | Custom shimmer highlight color |
| `reducedMotion` | `boolean \| 'auto'` | `'auto'` | Motion override |
| `as` | `React.ElementType` | `'span'` | Polymorphic root element |
| `slots` | `SlotProps` | — | before, after, overlay render slots |

### StreamingText

Token-by-token text reveal — mimics ChatGPT / Claude streaming.

```tsx
<StreamingText
  text="The quick brown fox jumps over the lazy dog."
  speed="fast"
  tone="brand"
  showCaret
/>
```

### GenerativeImage

Blur-to-sharp reveal — mimics Midjourney / DALL-E image generation.

```tsx
<GenerativeImage
  src="/ai-output.jpg"
  alt="AI generated landscape"
  width={512}
  height={512}
  speed="slow"
  tone="brand"
/>
```

---

## Shared Props

All components share these base props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'soft' \| 'strong'` | `'default'` | Visual style |
| `speed` | `'slow' \| 'normal' \| 'fast' \| number` | `'normal'` | Duration |
| `tone` | `'neutral' \| 'brand' \| 'muted'` | `'neutral'` | Color theme |
| `reducedMotion` | `boolean \| 'auto'` | `'auto'` | OS preference |
| `className` | `string` | — | CSS class |
| `style` | `CSSProperties` | — | Inline styles |
| `as` | `React.ElementType` | varies | Polymorphic root |

---

## Theming

Override CSS variables globally via `ToffeeProvider`:

```tsx
<ToffeeProvider
  theme={{
    tones: {
      brand: {
        '--toffee-shimmer-mid': 'rgba(234, 179, 8, 0.7)',
        '--toffee-text-color': 'rgba(234, 179, 8, 0.9)',
      },
    },
  }}
>
  {children}
</ToffeeProvider>
```

---

## Headless Hooks

```tsx
import { useStreamingText } from '@toffee-studio/ai-interaction-design/client'

const { displayedText, done, pause, reset } = useStreamingText({
  text: responseText,
  tickMs: 20,
})
```

---

## Entry Points

| Import | Contents |
|--------|----------|
| `@toffee-studio/ai-interaction-design` | ToffeeProvider, types, tokens (server-safe) |
| `@toffee-studio/ai-interaction-design/client` | ShimmerText, StreamingText, GenerativeImage, hooks (client-only) |

---

## License

MIT © [Toffee Studio](https://github.com/Toffee-Studio)
