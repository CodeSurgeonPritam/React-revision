import React from "react";
import { useAuth } from "../context/AuthContext";

const RoleBasedAccess = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Welcome, {user.name}!</h2>
      <p className="text-gray-600">Role: <span className="font-semibold">{user.role}</span></p>

      {user.role === "recruiter" ? (
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Post a Job</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">Schedule Interview</button>
        </div>
      ) : (
        <p className="text-green-600">You can apply for jobs!</p>
      )}
    </div>
  );
};

export default RoleBasedAccess;
