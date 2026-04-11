import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar"; 

import Attendance from "./pages/Attendance";
import About from "./pages/About";

// (optional if your teammates made them)
import Home from "./pages/Home";
import Events from "./pages/Events";
import Clubs from "./pages/Clubs";

function App() {
  return (
    <Router>
      <Navbar /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/clubs" element={<Clubs />} />

        <Route path="/attendance" element={<Attendance />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;