import Header from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'


// import HowItWorks from '../components/HowItWorks'
// import Testimonials from '../components/Testimonials'
// import FAQ from '../components/FAQ'
// import CTA from '../components/CTA'
// import Footer from '../components/Footer'
// import ImageShowcase from '../components/ImageShowcase'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pb-20">
      <Header />
      <Hero />
      <Features />
      {/* <HowItWorks />
      <ImageShowcase />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer /> */}
    </main>
  );
}
