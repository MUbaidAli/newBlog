import Button from "./Button";
import bgShadow from "../assets/Ellipse 10.svg";

function HeroSection() {
  return (
    <>
      <img src={bgShadow} alt="" className="absolute flex w-full " />
      <div className="hero-sec container mx-auto max-w-7xl overflow-hidden  relative">
        <div className="circle inner"></div>
        <div className="text-section absolute z-10  md:w-[600px] w-100  px-5 text-center flex items-center flex-col mt-10">
          <h1 className="mb-4  text-gray-900 dark:text-white text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF4242] to-[#99286C]">
            Your Guide To A Healthier Life
          </h1>
          <p className="my-3 text-white inline-block">
            Read expert tips on wellness, mental health, and fitness Explore
            expert-backed health insights, mindful living tips, and
            scientifically proven wellness strategies.
          </p>
          <div className="w-[350px]">
            <Button>Download Free Guidance</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
