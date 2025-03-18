import Button from "./Button";

function SubscriptionForm() {
  return (
    <div className=" pt-6 md:pt-0 w-full flex flex-col justify-end ">
      <input
        type="text"
        placeholder="Enter Email..."
        className=" border-white text-white outline-0 border-2  justify-center text-center rounded-lg shadow px-10 py-3 flex items-center my-5"
      />

      <Button>Subscribe</Button>
      {/* <a className="w-44 bg-red-500  justify-center text-center rounded-lg shadow px-10 py-3 flex items-center">
      SUBSCRIBE
    </a> */}
    </div>
  );
}

export default SubscriptionForm;
