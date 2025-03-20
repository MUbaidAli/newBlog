import { NavLink } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <div className="mx-auto max-w-7xl md:px-10  px-5">
        {/* <h1 className="text-white">Dashboard</h1> */}

        <main className="flex justify-between ">
          <div className="dashboard-sidebar bg-white md:w-80 px-8 rounded-2xl my-5">
            <nav className="flex flex-col my-5">
              <NavLink
                to="/dashboard"
                className=" my-3 px-5 py-3 rounded text-white text-sm flex items-center"
              >
                <i class="fa-solid fa-house mr-5"></i>Dashboard
              </NavLink>

              <NavLink to="/blog ">Blog Management</NavLink>

              <NavLink to="/reviews">Review</NavLink>
              <NavLink to="/create">Add New Blog</NavLink>
            </nav>
          </div>

          {/* <form action=""></form> */}
          <div className="dashboard-header flex justify-between items-center h-20">
            <h1 className="text-white text-2xl">Welcome Back - Name </h1>
            <div class="w-full max-w-sm min-w-[200px]">
              <div class="relative">
                <input
                  class="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Search Blogs..."
                />
                <button
                  class="absolute top-1 right-1 flex items-center rounded bg-white py-1 px-2.5 border border-transparent text-center text-sm text-black transition-all  focus:shadow-none active:bg-slate-900 hover:bg-slate-300 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4 mr-2"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Search
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
