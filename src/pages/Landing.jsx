import Nav from '../components/landing/Nav'
import Hero from '../components/landing/Hero'
import FamilyVoices from '../components/landing/FamilyVoices'
import SmartInputs from '../components/landing/SmartInputs'
import RelationshipLayers from '../components/landing/RelationshipLayers'
import Integrations from '../components/landing/Integrations'
import CTAFooter from '../components/landing/CTAFooter'

export default function Landing() {
  return (
    <div className="min-h-screen bg-night-950 text-slate-200">
      <Nav />
      <Hero />
      <FamilyVoices />
      <SmartInputs />
      <RelationshipLayers />
      <Integrations />
      <CTAFooter />
    </div>
  )
}
