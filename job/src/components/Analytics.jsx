import React, { useEffect, useState } from "react";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const response = await fetch("https://www.arbeitnow.com/api/job-board-api");
      const result = await response.json();
      setAnalytics(result);
    };

    fetchAnalytics();
  }, []);

  if (!analytics) return <p className="text-center mt-10">Loading analytics...</p>;

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Job Post Analytics</h2>
      <div className="space-y-4">
        <div className="p-4 border rounded">
          <p className="text-gray-700">Total Views</p>
          <p className="text-xl font-bold">{analytics.totalViews}</p>
        </div>
        <div className="p-4 border rounded">
          <p className="text-gray-700">Total Applications</p>
          <p className="text-xl font-bold">{analytics.totalApplications}</p>
        </div>
        <div className="p-4 border rounded">
          <p className="text-gray-700">Total Recommendations</p>
          <p className="text-xl font-bold">{analytics.totalRecommendations}</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
