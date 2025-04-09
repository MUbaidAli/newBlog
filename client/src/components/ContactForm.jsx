import { useState } from "react";
import Button from "./Button";
import CategoryCard from "./CategoryCard";
import axios from "axios";
import { toast } from "react-toastify";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    // const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    const res = await axios.post("http://localhost:8484/api/contact", data);
    console.log(res);
    toast(res.data.message);
  };

  return (
    <>
      <div className="bg">
        <div className="mx-auto max-w-7xl md:py-40 ">
          <div className=" pt-6 md:pt-0  flex flex-col justify-center items-center   ">
            <div className="md:w-250">
              <h1 className="mb-4 text-center  text-gray-900 dark:text-white  text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF4242] to-[#99286C]">
                Send Us A Message
              </h1>
              <form action="" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Full Name..."
                  className=" border-white text-white outline-0 border-2  w-full justify-center text-left rounded-lg shadow px-10 py-3 flex items-center my-5"
                />
                <input
                  type="text"
                  placeholder="Enter Email..."
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className=" border-white text-white outline-0 border-2  w-full justify-center text-left rounded-lg shadow px-10 py-3 flex items-center my-5"
                />
                <textarea
                  type="text"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter Message..."
                  className=" border-white h-80 text-white outline-0 border-2  w-full justify-center text-left rounded-lg shadow px-10 py-3 flex items-center my-5"
                ></textarea>

                <Button>Subscribe</Button>
              </form>
            </div>
            <div className="py-30">
              <h1 className="mb-4 text-center  text-gray-900 dark:text-white  text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF4242] to-[#99286C]">
                Other Ways To Reach Us
              </h1>

              <div className="flex md:justify-between px-5 flex-wrap  justify-center">
                <CategoryCard
                  src={"./src/assets/Vector.svg"}
                  heading={"+97-487-48745"}
                />
                <CategoryCard
                  src={"./src/assets/Vector.svg"}
                  heading={"Blog@gmail.com"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactForm;
