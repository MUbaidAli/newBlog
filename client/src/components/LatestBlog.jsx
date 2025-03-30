import BlogCard from "./BlogCard";
import Button from "./Button";
import SectionHeading from "./SectionHeading";

function LatestBlog() {
  return (
    <section className="mx-auto max-w-7xl px-6  sm:px-10 lg:px-8 py-10">
      <SectionHeading
        text={"Top Pics For Your Wellness Journey"}
        heading={"Latest Blogs"}
      />

      <div className="max-w-7xl mx-auto py-5  sm:py-5 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2   gap-10">
          {Array.from([1, 2, 3, 4, 5, 6, 7, 8]).map((item) => (
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
  );
}

export default LatestBlog;
