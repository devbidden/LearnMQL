import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Seo from '../components/seo/Seo'
import Breadcrumbs from '../components/seo/Breadcrumbs'
import { PAGE_SEO } from '../seo/pages'

const questions = [
  {
    question: 'What is MQL5?',
    answer: 'MQL5 is the programming language used to create Expert Advisors, indicators, scripts, and trading tools for MetaTrader 5. It helps traders automate rules and analyse markets.',
  },
  {
    question: 'Do I need programming experience to learn MQL5?',
    answer: 'No. The courses are designed to build from the fundamentals, while still giving experienced programmers practical MetaTrader development patterns to use.',
  },
  {
    question: 'What can I build after learning MQL4 or MQL5?',
    answer: 'You can build Expert Advisors, custom indicators, trade-management scripts, strategy-testing tools, and other automated trading systems for MetaTrader.',
  },
  {
    question: 'Are the courses suitable for MetaTrader 4 and MetaTrader 5?',
    answer: 'learnmql covers both MQL4 for MetaTrader 4 and MQL5 for MetaTrader 5. Check each course description for the platform and prerequisites.',
  },
  {
    question: 'Do I get access immediately after enrolling?',
    answer: 'Yes. After successful enrollment, the course becomes available in your dashboard so you can start learning at your own pace.',
  },
  {
    question: 'Does learning MQL5 guarantee trading profits?',
    answer: 'No. Programming education and automated trading tools do not guarantee investment performance. Test strategies carefully and manage risk before using any system with real funds.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: questions.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="py-16 lg:py-20">
      <Seo
        title={PAGE_SEO.faq.title}
        description={PAGE_SEO.faq.description}
        path={PAGE_SEO.faq.path}
        jsonLd={faqJsonLd}
      />
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Frequently asked questions', path: '/faq' }]} />
        <p className="eyebrow mt-6">Help centre</p>
        <h1 className="display-title mt-4 text-4xl font-bold text-fg sm:text-5xl">MQL4 &amp; MQL5 course FAQs</h1>
        <p className="mt-5 text-base leading-7 text-muted">Answers to common questions about learning MetaTrader programming and building Expert Advisors.</p>

        <div className="mt-10 divide-y divide-line rounded-2xl border border-line bg-card">
          {questions.map(({ question, answer }, index) => {
            const expanded = open === index
            return (
              <article key={question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left text-base font-semibold text-fg"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? -1 : index)}
                >
                  {question}
                  <ChevronDown className={`h-5 w-5 shrink-0 text-[#00d181] transition ${expanded ? 'rotate-180' : ''}`} />
                </button>
                {expanded && <p className="px-5 pb-5 leading-7 text-muted">{answer}</p>}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
