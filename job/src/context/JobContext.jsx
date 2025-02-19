import { createContext, useContext, useEffect, useState } from "react";
import { fetchJobs } from "../api/job.js"; // Correct import path

const JobContext = createContext(null);

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const jobsData = await fetchJobs();
        setJobs(jobsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  return (
    <JobContext.Provider value={{ jobs, loading, error }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === null) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};
