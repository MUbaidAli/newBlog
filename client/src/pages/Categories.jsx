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
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";

const editorHtml = EditorJsHtml(); // Now, this is the instance

function Categories() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  async function fetchBlogs(pageNumber = 1) {
    setIsLoading(true);
    try {
      const data = await axios.get(
        `http://localhost:8484/api/blogs?page=${pageNumber}&limit=12`,
        {
          withCredentials: true,
        }
      );

      setBlogs(data.data.data);
      setPages(data.data.pages);
      setPage(data.data.page);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchBlogs();
  }, []);

  function handlePageChange(newPage) {
    fetchBlogs(newPage);
  }

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
        <div className="flex justify-center items-center gap-2 mt-4">
          {console.log(pages, page)}
          <Pagination
            pages={pages}
            handlePageChange={handlePageChange}
            page={page}
          />
          <p className="text-white">
            Page {page} of {pages}{" "}
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Categories;
