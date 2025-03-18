import BorderImage from "./BorderImage";
import SectionHeading from "./SectionHeading";

function AboutSection() {
  return (
    <>
      <div className="mx-auto max-w-7xl md:px-7 py-40">
        <div className="md:w-200 md:px-5 px-10">
          <SectionHeading
            headingSize={"7"}
            heading={"How It All Began"}
            text={
              "Wellness Insight was born out of a simple yet powerful idea: to make health and wellness knowledge accessible to everyone. After struggling to find reliable and easy-to-follow health information, our founder decided to create a platform where experts and wellness enthusiasts come together to share valuable insights"
            }
            textSize={5}
          />
        </div>

        <div className="flex justify-between items-center text-white lg:flex-row flex-col px-5">
          <div className="ml-10">
            <ul className="mx-4 custom flex flex-col">
              <li>A Love for Health and Wellness Inspired us</li>
              <li>A Love for Health and Wellness Inspired us</li>
              <li>A Love for Health and Wellness Inspired us</li>
              <li>A Love for Health and Wellness Inspired us</li>
              <li>A Love for Health and Wellness Inspired us</li>
            </ul>
          </div>
          <div className=" md:w-100 m-10">
            <BorderImage src={"./src/assets/image12.png"} />
          </div>
          <div className="ml-20">
            <ul className="mx-4 custom flex flex-col">
              <li>A Love for Health and Wellness Inspired us</li>
              <li>A Love for Health and Wellness Inspired us</li>
              <li>A Love for Health and Wellness Inspired us</li>
              <li>A Love for Health and Wellness Inspired us</li>
              <li>A Love for Health and Wellness Inspired us</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutSection;
