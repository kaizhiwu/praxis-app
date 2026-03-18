import type { Place, SearchResult, AttributeType, AttributeCluster } from './types'
import { fetchPlaceBase, fetchPlaceFull, isGoogleEnabled } from '../lib/google-places'

const ATTRIBUTE_META: Record<AttributeType, { label: string; cluster: AttributeCluster }> = {
  outlet_usability: { label: 'Outlet Usability', cluster: 'workability' },
  laptop_tolerance: { label: 'Laptop Tolerance', cluster: 'workability' },
  noise_level: { label: 'Noise Level', cluster: 'workability' },
  restroom_access: { label: 'Restroom Access', cluster: 'relief' },
  purchase_pressure: { label: 'Purchase Pressure', cluster: 'workability' },
  call_friendliness: { label: 'Call Friendliness', cluster: 'workability' },
  seating_reliability: { label: 'Seating Reliability', cluster: 'workability' },
  indoor_waiting: { label: 'Indoor Waiting', cluster: 'relief' },
  water_access: { label: 'Water Access', cluster: 'relief' },
  staff_strictness: { label: 'Staff Strictness', cluster: 'relief' },
  safety: { label: 'Safety', cluster: 'relief' },
  markdown_likelihood: { label: 'Markdown Likelihood', cluster: 'savings' },
  late_food: { label: 'Late Food', cluster: 'savings' },
  budget_value: { label: 'Budget Value', cluster: 'savings' },
  wifi_reliability: { label: 'WiFi Reliability', cluster: 'workability' },
  meeting_friendly: { label: 'Meeting Friendly', cluster: 'workability' },
  pet_friendly: { label: 'Pet Friendly', cluster: 'relief' },
  stroller_access: { label: 'Stroller Access', cluster: 'relief' },
  phone_charging: { label: 'Phone Charging', cluster: 'relief' },
  happy_hour: { label: 'Happy Hour', cluster: 'savings' },
  free_samples: { label: 'Free Samples', cluster: 'savings' },
  byob_allowed: { label: 'BYOB Allowed', cluster: 'savings' },
}

function daysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString()
}

