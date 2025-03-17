import Button from "./Button";

function BlogCard() {
  return (
    <div className="   flex flex-col justify-between leading-normal">
      <img
        // src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        src="./src/assets/image 7.png"
        className="h-70 w-full object-cover mb-3 rounded-sm"
      />
      <div className=" pt-2">
        <div className="mb-8">
          <a
            href="#"
            className=" text-white text-xl md:text-2xl capitalize mb-2  inline-block"
          >
            Can coffee make you a better developer?
          </a>
          <p className="text-white text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia,
          </p>
        </div>
        <div className="w-full">
          <Button>Read Full Blog</Button>
        </div>
      </div>
    </div>
  );
}
export default BlogCard;
