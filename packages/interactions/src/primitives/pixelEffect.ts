/**
 * pixelEffect.ts
 *
 * Canvas-based generative pixel reconstruction effect.
 *
 * Two-phase animation:
 * 1. LOADING — particles drift in smooth organic motion (like fireflies)
 * 2. ASSEMBLING — particles settle into their image positions top-to-bottom
 *    in a cinematic wave, then the canvas fades out revealing the real image.
 *
 * Pure DOM/Canvas — no React or framework dependencies.
 *
 * @module pixelEffect
 */

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface PixelEffectOptions {
  /** Container element — canvas + img are appended here */
  container: HTMLElement
  /** Image URL to reconstruct */
  image: string
  /** Pixel sampling gap — every Nth pixel. Lower = more particles. Default: 4 */
  gap?: number
  /** Size of each particle rectangle in pixels. Default: 4 */
  particleSize?: number
  /** Duration of the loading drift phase in ms. Default: 1500 */
  loadingDuration?: number
  /** How long the assembly wave takes to sweep top→bottom in ms. Default: 2000 */
  assemblyDuration?: number
  /** Easing speed for particles settling into place (0–1). Default: 0.06 */
  easeSpeed?: number
  /** How far particles can exceed image bounds during drift (fraction). Default: 0.15 */
  overflow?: number
  /** Particles emit a soft colored glow matching their pixel color. Default: false */
  glow?: boolean
  /** Glow blur radius in px (only used when glow is true). Default: 6 */
  glowRadius?: number
  /**
   * Max canvas width for particle sampling. The source image is downscaled
   * to this width before sampling — caps particle count regardless of image
   * size. The real image still renders at full quality. Default: 320
   */
  maxCanvasWidth?: number
  /** Called when the real image is fully visible */
  onComplete?: () => void
}

export interface PixelEffectInstance {
  /** Begin the animation (loading → assembly → reveal) */
  start: () => void
  /** Pause the animation loop */
  stop: () => void
  /** Reset and replay from the loading phase */
  replay: () => void
  /** Clean up canvas, img, and all DOM resources */
  destroy: () => void
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    img.src = src
  })
}

// ---------------------------------------------------------------------------
// Main factory
// ---------------------------------------------------------------------------

/**
 * Create a canvas-based generative pixel reconstruction effect.
 *
 * @example
 * ```ts
 * const effect = await createPixelEffect({
 *   container: document.getElementById('hero')!,
 *   image: '/photo.jpg',
 *   gap: 4,
 *   glow: true,
 *   onComplete: () => console.log('done!'),
 * })
 * effect.start()
 * ```
 */
