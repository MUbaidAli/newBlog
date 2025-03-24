// password filed and role field

import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RegisterAdmin({ userData, setIsUserId, fetchUsers }) {
  console.log(userData, "from userrr");
  const initialFormState = {
    name: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    phone: "",
    gender: "",
    DOB: "",
    password: "",
    role: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errorValidation, setErrorValidation] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  function handleChange(e) {
    // console.log(e.target.name, ":", e.   target.value)
    // ;
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorValidation({ ...errorValidation, [e.target.name]: "" });
  }

  useEffect(() => {
    setFormData({ ...userData });
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
    if (!formData.role.trim()) {
      errorObj.role = "Please Select a User Role";
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
    setIsLoading(true);
    try {
      if (!userData) {
        const res = await axios.post(
          "http://localhost:8484/api/user/adminRegister",
          formData,
          { withCredentials: true }
        );
        console.log(res);
        toast(res.data.message);
        navigate("/dashboard/manage-users");
      } else {
        console.log("thissss");
        const res = await axios.put(
          `http://localhost:8484/api/user/update/${formData._id}`,
          formData,
          { withCredentials: true }
        );
        console.log(res);
        setIsUserId(null);
        fetchUsers();
        toast(res.data.message);
        // navigate("/dashboard/manage-users");
      }
    } catch (error) {
      console.log(error);
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
      <h1 className="text-white text-4xl mb-10">Register Admin</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <div className=" pt-6 md:pt-0 w-full    flex justify-between items-center flex-row ">
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
              value={formData.lastName}
              onChange={handleChange}
              // value={"categoryName"}
              // onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Last Name..."
              className=" mx-3 border-white text-white outline-0 border-2    rounded-lg shadow px-10 py-3  my-2"
            />
          </div>
        </div>
        <div className=" pt-6 md:pt-0 w-full    flex justify-between items-center flex-row ">
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
          <div className="flex flex-col flex-1">
            <label htmlFor="role" className="mx-3 text-white ">
              User Role *
            </label>
            <select
              name="role"
              id="role"
              className=" mx-3 border-white text-white outline-0 border-2    rounded-lg shadow px-10 py-3  my-2"
              onChange={handleChange}
              value={formData.role}
            >
              <option value="" className="text-black">
                Select Role
              </option>
              <option value="Admin" className="text-black">
                Admin
              </option>
              <option value="Editor" className="text-black">
                Editor
              </option>
              <option value="User" className="text-black">
                User
              </option>
            </select>
            <p className="text-red-800 px-3 ">{errorValidation.role}</p>
          </div>
        </div>
        <div className=" pt-6 md:pt-0 w-full    flex justify-between items-center ">
          <div className="flex flex-col flex-1 ">
            <label htmlFor="email" className="mx-3 text-white">
              Email *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
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
        <div className=" pt-6 md:pt-0 w-full    flex justify-between items-center ">
          <div className="flex flex-col flex-1 ">
            <label htmlFor="DOB" className="mx-3 text-white">
              Date Of Birth
            </label>
            <input
              type="date"
              name="DOB"
              value={formData.DOB}
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
              value={formData.phone}
              onChange={handleChange}
              // value={"categoryName"}
              // onChange={(e) => setCategoryName(e.target.value)}
              placeholder="1824284722"
              className=" mx-3 border-white text-white outline-0 border-2    rounded-lg shadow px-10 py-3  my-2"
            />
          </div>
        </div>
        <div className=" pt-6 md:pt-0 w-full    flex justify-between items-center ">
          <div className="flex flex-col flex-1 ">
            <label htmlFor="country" className="mx-3 text-white">
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              value={formData.country}
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
              value={formData.address}
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
              {isLoading
                ? "Creating User"
                : userData
                ? "Edit User"
                : "Create User"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default RegisterAdmin;
