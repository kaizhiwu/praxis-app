export type AttributeType =
  | 'outlet_usability'
  | 'laptop_tolerance'
  | 'noise_level'
  | 'restroom_access'
  | 'purchase_pressure'
  | 'call_friendliness'
  | 'seating_reliability'
  | 'indoor_waiting'
  | 'water_access'
  | 'staff_strictness'
  | 'safety'
  | 'markdown_likelihood'
  | 'late_food'
  | 'budget_value'
  | 'wifi_reliability'
  | 'meeting_friendly'
  | 'pet_friendly'
  | 'stroller_access'
  | 'phone_charging'
  | 'happy_hour'
  | 'free_samples'
  | 'byob_allowed'

export type AttributeCluster = 'workability' | 'relief' | 'savings'

export interface PlaceAttribute {
  type: AttributeType
  label: string
  value: number // 0-1
  confidence: number // 0-1
  lastVerified: string // ISO date
  verificationCount: number
  cluster: AttributeCluster
}

export interface Contribution {
  id: string
  userId: string
  userName: string
  attributeType: AttributeType
  value: boolean
  timestamp: string
}

export interface GooglePlaceBase {
  rating?: number
  userRatingCount?: number
  openNow?: boolean
  weekdayHours?: string[]
  photoUri?: string
  googleMapsUri?: string
  types?: string[]
}

export interface Place {
  id: string
  googlePlaceId?: string
  name: string
  address: string
  lat: number
  lng: number
  neighborhood: string
  distance: string
  attributes: PlaceAttribute[]
  contributions: Contribution[]
  google?: GooglePlaceBase
}

export interface SearchResult {
  place: Place
  matchScore: number
  summary: string
  topAttributes: PlaceAttribute[]
}
