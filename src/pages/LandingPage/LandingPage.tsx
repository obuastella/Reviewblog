import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import WhyChooseUs from "./components/whyChooseUs";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <Footer />
    </>
  );
}
