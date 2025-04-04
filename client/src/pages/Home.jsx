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
  const [isModelOpen, setIsModelOpen] = useState(false);
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

        <Navbar modelOpener={setIsModelOpen} />

        <HeroSection
          heading={"Your Guide To A Healthier Life"}
          text="       Read expert tips on wellness, mental health, and fitness Explore
          expert-backed health insights, mindful living tips, and
          scientifically proven wellness strategies."
          btnText={"Download Free Guide"}
        />
        <div className="bg ">
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
        {isModelOpen && (
          <Model modelOpener={setIsModelOpen}>
            <form class="max-w-md mx-auto">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Blogs..."
                  required
                />
                <button
                  type="submit"
                  class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </Model>
        )}
      </div>
    </>
  );
}

export default Home;
