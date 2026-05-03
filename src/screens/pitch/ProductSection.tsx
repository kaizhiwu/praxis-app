import { PITCH } from '../../data/pitch'
import { Section, TextLockup } from '../../components/Section'
import { TabbedFeature, type TabbedFeatureTab } from '../../components/TabbedFeature'
import {
  GraphMockup,
  TruthMockup,
  IntentMockup,
  AnswerMockup,
} from '../../components/ProductGraphics'

const TAB_LABELS = ['Graph', 'Truth', 'Intent', 'Answer'] as const

const TAB_MEDIA = [
  <GraphMockup />,
  <TruthMockup />,
  <IntentMockup />,
  <AnswerMockup />,
]

export function ProductSection() {
  const tabs: TabbedFeatureTab[] = PITCH.product.layers.map((layer, i) => ({
    id: `layer-${i}`,
    label: TAB_LABELS[i],
    title: layer.name,
    description: layer.description,
    detail: layer.detail,
    media: TAB_MEDIA[i],
  }))

  return (
    <Section id="product" tone="bone">
      <TextLockup
        eyebrow="The product"
        title={PITCH.product.title}
        sub={PITCH.product.sub}
        size="lg"
        maxProse="max-w-2xl"
      />
      <TabbedFeature tabs={tabs} />

      {/* Bottom callout */}
      <div className="border-l-2 border-[var(--color-accent-indigo)] pl-6 mt-20 lg:mt-28">
        <p className="text-[var(--color-ink)] font-medium">
          Answers, not listings.
        </p>
      </div>
    </Section>
  )
}
