# Praxis — UI/UX Design Spec

## Overview

Praxis is an intent-native place intelligence platform. It answers situational questions about physical places using a trust-weighted behavioral utility graph. The product differentiates from maps and review apps by resolving user intent directly rather than listing merchants.

**Positioning:** Maps tell you what a place is; Praxis tells you what it will actually let you do.

**Platform:** Mobile web (responsive), React + TypeScript + Vite + Tailwind CSS
**City:** New York (mock data anchor)
**Fidelity:** High — investor/early-user demo quality

---

## Information Architecture

### 5 Core Screens

1. **Home / Query** — Entry point. Large query bar with cycling placeholder intents. Smart intent chips below, contextual by time of day. Recent queries. Neighborhood context.

2. **Results** — Ranked answer cards. Each card: place name, distance, neighborhood, one-line intent-match summary, top 3 behavioral attribute indicators with visual confidence. No star ratings. No generic reviews.

3. **Place Detail** — Full behavioral profile. Attributes grouped by cluster (workability, relief, savings). Each attribute is a bar indicator with visual confidence decay and recency tag. "What people confirm" section. Sticky "Been here?" CTA.

4. **Contribute** — Bottom sheet from place detail. 3-5 binary questions (Yes/No/Not sure) for tracked attributes. Optional "Add more" expansion. Submit → micro-animation → dismiss.

5. **Map View** — Toggle from results. Teal dots sized by confidence density. Tap dot → mini card → tap card → detail. Not the default view.

### Navigation

No persistent tab bar. Linear intent-driven flow: Home → Results → Detail → Contribute. Map is a toggle on results. Back gesture returns up the stack. Logo tap returns home.

---

## Visual Design Language

### Palette

| Token | Value | Usage |
|-------|-------|-------|
| `bg-primary` | `#0A0A0B` | Background with subtle grain |
| `surface` | `#161618` | Cards, sheets |
| `surface-border` | `#1E1E22` | Card borders |
| `text-primary` | `#E8E4DE` | Headlines, key info |
| `text-secondary` | `#7A7A7D` | Supporting text |
| `confidence-high` | `#C4BEB4` | Solid, present attributes |
| `confidence-fade` | `#3A3A3C` | Uncertain, stale attributes |
| `accent` | `#5B8F8F` | Interactive elements, chips, CTAs |

### Typography

- Headings: Inter / SF Pro Display, semibold, generous sizing
- Body: Inter, regular, 14-16px
- Attribute labels: small caps or monospaced for structured data feel
- Hierarchy via size + opacity, not color

### Visual Confidence System

The core design innovation. Attributes render as horizontal bar indicators where visual treatment communicates data quality:

- **High confidence + recent:** full opacity, solid fill, crisp edges
- **Medium confidence:** reduced opacity, softer edges
- **Low confidence / stale:** near-transparent, dashed or dotted, subtle pulse inviting contribution
- Recency label below attribute in secondary text ("3d ago", "2w ago")

Truth looks solid. Uncertainty looks fragile.

### Motion

- Framer Motion throughout, all transitions < 300ms, ease-out
- Cards: staggered fade-up on mount
- Confidence bars: animate fill from left on mount
- Contribute sheet: spring physics slide-up
- Map toggle: smooth height/opacity crossfade

### Texture

- Subtle grain overlay on backgrounds
- Frosted glass on contribute sheet and map overlay
- Soft ambient glow for elevation — no hard drop shadows

---

## Component Breakdown

### Query Bar
- Frosted glass surface, rounded, centered on home
- Text input + mic icon (future voice)
- On focus: slight expansion, intent chips animate below
- Placeholder cycles through example intents with typewriter effect

### Intent Chips
- Horizontally scrollable pill row
- Muted teal outline
- Tap pre-fills query and triggers results
- Time-contextual: "Late food" appears after 8pm, "Quiet work spot" in morning

### Result Card
- Dark surface card with subtle border
- Place name (warm white, semibold) + distance + neighborhood
- One-line intent-match summary in secondary text
- 3 most relevant attribute indicators with visual confidence
- No images, no star ratings — data-forward
- Full card tappable → place detail

### Attribute Indicator
- The atomic unit of the product
- Label (small caps) + horizontal bar fill + recency tag
- Bar fill opacity/solidity = confidence level
- Stale attributes pulse gently — implicit "can you confirm?"

