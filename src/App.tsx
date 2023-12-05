import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter as Router
import { Suspense, lazy } from "react";

import Display from "./pages/display";
const Settings = lazy(() => import("./pages/settings"));
const NotFound = lazy(() => import("./pages/404"));


function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<p> Loading resource from server...</p>}>
          <Routes>
            <Route path="/" element={<Settings />} />
            <Route path="/display" element={<Display />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
