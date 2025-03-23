import { Link, Outlet, useLocation } from "react-router-dom";

function DashboardLayout() {
  const location = useLocation();
  // console.log(location);
  return (
    <>
      <div className="mx-auto max-w-8xl md:px-10  px-5">
        {/* <h1 className="text-white">Dashboard</h1> */}

        <main className="flex justify-between  ">
          <div className="dashboard-sidebar  flex-1 mx-3 bg-white md:w-75 sm:min-w-60 py-10  px-2 rounded-2xl my-5 flex flex-col items-center ">
            <div className="profile-pic ">
              <img
                src="./src/assets/profile.jpeg"
                alt=""
                className="h-40 w-40 object-cover rounded-full"
              />
            </div>

            <nav className="flex flex-col my-5 w-full px-7">
              <Link
                to="/dashboard"
                className={`${
                  location.pathname === "/dashboard"
                    ? "bg-gradient-to-r from-[#A80F0F] to-[#2F7362] text-white  "
                    : ""
                } my-1 px-5 py-3 rounded  text-[#2E2E2E] text-sm flex items-center hover:bg-gradient-to-r from-[#A80F0F] to-[#2F7362] hover:text-white`}
              >
                <i className="fa-solid fa-house mr-5"></i>Dashboard
              </Link>

              <Link
                to="/dashboard/manage-blog "
                className={`${
                  location.pathname === "/dashboard/manage-blog"
                    ? "bg-gradient-to-r from-[#A80F0F] to-[#2F7362] text-white  "
                    : ""
                } my-1 px-5 py-3 rounded  text-[#2E2E2E] text-sm flex items-center hover:bg-gradient-to-r from-[#A80F0F] to-[#2F7362] hover:text-white`}
              >
                <i class="fa-brands fa-blogger-b mr-5"></i> Blog Management
              </Link>
              <Link
                to="/dashboard/manage-category"
                className={`${
                  location.pathname === "/dashboard/manage-category"
                    ? "bg-gradient-to-r from-[#A80F0F] to-[#2F7362] text-white  "
                    : ""
                } my-1 px-5 py-3 rounded  text-[#2E2E2E] text-sm flex items-center hover:bg-gradient-to-r from-[#A80F0F] to-[#2F7362] hover:text-white`}
              >
                <i class="fa-solid fa-tags mr-5"></i> Categories
              </Link>
              <Link
                to="/dashboard/manage-reviews"
                className={`${
                  location.pathname === "/dashboard/manage-reviews"
                    ? "bg-gradient-to-r from-[#A80F0F] to-[#2F7362] text-white  "
                    : ""
                } my-1 px-5 py-3 rounded  text-[#2E2E2E] text-sm flex items-center hover:bg-gradient-to-r from-[#A80F0F] to-[#2F7362] hover:text-white`}
              >
                <i class="fa-solid fa-star-half-stroke mr-5"></i> Reviews
              </Link>
              <Link
                to="/dashboard/manage-users"
                className={`${
                  location.pathname === "/dashboard/manage-users"
                    ? "bg-gradient-to-r from-[#A80F0F] to-[#2F7362] text-white  "
                    : ""
                } my-1 px-5 py-3 rounded  text-[#2E2E2E] text-sm flex items-center hover:bg-gradient-to-r from-[#A80F0F] to-[#2F7362] hover:text-white`}
              >
                <i class="fa-solid fa-users mr-5"></i> Users
              </Link>

              <Link
                to="/dashboard/create-blog "
                className=" my-1 px-5 py-3 rounded bg-amber-300  text-sm flex items-center bg-gradient-to-r from-[#A80F0F] to-[#2F7362] text-white "
              >
                <i className="fa-solid fa-pen mr-5"></i>Add New blog
              </Link>
            </nav>
          </div>

          {/* <form action=""></form> */}
          <div className="dashboard-header flex-4 mx-3 my-5">
            <div className="flex justify-between h-20 w-full ">
              <h1 className="text-white text-2xl">Welcome Back - Name </h1>
              <div className="w-full max-w-sm min-w-[200px]">
                <div className="relative">
                  <input
                    className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="Search Blogs..."
                  />
                  <button
                    className="absolute top-1 right-1 flex items-center rounded bg-white py-1 px-2.5 border border-transparent text-center text-sm text-black transition-all  focus:shadow-none active:bg-slate-900 hover:bg-slate-300 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 mr-2"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div className="main-content">
              <div className="div  px-6">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default DashboardLayout;
