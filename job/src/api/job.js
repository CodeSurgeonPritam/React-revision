// src/api/job.js

export const fetchJobs = async () => {
  try {
    const response = await fetch("https://www.arbeitnow.com/api/job-board-api");
    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }
    const data = await response.json();
    console.log("Fetched data:", data); // Log the full API response
    // Check if jobs exists and is an array
    if (data && Array.isArray(data.jobs)) {
      return data.jobs;
    } else {
      throw new Error("Unexpected response structure: 'jobs' is not an array");
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