export async function createPixelEffect(
  options: PixelEffectOptions,
): Promise<PixelEffectInstance> {
  const {
    container,
    image,
    gap = 4,
    particleSize = 4,
    loadingDuration = 1500,
    assemblyDuration = 2000,
    easeSpeed = 0.06,
    overflow = 0.15,
    glow = false,
    glowRadius = 6,
    maxCanvasWidth = 320,
    onComplete,
  } = options

  // ── Load & sample ───────────────────────────────────────────────────────

  const srcImg = await loadImage(image)

  // Scale down to maxCanvasWidth to cap particle count.
  // At gap=4 and 320px wide: ~3k–6k particles — smooth 60fps.
  // The real <img> still shows at full resolution.
  const scale = Math.min(1, maxCanvasWidth / srcImg.naturalWidth)
  const W = Math.round(srcImg.naturalWidth * scale)
  const H = Math.round(srcImg.naturalHeight * scale)

  const offCanvas = document.createElement('canvas')
  offCanvas.width = W
  offCanvas.height = H
  const offCtx = offCanvas.getContext('2d', { willReadFrequently: true })
  if (!offCtx) throw new Error('Could not get 2D context')
  offCtx.drawImage(srcImg, 0, 0, W, H)  // draws at scaled-down size
  const px = offCtx.getImageData(0, 0, W, H).data

  // Count particles
  let count = 0
  for (let y = 0; y < H; y += gap) {
    for (let x = 0; x < W; x += gap) {
      if ((px[(y * W + x) * 4 + 3] ?? 0) >= 10) count++
    }
  }

  // Typed arrays for performance
  const targetX = new Float32Array(count)
  const targetY = new Float32Array(count)
  const curX = new Float32Array(count)
  const curY = new Float32Array(count)
  const r = new Uint8Array(count)
  const g = new Uint8Array(count)
  const b = new Uint8Array(count)
  const velX = new Float32Array(count)
  const velY = new Float32Array(count)
  const phase = new Float32Array(count)

  const ovX = W * overflow
  const ovY = H * overflow

  let idx = 0
  for (let y = 0; y < H; y += gap) {
    for (let x = 0; x < W; x += gap) {
      const pi = (y * W + x) * 4
      if ((px[pi + 3] ?? 0) >= 10) {
        targetX[idx] = x
        targetY[idx] = y
        r[idx] = px[pi] ?? 0
        g[idx] = px[pi + 1] ?? 0
        b[idx] = px[pi + 2] ?? 0
        curX[idx] = -ovX + Math.random() * (W + ovX * 2)
        curY[idx] = -ovY + Math.random() * (H + ovY * 2)
        velX[idx] = (Math.random() - 0.5) * 1.2
        velY[idx] = (Math.random() - 0.5) * 1.2
        phase[idx] = Math.random() * Math.PI * 2
        idx++
      }
    }
  }

  // Pre-compute color strings (avoids string allocation in hot loop)
  const colorStr = new Array<string>(count)
  for (let i = 0; i < count; i++) {
    colorStr[i] = `rgb(${r[i]},${g[i]},${b[i]})`
  }

  // Assembly delay per particle — staggered by Y + jitter
  const assemblyDelay = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    const yNorm = targetY[i]! / H
    const jitter = (Math.random() - 0.5) * 0.15
    assemblyDelay[i] = Math.max(0, Math.min(1, yNorm + jitter))
  }

  // ── DOM ──────────────────────────────────────────────────────────────────

  const wrapper = document.createElement('div')
  wrapper.style.cssText = 'position:relative;width:100%;height:100%;'
  container.appendChild(wrapper)

  // Real image — hidden until reveal completes
  const realImg = document.createElement('img')
  realImg.src = image
  realImg.alt = ''
  realImg.style.cssText =
    'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;opacity:0;transition:opacity 500ms ease;'
  wrapper.appendChild(realImg)

  // Glow layer — low-res canvas with CSS blur (much faster than shadowBlur)
  const GLOW_SCALE = 0.25
  let glowCanvas: HTMLCanvasElement | null = null
  let glowCtx: CanvasRenderingContext2D | null = null
  if (glow) {
    glowCanvas = document.createElement('canvas')
    glowCanvas.width = (W * GLOW_SCALE) | 0
    glowCanvas.height = (H * GLOW_SCALE) | 0
    glowCanvas.style.cssText = `position:absolute;inset:0;width:100%;height:100%;display:block;filter:blur(${glowRadius}px);`
    wrapper.appendChild(glowCanvas)
    glowCtx = glowCanvas.getContext('2d')!
    glowCtx.imageSmoothingEnabled = false
  }

  // Main particle canvas
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;'
  wrapper.appendChild(canvas)
  const ctx = canvas.getContext('2d')!
  ctx.imageSmoothingEnabled = false

  const glowPS = Math.max(2, (particleSize * GLOW_SCALE * 1.5) | 0)

  // ── State ────────────────────────────────────────────────────────────────

  type Phase = 'loading' | 'assembling' | 'complete'
  let currentPhase: Phase = 'loading'
  let rafId: number | null = null
  let frameCount = 0
  let assemblyStartFrame = 0
  let completeFired = false
  let canvasOpacity = 1

  const loadingFrames = Math.round((loadingDuration / 1000) * 60)
  const assemblyFrames = Math.round((assemblyDuration / 1000) * 60)

  // ── Tick ─────────────────────────────────────────────────────────────────

  function tick(): void {
    frameCount++
    ctx.clearRect(0, 0, W, H)

    const gW = glowCanvas ? glowCanvas.width : 0
    const gH = glowCanvas ? glowCanvas.height : 0
    if (glowCtx) glowCtx.clearRect(0, 0, gW, gH)

    // ── LOADING — organic drift ─────────────────────────────────────────
    if (currentPhase === 'loading') {
      const t = frameCount * 0.015
      for (let i = 0; i < count; i++) {
        const ph = phase[i]!
        curX[i] = curX[i]! + velX[i]! + Math.sin(t + ph) * 0.4
        curY[i] = curY[i]! + velY[i]! + Math.cos(t * 0.8 + ph * 1.3) * 0.4

        if (curX[i]! < -ovX) velX[i] = Math.abs(velX[i]!) * 0.8
        if (curX[i]! > W + ovX) velX[i] = -Math.abs(velX[i]!) * 0.8
        if (curY[i]! < -ovY) velY[i] = Math.abs(velY[i]!) * 0.8
        if (curY[i]! > H + ovY) velY[i] = -Math.abs(velY[i]!) * 0.8

        velX[i] = velX[i]! * 0.998 + (Math.random() - 0.5) * 0.02
        velY[i] = velY[i]! * 0.998 + (Math.random() - 0.5) * 0.02

        const drawX = curX[i]! | 0
        const drawY = curY[i]! | 0

        ctx.globalAlpha = 0.6 + Math.sin(t * 2 + ph) * 0.2
        ctx.fillStyle = colorStr[i]!
        ctx.fillRect(drawX, drawY, particleSize, particleSize)

        if (glowCtx) {
          glowCtx.globalAlpha = 0.5
          glowCtx.fillStyle = colorStr[i]!
          glowCtx.fillRect((drawX * GLOW_SCALE) | 0, (drawY * GLOW_SCALE) | 0, glowPS, glowPS)
        }
      }
      ctx.globalAlpha = 1
      if (glowCtx) glowCtx.globalAlpha = 1

      if (frameCount >= loadingFrames) {
        currentPhase = 'assembling'
        assemblyStartFrame = frameCount
      }
    }

    // ── ASSEMBLING — cinematic top-to-bottom settle ─────────────────────
    else if (currentPhase === 'assembling') {
      const elapsed = frameCount - assemblyStartFrame
      const globalProgress = Math.min(1, elapsed / assemblyFrames)
      let allSettled = true

      for (let i = 0; i < count; i++) {
        const delay = assemblyDelay[i]!
        const spreadFactor = 0.6
        const localStart = delay * spreadFactor
        const localProgress = Math.max(0, Math.min(1, (globalProgress - localStart) / (1 - spreadFactor)))

        let drawX: number
        let drawY: number

        if (localProgress <= 0) {
          // Still drifting
          const ph = phase[i]!
          const tt = frameCount * 0.015
          curX[i] = curX[i]! + velX[i]! * 0.5 + Math.sin(tt + ph) * 0.3
          curY[i] = curY[i]! + velY[i]! * 0.5 + Math.cos(tt * 0.8 + ph * 1.3) * 0.3

          drawX = curX[i]! | 0
          drawY = curY[i]! | 0

          ctx.globalAlpha = 0.5
          ctx.fillStyle = colorStr[i]!
          ctx.fillRect(drawX, drawY, particleSize, particleSize)

          if (glowCtx) {
            glowCtx.globalAlpha = 0.4
            glowCtx.fillStyle = colorStr[i]!
            glowCtx.fillRect((drawX * GLOW_SCALE) | 0, (drawY * GLOW_SCALE) | 0, glowPS, glowPS)
          }
          allSettled = false
        } else {
          // Easing toward target
          const dx = targetX[i]! - curX[i]!
          const dy = targetY[i]! - curY[i]!
          const ease = easeSpeed + localProgress * 0.12
          curX[i] = curX[i]! + dx * ease
          curY[i] = curY[i]! + dy * ease

          const dist = dx * dx + dy * dy

          let shimmer = 0
          if (dist < 900 && dist > 1) {
            shimmer = ((900 - dist) / 900) * 120 * (1 - localProgress * 0.8)
          }

          const alpha = Math.min(1, 0.5 + localProgress * 0.5)
          ctx.globalAlpha = alpha

          if (shimmer > 1) {
            const ri = Math.min(255, r[i]! + shimmer) | 0
            const gi = Math.min(255, g[i]! + shimmer) | 0
            const bi = Math.min(255, b[i]! + shimmer) | 0
            ctx.fillStyle = `rgb(${ri},${gi},${bi})`
          } else {
            ctx.fillStyle = colorStr[i]!
          }

          drawX = curX[i]! | 0
          drawY = curY[i]! | 0
          ctx.fillRect(drawX, drawY, particleSize, particleSize)

          if (glowCtx && localProgress < 0.8) {
            glowCtx.globalAlpha = 0.4 * (1 - localProgress)
            glowCtx.fillStyle = colorStr[i]!
            glowCtx.fillRect((drawX * GLOW_SCALE) | 0, (drawY * GLOW_SCALE) | 0, glowPS, glowPS)
          }

          if (dist > 0.25) allSettled = false
        }
      }

      ctx.globalAlpha = 1
      if (glowCtx) glowCtx.globalAlpha = 1

      if (allSettled || globalProgress >= 1) {
        currentPhase = 'complete'
      }
    }

    // ── COMPLETE — fade canvas out, show real image ─────────────────────
    else if (currentPhase === 'complete') {
      ctx.globalAlpha = 1
      for (let i = 0; i < count; i++) {
        ctx.fillStyle = colorStr[i]!
        ctx.fillRect(targetX[i]! | 0, targetY[i]! | 0, particleSize, particleSize)
      }

      canvasOpacity -= 0.03
      const op = Math.max(0, canvasOpacity)
      canvas.style.opacity = String(op)
      if (glowCanvas) glowCanvas.style.opacity = String(op)
      realImg.style.opacity = String(Math.min(1, 1 - canvasOpacity))

      if (canvasOpacity <= 0) {
        canvas.style.display = 'none'
        if (glowCanvas) glowCanvas.style.display = 'none'
        if (!completeFired) {
          completeFired = true
          onComplete?.()
        }
        rafId = null
        return
      }
    }

    rafId = requestAnimationFrame(tick)
  }

  // ── Reset ────────────────────────────────────────────────────────────────

  function reset(): void {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    frameCount = 0
    assemblyStartFrame = 0
    currentPhase = 'loading'
    completeFired = false
    canvasOpacity = 1
    canvas.style.display = 'block'
    canvas.style.opacity = '1'
    if (glowCanvas) {
      glowCanvas.style.display = 'block'
      glowCanvas.style.opacity = '1'
    }
    realImg.style.opacity = '0'

    for (let i = 0; i < count; i++) {
      curX[i] = -ovX + Math.random() * (W + ovX * 2)
      curY[i] = -ovY + Math.random() * (H + ovY * 2)
      velX[i] = (Math.random() - 0.5) * 1.2
      velY[i] = (Math.random() - 0.5) * 1.2
    }
    ctx.clearRect(0, 0, W, H)
    if (glowCtx && glowCanvas) {
      glowCtx.clearRect(0, 0, glowCanvas.width, glowCanvas.height)
    }
  }

  // ── Public API ────────────────────────────────────────────────────────────

  return {
    start(): void {
      if (rafId !== null) return
      rafId = requestAnimationFrame(tick)
    },
    stop(): void {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    },
    replay(): void {
      reset()
      rafId = requestAnimationFrame(tick)
    },
    destroy(): void {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      wrapper.parentNode?.removeChild(wrapper)
    },
  }
}
