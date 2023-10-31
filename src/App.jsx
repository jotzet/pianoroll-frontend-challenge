import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./main.css";
import AllRollsView from "./views/AllRollsView";
import MainRollView from "./views/MainRollView";
import HomeView from "./views/HomeView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<HomeView />} />
        <Route path="/pianorolls" element={<AllRollsView />} />
        <Route path="/pianorolls/:rollId" element={<MainRollView />} />
      </Routes>
    </Router>
  );
}

export default App;
