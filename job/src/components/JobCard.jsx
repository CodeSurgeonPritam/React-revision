import React from "react";

const JobCard = ({ job }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{job.title}</h2>
      <p>{job.company_name}</p>
      <p>{job.location}</p>
      <a href={job.url} className="text-blue-500" target="_blank">View Job</a>
    </div>
  );
};

export default JobCard;