export const places: Place[] = [
  {
    id: '01',
    googlePlaceId: 'ChIJhz8mAp9ZwokRXCe_5sVrn5s',
    name: 'Think Coffee',
    address: '248 Mercer St',
    lat: 40.7291,
    lng: -73.9965,
    neighborhood: 'Greenwich Village',
    distance: '0.3 mi',
    attributes: [
      { type: 'outlet_usability', ...ATTRIBUTE_META.outlet_usability, value: 0.85, confidence: 0.92, lastVerified: daysAgo(1), verificationCount: 47 },
      { type: 'laptop_tolerance', ...ATTRIBUTE_META.laptop_tolerance, value: 0.90, confidence: 0.88, lastVerified: daysAgo(2), verificationCount: 52 },
      { type: 'noise_level', ...ATTRIBUTE_META.noise_level, value: 0.35, confidence: 0.80, lastVerified: daysAgo(3), verificationCount: 38 },
      { type: 'purchase_pressure', ...ATTRIBUTE_META.purchase_pressure, value: 0.25, confidence: 0.85, lastVerified: daysAgo(2), verificationCount: 41 },
      { type: 'restroom_access', ...ATTRIBUTE_META.restroom_access, value: 0.80, confidence: 0.75, lastVerified: daysAgo(5), verificationCount: 29 },
      { type: 'seating_reliability', ...ATTRIBUTE_META.seating_reliability, value: 0.60, confidence: 0.70, lastVerified: daysAgo(4), verificationCount: 33 },
    ],
    contributions: [
      { id: 'c1', userId: 'u1', userName: 'Maya', attributeType: 'outlet_usability', value: true, timestamp: daysAgo(1) },
      { id: 'c2', userId: 'u2', userName: 'Jordan', attributeType: 'laptop_tolerance', value: true, timestamp: daysAgo(2) },
      { id: 'c3', userId: 'u3', userName: 'Alex', attributeType: 'noise_level', value: true, timestamp: daysAgo(3) },
    ],
  },
  {
    id: '02',
    googlePlaceId: 'ChIJH-tBOc1ZwokR1mfwHdHMbUI',
    name: 'Starbucks Reserve Roastery',
    address: '61 9th Ave',
    lat: 40.7425,
    lng: -74.0046,
    neighborhood: 'Chelsea',
    distance: '0.8 mi',
    attributes: [
      { type: 'outlet_usability', ...ATTRIBUTE_META.outlet_usability, value: 0.70, confidence: 0.82, lastVerified: daysAgo(3), verificationCount: 35 },
      { type: 'laptop_tolerance', ...ATTRIBUTE_META.laptop_tolerance, value: 0.65, confidence: 0.78, lastVerified: daysAgo(4), verificationCount: 28 },
      { type: 'noise_level', ...ATTRIBUTE_META.noise_level, value: 0.55, confidence: 0.85, lastVerified: daysAgo(2), verificationCount: 42 },
      { type: 'restroom_access', ...ATTRIBUTE_META.restroom_access, value: 0.95, confidence: 0.93, lastVerified: daysAgo(1), verificationCount: 61 },
      { type: 'indoor_waiting', ...ATTRIBUTE_META.indoor_waiting, value: 0.80, confidence: 0.80, lastVerified: daysAgo(3), verificationCount: 25 },
      { type: 'seating_reliability', ...ATTRIBUTE_META.seating_reliability, value: 0.75, confidence: 0.76, lastVerified: daysAgo(5), verificationCount: 30 },
    ],
    contributions: [
      { id: 'c4', userId: 'u4', userName: 'Sam', attributeType: 'restroom_access', value: true, timestamp: daysAgo(1) },
      { id: 'c5', userId: 'u5', userName: 'Chris', attributeType: 'noise_level', value: false, timestamp: daysAgo(2) },
    ],
  },
  {
    id: '03',
    googlePlaceId: 'ChIJ0wFRACBbwokRm7S8ge7QkP0',
    name: 'Brooklyn Public Library',
    address: '10 Grand Army Plaza',
    lat: 40.6724,
    lng: -73.9682,
    neighborhood: 'Prospect Heights',
    distance: '2.1 mi',
    attributes: [
      { type: 'outlet_usability', ...ATTRIBUTE_META.outlet_usability, value: 0.75, confidence: 0.70, lastVerified: daysAgo(7), verificationCount: 22 },
      { type: 'laptop_tolerance', ...ATTRIBUTE_META.laptop_tolerance, value: 0.95, confidence: 0.95, lastVerified: daysAgo(1), verificationCount: 58 },
      { type: 'noise_level', ...ATTRIBUTE_META.noise_level, value: 0.10, confidence: 0.92, lastVerified: daysAgo(2), verificationCount: 55 },
      { type: 'restroom_access', ...ATTRIBUTE_META.restroom_access, value: 0.90, confidence: 0.88, lastVerified: daysAgo(3), verificationCount: 44 },
      { type: 'water_access', ...ATTRIBUTE_META.water_access, value: 0.85, confidence: 0.80, lastVerified: daysAgo(4), verificationCount: 31 },
      { type: 'call_friendliness', ...ATTRIBUTE_META.call_friendliness, value: 0.20, confidence: 0.85, lastVerified: daysAgo(3), verificationCount: 37 },
    ],
    contributions: [
      { id: 'c6', userId: 'u6', userName: 'Riley', attributeType: 'noise_level', value: true, timestamp: daysAgo(2) },
      { id: 'c7', userId: 'u7', userName: 'Taylor', attributeType: 'laptop_tolerance', value: true, timestamp: daysAgo(1) },
    ],
  },
  {
    id: '04',
    googlePlaceId: 'ChIJgdJfB59ZwokRBXmrG_sUlJQ',
    name: 'Vanessa\'s Dumpling House',
    address: '118A Eldridge St',
    lat: 40.7188,
    lng: -73.9912,
    neighborhood: 'Lower East Side',
    distance: '0.5 mi',
    attributes: [
      { type: 'budget_value', ...ATTRIBUTE_META.budget_value, value: 0.95, confidence: 0.90, lastVerified: daysAgo(1), verificationCount: 48 },
      { type: 'late_food', ...ATTRIBUTE_META.late_food, value: 0.80, confidence: 0.75, lastVerified: daysAgo(4), verificationCount: 27 },
      { type: 'markdown_likelihood', ...ATTRIBUTE_META.markdown_likelihood, value: 0.30, confidence: 0.55, lastVerified: daysAgo(10), verificationCount: 14 },
      { type: 'seating_reliability', ...ATTRIBUTE_META.seating_reliability, value: 0.40, confidence: 0.72, lastVerified: daysAgo(3), verificationCount: 23 },
      { type: 'noise_level', ...ATTRIBUTE_META.noise_level, value: 0.65, confidence: 0.68, lastVerified: daysAgo(6), verificationCount: 19 },
      { type: 'restroom_access', ...ATTRIBUTE_META.restroom_access, value: 0.50, confidence: 0.45, lastVerified: daysAgo(14), verificationCount: 11 },
    ],
    contributions: [
      { id: 'c8', userId: 'u8', userName: 'Jamie', attributeType: 'budget_value', value: true, timestamp: daysAgo(1) },
      { id: 'c9', userId: 'u9', userName: 'Morgan', attributeType: 'late_food', value: true, timestamp: daysAgo(4) },
    ],
  },
  {
    id: '05',
    googlePlaceId: 'ChIJr0cnd39ZwokRVZ7KFCljvNs',
    name: 'Penn Station Amtrak Lounge',
    address: '8th Ave & 31st St',
    lat: 40.7506,
    lng: -73.9935,
    neighborhood: 'Midtown',
    distance: '1.2 mi',
    attributes: [
      { type: 'indoor_waiting', ...ATTRIBUTE_META.indoor_waiting, value: 0.85, confidence: 0.80, lastVerified: daysAgo(2), verificationCount: 34 },
      { type: 'restroom_access', ...ATTRIBUTE_META.restroom_access, value: 0.70, confidence: 0.72, lastVerified: daysAgo(5), verificationCount: 26 },
      { type: 'outlet_usability', ...ATTRIBUTE_META.outlet_usability, value: 0.60, confidence: 0.55, lastVerified: daysAgo(8), verificationCount: 16 },
      { type: 'safety', ...ATTRIBUTE_META.safety, value: 0.65, confidence: 0.68, lastVerified: daysAgo(4), verificationCount: 21 },
      { type: 'noise_level', ...ATTRIBUTE_META.noise_level, value: 0.70, confidence: 0.78, lastVerified: daysAgo(3), verificationCount: 32 },
      { type: 'staff_strictness', ...ATTRIBUTE_META.staff_strictness, value: 0.40, confidence: 0.60, lastVerified: daysAgo(6), verificationCount: 18 },
    ],
    contributions: [
      { id: 'c10', userId: 'u10', userName: 'Casey', attributeType: 'indoor_waiting', value: true, timestamp: daysAgo(2) },
    ],
  },
  {
    id: '06',
    googlePlaceId: 'ChIJb0n2sJdZwokRGnrFpDnFk7k',
    name: 'Whole Foods Market Bowery',
    address: '95 E Houston St',
    lat: 40.7243,
    lng: -73.9916,
    neighborhood: 'East Village',
    distance: '0.4 mi',
    attributes: [
      { type: 'restroom_access', ...ATTRIBUTE_META.restroom_access, value: 0.90, confidence: 0.88, lastVerified: daysAgo(1), verificationCount: 53 },
      { type: 'water_access', ...ATTRIBUTE_META.water_access, value: 0.85, confidence: 0.82, lastVerified: daysAgo(2), verificationCount: 38 },
      { type: 'markdown_likelihood', ...ATTRIBUTE_META.markdown_likelihood, value: 0.75, confidence: 0.78, lastVerified: daysAgo(3), verificationCount: 29 },
      { type: 'indoor_waiting', ...ATTRIBUTE_META.indoor_waiting, value: 0.70, confidence: 0.65, lastVerified: daysAgo(6), verificationCount: 20 },
      { type: 'budget_value', ...ATTRIBUTE_META.budget_value, value: 0.35, confidence: 0.80, lastVerified: daysAgo(2), verificationCount: 36 },
      { type: 'safety', ...ATTRIBUTE_META.safety, value: 0.90, confidence: 0.85, lastVerified: daysAgo(2), verificationCount: 41 },
    ],
    contributions: [
      { id: 'c11', userId: 'u11', userName: 'Drew', attributeType: 'restroom_access', value: true, timestamp: daysAgo(1) },
      { id: 'c12', userId: 'u12', userName: 'Quinn', attributeType: 'markdown_likelihood', value: true, timestamp: daysAgo(3) },
    ],
  },
  {
    id: '07',
    googlePlaceId: 'ChIJWQeM6ppZwokRSfHsDkqh3GY',
    name: "Joe's Pizza",
    address: '7 Carmine St',
    lat: 40.7303,
    lng: -74.0022,
    neighborhood: 'Greenwich Village',
    distance: '0.2 mi',
    attributes: [
      { type: 'budget_value', ...ATTRIBUTE_META.budget_value, value: 0.95, confidence: 0.92, lastVerified: daysAgo(1), verificationCount: 67 },
      { type: 'late_food', ...ATTRIBUTE_META.late_food, value: 0.90, confidence: 0.88, lastVerified: daysAgo(1), verificationCount: 54 },
      { type: 'noise_level', ...ATTRIBUTE_META.noise_level, value: 0.75, confidence: 0.80, lastVerified: daysAgo(2), verificationCount: 39 },
      { type: 'seating_reliability', ...ATTRIBUTE_META.seating_reliability, value: 0.25, confidence: 0.70, lastVerified: daysAgo(3), verificationCount: 28 },
      { type: 'restroom_access', ...ATTRIBUTE_META.restroom_access, value: 0.30, confidence: 0.55, lastVerified: daysAgo(7), verificationCount: 15 },
    ],
    contributions: [
      { id: 'c13', userId: 'u13', userName: 'Nate', attributeType: 'budget_value', value: true, timestamp: daysAgo(1) },
      { id: 'c14', userId: 'u14', userName: 'Lily', attributeType: 'late_food', value: true, timestamp: daysAgo(1) },
    ],
  },
  {
    id: '08',
    googlePlaceId: 'ChIJVVVV0JdZwokRA0sW5goczGQ',
    name: 'The Strand Bookstore',
    address: '828 Broadway',
    lat: 40.7334,
    lng: -73.9909,
    neighborhood: 'Union Square',
    distance: '0.6 mi',
    attributes: [
      { type: 'indoor_waiting', ...ATTRIBUTE_META.indoor_waiting, value: 0.90, confidence: 0.85, lastVerified: daysAgo(2), verificationCount: 40 },
      { type: 'pet_friendly', ...ATTRIBUTE_META.pet_friendly, value: 0.10, confidence: 0.75, lastVerified: daysAgo(5), verificationCount: 22 },
      { type: 'seating_reliability', ...ATTRIBUTE_META.seating_reliability, value: 0.55, confidence: 0.65, lastVerified: daysAgo(4), verificationCount: 18 },
      { type: 'safety', ...ATTRIBUTE_META.safety, value: 0.90, confidence: 0.88, lastVerified: daysAgo(2), verificationCount: 35 },
      { type: 'stroller_access', ...ATTRIBUTE_META.stroller_access, value: 0.45, confidence: 0.60, lastVerified: daysAgo(8), verificationCount: 12 },
      { type: 'restroom_access', ...ATTRIBUTE_META.restroom_access, value: 0.60, confidence: 0.58, lastVerified: daysAgo(10), verificationCount: 14 },
    ],
    contributions: [
      { id: 'c15', userId: 'u15', userName: 'Mia', attributeType: 'indoor_waiting', value: true, timestamp: daysAgo(2) },
      { id: 'c16', userId: 'u16', userName: 'Eli', attributeType: 'safety', value: true, timestamp: daysAgo(2) },
    ],
  },
  {
    id: '09',
    googlePlaceId: 'ChIJn5K3k2VYwokRppLbNT3MUzU',
    name: 'Bryant Park',
    address: 'Between 40th & 42nd St, 5th & 6th Ave',
    lat: 40.7536,
    lng: -73.9832,
    neighborhood: 'Midtown',
    distance: '1.5 mi',
    attributes: [
      { type: 'wifi_reliability', ...ATTRIBUTE_META.wifi_reliability, value: 0.85, confidence: 0.82, lastVerified: daysAgo(1), verificationCount: 56 },
      { type: 'outlet_usability', ...ATTRIBUTE_META.outlet_usability, value: 0.40, confidence: 0.60, lastVerified: daysAgo(5), verificationCount: 20 },
      { type: 'pet_friendly', ...ATTRIBUTE_META.pet_friendly, value: 0.90, confidence: 0.90, lastVerified: daysAgo(1), verificationCount: 48 },
      { type: 'meeting_friendly', ...ATTRIBUTE_META.meeting_friendly, value: 0.70, confidence: 0.72, lastVerified: daysAgo(3), verificationCount: 25 },
      { type: 'seating_reliability', ...ATTRIBUTE_META.seating_reliability, value: 0.80, confidence: 0.85, lastVerified: daysAgo(1), verificationCount: 52 },
      { type: 'restroom_access', ...ATTRIBUTE_META.restroom_access, value: 0.75, confidence: 0.78, lastVerified: daysAgo(2), verificationCount: 38 },
      { type: 'safety', ...ATTRIBUTE_META.safety, value: 0.85, confidence: 0.82, lastVerified: daysAgo(2), verificationCount: 44 },
    ],
    contributions: [
      { id: 'c17', userId: 'u17', userName: 'Sofia', attributeType: 'wifi_reliability', value: true, timestamp: daysAgo(1) },
      { id: 'c18', userId: 'u18', userName: 'Omar', attributeType: 'pet_friendly', value: true, timestamp: daysAgo(1) },
    ],
  },
  {
    id: '10',
    googlePlaceId: 'ChIJGwVKWe5ZwokRcr4b9wuSbDs',
    name: 'Mud Coffee',
    address: '307 E 9th St',
    lat: 40.7291,
    lng: -73.9882,
    neighborhood: 'East Village',
    distance: '0.3 mi',
    attributes: [
      { type: 'outlet_usability', ...ATTRIBUTE_META.outlet_usability, value: 0.80, confidence: 0.85, lastVerified: daysAgo(1), verificationCount: 42 },
      { type: 'laptop_tolerance', ...ATTRIBUTE_META.laptop_tolerance, value: 0.85, confidence: 0.82, lastVerified: daysAgo(2), verificationCount: 38 },
      { type: 'wifi_reliability', ...ATTRIBUTE_META.wifi_reliability, value: 0.75, confidence: 0.78, lastVerified: daysAgo(2), verificationCount: 30 },
      { type: 'noise_level', ...ATTRIBUTE_META.noise_level, value: 0.40, confidence: 0.75, lastVerified: daysAgo(3), verificationCount: 26 },
      { type: 'purchase_pressure', ...ATTRIBUTE_META.purchase_pressure, value: 0.35, confidence: 0.70, lastVerified: daysAgo(4), verificationCount: 22 },
      { type: 'seating_reliability', ...ATTRIBUTE_META.seating_reliability, value: 0.50, confidence: 0.65, lastVerified: daysAgo(5), verificationCount: 19 },
    ],
    contributions: [
      { id: 'c19', userId: 'u19', userName: 'Ava', attributeType: 'outlet_usability', value: true, timestamp: daysAgo(1) },
      { id: 'c20', userId: 'u20', userName: 'Liam', attributeType: 'wifi_reliability', value: true, timestamp: daysAgo(2) },
    ],
  },
  {
    id: '11',
    googlePlaceId: 'ChIJhUmXv2BZwokRGEfgTjqafKs',
    name: 'Grand Central Terminal',
    address: '89 E 42nd St',
    lat: 40.7527,
    lng: -73.9772,
    neighborhood: 'Midtown',
    distance: '1.6 mi',
    attributes: [
      { type: 'indoor_waiting', ...ATTRIBUTE_META.indoor_waiting, value: 0.95, confidence: 0.92, lastVerified: daysAgo(1), verificationCount: 72 },
      { type: 'restroom_access', ...ATTRIBUTE_META.restroom_access, value: 0.85, confidence: 0.88, lastVerified: daysAgo(1), verificationCount: 65 },
      { type: 'phone_charging', ...ATTRIBUTE_META.phone_charging, value: 0.60, confidence: 0.65, lastVerified: daysAgo(4), verificationCount: 24 },
      { type: 'wifi_reliability', ...ATTRIBUTE_META.wifi_reliability, value: 0.65, confidence: 0.70, lastVerified: daysAgo(3), verificationCount: 28 },
      { type: 'safety', ...ATTRIBUTE_META.safety, value: 0.80, confidence: 0.82, lastVerified: daysAgo(2), verificationCount: 48 },
      { type: 'stroller_access', ...ATTRIBUTE_META.stroller_access, value: 0.85, confidence: 0.80, lastVerified: daysAgo(3), verificationCount: 32 },
      { type: 'noise_level', ...ATTRIBUTE_META.noise_level, value: 0.65, confidence: 0.78, lastVerified: daysAgo(2), verificationCount: 40 },
    ],
    contributions: [
      { id: 'c21', userId: 'u21', userName: 'Kai', attributeType: 'indoor_waiting', value: true, timestamp: daysAgo(1) },
      { id: 'c22', userId: 'u22', userName: 'Zara', attributeType: 'phone_charging', value: true, timestamp: daysAgo(4) },
    ],
  },
  {
    id: '12',
    googlePlaceId: 'ChIJK1kP3ZlZwokR3_2DVaqUT4U',
    name: "Trader Joe's Union Square",
    address: '142 E 14th St',
    lat: 40.7336,
    lng: -73.9883,
    neighborhood: 'Union Square',
    distance: '0.5 mi',
    attributes: [
      { type: 'budget_value', ...ATTRIBUTE_META.budget_value, value: 0.90, confidence: 0.90, lastVerified: daysAgo(1), verificationCount: 58 },
      { type: 'free_samples', ...ATTRIBUTE_META.free_samples, value: 0.70, confidence: 0.72, lastVerified: daysAgo(3), verificationCount: 26 },
      { type: 'markdown_likelihood', ...ATTRIBUTE_META.markdown_likelihood, value: 0.50, confidence: 0.60, lastVerified: daysAgo(5), verificationCount: 18 },
      { type: 'stroller_access', ...ATTRIBUTE_META.stroller_access, value: 0.55, confidence: 0.65, lastVerified: daysAgo(4), verificationCount: 20 },
      { type: 'restroom_access', ...ATTRIBUTE_META.restroom_access, value: 0.40, confidence: 0.50, lastVerified: daysAgo(8), verificationCount: 12 },
    ],
    contributions: [
      { id: 'c23', userId: 'u23', userName: 'Ben', attributeType: 'budget_value', value: true, timestamp: daysAgo(1) },
      { id: 'c24', userId: 'u24', userName: 'Iris', attributeType: 'free_samples', value: true, timestamp: daysAgo(3) },
    ],
  },
  {
    id: '13',
    googlePlaceId: 'ChIJxWLy8ZdZwokR8YVYG0aBDhA',
    name: 'Washington Square Park',
    address: 'Washington Square N',
    lat: 40.7308,
    lng: -73.9973,
    neighborhood: 'Greenwich Village',
    distance: '0.2 mi',
    attributes: [
      { type: 'pet_friendly', ...ATTRIBUTE_META.pet_friendly, value: 0.95, confidence: 0.92, lastVerified: daysAgo(1), verificationCount: 62 },
      { type: 'wifi_reliability', ...ATTRIBUTE_META.wifi_reliability, value: 0.55, confidence: 0.60, lastVerified: daysAgo(5), verificationCount: 18 },
      { type: 'seating_reliability', ...ATTRIBUTE_META.seating_reliability, value: 0.85, confidence: 0.88, lastVerified: daysAgo(1), verificationCount: 55 },
      { type: 'safety', ...ATTRIBUTE_META.safety, value: 0.70, confidence: 0.75, lastVerified: daysAgo(2), verificationCount: 38 },
      { type: 'meeting_friendly', ...ATTRIBUTE_META.meeting_friendly, value: 0.50, confidence: 0.55, lastVerified: daysAgo(6), verificationCount: 14 },
      { type: 'byob_allowed', ...ATTRIBUTE_META.byob_allowed, value: 0.80, confidence: 0.70, lastVerified: daysAgo(4), verificationCount: 22 },
    ],
    contributions: [
      { id: 'c25', userId: 'u25', userName: 'Luna', attributeType: 'pet_friendly', value: true, timestamp: daysAgo(1) },
      { id: 'c26', userId: 'u26', userName: 'Max', attributeType: 'seating_reliability', value: true, timestamp: daysAgo(1) },
    ],
  },
  {
    id: '14',
    googlePlaceId: 'ChIJlbPDBJ5ZwokRQDY-6VVw7xQ',
    name: 'McNally Jackson Books',
    address: '52 Prince St',
    lat: 40.7230,
    lng: -73.9949,
    neighborhood: 'Nolita',
    distance: '0.4 mi',
    attributes: [
      { type: 'laptop_tolerance', ...ATTRIBUTE_META.laptop_tolerance, value: 0.70, confidence: 0.72, lastVerified: daysAgo(3), verificationCount: 24 },
      { type: 'noise_level', ...ATTRIBUTE_META.noise_level, value: 0.20, confidence: 0.80, lastVerified: daysAgo(2), verificationCount: 32 },
      { type: 'seating_reliability', ...ATTRIBUTE_META.seating_reliability, value: 0.65, confidence: 0.68, lastVerified: daysAgo(4), verificationCount: 20 },
      { type: 'wifi_reliability', ...ATTRIBUTE_META.wifi_reliability, value: 0.60, confidence: 0.62, lastVerified: daysAgo(5), verificationCount: 16 },
      { type: 'indoor_waiting', ...ATTRIBUTE_META.indoor_waiting, value: 0.80, confidence: 0.78, lastVerified: daysAgo(2), verificationCount: 30 },
      { type: 'safety', ...ATTRIBUTE_META.safety, value: 0.90, confidence: 0.85, lastVerified: daysAgo(2), verificationCount: 36 },
    ],
    contributions: [
      { id: 'c27', userId: 'u27', userName: 'Theo', attributeType: 'noise_level', value: true, timestamp: daysAgo(2) },
      { id: 'c28', userId: 'u28', userName: 'Nina', attributeType: 'laptop_tolerance', value: true, timestamp: daysAgo(3) },
    ],
  },
]

