import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Model from "../components/Model";
import HeroSection from "../components/HeroSection";
import LatestBlog from "../components/LatestBlog";
import CategoryExplorer from "../components/CategoriesExplorer";
import PopulerPost from "../components/PopularPost";
import HrLine from "../components/HrLine";
import Footer from "../components/Footer";
import NavScroll from "../components/navScroll";
import axios from "axios";
import Loader from "../components/Loader";
function Home() {
  const [homeData, setHomeData] = useState({ blogData: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    async function getHomeData() {
      try {
        const res = await axios.get("http://localhost:8484/api/homepage");
        console.log(res);
        setHomeData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getHomeData();
  }, []);

  // console.log(homeData.blogData);

  return (
    <>
      <div className="background">
        {/* <NavScroll /> */}

        <Navbar />

        <HeroSection
          heading={"Your Guide To A Healthier Life"}
          text="       Read expert tips on wellness, mental health, and fitness Explore
          expert-backed health insights, mindful living tips, and
          scientifically proven wellness strategies."
          btnText={"Download Free Guide"}
        />
        <div className="bg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {
                <LatestBlog
                  blogData={homeData.blogData}
                  isLoading={isLoading}
                />
              }
              <CategoryExplorer categoryData={homeData.categoryData} />
              <HrLine width={4} />
              <PopulerPost data={homeData.blogData} />
            </>
          )}
        </div>
        <HrLine width={4} />
        <Footer />
      </div>
    </>
  );
}

export default Home;
