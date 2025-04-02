// export default Categories;
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import SectionHeading from "../components/SectionHeading";
import axios from "axios";
import { toast } from "react-toastify";
import EditorJsHtml from "editorjs-html";
import Loader from "../components/Loader";

const editorHtml = EditorJsHtml(); // Now, this is the instance

function Categories() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchBlogs() {
      try {
        const data = await axios.get("http://localhost:8484/api/blogs");

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
      <section className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-8 py-20">
        <SectionHeading
          text={"Top Pics For Your Wellness Journey"}
          heading={"Latest Blogs"}
        />

        <div className="max-w-7xl mx-auto py-5 sm:py-5 md:py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10 ">
            {isLoading ? (
              <Loader />
            ) : (
              blogs.map((item, i) => {
                const parsedContent = JSON.parse(item.content); // Parse the JSON content
                const htmlContent = editorHtml.parse(parsedContent); // Use the instance's method to convert to HTML

                return (
                  <div key={i}>
                    <BlogCard data={item} />
                    {/* {console.log(item)} */}
                    {/* {console.log(item.content)} */}
                    {/* Displaying HTML content */}
                    {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }} /> */}
                    {/* Optional: Logging to see the content */}
                    {/* {console.log("Blog Content:", htmlContent)} */}
                    {/* {console.log("Type of Content:", typeof htmlContent)} */}
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <div className="">
            <Button>Explore More</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Categories;
