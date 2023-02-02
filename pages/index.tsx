import Header from '../components/Header';
import Contact from '../components/Contact';
import Hero from '../components/Hero';
import FeaturedContent from '../components/FeaturedContent';
import Footer from '../components/Footer';

export default function Homepage() {
  return (
    <>
      <div>
        <Header />
        <Hero />
        <Contact />
        <FeaturedContent />
        <Footer />
      </div>
    </>
  );
}
