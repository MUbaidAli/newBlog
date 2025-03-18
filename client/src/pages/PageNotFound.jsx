import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";

function PageNotFound() {
  return (
    <>
      <Navbar />

      <main className="flex items-center justify-center w-full min-h-screen py-8 text-white page md:py-16 ">
        <div className="relative flex flex-col items-center w-full gap-8 px-8 md:px-18 xl:px-40 md:gap-16">
          <h1 className="text-9xl md:text-[300px] w-full select-none  text-center font-black  text-gray-400">
            404
          </h1>
          <p className="text-3xl font-bold capitalize text-white">
            You have discovered a secret place
          </p>
          <p className="text-2xl font-medium break-words text-dull">
            Unfortunately, this is only a 404 page. You may have mistyped the
            address, or the page has been moved to another URL.
          </p>
          <div className="flex flex-col justify-between w-full gap-8 md:flex-row md:gap-32 xl:px-16">
            <NavLink
              to="/"
              className="flex items-center justify-center w-full gap-4 p-3 font-semibold capitalize border-2 border-blue-500 rounded shadow-lg md:w-fit hover:bg-blue-500 md:p-6 focus:outline-none hover:scale-105 active:scale-90 hover:shadow-xl "
            >
              Go back to Previous Page
            </NavLink>
            <NavLink
              to="/"
              className="rounded flex w-full md:w-fit group items-center gap-4 justify-center border-2 border-green-500 font-semibold hover:bg-green-500 p-3 md:p-6 capitalize focus:outline-none hover:scale-105 active:scale-90 shadow-lg hover:shadow-xl "
            >
              {/* <span className="material-symbols-outlined">home</span> */}
              Go back to Home Page
            </NavLink>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
export default PageNotFound;
