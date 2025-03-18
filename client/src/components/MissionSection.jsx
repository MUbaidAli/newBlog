import BorderImage from "./BorderImage";
import SectionHeading from "./SectionHeading";

function MissionSection() {
  return (
    <>
      <div className="mx-auto max-w-7xl py-20 px-5 md:px-8  ">
        <div className="flex flex-col md:flex-row justify-between items-center ">
          <div className="md:w-150 ">
            <SectionHeading
              heading={"Our Mission"}
              text={
                "At Wellness Insight, we believe that good health is the foundation of a happy life. Our goal is to provide well-researched, easy-to-understand wellness content that helps you make informed health decisions."
              }
              headingSize={8}
              textSize={5}
            />
          </div>
          <div className="m-7">
            <BorderImage src={"./src/assets/image11.png"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MissionSection;
