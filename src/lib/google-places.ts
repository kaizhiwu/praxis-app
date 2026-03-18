import type { GooglePlaceBase } from '../data/types'

const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY as string | undefined

// Module-level cache with 10-min TTL
const cache = new Map<string, { data: GooglePlaceBase; ts: number }>()
const CACHE_TTL = 10 * 60 * 1000

export function isGoogleEnabled(): boolean {
  return Boolean(API_KEY)
}

/**
 * Fetch base place info from Google Places API (New).
 * Returns cached result if fresh enough.
 */
export async function fetchPlaceBase(placeId: string): Promise<GooglePlaceBase | null> {
  if (!API_KEY) return null

  const cached = cache.get(placeId)
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return cached.data
  }

  const fieldMask = [
    'displayName',
    'formattedAddress',
    'location',
    'rating',
    'userRatingCount',
    'currentOpeningHours',
    'photos',
    'googleMapsUri',
    'types',
  ].join(',')

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?key=${API_KEY}`,
      {
        headers: {
          'X-Goog-FieldMask': fieldMask,
        },
      },
    )

    if (!res.ok) {
      console.warn(`Google Places API error: ${res.status}`)
      return null
    }

    const data = await res.json()

    const base: GooglePlaceBase = {
      rating: data.rating,
      userRatingCount: data.userRatingCount,
      openNow: data.currentOpeningHours?.openNow,
      weekdayHours: data.currentOpeningHours?.weekdayDescriptions,
      googleMapsUri: data.googleMapsUri,
      types: data.types,
    }

    // Extract first photo if available
    if (data.photos?.length > 0) {
      const photoName = data.photos[0].name
      base.photoUri = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=400&key=${API_KEY}`
    }

    cache.set(placeId, { data: base, ts: Date.now() })
    return base
  } catch (err) {
    console.warn('Google Places fetch failed:', err)
    return null
  }
}

/**
 * Fetch minimal place info from a Google Place ID (for new places added via URL).
 * Returns name, address, lat/lng alongside the base info.
 */
export async function fetchPlaceFull(placeId: string): Promise<{
  name: string
  address: string
  lat: number
  lng: number
  google: GooglePlaceBase
} | null> {
  if (!API_KEY) return null

  const fieldMask = [
    'displayName',
    'formattedAddress',
    'location',
    'rating',
    'userRatingCount',
    'currentOpeningHours',
    'photos',
    'googleMapsUri',
    'types',
  ].join(',')

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?key=${API_KEY}`,
      {
        headers: {
          'X-Goog-FieldMask': fieldMask,
        },
      },
    )

    if (!res.ok) return null
    const data = await res.json()

    const google: GooglePlaceBase = {
      rating: data.rating,
      userRatingCount: data.userRatingCount,
      openNow: data.currentOpeningHours?.openNow,
      weekdayHours: data.currentOpeningHours?.weekdayDescriptions,
      googleMapsUri: data.googleMapsUri,
      types: data.types,
    }

    if (data.photos?.length > 0) {
      const photoName = data.photos[0].name
      google.photoUri = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=400&key=${API_KEY}`
    }

    // Cache the base for detail page
    cache.set(placeId, { data: google, ts: Date.now() })

    return {
      name: data.displayName?.text ?? 'Unknown place',
      address: data.formattedAddress ?? '',
      lat: data.location?.latitude ?? 0,
      lng: data.location?.longitude ?? 0,
      google,
    }
  } catch {
    return null
  }
}

/**
 * Extract a Google Place ID from various Google Maps URL formats.
 * Supports:
 *   - https://maps.google.com/?cid=... (CID format — not a place ID, returns null)
 *   - https://www.google.com/maps/place/.../@.../data=!...!s0x...:0x...
 *   - https://maps.app.goo.gl/... (short links — would need a redirect follow, returns null)
 *   - Direct place ID strings like "ChIJ..."
 */
export function extractPlaceId(input: string): string | null {
  const trimmed = input.trim()

  // Direct place ID (starts with ChIJ)
  if (/^ChIJ[\w-]+$/.test(trimmed)) {
    return trimmed
  }

  // Google Maps URL with place_id param
  try {
    const url = new URL(trimmed)
    const placeId = url.searchParams.get('place_id')
    if (placeId) return placeId
  } catch {
    // Not a URL
  }

  // Google Maps URL with /place/ path — extract from the data param
  // Format: ...data=!3m1!4b1!4m5!3m4!1s<placeId>!...
  const placeIdMatch = trimmed.match(/!1s(ChIJ[\w-]+)/)
  if (placeIdMatch) return placeIdMatch[1]

  // Fallback: look for ChIJ anywhere in the string
  const chijMatch = trimmed.match(/(ChIJ[\w-]+)/)
  if (chijMatch) return chijMatch[1]

  return null
}
