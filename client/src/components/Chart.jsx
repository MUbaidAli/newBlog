import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow text-sm">
        <p className="font-semibold">Date: {label}</p>
        <p>Views: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const WeeklyViewsChart = ({ viewsData }) => {
  // console.log(viewsData, "from Chart");
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Weekly Blog Views</h2>
      <ResponsiveContainer width="100%" height={300}>
        {/* Chart goes here */}
        <BarChart
          data={viewsData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF4242" />
              <stop offset="100%" stopColor="#99286C" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#888" }}
            axisLine={{ stroke: "#ccc" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#888" }}
            axisLine={{ stroke: "#ccc" }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            r={20}
            y={20}
            dataKey="views"
            barSize={30}
            fill="url(#barGradient)"
            radius={[20, 20, 20, 20]}
            background={{ fill: "#F2F7FF" }}
            rx={8}
            ry={8}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyViewsChart;
