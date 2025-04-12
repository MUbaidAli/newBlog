import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import LatestBlog from "../components/LatestBlog";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import HrLine from "../components/HrLine";
import { div } from "framer-motion/client";
import SectionHeading from "../components/SectionHeading";
import Pagination from "../components/Pagination";
import API from "../utils/axiosInstance";

function SingleCategory({ heading }) {
  const { id } = useParams();

  const [searchParams] = useSearchParams();
  // console.log(searchParams);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  // console.log(data, "dataaaa");
  async function fetchCategoryBlogs(pageNumber = 1) {
    setIsLoading(true);
    try {
      const res = await API.get(
        `/blogs/category/${id}?page=${pageNumber}&limit=10`,
        { withCredentials: false }
      );
      // console.log(res, "resssss");
      setData(res.data.blogData || res.data);
      setPages(res.data.pages);
      setPage(res.data.page);
      // console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchCategoryBlogs();
  }, [id]);
  function handlePageChange(newPage) {
    fetchCategoryBlogs(newPage);
  }
  return (
    <>
      <Navbar />

      <div className="bg">
        <div className="mx-auto max-w-7xl px-10">
          {/* <h1>Category Page</h1> */}
          {/* {console.log(typeof )} */}
          {/* {console.log(!isLoading && typeof blogData === "string")} */}
          {isLoading && <Loader />}
          {!isLoading && typeof data.message === "string" && (
            <div className="h-[80vh] flex flex-col  justify-center">
              <SectionHeading
                text={"Top Pics For Your Wellness Journey"}
                heading={data.category.name || "Latest Blogs"}
              />
              <div
                className=" bg-red-100 border border-red-400 text-red-700 px-4 py-5 rounded relative my-10"
                role="alert"
              >
                <svg
                  className="shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <strong className="font-bold">Holy smokes! </strong>
                <span className="block sm:inline">{data.message}</span>
              </div>
            </div>
          )}

          {!isLoading && typeof data.message !== "string" && (
            <LatestBlog blogData={data} heading={data[0].category} />
          )}
        </div>
        <div className="my-8 flex justify-center items-center gap-2 mt-4">
          {/* {console.log(pages, page)} */}
          {pages <= 1 ? (
            ""
          ) : (
            <>
              <Pagination
                pages={pages}
                handlePageChange={handlePageChange}
                page={page}
              />
              <p className="text-white">
                Page {page} of {pages}{" "}
              </p>
            </>
          )}
        </div>

        {/* <p>{JSON.stringify(data)}</p> */}
      </div>
      <HrLine />
      <Footer />
    </>
  );
}

export default SingleCategory;
