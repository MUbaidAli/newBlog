import { useState } from "react";
import Button from "../components/Button";
import StarRating from "../components/StarRating";

function Reviews() {
  const [useRating, setUserRating] = useState(null);

  return (
    <>
      <>
        <section className=" py-8 antialiased dark:bg-gray-900 md:py-16">
          <div className="mx-auto  px-4 2xl:px-0">
            {/* -------------------------------------------- */}
            <div
              id="review-modal"
              tabIndex={-1}
              aria-hidden="true"
              className="  w-full flex items-center justify-center overflow-y-auto overflow-x-hidden "
            >
              <div className=" max-h-full w-full max-w-2xl p-4">
                {/* Modal content */}
                <div className=" rounded-lg  shadow dark:bg-gray-800">
                  {/* Modal header */}
                  <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-700 md:p-5">
                    <div>
                      <h3 className="mb-1 text-lg font-semibold text-white">
                        Add a review:
                      </h3>
                    </div>
                  </div>
                  {/* Modal body */}
                  <form className="p-4 md:p-5">
                    <div className="mb-4 grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <div className="">
                          <div className="">
                            <StarRating
                              ratingLength={5}
                              size="30"
                              onSet={setUserRating}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="title"
                          className="block text-sm/6 font-medium text-white"
                        >
                          Review title
                        </label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          className=" border-white text-white outline-0 border-2  w-full justify-center text-left rounded-lg shadow px-10 py-3 flex items-center my-5"
                          placeholder="Enter Title"
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="description"
                          className="block text-sm/6 font-medium text-white"
                        >
                          Review description
                        </label>
                        <textarea
                          id="description"
                          rows={6}
                          className=" border-white text-white outline-0 border-2  w-full justify-center text-left rounded-lg shadow px-10 py-3 flex items-center my-5"
                          required=""
                          defaultValue={""}
                          placeholder="Some description..."
                        />
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-4 dark:border-gray-700 md:pt-5">
                      <Button>Submit Review</Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* -------------------------------------------- */}
            <div className="my-6 gap-8 sm:flex sm:items-start md:my-8">
              <div className="gap-3 py-6 sm:flex sm:items-start">
                <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                  <div className="flex items-center gap-0.5">
                    <svg
                      className="h-4 w-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="h-4 w-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="h-4 w-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="h-4 w-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="h-4 w-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-base font-semibold text-white">
                      Neil Sims
                    </p>
                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      November 18 2023 at 15:35
                    </p>
                  </div>
                </div>
                <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    I replaced my 11 year old iMac with the new M1 Apple. I
                    wanted to remain with Apple as my old one is still working
                    perfectly and all Apple products are so reliable. Setting up
                    was simple and fast and transferring everything from my
                    previous iMac worked perfectly.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                type="button"
                className="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                View more reviews
              </button>
            </div>
          </div>
        </section>
        {/* Add review modal */}
      </>
    </>
  );
}

export default Reviews;
