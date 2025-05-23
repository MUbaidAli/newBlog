// import { useState } from "react";
// // import { FaSearch, FaHeart } from "react-icons/fa";

import { useEffect, useState } from "react";
import HrLine from "./HrLine";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { toast } from "react-toastify";
import axios from "axios";
import Model from "./Model";
import BlogCard from "./BlogCard";
import API from "../utils/axiosInstance";
function Navbar() {
  const categories = [
    "Healthy Eating Tips",
    "Superfoods Benefits",
    "Weight Management",
    "Natural Remedies",
    "Productivity",
    "Sleep & Relaxation",
    "Yoga & Flexibility",
    "Mental Health",
    "Beauty & Skincare",
    "Lifestyle & Wellness",
    "Foods to Avoid",
  ];
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const [pos, setPos] = useState("top");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [allCategory, setAllCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchCategories() {
    setIsLoading(true);

    try {
      const res = await API.get("/category", { withCredentials: false });
      // console.log(res.data);
      setAllCategory(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  // console.log(user, "user");

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const res = await API.get("/user/me");
        console.log(res.data.user, "responsee");
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      let scrolled = document.scrollingElement.scrollTop;
      // console.log(scrolled);
      // console.log(pos);
      if (scrolled >= 5 && scrolled <= 700) {
        setPos("moved");
      } else if (scrolled >= 701) {
        setPos("show");
      } else {
        setPos("top");
      }
    });
  }, []);

  async function handleLogout() {
    try {
      // console.log("called");
      const res = await API.post("/user/logout", {});
      // console.log(res);
      navigate("/");
      setUser(null);
      toast("User Logged Out");
    } catch (error) {
      toast("Logout Failed");
    }
  }
  return (
    <>
      <nav
        className={`${pos == "moved" ? "hidden" : ""} 
        ${
          pos == "show" &&
          " bg-[oklch(0.87 0.01 258.34 / 0.8)]  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 "
        } fixed z-100 w-full text-white `}
      >
        <div className=" navbar h-20  mx-auto max-w-7xl px-6  sm:px-6 lg:px-8 flex items-center justify-between ">
          <button
            className="block md:hidden"
            onClick={() => setIsDropDown(!isDropDown)}
          >
            {isDropDown ? (
              <i className="fa-solid fa-x cursor-pointer"></i>
            ) : (
              <i className="fa-solid fa-bars cursor-pointer"></i>
            )}
          </button>
          <div className="logo ">
            <h3>Logo</h3>
          </div>
          <div className="hidden md:block">
            <ul className="flex  ">
              <li className="mx-5">
                <NavLink
                  to="/"
                  className="hover:bg-linear-65 from-red-500 to-pink-800 bg-clip-text hover:text-transparent"
                >
                  Home
                </NavLink>
              </li>
              <li
                className="mx-5"
                onMouseEnter={() => {
                  setIsOpen(true);
                }}
                onMouseLeave={() => {
                  setIsOpen(false);
                }}
              >
                <NavLink
                  to="/posts"
                  className="hover:bg-linear-65 from-red-500 to-pink-800 bg-clip-text hover:text-transparent"
                >
                  {/* {console.log(allCategory)} */}
                  Categories ▼{" "}
                  {isOpen && (
                    <div className="absolute  flex flex-wrap  w-150  py-5 bg-white text-black shadow-lg border rounded-lg border-white ">
                      {allCategory.map((item, i) => (
                        <Link
                          to={`/category/${item._id}?${item.name}`}
                          key={i}
                          className="border border-red-400 px-3 py-2
                          w-45 rounded-md my-1 mx-2 hover:bg-red-100 transition"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}{" "}
                </NavLink>
              </li>
              <li className="mx-5">
                <NavLink
                  to="/posts"
                  className="hover:bg-linear-65 from-red-500 to-pink-800 bg-clip-text hover:text-transparent"
                >
                  Latest Posts
                </NavLink>
              </li>
              <li className="mx-5">
                <NavLink
                  to="/about"
                  className="hover:bg-linear-65 from-red-500 to-pink-800 bg-clip-text hover:text-transparent"
                >
                  About Us
                </NavLink>
              </li>
              <li className="mx-5">
                <NavLink
                  to="/contact"
                  className="hover:bg-linear-65 from-red-500 to-pink-800 bg-clip-text hover:text-transparent"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="icons flex  items-center">
            <div className="search mx-3">
              <i
                className="fa-solid fa-magnifying-glass cursor-pointer"
                onClick={() => setIsModelOpen(true)}
              ></i>
            </div>
            <div className="user mx-3">
              {user && (
                <div className="relative">
                  <img
                    onClick={() => {
                      setIsProfileClicked(!isProfileClicked);
                    }}
                    class="cursor-pointer w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                    src={user.image.imageUrl}
                    alt="Default avatar"
                  ></img>
                  {isProfileClicked && (
                    <div className="flex flex-col  absolute top-10 right-2 mt-6 z-100 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-35 dark:bg-gray-700">
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        {user.role != "User" && (
                          <li>
                            <Link
                              to="/dashboard"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Dashboard
                            </Link>
                          </li>
                        )}
                        <li>
                          <Link
                            to="/setting"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Settings
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={handleLogout}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                  {/* <i
                    className="fa-solid fa-right-from-bracket cursor-pointer"
                    onClick={handleLogout}
                  ></i> */}
                </div>
              )}

              {!user && (
                <Link to={"/account"}>
                  <i className="fa-solid fa-user"></i>
                </Link>
              )}
            </div>
          </div>
        </div>

        {isDropDown && (
          <div
            className={`${
              isDropDown &&
              "bg-[oklch(0.87 0.01 258.34 / 0.8)]  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 "
            } fixed z-100 w-full text-white"} md:hidden block `}
          >
            <ul className="flex flex-col items-center justify-between bg-gray navBar ">
              <li className="mx-5 hover:bg-linear-65  from-red-500 to-pink-800 bg-clip-text hover:text-transparent cursor-pointer">
                <a
                  href="#"
                  className="hover:bg-linear-65  from-red-500 to-pink-800 bg-clip-text hover:text-transparent"
                >
                  Home
                </a>
              </li>
              <li
                className="mx-5 mx-5 hover:bg-linear-65  from-red-500 to-pink-800 bg-clip-text hover:text-transparent cursor-pointer"
                onMouseEnter={() => {
                  setIsOpen(true);
                }}
                onMouseLeave={() => {
                  setIsOpen(false);
                }}
              >
                <a
                  href="#"
                  className="hover:bg-linear-65 from-red-500 to-pink-800 bg-clip-text hover:text-transparent"
                >
                  Categories ▼{" "}
                  {isOpen && (
                    <div className="absolute  flex sm:flex-col flex-wrap  w-100  py-5 bg-white text-black shadow-lg border rounded-lg border-white ">
                      {categories.map((item, i) => (
                        <Link
                          to={`/category/${item._id}?${item.name}`}
                          key={i}
                          className="border border-red-400  px-3 py-2 w-45 rounded-md my-1 mx-2 hover:bg-red-100 transition"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  )}{" "}
                </a>
              </li>
              <li className="mx-5  hover:bg-linear-65  from-red-500 to-pink-800 bg-clip-text hover:text-transparent cursor-pointer">
                <a
                  href="#"
                  className="hover:bg-linear-65 from-red-500 to-pink-800 bg-clip-text hover:text-transparent"
                >
                  Latest Posts
                </a>
              </li>
              <li className="mx-5 hover:bg-linear-65  from-red-500 to-pink-800 bg-clip-text hover:text-transparent cursor-pointer">
                <a
                  href="#"
                  className="hover:bg-linear-65 from-red-500 to-pink-800 bg-clip-text hover:text-transparent"
                >
                  About Us
                </a>
              </li>
              <li className="mx-5 hover:bg-linear-65  from-red-500 to-pink-800 bg-clip-text hover:text-transparent cursor-pointer">
                <a
                  href="#"
                  className="hover:bg-linear-65 from-red-500 to-pink-800 bg-clip-text hover:text-transparent"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}

        {pos == "show" && <HrLine width={"4"} />}
        {/* <hr className="h-[4px] bg-gradient-to-r from-[#FF4242] to-[#99286C] border-0" /> */}
      </nav>

      {isModelOpen && <Model modelOpener={setIsModelOpen}></Model>}
    </>
  );
}

export default Navbar;
