import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

function PopularPost({ data }) {
  const [counter, setCounter] = useState(0);
  // const data = [{ name: "Title 1" }, { name: "Title 2" }, { name: "Title 3" }];
  // console.log(data, "feature Data");
  function handleLeft() {
    setCounter((prev) => (prev > 0 ? prev - 1 : data.length - 1));
  }

  function handleRight() {
    setCounter((prev) => (prev < data.length - 1 ? prev + 1 : 0));
  }

  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-8 py-10">
      <section className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-8 py-10">
        <div className="md:w-150">
          <SectionHeading
            heading={"Most Popular Posts"}
            text={
              "Discover reader-favorite articles packed with expert tips on nutrition, fitness, mental health, and wellness. Stay informed with the best insights for a healthier lifestyle!"
            }
          />
        </div>
      </section>

      {/* Slider Section */}
      <div className="slider flex sm:justify-between justify-center items-center relative overflow-hidden">
        {/* Left Button */}
        <img
          src="./src/assets/vector3.svg"
          alt="left button"
          className="cursor-pointer rotate-180 mx-5 hidden sm:block"
          onClick={handleLeft}
        />

        <motion.div
          key={counter} // Ensures re-render on counter change
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="content flex justify-between items-center flex-col md:flex-row"
        >
          {/* {console.log(data[counter].image.imageUrl)} */}
          <img
            src={`${data[counter].image.imageUrl}`}
            alt=""
            className="m-5  h-60 w-80 object-cover"
          />
          <div className="slider-text m-5 md:w-110 w-70">
            <div className="heading-text-section pb-8 pt-9">
              <h1
                className={`mb-4  h-[60px] text-gray-900 dark:text-white  text-5xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF4242] to-[#99286C]`}
              >
                {data[counter].title}
              </h1>
              <p className={`text-white md:w-full md:text-1xl `}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Consequuntur ipsa asperiores vel vero iusto error quae, est quis
                doloremque vitae voluptatem commodi corrupti unde neque eveniet
                modi obcaecati? Est, amet?
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Button */}
        <img
          src="./src/assets/vector3.svg"
          alt="right button"
          className="mx-5 hidden sm:block cursor-pointer"
          onClick={handleRight}
        />
      </div>
    </section>
  );
}

export default PopularPost;
