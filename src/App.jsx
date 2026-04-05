import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup"; // Make sure this path is correct!

function App() {
  return (
    <Router>
      <Routes>
        {/* This line is the "Home" path. It makes Signup show up at localhost:5173/ */}
        <Route path="/" element={<Signup />} />
        
        {/* This makes it show up at localhost:5173/signup */}
        <Route path="/signup" element={<Signup />} />

        {/* Temporary placeholder for Login to prevent crashes */}
        <Route path="/login" element={<div className="p-10">Login Page Placeholder</div>} />
      </Routes>
    </Router>
  );
}

export default App;