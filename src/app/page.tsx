import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedUnits from "@/components/home/FeaturedUnits";
import Facilities from "@/components/home/Facilities";
import Gallery from "@/components/home/Gallery";
import Location from "@/components/home/Location";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import ContactCTA from "@/components/home/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <FeaturedUnits />
      <Facilities />
      <Gallery />
      <Location />
      <Testimonials />
      <FAQ />
      <ContactCTA />
    </>
  );
}
