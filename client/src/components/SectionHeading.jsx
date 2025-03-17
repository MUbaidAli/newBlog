function SectionHeading({ heading, text }) {
  return (
    <div className="heading-text-section pb-8 pt-9">
      <h1 className="mb-4  text-gray-900 dark:text-white  text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF4242] to-[#99286C]">
        {heading}
      </h1>
      <p className="text-white md:w-full">{text}</p>
    </div>
  );
}

export default SectionHeading;
