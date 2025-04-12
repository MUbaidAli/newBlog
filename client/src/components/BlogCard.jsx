import { Link } from "react-router-dom";
import Button from "./Button";

function BlogCard({ data }) {
  return (
    <div className="   flex flex-col justify-between leading-normal">
      {/* {console.log(data)} */}
      <img
        // src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        src={`${data.image.imageUrl}`}
        className="h-70 w-full object-cover mb-3 rounded-sm"
      />
      <div className=" pt-2">
        <div className="mb-8">
          <Link
            to={`posts/${data._id}`}
            className=" text-white text-xl md:text-2xl capitalize mb-2  inline-block"
          >
            {`${data.title}`}
          </Link>
          <p className="text-white text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia,
          </p>
        </div>
        <div className="w-full">
          <Link to={`/posts/${data._id}`}>
            <Button>Read Full Blog</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default BlogCard;