const INTENT_RESULTS: Record<string, SearchResult[]> = {
  'work': [
    { place: places[0], matchScore: 0.94, summary: 'Reliable outlets, low purchase pressure, quiet until 5pm', topAttributes: [places[0].attributes[0], places[0].attributes[1], places[0].attributes[2]] },
    { place: places[2], matchScore: 0.89, summary: 'Near-silent, excellent laptop tolerance, limited outlets', topAttributes: [places[2].attributes[1], places[2].attributes[2], places[2].attributes[0]] },
    { place: places[1], matchScore: 0.72, summary: 'Good outlets, moderate noise, spacious seating', topAttributes: [places[1].attributes[0], places[1].attributes[5], places[1].attributes[2]] },
  ],
  'restroom': [
    { place: places[5], matchScore: 0.92, summary: 'Reliable restrooms, no purchase required, clean and safe', topAttributes: [places[5].attributes[0], places[5].attributes[5], places[5].attributes[1]] },
    { place: places[1], matchScore: 0.88, summary: 'Always accessible restrooms, large space, low hassle', topAttributes: [places[1].attributes[3], places[1].attributes[4], places[1].attributes[5]] },
    { place: places[2], matchScore: 0.82, summary: 'Public restrooms, water fountains, open during library hours', topAttributes: [places[2].attributes[3], places[2].attributes[4], places[2].attributes[1]] },
  ],
  'cheap food': [
    { place: places[3], matchScore: 0.93, summary: '$1 dumplings, open late, cash-friendly', topAttributes: [places[3].attributes[0], places[3].attributes[1], places[3].attributes[3]] },
    { place: places[5], matchScore: 0.76, summary: 'Evening markdowns on prepared food, reliable after 7pm', topAttributes: [places[5].attributes[2], places[5].attributes[4], places[5].attributes[0]] },
  ],
  'wait indoors': [
    { place: places[4], matchScore: 0.87, summary: 'Warm indoor waiting, low staff strictness, some outlets', topAttributes: [places[4].attributes[0], places[4].attributes[5], places[4].attributes[2]] },
    { place: places[1], matchScore: 0.81, summary: 'Large space, comfortable seating, purchase expected', topAttributes: [places[1].attributes[4], places[1].attributes[5], places[1].attributes[3]] },
    { place: places[5], matchScore: 0.74, summary: 'Indoor seating area, safe, water available', topAttributes: [places[5].attributes[3], places[5].attributes[5], places[5].attributes[1]] },
  ],
  'quiet call': [
    { place: places[0], matchScore: 0.80, summary: 'Moderate noise, but corners are quiet enough for calls', topAttributes: [places[0].attributes[2], places[0].attributes[5], places[0].attributes[0]] },
    { place: places[4], matchScore: 0.65, summary: 'Noisy overall, but side corridors work for quick calls', topAttributes: [places[4].attributes[4], places[4].attributes[0], places[4].attributes[3]] },
  ],
  'pet': [
    { place: places[12], matchScore: 0.95, summary: 'Dog run, open park, very pet-welcoming', topAttributes: [places[12].attributes[0], places[12].attributes[2], places[12].attributes[3]] },
    { place: places[8], matchScore: 0.90, summary: 'Open park with seating, dogs welcome, free WiFi', topAttributes: [places[8].attributes[2], places[8].attributes[4], places[8].attributes[0]] },
    { place: places[7], matchScore: 0.45, summary: 'Generally no pets inside, but outdoor seating may work', topAttributes: [places[7].attributes[1], places[7].attributes[0], places[7].attributes[3]] },
  ],
  'study': [
    { place: places[2], matchScore: 0.94, summary: 'Library — silent, great laptop tolerance, free WiFi', topAttributes: [places[2].attributes[1], places[2].attributes[2], places[2].attributes[0]] },
    { place: places[13], matchScore: 0.88, summary: 'Quiet bookstore cafe, good for focused study', topAttributes: [places[13].attributes[1], places[13].attributes[0], places[13].attributes[3]] },
    { place: places[9], matchScore: 0.82, summary: 'Calm cafe, reliable WiFi, outlets available', topAttributes: [places[9].attributes[2], places[9].attributes[0], places[9].attributes[1]] },
    { place: places[0], matchScore: 0.78, summary: 'Popular work cafe, outlets and WiFi, some noise', topAttributes: [places[0].attributes[0], places[0].attributes[1], places[0].attributes[2]] },
  ],
  'happy hour': [
    { place: places[6], matchScore: 0.93, summary: 'Dollar slices any time, unbeatable budget value', topAttributes: [places[6].attributes[0], places[6].attributes[1], places[6].attributes[2]] },
    { place: places[3], matchScore: 0.88, summary: '$1 dumplings, open late, cash-friendly', topAttributes: [places[3].attributes[0], places[3].attributes[1], places[3].attributes[3]] },
    { place: places[11], matchScore: 0.72, summary: 'Good prices, occasional free samples', topAttributes: [places[11].attributes[0], places[11].attributes[1], places[11].attributes[2]] },
  ],
}

