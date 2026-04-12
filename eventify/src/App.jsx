import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/About';
import Attendance from './pages/Attendance';
import Clubs from './pages/Clubs';
import Events from './pages/Events';
import Home from './pages/Home';

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
