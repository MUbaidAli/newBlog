import { useEffect, useState } from "react";
import DashboardCards from "../components/DashboardCards";
import axios from "axios";
import WeeklyViewsChart from "../components/Chart";

function Dashboard() {
  const [summary, setSummary] = useState({
    publishedCount: 0,
    draftCount: 0,
    todayViews: 0,
    weeklyViews: [],
    blogData: [],
  });

  const [viewsData, setViewsData] = useState([]);

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
      <div className="flex flex-wrap flex-col lg:flex-row justify-between md:w-full">
        <div className="flex-1 lg:flex-2">
          <DashboardCards summary={summary} />
          <div>
            <WeeklyViewsChart viewsData={summary.weeklyViews} />
          </div>
        </div>
        {/* blog summary */}
        <div className="flex-1">
          <div className="p-4 relative rounded-2xl w-[95%]">
            <table className="w-full  text-white rounded-xl overflow-hidden">
              {/* Table Header */}
              <thead>
                <tr className="bg-gradient-to-r from-[#FF4242] to-[#99286C] text-left text-white">
                  <th className="p-5">Blog Title</th>
                  <th className="p-5">Date</th>
                  <th className="p-5">Views</th>

                  {/* Added a header for actions */}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="border">
                {summary.blogData.map((blog) => (
                  <tr key={blog.id} className="border border-gray-700">
                    <td className="p-3">{blog.title}</td>

                    <td className="p-3">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-3">{blog.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