export function searchByIntent(query: string): SearchResult[] {
  const q = query.toLowerCase()
  if (q.includes('study') || q.includes('library')) return INTENT_RESULTS['study']
  if (q.includes('pet') || q.includes('dog')) return INTENT_RESULTS['pet']
  if (q.includes('happy hour') || q.includes('drink special') || q.includes('cheap drink')) return INTENT_RESULTS['happy hour']
  if (q.includes('work') || q.includes('outlet') || q.includes('laptop')) return INTENT_RESULTS['work']
  if (q.includes('restroom') || q.includes('bathroom')) return INTENT_RESULTS['restroom']
  if (q.includes('cheap') || q.includes('food') || q.includes('eat') || q.includes('markdown')) return INTENT_RESULTS['cheap food']
  if (q.includes('wait') || q.includes('indoor') || q.includes('shelter')) return INTENT_RESULTS['wait indoors']
  if (q.includes('call') || q.includes('quiet') || q.includes('phone')) return INTENT_RESULTS['quiet call']
  // Default: return work results
  return INTENT_RESULTS['work']
}

export function getPlaceById(id: string): Place | undefined {
  return places.find(p => p.id === id || p.googlePlaceId === id)
}

/**
 * Enrich a place with live Google base data (rating, hours, photo, etc.).
 * No-op if API key is not set or place has no googlePlaceId.
 */
