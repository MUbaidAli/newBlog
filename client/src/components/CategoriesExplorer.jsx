import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";

function CategoryExplorer({ categoryData }) {
  return (
    <section className="mx-auto max-w-7xl px-6  sm:px-10 lg:px-8 md:py-40 py-40">
      <SectionHeading
        heading="Explore By Category"
        text="Top Picks for Your Wellness Journey"
      />
      {/* md:w-1/4 sm:w-1/2 */}
      <div>
        <section className="text-gray-700 body-font">
          <div className="container  py-12 mx-auto">
            <div className="flex flex-wrap text-center lg:justify-between justify-center  ">
              {/* singple category */}
              {categoryData &&
                categoryData.map((item) => (
                  <Link to={`/category/${item._id}?${item.name}`}>
                    <div className="p-4 md:w-70 my-5 border w-100 md:w-100 xl:w-70 rounded-md  custom-border relative cursor-pointer ">
                      <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                        <div className="flex justify-left w-20">
                          <img
                            src="./src/assets/Vector.svg"
                            className="w-32 mb-3"
                          />
                        </div>
                        <p className="text-left font-regular text-2xl text-white mt-3">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              {/* single category end */}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
export default CategoryExplorer;
