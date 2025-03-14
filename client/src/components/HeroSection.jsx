function HeroSection() {
  return (
    <>
      <div className="hero-sec container mx-auto max-w-7xl overflow-hidden  relative">
        <div className="circle inner"></div>
        <div className="text-section absolute z-10 w-[700px] text-center">
          <h1 className="mb-4  text-gray-900 dark:text-white  lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF4242] to-[#99286C]">
            Your Guide To A Healthier Life
          </h1>
          <p className="my-3 text-white inline-block">
            Read expert tips on wellness, mental health, and fitness Explore
            expert-backed health insights, mindful living tips, and
            scientifically proven wellness strategies.
          </p>

          <a
            href="#"
            className="btn bg-gradient-to-r from-[#A80F0F] to-[#2F7362] text-white font-bold py-3 px-9  my-1 inline-block"
          >
            Download Free Guidance
          </a>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
