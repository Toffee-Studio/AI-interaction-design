/** @jsxImportSource @emotion/react */
'use client'

import React, { useState, useCallback } from 'react'
import { css, keyframes } from '@emotion/react'
import type { ToffeeBaseProps, SlotProps } from '../../types'
import { resolveToneVars } from '../../tokens/tone'
import { resolveSpeed } from '../../tokens/speed'

export interface GenerativeImageState {
  /** Whether the image has finished loading */
  loaded: boolean
  /** Whether the image encountered an error */
  error: boolean
  /** 0 while loading, 1 when loaded */
  progress: number
}

export interface GenerativeImageProps
  extends ToffeeBaseProps,
    Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onLoad' | 'onError' | 'placeholder'> {
  /** Image source URL */
  src: string
  /** Alt text (required for accessibility) */
  alt: string
  /** Width of the image container */
  width: number | string
  /** Height of the image container */
  height: number | string
  /**
   * Render slots:
   * - `before` / `after`: static content around the frame
   * - `overlay(state)`: render prop over the image (e.g. "Generated" badge)
   * - Replace default placeholder entirely via `placeholder` prop below
   */
  slots?: SlotProps<GenerativeImageState> & {
    /** Custom placeholder rendered while the image loads */
    placeholder?: React.ReactNode
  }
  /** Called when image finishes loading */
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void
  /** Called if image fails to load */
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void
}

const scanLine = keyframes`
  0%   { transform: translateY(-100%); opacity: 0.6; }
  100% { transform: translateY(200%);  opacity: 0; }
`

const unblurReveal = keyframes`
  0%   { filter: blur(20px) saturate(0.5); opacity: 0.3; transform: scale(1.03); }
  60%  { filter: blur(4px)  saturate(0.8); opacity: 0.85; }
  100% { filter: blur(0px)  saturate(1);   opacity: 1; transform: scale(1); }
`

const pulseKeyframe = keyframes`
  0%, 100% { opacity: 0.6; }
  50%       { opacity: 1; }
`

/**
 * GenerativeImage reveals an image with a blur-to-sharp animation —
 * mimicking AI image generators like Midjourney or DALL-E.
 *
 * @example
 * <GenerativeImage
 *   src="/ai-output.jpg"
 *   alt="AI generated landscape"
 *   width={512}
 *   height={512}
 *   tone="brand"
 *   speed="slow"
 * />
 */
export function GenerativeImage({
  src,
  alt,
  width,
  height,
  variant = 'default',
  speed = 'normal',
  tone = 'brand',
  reducedMotion = 'auto',
  className,
  style,
  slots,
  onLoad,
  onError,
  ...imgProps
}: GenerativeImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const duration = resolveSpeed(speed)
  const toneVars = resolveToneVars(tone)

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setLoaded(true)
      onLoad?.(e)
    },
    [onLoad],
  )

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setError(true)
      onError?.(e)
    },
    [onError],
  )

  const state: GenerativeImageState = { loaded, error, progress: loaded ? 1 : 0 }

  const frameStyles = css`
    position: relative;
    display: inline-block;
    overflow: hidden;
    border-radius: ${variant === 'soft' ? '12px' : variant === 'strong' ? '4px' : '8px'};
    width: ${typeof width === 'number' ? `${width}px` : width};
    height: ${typeof height === 'number' ? `${height}px` : height};
    background: var(--toffee-pulse-bg, rgba(150, 150, 150, 0.15));
  `

  const placeholderStyles = css`
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--toffee-pulse-bg, rgba(150, 150, 150, 0.15));
    animation: ${pulseKeyframe} ${duration * 0.8}ms ease-in-out infinite;
    transition: opacity 300ms ease;
    opacity: ${loaded ? 0 : 1};
    pointer-events: none;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `

  const scanStyles = css`
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    display: ${loaded ? 'none' : 'block'};

    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      height: 60px;
      background: linear-gradient(
        to bottom,
        transparent,
        var(--toffee-pulse-highlight, rgba(200, 200, 200, 0.3)),
        transparent
      );
      animation: ${scanLine} ${duration}ms linear infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      display: none;
    }
  `

  const imageStyles = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    opacity: ${loaded ? 1 : 0};
    transition: opacity ${Math.round(duration * 0.4)}ms ease;
    animation: ${loaded ? css`${unblurReveal} ${duration}ms ease-out forwards` : 'none'};

    @media (prefers-reduced-motion: reduce) {
      animation: none;
      filter: none;
      opacity: ${loaded ? 1 : 0};
    }
  `

  const forcedFullMotion =
    reducedMotion === false && loaded
      ? css`
          @media (prefers-reduced-motion: reduce) {
            animation: ${unblurReveal} ${duration}ms ease-out forwards !important;
          }
        `
      : css``

  const forcedNoMotion =
    reducedMotion === true
      ? css`
          animation: none !important;
          filter: none !important;
        `
      : css``

  // Merge all image styles into one to avoid TypeScript `css` prop array issues
  const mergedImageStyles = css`
    ${imageStyles}
    ${forcedFullMotion}
    ${forcedNoMotion}
  `

  const defaultPlaceholder = (
    <div css={placeholderStyles}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--toffee-pulse-highlight, rgba(180,180,180,0.6))"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    </div>
  )

  return (
    <span style={{ display: 'inline-block', ...toneVars, ...style } as React.CSSProperties}>
      {slots?.before}
      <div css={frameStyles} className={className} role="img" aria-label={alt}>
        {/* Placeholder */}
        {!loaded && (slots?.placeholder ?? defaultPlaceholder)}

        {/* Scan-line effect while loading */}
        <div css={scanStyles} aria-hidden="true" />

        {/* The actual image */}
        <img
          {...imgProps}
          src={src}
          alt={alt}
          css={mergedImageStyles}
          onLoad={handleLoad}
          onError={handleError}
          aria-hidden={!loaded}
        />

        {/* Overlay slot */}
        {slots?.overlay?.(state)}
      </div>
      {slots?.after}
    </span>
  )
}
