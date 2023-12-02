import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Login, JobTypes, Experience, Questions, Result } from "./pages/index";
import RouterOutlet from "./RouterOutlet";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RouterOutlet />}>
            <Route index element={<Login />} />
            <Route path="job-types" element={<JobTypes />} />
            <Route path="job-experience" element={<Experience />} />
            <Route path="interview-questions" element={<Questions />} />
            <Route path="interview-result" element={<Result />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
