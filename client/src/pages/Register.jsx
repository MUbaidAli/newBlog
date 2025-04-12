import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../utils/axiosInstance";

// toast.configure();

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  function handleChange(e) {
    // console.log(e.target.name, e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });

    // console.log(data);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    const errorObj = {};

    if (!data.name.trim()) errorObj.name = "Name Is Required";
    if (!data.email.trim()) errorObj.email = "Enter a Email";
    if (!data.password.trim()) errorObj.password = "Enter a Password";
    if (data.password.trim() && data.password !== data.confirmPass) {
      errorObj.password = "Password Does not Matched";
    }
    if (Object.keys(errorObj).length > 0) {
      setError(errorObj);
      return;
    }

    setIsLoading(true);
    try {
      if (
        data.password === data.confirmPass &&
        !(Object.keys(errorObj).length > 0)
      ) {
        const response = await API.post("/user/register", data, {
          headers: { "Content-Type": "application/json" },
        });
        toast("User Registered");
        // console.log("User Registered", response.data);
      }
    } catch (error) {
      toast(error.response?.data?.error || "Registeration Failed", {});
      console.error(
        "Registeration Failed:",
        error.response?.data?.error || error.message
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-white text-center text-3xl">Logo</h1>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Register A New account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-white"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  placeholder="Enter Name..."
                  className=" border-white text-white outline-0 border-2  w-full justify-center text-left rounded-lg shadow px-10 py-3 flex items-center my-5"
                />
              </div>
              {error.name && <p className="text-red-600">{error.name}</p>}
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email..."
                className=" border-white text-white outline-0 border-2  w-full justify-center text-left rounded-lg shadow px-10 py-3 flex items-center my-5"
              />
            </div>
            {error.email && <p className="text-red-600">{error.email}</p>}
          </div>
          <div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-white"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Name..."
                  className=" border-white text-white outline-0 border-2  w-full justify-center text-left rounded-lg shadow px-10 py-3 flex items-center my-5"
                />
              </div>
            </div>
            {error.password && <p className="text-red-600">{error.password}</p>}
          </div>{" "}
          <div>
            <div>
              <div>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    type="password"
                    name="confirmPass"
                    placeholder="Confirm Password..."
                    className=" border-white text-white outline-0 border-2  w-full justify-center text-left rounded-lg shadow px-10 py-3 flex items-center my-5"
                  />
                </div>
              </div>
            </div>
            <Button type="submit" isLoading={isLoading}>
              Register
            </Button>
            {/* <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button> */}
          </div>
        </form>
        <p className="mt-10 text-center text-sm/6 text-gray-500 ">
          Already Have An Account?
          <NavLink
            to="/account/login"
            className="font-semibold  text-[#A80F0F] hover:text-[#2F7362] mx-3"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;
