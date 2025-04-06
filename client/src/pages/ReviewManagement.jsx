import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import ConfirmDialog from "../components/ConfirmDialog";

function ReviewManagement() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:8484/api/review");
        setReviews(res.data.blog);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReviews();
  }, []);

  async function handleApprove(reviewId) {
    try {
      await axios.put(`http://localhost:8484/api/reviews/${reviewId}`, {
        status: "Approved",
      });

      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === reviewId ? { ...review, status: "Approved" } : review
        )
      );

      toast.success("Review Approved");
    } catch (error) {
      console.error("Error approving review:", error);
      toast.error("Failed to approve review");
    }
  }

  async function handleDeleteReview(id) {
    try {
      ConfirmDialog(async () => {
        await axios.delete(`http://localhost:8484/api/reviews/${id}`);
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
                  <td className="p-3">{rev.status}</td>
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
    </>
  );
}

export default ReviewManagement;
