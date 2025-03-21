import { useState } from "react";
import SectionHeading from "./SectionHeading";

function PopularPost() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6  sm:px-10 lg:px-8 py-10">
        <section className="mx-auto max-w-5xl px-6  sm:px-10 lg:px-8 py-10">
          <div className="md:w-150">
            <SectionHeading
              heading={"Most Popular Posts"}
              text={
                "Discover reader-favorite articles packed with expert tips on nutrition, fitness, mental health, and wellness. Stay informed with the best insights for a healthier lifestyle!"
              }
            />
          </div>
        </section>
        {/* slider code section */}
        <div className="slider flex sm:justify-between  justify-center">
          {/* left button */}
          <img
            src="./src/assets/vector3.svg"
            alt="left button"
            className="rotate-180  mx-5 hidden sm:block "
          />

          <div className="content flex  justify-between items-center flex-col md:flex-row ">
            <img
              src="./src/assets/image10.png"
              alt=""
              className="m-5 sm:w-80 w-70"
            />
            <div className="slider-text m-5 md:w-110 w-70">
              <SectionHeading
                text={
                  " Simple and effective home workouts to keep you in shape without gym equipment.  Simple and effective home workouts to keep you in shape without gym equipment."
                }
                heading={"How to Stay Fit Without Going to the Gym"}
              />
            </div>
          </div>

          {/* right button */}
          <img
            src="./src/assets/vector3.svg"
            alt="right button"
            className="mx-5 hidden sm:block"
          />
        </div>
      </section>
    </>
  );
}

export default PopularPost;
