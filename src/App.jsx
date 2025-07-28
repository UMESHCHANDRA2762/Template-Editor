import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import SetUp from "./components/SetUp";
import Compose from "./components/Compose";
import Finalize from "./components/Finalize";
import Dashboard from "./components/Dashboard";
import Documents from "./components/Documents";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="setup" element={<SetUp />} />
          <Route path="compose" element={<Compose />} />
          <Route path="finalize" element={<Finalize />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="documents" element={<Documents />} />

          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
