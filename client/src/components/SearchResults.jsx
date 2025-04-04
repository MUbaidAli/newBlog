import { Link, useNavigate } from "react-router-dom";
import BlogCard from "./BlogCard";
import Button from "./Button";
import SectionHeading from "./SectionHeading";

function SearchResults({ blogData, isLoading, heading }) {
  const navigate = useNavigate();
  // console.log(blogData, "data or message");
  return (
    <section className=" px-4  sm:px-10 lg:px-4 py-5">
      {/* {console.log(blogData, "latestBlog")} */}
      <div className="max-w-7xl mx-auto py-5  sm:py-5 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2   gap-10">
          {!isLoading &&
            blogData.map((data, i) => (
              <div key={i} className=" h-150  flex flex-col  leading-normal">
                {/* {console.log(data)} */}
                <img
                  // src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  src={`${data.image.imageUrl}`}
                  className="h-70 w-full object-cover mb-3 rounded-sm"
                />
                <div className=" pt-2">
                  <div className="mb-8 flex flex-col items-baseline">
                    <Link
                      to={`http://localhost:5173/posts/${data._id}`}
                      className=" text-black text-xl md:text-2xl capitalize mb-2  inline-block"
                    >
                      {`${data.title}`}
                    </Link>
                    <p className="text-black text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptatibus quia,
                    </p>
                  </div>
                  <div className="w-full flex flex-end">
                    <Link to={`http://localhost:5173/posts/${data._id}`}>
                      <Button>Read Blog</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default SearchResults;
