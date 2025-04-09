import { useNavigate } from "react-router-dom";
import BlogCard from "./BlogCard";
import Button from "./Button";
import SectionHeading from "./SectionHeading";

function LatestBlog({ blogData, isLoading, heading }) {
  const navigate = useNavigate();
  // console.log(blogData, "data or message");
  return (
    <section className="mx-auto max-w-7xl px-6  sm:px-10 lg:px-8 py-10">
      <SectionHeading
        text={"Top Pics For Your Wellness Journey"}
        heading={heading || "Latest Blogs"}
      />
      {/* {console.log(blogData, "latestBlog")} */}
      <div className="max-w-7xl mx-auto py-5  sm:py-5 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2   gap-10">
          {!isLoading &&
            blogData.map((item, i) => <BlogCard key={i} data={item} />)}
        </div>
      </div>
    </section>
  );
}

export default LatestBlog;
