import { useEffect, useState } from "react";
import Button from "../components/Button";
import StarRating from "../components/StarRating";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Reviews({ blogId, rev }) {
  const { user } = useAuth();
  const [userRating, setUserRating] = useState(null);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //   console.log(review, userRating);
  // console.log(rev, "blog reviewss");
  async function handleSubmit(e) {
    e.preventDefault();
    // if (review.trim() === "") {
    //   return;
    // }

    const data = { rating: userRating, review, blog: blogId, name: user.name };
    // console.log(data);
    setIsLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:8484/api/review/${blogId}`,
        data
      );
      // console.log(res);
      setUserRating(null);
      setReview("");
      toast("Review Submited");
    } catch (error) {
      console.log(error);
      toast(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  //   no nned of this because first the review will be approved by admin not by default
  //   async function fetchReviews() {
  //     setIsLoading(true);
  //     try {
  //       const res = await axios.get("http://localhost:8484/api/review");
  //       console.log(res);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetch all reviews and rander it on the page
  //   delete review by same user
  //   alos create time base slider for homepage
  //   useEffect(() => {
  //     setReview("");
  //     fetchReviews();
  //   }, []);

  function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      // weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",

      hour12: true,
    });
  }

  return (
    <>
      <>
        <section className=" py-8 antialiased dark:bg-gray-900 md:py-16">
          <div className="mx-auto  px-4 2xl:px-0">
            {/* -------------------------------------------- */}
            {user && (
              <>
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
                      <form className="p-4 md:p-5" onSubmit={handleSubmit}>
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
                              value={review}
                              onChange={(e) => setReview(e.target.value)}
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
              </>
            )}
            {/* -------------------------------------------- */}
            <h1 className="text-white text-3xl font-bold">User Reviews</h1>
            <div className="flex flex-wrap">
              {rev.length > 0 ? (
                rev.map((item, i) => (
                  <>
                    <div className="w-150 my-6 gap-8 sm:flex sm:items-start md:my-8">
                      <div className="gap-3 py-6 sm:flex sm:items-start">
                        <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                          <div className="flex items-center gap-0.5">
                            <StarRating
                              ratingLength={5}
                              size="30"
                              staticRating={item.rating}
                            />
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-base font-semibold text-white capitalize">
                              {item.name}
                            </p>
                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                              {formatDate(item.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                          <p className="text-base font-normal text-gray-500 dark:text-gray-400 capitalize">
                            {item.review}
                          </p>
                        </div>
                      </div>
                      {/* <div className="mt-6 text-center">
                      <button
                        type="button"
                        className="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                        >
                        View more reviews
                        </button>
                        </div> */}
                    </div>
                  </>
                ))
              ) : (
                <>
                  <div className="mt-6 text-center">
                    <p
                      type="button"
                      className="mb-2 me-2   px-5 py-2.5 text-sm font-medium text-white    "
                    >
                      No Reviews For This Blog Post Be the first one to add a
                      Review
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
        {/* Add review modal */}
      </>
    </>
  );
}

export default Reviews;
