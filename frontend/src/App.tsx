import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Leaderboard from "./pages/Leaderboard";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

