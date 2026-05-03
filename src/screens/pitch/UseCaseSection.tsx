import { PITCH } from '../../data/pitch'
import { Section, TextLockup } from '../../components/Section'
import { UseCaseRows, type UseCaseRowItem } from '../../components/UseCaseRows'
import { NeighborhoodMap, type MapPin } from '../../components/NeighborhoodMap'

// Distribution of the 8 categories across an abstract NYC neighborhood map.
// Order matches PITCH.queryShowcase.categories: Work / Photo / Dating /
// Solo / Parenting / Vibe / Food / Seasonal.
const PIN_POSITIONS: { x: number; y: number; label: string }[] = [
  { x: 11, y: 35, label: 'Work' },
  { x: 24, y: 62, label: 'Photo' },
  { x: 36, y: 30, label: 'Date' },
  { x: 48, y: 58, label: 'Solo' },
  { x: 60, y: 32, label: 'Parents' },
  { x: 72, y: 60, label: 'Vibe' },
  { x: 84, y: 30, label: 'Food' },
  { x: 93, y: 62, label: 'Seasonal' },
]

export function UseCaseSection() {
  const { categories, title, sub } = PITCH.queryShowcase

  const items: UseCaseRowItem[] = categories.map((c, i) => ({
    id: `usecase-${i}`,
    icon: c.icon,
    name: c.name,
    description: c.description,
    examples: c.queries.slice(0, 2),
  }))

  const pins: MapPin[] = categories.map((c, i) => ({
    icon: c.icon,
    label: PIN_POSITIONS[i]?.label ?? c.name.split(' ')[0],
    x: PIN_POSITIONS[i]?.x ?? 50,
    y: PIN_POSITIONS[i]?.y ?? 50,
  }))

  const totalQueries = categories.reduce((sum, c) => sum + c.queries.length, 0)

  return (
    <Section id="use-cases" tone="taupe">
      <TextLockup
        eyebrow="What you can ask"
        title={title}
        sub={sub}
        size="lg"
        maxProse="max-w-2xl"
      />

      {/* Neighborhood map anchor — visualizes the breadth of categories
          across an abstract street grid before the rows enumerate them. */}
      <div className="mt-12">
        <NeighborhoodMap pins={pins} />
      </div>

      <UseCaseRows items={items} />

      <p className="mono-label mt-10">
        {categories.length} categories &middot; {totalQueries} queries &middot; all answerable from structured observation
      </p>
    </Section>
  )
}
