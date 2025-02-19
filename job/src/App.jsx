import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import JobList from "./components/JobList";
import RoleBasedAccess from "./components/RoleBasedAccess";
import InterviewScheduler from "./components/InterviewScheduler";
import Analytics from "./components/Analytics";
import { AuthProvider } from "./context/AuthContext";
import { JobProvider } from "./context/JobContext";
import Navbar from "./components/Naavbar";

function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/role-access" element={<RoleBasedAccess />} />
            <Route path="/schedule" element={<InterviewScheduler />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </Router>
      </JobProvider>
    </AuthProvider>
  );
}

export default App;
