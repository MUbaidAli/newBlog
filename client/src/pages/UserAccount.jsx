import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RegisterAdmin from "../components/RegisterAdmin";
import UpdateUserData from "../components/UpdateUserData";
import { useAuth } from "../context/AuthContext";

function UserAccount() {
  const { user, isLoading } = useAuth();

  //   console.log(!isLoading && user._id);
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl ">
        <UpdateUserData
          userData={!isLoading && user._id}
          setIsUserId={!isLoading && user._id}
          // fetchUsers={fetchUsers}
          user={!isLoading && user}
        />
      </div>
      <Footer />
    </>
  );
}

export default UserAccount;