### Place Detail Sheet
- Full-screen push from results
- Hero: place name, address, distance — no photo
- Attribute groups: Workability / Relief / Savings sections
- Each attribute is full-width indicator, more detail on tap
- "What people confirm" — recent contributions as timestamped pills
- Sticky bottom: "Been here?" CTA

### Contribute Bottom Sheet
- Frosted glass, spring slide-up
- 3-5 binary rows: label + Yes / No / Not sure buttons
- "Add more" expands to additional attributes
- Submit → thank you animation → dismiss

### Map Toggle
- Small pill button on results: "Map"
- Crossfades list into map view
- Teal dots sized by confidence density
- Tap dot → floating mini card → tap → detail

---

## Screen Flows

### Flow 1: Primary Query
```
Home → type/tap intent → Results → tap card → Place Detail → "Been here?" → Contribute → submit → back to Detail
```

### Flow 2: Time-Contextual Entry
Home adapts chip suggestions by time of day:
- Morning: "Quiet work spot", "Coffee with outlets"
- Afternoon: "Recharge spot", "Cheap lunch"
- Evening: "Late food deals", "Indoor waiting"
- Late night: "Open restroom", "Safe place to wait"

### Flow 3: Stale Data Invitation
- User views place with low-confidence attributes
- Faded attributes pulse subtly
- "Been here?" CTA highlights brighter
- Contributing fills the attribute bar in real-time — immediate feedback

### Flow 4: Empty State / Low Density
- Few or no results: "Praxis doesn't know enough about this area yet. Be the first to add a place."
- No fake results. Honesty builds trust.
- Add-a-place: name + address + 3 quick attributes

### Flow 5: Map Detour
```
Results → "Map" toggle → map pins → tap pin → mini card → tap → Detail → back → map
```

### Edge Cases
- No location permission: neighborhood picker, don't block
- Vague query: top confidence places + nudge to be specific
- Contradictory data: mid-value, low confidence, "conflicting reports" label

---

## Conceptual Backend Architecture

Architecture-level only — informs mock data structure.

### Four Layers

**Layer 1: Behavioral Place Graph (Data)**
- Places: name, address, coordinates, neighborhood
- Attributes: type (enum), value (0-1), confidence (0-1, computed), last_verified, verification_count
- Contributions: attribute_type, place_id, user_id, value, timestamp

**Layer 2: Truth Engine (Computation)**
- Recency decay: exponential, ~14 day half-life
- Contributor trust weight: reputation based on agreement rate
- Confidence scoring: f(verification_count, recency, contributor_weights, contradiction_rate)
- Contradiction handling: confidence drops, UI invites contribution

**Layer 3: Query Layer (Intent Resolution)**
- Natural language → parsed intent → attribute filter set
- Example: "work for 2 hours with outlets" → `{outlet_usability: >0.7, laptop_tolerance: >0.6, noise_level: <0.5}`
- LLM-powered parsing, graph-sourced results
- Sparse data: say so honestly

**Layer 4: Answer Layer (Ranking & Presentation)**
- Rank by: intent-attribute match × confidence × proximity
- LLM-generated one-line intent-match summaries
- Response includes per-attribute confidence for visual decay rendering

### Data Model

```
Place       { id, name, address, lat, lng, neighborhood }
Attribute   { place_id, type, value, confidence, last_verified, verification_count }
Contribution { id, place_id, user_id, attribute_type, value, timestamp }
Intent      { raw_query, parsed_filters[], radius, time_context }
Result      { place, match_score, summary, attributes[] }
```

### Tech Stack (Future)

| Layer | Technology |
|-------|-----------|
| API | Go |
| Database | PostgreSQL + PostGIS |
| Intent parsing | Claude API |
| Frontend | React + TypeScript + Vite + Tailwind |
| Animation | Framer Motion |
| Deploy | Vercel (frontend), Railway (backend) |

---

## Success Criteria

- [ ] Home screen immediately communicates "this is not a map app"
- [ ] Query → results flow feels faster and more direct than Google Maps
- [ ] Visual confidence system is intuitive without explanation
- [ ] Contribute flow takes < 5 seconds for 3 confirmations
- [ ] Empty states feel honest, not broken
- [ ] Overall aesthetic: dark, calm, premium, Apple-level
