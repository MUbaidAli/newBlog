import SectionHeading from "./SectionHeading";
import SubscriptionForm from "./SubscribtionForm";

function SubscriptionSection() {
  return (
    <>
      <div className="mx-auto max-w-7xl md:px-5 px-10 py-40">
        <div className="flex flex-col justify-center items-center">
          <div className="w-full md:w-200">
            <SectionHeading
              heading={"Join Our Wellness Community!"}
              text={
                "Get weekly health tips, exclusive content, and free wellness guides directly in your inbox"
              }
              headingSize={9}
            />

            <SubscriptionForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default SubscriptionSection;
