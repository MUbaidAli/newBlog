// import { Button } from "antd";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import SectionHeading from "../components/SectionHeading";
import axios from "axios";
import { toast } from "react-toastify";

function Categories() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    async function fetchBlogs() {
      try {
        const data = await axios.get("http://localhost:8484/api/blogs");

        console.log(data);
        setBlogs(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div className="bg">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6  sm:px-10 lg:px-8 py-20">
        <SectionHeading
          text={"Top Pics For Your Wellness Journey"}
          heading={"Latest Blogs"}
        />

        <div className="max-w-7xl mx-auto py-5  sm:py-5 md:py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2   gap-10">
            {blogs.map((item) => (
              <BlogCard />
            ))}
          </div>
        </div>
        <div className=" flex justify-end">
          <div className="">
            <Button>Explore More</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Categories;
