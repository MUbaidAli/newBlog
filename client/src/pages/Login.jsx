import {
  Navigate,
  NavLink,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  function handleForm(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const errorObj = {};
    if (!formData.email.trim()) errorObj.email = "Please Enter A Valid Email";
    if (!formData.password.trim())
      errorObj.password = "Please Enter A Password";

    if (Object.keys(errorObj).length > 0) {
      setError(errorObj);
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:8484/api/user/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      toast(`Welcome ${response.data.name}`);

      if (response.data.role === "Admin" || response.data.role === "Editor") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
      //   console.log(response.data);
    } catch (error) {
      toast(error.response?.data?.error || error.message);
      console.log(error);
      console.error(error.response?.data?.errror || error.message);
    } finally {
      setIsLoading(false);
    }
    // console.log(errorObj, error);
  }
  return (
    <>
      <>
        {/*
  This example requires updating your template:

  ```
  <html class="h-full bg-white">
  <body class="h-full">
  ```
*/}
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="text-white text-center text-3xl">Logo</h1>
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
              Sign in to your account
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
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-white"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleForm}
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
                      onChange={handleForm}
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter Name..."
                      className=" border-white text-white outline-0 border-2  w-full justify-center text-left rounded-lg shadow px-10 py-3 flex items-center my-5"
                    />
                  </div>
                  {error.password && (
                    <p className="text-red-600">{error.password}</p>
                  )}
                </div>
              </div>
              <div>
                <Button type="submit" isLoading={isLoading}>
                  Login
                </Button>
                {/* <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button> */}
              </div>
            </form>
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?
              <NavLink
                to="/account/register"
                className="font-semibold  text-[#A80F0F] hover:text-[#2F7362] mx-3"
              >
                Register Now
              </NavLink>
            </p>
          </div>
        </div>
      </>
    </>
  );
}

export default Login;
