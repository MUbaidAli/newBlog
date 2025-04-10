import axios from "axios";
import { useEffect, useState } from "react";
import LatestBlog from "./LatestBlog";
import SearchResults from "./SearchResults";

function Model({ children, modelOpener }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  // function handleChange(e) {
  //   // console.log(e.target.value);
  // }
  // console.log(query);

  useEffect(() => {
    if (query.trim() === "") {
      setResult([]);
      return;
    }

    async function getSearchResult() {
      const res = await axios.get(
        `http://localhost:8484/api/blogs/search?query=${query}`,
        { withCredentials: true }
      );
      // console.log(res);
      setResult(res.data);
    }

    const debounceTimeout = setTimeout(getSearchResult, 300);
    return () => clearTimeout(debounceTimeout);
    // getSearchResult();
  }, [query]);

  return (
    <>
      <div
        className="relative z-999999 "
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
          aria-hidden="true"
        />
        <div className="fixed inset-0 z-10 w-screen h-200 overflow-y-scroll ">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <i
                  className="fa-solid fa-x flex justify-end cursor-pointer my-4"
                  style={{ display: "flex" }}
                  onClick={() => modelOpener(false)}
                ></i>
                <div className=" sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    {/* conplete logic */}
                    <form className="max-w-md mx-auto">
                      <label
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                      >
                        Search
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                          </svg>
                        </div>
                        <input
                          type="search"
                          id="default-search"
                          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Search Blogs..."
                          required
                          onChange={(e) => {
                            setQuery(e.target.value);
                          }}
                        />
                        <button
                          type="submit"
                          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Search
                        </button>
                      </div>
                    </form>
                    {result.length > 0 && (
                      <div className="text-black">
                        <SearchResults blogData={result} />
                      </div>
                    )}
                    {!result.length && (
                      <>
                        <div className=" flex flex-col  justify-center">
                          <div
                            className=" bg-red-100 border border-red-400 text-red-700 px-4 py-5 rounded relative my-5"
                            role="alert"
                          >
                            <span className="block sm:inline">
                              No Blog Found Try Searching Something New
                            </span>
                          </div>
                        </div>
                        {/* search logic end  */}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Model;
