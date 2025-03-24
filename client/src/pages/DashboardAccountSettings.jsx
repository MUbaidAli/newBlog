import axios from "axios";
import { useEffect, useState } from "react";
import RegisterAdmin from "../components/RegisterAdmin";
import { toast } from "react-toastify";

function DashboardAccountSettings() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  async function fetchCurrentUserData() {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:8484/api/user/me", {
        withCredentials: true,
      });
      // console.log(res.data.user);
      setData(res.data.user);
    } catch (error) {
      toast(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchCurrentUserData();
  }, []);

  return (
    <>
      <h1 className="text-white text-5xl">Settings</h1>

      {!isLoading && (
        <RegisterAdmin
          userData={data}
          setIsUserId={setData}
          fetchUsers={fetchCurrentUserData}
        />
      )}
    </>
  );
}

export default DashboardAccountSettings;
