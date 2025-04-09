// password filed and role field

import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function UpdateUserData({ userData, setIsUserId, user }) {
  const [isLoading, setIsLoading] = useState(true);
  const formattedDate = new Date(!isLoading && formData.DOB)
    .toISOString()
    .split("T")[0];
  // console.log(userData, "from userrr");
  const initialFormState = {
    name: "",
    image: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    phone: "",
    gender: "",
    DOB: formattedDate,
    password: "",
    role: "",
  };

  useState(() => {
    // setIsLoading(false);
  }, []);
  const [formData, setFormData] = useState(initialFormState);
  const [errorValidation, setErrorValidation] = useState({});
  const navigate = useNavigate();
  console.log(!isLoading && formData.DOB);
  function handleChange(e) {
    // console.log(e.target.name, ":", e.   target.value)
    // ;
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorValidation({ ...errorValidation, [e.target.name]: "" });
  }
  function handleImageChange(e) {
    setFormData({ ...formData, image: e.target.files[0] });
    console.log(e.target.files[0]);
    console.log(formData.image, "imageee");
    console.log(e.target.files[0], "imageee");
  }

  // console.log(userData);
  useEffect(() => {
    setFormData({ ...user });
    // async function fetchUserData() {
    //   //   console.log("here");
    //   setIsLoading(true);
    //   try {
    //     // get user data based on id
    //   } catch (error) {
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    // fetchUserData();
  }, [userData]);

  async function handleSubmit(e) {
    e.preventDefault();
    const errorObj = {};

    if (!formData.name.trim()) {
      errorObj.name = "Name is Required";
    }

    if (!formData.password.trim()) {
      errorObj.password = "Password is Required";
    }
    if (!formData.email.trim()) {
      errorObj.email = "Email is Required";
    }

    if (Object.keys(errorObj).length) {
      setErrorValidation(errorObj);
      console.log(errorValidation);
      return;
    }

    console.log(formData, "form data submited");
    const form = new FormData();
    form.append("name", formData.name);
    form.append("lastName", formData.lastName);
    form.append("email", formData.email);
    form.append("address", formData.address);
    form.append("country", formData.country);
    form.append("phone", formData.phone);
    form.append("gender", formData.gender);
    form.append("DOB", formData.DOB);
    form.append("password", formData.password);
    form.append("image", formData.image);
    // form.append("image", formData.image);
    setIsLoading(true);
    // console.log(formData, "formmmmmmmmmmm");
    try {
      // console.log(formData.name, form.get("image"), "imageeeeeee");

      // console.log("thissss");
      // console.log("FormData Image:", form.get("image"));
      // console.log("FormData Image:", form.get("image"));
      const res = await axios.put(
        `http://localhost:8484/api/user/update/me/${formData._id}`,
        form,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      // setIsUserId(null);
      //   fetchUsers();
      toast(res.data.message);
      // navigate("/dashboard/manage-users");
    } catch (error) {
      console.log(error, "errorrr");
      toast(error.message);
    } finally {
      setIsLoading(false);
    }

    // console.log(errorValidation);
    // console.log();
    // console.log(formData);
  }

  return (
    <>
      {/* <h1 className="text-white text-4xl mb-10">Register Admin</h1> */}
      <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex items-center justify-center w-full">
          <div className="mx-auto w-64 text-center my-10">
            <div className=" w-64">
              {/* Hidden File Input */}
              <input
                type="file"
                className="hidden"
                name="image"
                id="fileInput"
                // value={formData.image.fileInput}
                onChange={handleImageChange}
              />
              <img
                id="profileImage"
                className="w-50 h-50 rounded-full absolute cursor-pointer"
                src={`${
                  formData?.image?.imageUrl ||
                  "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
                }`}
                alt="Profile"
                onClick={() => document.getElementById("fileInput").click()}
              />
              {/* Overlay with Upload Icon */}
              <div
                className="w-50 h-50 group hover:bg-gray-200 opacity-60 rounded-full  flex justify-center items-center cursor-pointer transition duration-500"
                onClick={() => document.getElementById("fileInput").click()}
              >
                <img
                  className="hidden group-hover:block w-12"
                  src="https://www.svgrepo.com/show/33565/upload.svg"
                  alt="Upload"
                />
              </div>
            </div>
          </div>
          {/* <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              name="image"
              // value={formData.image}
              onChange={handleImageChange}
            />
          </label> */}
        </div>

        <div className=" pt-6 md:pt-0 md:w-full    flex justify-between flex-wrap items-center flex-row ">
          <div className="flex flex-col flex-1 ">
            <label htmlFor="name" className="mx-3 text-white">
              First Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              // value={"categoryName"}
              // onChange={(e) => setCategoryName(e.target.value)}
              placeholder="First Name..."
              className="  mx-3 border-white text-white outline-0 border-2   rounded-lg shadow px-10 py-3  my-2"
            />
            <p className="text-red-800 px-3 ">{errorValidation.name}</p>
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="lastName" className="mx-3 text-white ">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName === "undefined" ? "" : formData.lastName}
              onChange={handleChange}
              // value={"categoryName"}
              // onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Last Name..."
              className=" mx-3 border-white text-white outline-0 border-2    rounded-lg shadow px-10 py-3  my-2"
            />
          </div>
        </div>
        <div className=" pt-6 md:pt-0 w-full flex-wrap   flex justify-between items-center flex-row ">
          <div className="flex flex-col flex-1 ">
            <label htmlFor="password" className="mx-3 text-white">
              Password *
            </label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              // value={"categoryName"}
              // onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Type Password..."
              className="  mx-3 border-white text-white outline-0 border-2   rounded-lg shadow px-10 py-3  my-2"
            />
            <p className="text-red-800 px-3 ">{errorValidation.password}</p>
          </div>
        </div>
        <div className=" pt-6 md:pt-0 w-full flex-wrap    flex justify-between items-center ">
          <div className="flex flex-col flex-1 ">
            <label htmlFor="email" className="mx-3 text-white">
              Email *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email === "undefined" ? "" : formData.email}
              onChange={handleChange}
              // value={"categoryName"}
              // onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Type Email..."
              className="  mx-3 border-white text-white outline-0 border-2   rounded-lg shadow px-10 py-3  my-2"
            />
            <p className="text-red-800 px-3 ">{errorValidation.email}</p>
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="gender" className="mx-3 text-white ">
              Gender
            </label>
            <div className="flex">
              <div className="flex ">
                <input
                  type="radio"
                  name="gender"
                  id="Male"
                  //   value={"male"}
                  value={"Male"}
                  onChange={handleChange}
                  // value={"categoryName"}
                  // onChange={(e) => setCategoryName(e.target.value)}
                  //   placeholder="Type Category Name..."
                  className=" mx-3 border-white text-white outline-0 border-2    rounded-lg shadow px-10 py-3  my-2"
                />

                <p className="text-white">Male</p>
              </div>
              <div className="flex ">
                <input
                  type="radio"
                  name="gender"
                  id="Female"
                  value={"Female"}
                  onChange={handleChange}
                  //   value={"female"}
                  // value={"categoryName"}
                  // onChange={(e) => setCategoryName(e.target.value)}
                  //   placeholder="Type Category Name..."
                  className=" mx-3 border-white text-white outline-0 border-2    rounded-lg shadow px-10 py-3  my-2"
                />{" "}
                <p className="text-white">Female</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" pt-6 md:pt-0 w-full  flex-wrap  flex justify-between items-center ">
          <div className="flex flex-col flex-1 ">
            <label htmlFor="DOB" className="mx-3 text-white">
              Date Of Birth
            </label>
            {console.log(formData.DOB)}
            {console.log(formData)}
            <input
              type="date"
              name="DOB"
              value={formData.DOB === "undefined" ? "" : formData.DOB}
              onChange={handleChange}
              // value={"categoryName"}
              // onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Type Category Name..."
              className="  mx-3 border-white text-white outline-0 border-2   rounded-lg shadow px-10 py-3  my-2"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="phone" className="mx-3 text-white ">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone === "undefined" ? "" : formData.phone}
              onChange={handleChange}
              // value={"categoryName"}
              // onChange={(e) => setCategoryName(e.target.value)}
              placeholder="1824284722"
              className=" mx-3 border-white text-white outline-0 border-2    rounded-lg shadow px-10 py-3  my-2"
            />
          </div>
        </div>
        <div className=" pt-6 md:pt-0 w-full flex-wrap   flex justify-between items-center ">
          <div className="flex flex-col flex-1 ">
            <label htmlFor="country" className="mx-3 text-white">
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              value={formData.country === "undefined" ? "" : formData.country}
              onChange={handleChange}
              // value={"categoryName"}
              // onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Country Name..."
              className="  mx-3 border-white text-white outline-0 border-2   rounded-lg shadow px-10 py-3  my-2"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="address" className="mx-3 text-white ">
              Address
            </label>
            <input
              value={formData.address === "undefined" ? "" : formData.address}
              onChange={handleChange}
              type="text"
              name="address"
              id="address"
              // value={"categoryName"}
              // onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Type Address..."
              className=" mx-3 border-white text-white outline-0 border-2    rounded-lg shadow px-10 py-3  my-2"
            />
          </div>
        </div>
        <div className=" flex justify-between items-center mx-3 my-5">
          <button
            onClick={() => setFormData(initialFormState)}
            className="w-60 relative cursor-pointer inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-r from-[#A287EF] to-[#E53A3A] group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
          >
            <span className="flex-1 relative px-5 py-3 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Cancel
            </span>
          </button>
          <div className="w-60">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Editing..." : "Edit Data"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default UpdateUserData;
