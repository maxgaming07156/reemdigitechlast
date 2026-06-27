"use client";

import Image, { type ImageProps } from "next/image";

// Keep this in sync with the `hostname` patterns in next.config.js.
// Anything NOT matching one of these is rendered with a plain <img> tag
// instead of next/image, because next/image hard-crashes the whole page
// at request time if it gets fed a URL from a host that isn't allowlisted.
// User-supplied cover image URLs (blog/portfolio) can be anything, so we
// can't guarantee they'll match — this wrapper makes sure that one bad
// URL only loses you a single image instead of the entire page.
const ALLOWED_HOSTNAME_PATTERNS: RegExp[] = [
  /\.supabase\.co$/,
  /(^|\.)unsplash\.com$/,
  /(^|\.)cloudinary\.com$/,
  /(^|\.)imgur\.com$/,
  /(^|\.)googleusercontent\.com$/,
];

function isAllowedHost(src: string): boolean {
  try {
    const { hostname } = new URL(src);
    return ALLOWED_HOSTNAME_PATTERNS.some((pattern) => pattern.test(hostname));
  } catch {
    // Not a parseable absolute URL — could be a local/relative path, which
    // next/image handles fine, so let it through.
    return true;
  }
}

type SafeImageProps = ImageProps;

/**
 * Drop-in replacement for next/image's <Image> that never crashes the page.
 * If `src` is a string pointing at a domain that isn't in next.config.js's
 * remotePatterns, it renders a plain <img> instead of next/image's <Image>.
 * Supports the same `fill` + className pattern used across the site.
 */
export function SafeImage({ src, alt, fill, className, sizes, priority, ...rest }: SafeImageProps) {
  const srcString = typeof src === "string" ? src : null;

  if (srcString && !isAllowedHost(srcString)) {
    // Plain <img> fallback — never throws, just renders (or quietly fails
    // to load) like a normal image tag would.
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={srcString}
        alt={alt}
        className={fill ? `absolute inset-0 h-full w-full ${className ?? ""}` : className}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      {...rest}
    />
  );
}
