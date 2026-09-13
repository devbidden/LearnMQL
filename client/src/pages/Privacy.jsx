import Seo from '../components/seo/Seo'
import Breadcrumbs from '../components/seo/Breadcrumbs'
import { PAGE_SEO } from '../seo/pages'

export default function Privacy() {
  return (
    <section className="py-16 lg:py-20">
      <Seo title={PAGE_SEO.privacy.title} description={PAGE_SEO.privacy.description} path={PAGE_SEO.privacy.path} />
      <article className="mx-auto max-w-3xl px-5 lg:px-8">
        <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Privacy policy', path: '/privacy' }]} />
        <p className="eyebrow mt-6">Legal</p>
        <h1 className="display-title mt-4 text-4xl font-bold text-fg sm:text-5xl">Privacy policy</h1>
        <p className="mt-5 text-sm text-muted">Last updated: September 13, 2026</p>

        <div className="mt-10 space-y-8 text-base leading-7 text-muted">
          <section><h2 className="text-xl font-semibold text-fg">Information we collect</h2><p className="mt-3">We collect account information you provide, including your name and email address. We also store course enrollment and learning-progress information so we can provide your account and course access.</p></section>
          <section><h2 className="text-xl font-semibold text-fg">How we use information</h2><p className="mt-3">We use your information to operate the platform, authenticate your account, process enrollment, communicate about your account, and improve our courses and services.</p></section>
          <section><h2 className="text-xl font-semibold text-fg">Payments and service providers</h2><p className="mt-3">Payments and media hosting may be handled by specialist third-party providers. Their handling of personal data is governed by their own privacy notices. We do not store full payment-card details on learnmql.</p></section>
          <section><h2 className="text-xl font-semibold text-fg">Data retention and security</h2><p className="mt-3">We retain account information for as long as needed to provide the service and meet legal obligations. We use reasonable safeguards, but no internet service can guarantee absolute security.</p></section>
          <section><h2 className="text-xl font-semibold text-fg">Your choices</h2><p className="mt-3">You may request access, correction, or deletion of your account information by contacting us. Some information may need to be retained where required by law or to prevent fraud.</p></section>
          <section><h2 className="text-xl font-semibold text-fg">Contact</h2><p className="mt-3">For privacy questions, email <a className="text-[#00d181] hover:underline" href="mailto:hello@learnmql.com">hello@learnmql.com</a>.</p></section>
        </div>
      </article>
    </section>
  )
}
