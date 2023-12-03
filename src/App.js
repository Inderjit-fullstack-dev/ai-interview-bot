import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
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

            <Route path="*" element={<Navigate to="/" />} />
          </Route>

          <Route element={<QuesiontsRouterOutlet />}>
            <Route path="interview-questions" element={<Questions />} />
            <Route path="interview-result" element={<Result />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

function QuesiontsRouterOutlet() {
  return (
    <div className="main-container-2">
      <Outlet />
    </div>
  );
}

export default App;
