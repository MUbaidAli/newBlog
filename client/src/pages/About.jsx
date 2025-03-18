import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryExplorer from "../components/CategoriesExplorer";
import BorderImage from "../components/BorderImage";
import MissionSection from "../components/MissionSection";
import SubscriptionSection from "../components/SubscriptionSection";
import HrLine from "../components/HrLine";
import AboutSection from "../components/AboutSection";
function About() {
  return (
    <>
      <Navbar />
      <HeroSection
        heading={"Empowering Your Journey to a Healthier Life”"}
        text={
          "“Wellness Insight is your trusted source for expert-backed health, fitness, and nutrition tips.”"
        }
        btnText={"Explore Out Blog"}
      />
      <MissionSection />
      <HrLine width={4} />
      <AboutSection />
      <HrLine width={4} />
      <CategoryExplorer />

      <HrLine width={4} />
      <SubscriptionSection />
      <HrLine width={"4"} />
      <Footer />
    </>
  );
}

export default About;
