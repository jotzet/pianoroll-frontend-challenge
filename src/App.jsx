import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/mainstyle.css";
import AllRollsView from "./pages/AllRolls";
import MainRollView from "./pages/MainRoll";
import HomeView from "./pages/Home";
import Manual from "./pages/Manual";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<HomeView />} />
        <Route path="/manual" element={<Manual />} />
        <Route path="/pianorolls" element={<AllRollsView />} />
        <Route path="/pianorolls/:rollId" element={<MainRollView />} />
      </Routes>
    </Router>
  );
}

export default App;
