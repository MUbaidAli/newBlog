import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";

function AccountLayout() {
  const location = useLocation();

  if (location.pathname === "/account" || location.pathname === "/account/") {
    return <Navigate to="/account/login" replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}

export default AccountLayout;
