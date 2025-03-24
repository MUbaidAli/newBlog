import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import RegisterAdmin from "../components/RegisterAdmin";

function UserManagement() {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserId, setIsUserId] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  async function fetchUsers() {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:8484/api/user", {
        withCredentials: true,
      });
      // console.log(res.data.users);
      setUsersData(
        res.data.users.filter((curUser) => curUser._id !== user._id)
      );
    } catch (error) {
      // console.log(error);
      toast(error.messgae);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleDelete(id) {
    try {
      const res = await axios.delete(`http://localhost:8484/api/user/${id}`, {
        withCredentials: true,
      });
      //   console.log(res);
      toast("User Deleted");
      setUsersData((prevData) => prevData.filter((user) => user._id !== id));
    } catch (error) {
      //   console.log(error);
      toast(error.message);
    }
  }

  return (
    <>
      <div className="div flex justify-between items-center px-6">
        <h1 className="text-white text-5xl mb-4">Manage User</h1>

        <div className="h-7">
          <button
            onClick={() => navigate("/dashboard/create-user")}
            class="relative cursor-pointer inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-r from-[#A80F0F] to-[#2F7362] group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
          >
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              <i class="fa-solid fa-plus"></i> Add New User
            </span>
          </button>
        </div>
      </div>
      {isUserId && (
        <RegisterAdmin
          userData={isUserId}
          setIsUserId={setIsUserId}
          fetchUsers={fetchUsers}
        />
      )}
      {/* Table Container */}
      <div className="p-4 relative rounded-2xl w-[95%]">
        {isLoading ? (
          <Loader />
        ) : (
          <table className="w-full  text-white rounded-xl overflow-hidden">
            {/* Table Header */}
            <thead>
              <tr className="bg-gradient-to-r from-[#FF4242] to-[#99286C] text-left text-white">
                <th className="p-5">Name</th>
                <th className="p-5">Email</th>
                <th className="p-5">Role</th>
                <th className="p-5">Phone</th>
                {/* <th className="p-5">Published Date</th> */}

                {/* Added a header for actions */}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="border">
              {usersData.map((user) => (
                <tr key={user._id} className="border border-gray-700">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>

                  <td className="p-3">{user.phone || "Null"}</td>

                  {/* Actions Column */}
                  <div className="p-3 absolute">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          handleDelete(user._id);
                        }}
                        className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600"
                      >
                        🗑
                      </button>

                      <button
                        onClick={() => setIsUserId(user)}
                        className="bg-green-500 p-2 rounded-full text-white hover:bg-green-600"
                      >
                        ✏️
                      </button>
                    </div>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      ;
    </>
  );
}

export default UserManagement;
