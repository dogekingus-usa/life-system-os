# OG Images Directory

## Status: OG Tags ADDED — PNG Files NEEDED

All article pages now include Open Graph meta tags that reference:
`https://[DOMAIN]/og-images/default-og.png`

**But the actual PNG file (`default-og.png`) does not exist yet** — it must be created.

## Required File
- `default-og.png` (1200×630px) — Default social share image for ALL articles

## Image Specifications
- Dimensions: **1200 × 630 pixels** (absolute minimum for Facebook/LinkedIn)
- Format: **PNG**
- Max file size: **1MB**
- Design: Should include site name/logo + a clean, branded background

## What's Been Done (June 3, 2026)
✅ All 319 article HTML files across 4 sites now include:
- `og:image` → `https://[DOMAIN]/og-images/default-og.png`
- `og:image:width` → `1200`
- `og:image:height` → `630`
- `og:title` → extracted from article `<title>` tag
- `og:description` → extracted from `<meta name="description">`
- `og:type` → `article`
- `twitter:card` → `summary_large_image`
- `twitter:image` → same as og:image

## Next Action Required
Generate `default-og.png` for each site and upload to this directory:
1. **Canva** (https://canva.com) — Free templates available
2. **CloudConvert** — For PNG optimization
3. **Vercel OG Image Generation** — For dynamic generation

## Site-specific URLs
| Site | OG Image URL |
|------|-------------|
| LifeSystemOS | https://lifesystemos.com/og-images/default-og.png |
| RemoteWorkHub | https://remoteworkhub.net/og-images/default-og.png |
| ResumeProTips | https://resumeprotips.com/og-images/default-og.png |
| ZeroBudgeting | https://zerobudgeting.com/og-images/default-og.png |
