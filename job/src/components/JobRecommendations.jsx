import React, { useEffect, useState } from "react";

const RecommendedJobs = ({ user }) => {
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      try {
        const response = await fetch("https://www.arbeitnow.com/api/job-board-api");
        const data = await response.json();
        
        if (!data.data || !Array.isArray(data.data)) {
          throw new Error("Unexpected API response structure");
        }

        // Assuming user has a list of applied job titles
        const appliedJobs = user?.appliedJobs || [];

        const filteredJobs = data.data.filter((job) =>
          appliedJobs.some((applied) =>
            job.title.toLowerCase().includes(applied.toLowerCase())
          )
        );

        setRecommendedJobs(filteredJobs);
      } catch (error) {
        console.error("Error fetching recommended jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedJobs();
  }, [user]);

  if (loading) return <p>Loading recommended jobs...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Recommended Jobs</h2>
      {recommendedJobs.length === 0 ? (
        <p>No recommendations yet.</p>
      ) : (
        <ul className="space-y-4">
          {recommendedJobs.map((job) => (
            <li key={job.slug} className="p-4 border rounded shadow">
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-gray-600">{job.company_name}</p>
              <p className="text-sm">{job.location}</p>
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Job
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecommendedJobs;
