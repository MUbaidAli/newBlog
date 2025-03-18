function SectionHeading({ heading, text, textSize, headingSize }) {
  return (
    <div className="heading-text-section pb-8 pt-9">
      <h1
        className={`mb-4  text-gray-900 dark:text-white  text-5xl sm:text-${
          headingSize || "4"
        }xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF4242] to-[#99286C]`}
      >
        {heading}
      </h1>
      <p className={`text-white md:w-full md:text-${textSize}xl `}>{text}</p>
    </div>
  );
}

export default SectionHeading;
