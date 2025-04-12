import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryExplorer from "../components/CategoriesExplorer";
import BorderImage from "../components/BorderImage";
import MissionSection from "../components/MissionSection";
import SubscriptionSection from "../components/SubscriptionSection";
import HrLine from "../components/HrLine";
import AboutSection from "../components/AboutSection";
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../utils/axiosInstance";
function About() {
  const [homeData, setHomeData] = useState({ blogData: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    async function getHomeData() {
      try {
        const res = await API.get("/homepage", {
          withCredentials: false,
        });
        // console.log(res);
        setHomeData(res.data);
      } catch (error) {
        // console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getHomeData();
  }, []);

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
      <CategoryExplorer categoryData={homeData.categoryData} />

      <HrLine width={4} />
      <SubscriptionSection />
      <HrLine width={"4"} />
      <Footer />
    </>
  );
}

export default About;
