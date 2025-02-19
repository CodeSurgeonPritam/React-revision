import React, { useEffect, useState } from "react";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("https://www.arbeitnow.com/api/job-board-api");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Log the full API response
        
        // The job listings are now under `data`, not `data.jobs`
        if (Array.isArray(data.data)) {
          setJobs(data.data);
        } else {
          throw new Error("Unexpected response structure: 'data' is not an array");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p className="text-center">Loading jobs...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4 ">
      <h2 className="text-xl font-bold mb-4">Job Listings</h2>
      <ul className="space-y-4 grid grid-cols-3 gap-4">
        {jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <li key={job.slug || job.id} className="p-4 border rounded shadow ">
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
          ))
        )}
      </ul>
    </div>
  );
};

export default JobList;