export async function enrichWithGoogle(place: Place): Promise<Place> {
  if (!place.googlePlaceId || !isGoogleEnabled()) return place
  const base = await fetchPlaceBase(place.googlePlaceId)
  if (!base) return place
  return { ...place, google: base }
}

/**
 * Look up a place by ID, including Google API fetch for unknown places.
 * Returns enriched place if found locally, or creates a new stub from Google.
 */
export async function getPlaceByIdAsync(id: string): Promise<Place | null> {
  // Check local places first
  const local = places.find(p => p.id === id || p.googlePlaceId === id)
  if (local) {
    return enrichWithGoogle(local)
  }

  // If it looks like a Google Place ID and API is enabled, fetch from Google
  if (isGoogleEnabled() && id.startsWith('ChIJ')) {
    const full = await fetchPlaceFull(id)
    if (!full) return null

    const newPlace: Place = {
      id: id,
      googlePlaceId: id,
      name: full.name,
      address: full.address,
      lat: full.lat,
      lng: full.lng,
      neighborhood: '',
      distance: '',
      attributes: [],
      contributions: [],
      google: full.google,
    }
    return newPlace
  }

  return null
}

export function getTimeContextChips(): { label: string; query: string }[] {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) {
    return [
      { label: 'Quiet work spot', query: 'quiet place to work with outlets' },
      { label: 'Study spot', query: 'quiet study spot with wifi' },
      { label: 'Dog-friendly park', query: 'pet friendly park nearby' },
      { label: 'Restroom nearby', query: 'reliable restroom nearby' },
    ]
  }
  if (hour >= 12 && hour < 17) {
    return [
      { label: 'Recharge spot', query: 'quiet place to recharge and work' },
      { label: 'Cheap lunch', query: 'cheap food nearby' },
      { label: 'Study cafe', query: 'quiet study cafe with wifi' },
      { label: 'Restroom nearby', query: 'reliable restroom nearby' },
    ]
  }
  if (hour >= 17 && hour < 21) {
    return [
      { label: 'Late food deals', query: 'cheap food late evening' },
      { label: 'Happy hour', query: 'happy hour cheap drinks' },
      { label: 'Indoor waiting', query: 'wait indoors nearby' },
      { label: 'Quiet call spot', query: 'quiet place for a call' },
    ]
  }
  return [
    { label: 'Open restroom', query: 'reliable restroom nearby' },
    { label: 'Safe place to wait', query: 'safe indoor waiting late' },
    { label: 'Late food', query: 'cheap food open late' },
    { label: 'Phone charging', query: 'place to charge phone' },
  ]
}
