function CategoryCard({ src, heading, text }) {
  return (
    <>
      <div className="p-4 w-100 my-5 mx-5 md:w-100 xl:w-70 border rounded-md  custom-border relative border-white">
        <div className="px-4 py-4 transform transition duration-500 hover:scale-110">
          <div className="flex justify-left w-20">
            {src && <img src={`${src}`} className="w-32 mb-3" />}
          </div>
          <h2 className="text-left font-regular text-2xl text-white">
            {heading}
          </h2>

          <p className="text-white md:w-full md:text-3xl">{text}</p>
        </div>
      </div>
    </>
  );
}

export default CategoryCard;
