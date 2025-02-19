import { createContext, useContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate a logged-in user (for testing)
    const timer = setTimeout(() => {
      setUser({ name: "Test Recruiter", role: "recruiter" }); // Change role to "job-seeker" to test
    }, 1000);

    // Cleanup the timeout on component unmount
    return () => clearTimeout(timer);
  }, []);

  const authValue = useMemo(() => ({ user, setUser }), [user]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
