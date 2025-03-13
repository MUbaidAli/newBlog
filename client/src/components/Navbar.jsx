// import { useState } from "react";
// // import { FaSearch, FaHeart } from "react-icons/fa";

import { useState } from "react";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-gradient-to-r from-black via-gray-900 to-black text-white p-4">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <h1 className="text-xl font-bold">Logo</h1>

//         {/* Menu Items */}
//         <ul className="flex space-x-6">
//           <li className="cursor-pointer">Home</li>
//           <li
//             className="relative cursor-pointer"
//             onMouseEnter={() => setIsOpen(true)}
//             onMouseLeave={() => setIsOpen(false)}
//           >
//             Categories ▼
//             {isOpen && (
//               <div className="absolute top-full left-0 mt-2 bg-white text-black rounded-lg shadow-lg p-4 grid grid-cols-3 gap-2 w-72">
//                 {[
//                   "Healthy Eating Tips",
//                   "Superfoods Benefits",
//                   "Weight Management",
//                   "Natural Remedies",
//                   "Productivity",
//                   "Sleep & Relaxation",
//                   "Yoga & Flexibility",
//                   "Mental Health",
//                   "Beauty & Skincare",
//                   "Lifestyle & Wellness",
//                   "Foods to Avoid",
//                 ].map((category, index) => (
//                   <button
//                     key={index}
//                     className="border border-red-400 text-red-500 px-2 py-1 rounded-md hover:bg-red-100 transition"
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </li>
//           <li className="cursor-pointer">Latest Posts</li>
//           <li className="cursor-pointer">About Us</li>
//           <li className="cursor-pointer">Contact</li>
//         </ul>

//         {/* Icons */}
//         <div className="flex space-x-4">
//           <i class="fa-solid fa-magnifying-glass"></i>
//           <i class="fa-solid fa-magnifying-glass"></i>
//           {/* <FaSearch className="cursor-pointer" /> */}
//           {/* <FaHeart className="cursor-pointer" /> */}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

function Navbar({ modelOpener }) {
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
  const [isOpen, setIsOpen] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  return (
    <>
      <nav className="">
        <div className=" navbar h-20  mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            className="block md:hidden"
            onClick={() => setIsDropDown(!isDropDown)}
          >
            {isDropDown ? (
              <i class="fa-solid fa-x"></i>
            ) : (
              <i class="fa-solid fa-bars"></i>
            )}
          </button>
          <div className="logo ">
            <h3>Logo</h3>
          </div>
          <div className="hidden md:block">
            <ul className="flex  ">
              <li className="mx-5">
                <a
                  href="#"
                  className="hover:bg-linear-65 from-red-500 to-pink-800 bg-clip-text hover:text-transparent"
                >
                  Home
                </a>
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
                <a
                  href="#"
                  className="hover:bg-linear-65 from-red-500 to-pink-800 bg-clip-text hover:text-transparent"
                >
                  Categories ▼{" "}
                  {isOpen && (
                    <div className="absolute  flex flex-wrap  w-150  py-5 bg-white text-black shadow-lg border rounded-lg border-white ">
                      {categories.map((item, i) => (
                        <a
                          key={i}
                          href="#"
                          className="border border-red-400  px-3 py-2 w-45 rounded-md my-1 mx-2 hover:bg-red-100 transition"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  )}{" "}
                </a>
              </li>
              <li className="mx-5">
                <a
                  href="#"
                  className="hover:bg-linear-65 from-red-500 to-pink-800 bg-clip-text hover:text-transparent"
                >
                  Latest Posts
                </a>
              </li>
              <li className="mx-5">
                <a
                  href="#"
                  className="hover:bg-linear-65 from-red-500 to-pink-800 bg-clip-text hover:text-transparent"
                >
                  About Us
                </a>
              </li>
              <li className="mx-5">
                <a
                  href="#"
                  className="hover:bg-linear-65 from-red-500 to-pink-800 bg-clip-text hover:text-transparent"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="icons flex ">
            <div className="search mx-3">
              <i
                class="fa-solid fa-magnifying-glass"
                onClick={() => modelOpener(true)}
              ></i>
            </div>
            <div className="user mx-3">
              <i class="fa-solid fa-user"></i>
            </div>
          </div>
        </div>

        {isDropDown && (
          <div className="md:hidden block">
            <ul className="flex flex-col items-center justify-between bg-gray  ">
              <li className="mx-5">
                <a
                  href="#"
                  className="hover:bg-linear-65 from-red-500 to-pink-800 bg-clip-text hover:text-transparent"
                >
                  Home
                </a>
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
                <a
                  href="#"
                  className="hover:bg-linear-65 from-red-500 to-pink-800 bg-clip-text hover:text-transparent"
                >
                  Categories ▼{" "}
                  {isOpen && (
                    <div className="absolute  flex flex-col  w-150  py-5 bg-white text-black shadow-lg border rounded-lg border-white ">
                      {categories.map((item, i) => (
                        <a
                          key={i}
                          href="#"
                          className="border border-red-400  px-3 py-2 w-45 rounded-md my-1 mx-2 hover:bg-red-100 transition"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  )}{" "}
                </a>
              </li>
              <li className="mx-5">
                <a
                  href="#"
                  className="hover:bg-linear-65 from-red-500 to-pink-800 bg-clip-text hover:text-transparent"
                >
                  Latest Posts
                </a>
              </li>
              <li className="mx-5">
                <a
                  href="#"
                  className="hover:bg-linear-65 from-red-500 to-pink-800 bg-clip-text hover:text-transparent"
                >
                  About Us
                </a>
              </li>
              <li className="mx-5">
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
      </nav>
    </>
  );
}

export default Navbar;
