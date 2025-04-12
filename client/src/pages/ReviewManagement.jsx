import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import ConfirmDialog from "../components/ConfirmDialog";
import Pagination from "../components/Pagination";
import API from "../utils/axiosInstance";

function ReviewManagement() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  async function fetchReviews(pageNumber = 1) {
    setIsLoading(true);
    try {
      const res = await API.get(`/review?page=${pageNumber}&limit=10`);
      setReviews(res.data.blog);
      setPages(res.data.pages);
      setPage(res.data.page);
      // console.log(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  function handlePageChange(newPage) {
    fetchReviews(newPage);
  }

  async function handleApprove(reviewId) {
    try {
      await API.put(`/review/reviews/${reviewId}`, {
        status: "Approved",
      });

      setReviews((prevReviews) => {
        // Update the status
        const updatedReviews = prevReviews.map((review) =>
          review._id === reviewId ? { ...review, status: "Approved" } : review
        );

        // Sort so pending comes first
        const statusOrder = { Pending: 0, Approved: 1, Rejected: 2 };
        updatedReviews.sort(
          (a, b) => statusOrder[a.status] - statusOrder[b.status]
        );

        return updatedReviews;
      });

      toast.success("Review Approved");
    } catch (error) {
      console.error("Error approving review:", error);
      toast.error("Failed to approve review");
    }
  }

  async function handleDeleteReview(id) {
    try {
      ConfirmDialog(async () => {
        await API.delete(`/review/${id}`);
        toast("Review Deleted");

        // Remove the deleted review from state without refetching
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== id)
        );
      });
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  }

  return (
    <>
      <h1 className="text-white text-5xl">Manage Reviews</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-4 relative rounded-2xl w-[95%]">
          <table className="w-full  text-white rounded-xl overflow-hidden">
            {/* Table Header */}
            <thead>
              <tr className="bg-gradient-to-r from-[#FF4242] to-[#99286C] text-left text-white">
                <th className="p-5 w-20">Client</th>
                <th className="p-5">Blog Title</th>
                <th className="p-5">Status</th>
                <th className="p-5">Rating</th>
                <th className="p-5">Review</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="border">
              {isLoading && <Loader />}
              {reviews?.map((rev) => (
                <tr key={rev._id} className="border border-gray-700">
                  <td className="p-3">{rev.name}</td>
                  <td className="p-3">{rev.blog.title}</td>
                  <td
                    className={`p-3 ${
                      rev.status === "Approved"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {rev.status}
                  </td>
                  <td className="p-3">{rev.rating}</td>
                  <td className="p-3">{rev.review}</td>

                  {/* Actions Column */}
                  <div className="p-3 absolute">
                    <div className="flex gap-2">
                      <button
                        className="bg-red-500 p-2 rounded-full w-10 h-10 text-white hover:bg-red-600 cursor-pointer"
                        onClick={() => {
                          handleDeleteReview(rev._id);
                        }}
                      >
                        <i class="fa-solid fa-xmark"></i>
                      </button>

                      <button
                        onClick={() => handleApprove(rev._id)}
                        className="bg-green-500 p-2 rounded-full text-white w-10 h-10 hover:bg-green-600 cursor-pointer"
                      >
                        <i class="fa-solid fa-check"></i>
                      </button>
                    </div>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-center items-center gap-2 mt-4">
        <Pagination
          pages={pages}
          handlePageChange={handlePageChange}
          page={page}
        />
        <p className="text-white">
          Page {page} of {pages}{" "}
        </p>
      </div>
    </>
  );
}

export default ReviewManagement;
