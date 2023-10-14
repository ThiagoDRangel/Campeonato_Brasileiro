import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Leaderboard from "./pages/Leaderboard";
import MatchSettings from "./pages/MatchSettings";
import Games from "./pages/Games";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="matches/settings" element={<MatchSettings />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="/matches" element={<Games />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

