import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";

function ContactUs() {
  return (
    <>
      <Navbar />
      <HeroSection
        heading={"Let’s Connect – We’re Here to Help!"}
        text={
          "Have a question, suggestion, or just want to say hello? Reach out to us anytime. "
        }
        btnText={"Send Us A Message"}
      />
      <ContactForm />
      <Footer />
    </>
  );
}

export default ContactUs;
