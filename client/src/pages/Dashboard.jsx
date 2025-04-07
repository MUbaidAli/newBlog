import { useEffect, useState } from "react";
import DashboardCards from "../components/DashboardCards";
import axios from "axios";

function Dashboard() {
  const [summary, setSummary] = useState({
    publishedCount: 0,
    draftCount: 0,
    todayViews: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("http://localhost:8484/api/homepage/dash");
        console.log(res);
        setSummary(res.data);
      } catch (err) {
        console.error("Error fetching dashboard summary:", err);
      }
    };

    fetchSummary();
  }, []);

  return (
    <>
      <h1 className="text-white text-7xl">Dashboard</h1>;
      <DashboardCards />
    </>
  );
}

export default Dashboard;
