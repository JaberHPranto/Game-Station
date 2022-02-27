import "antd/dist/antd.min.css";
import { Route, Routes } from "react-router-dom";
import VideoGameDetails from "./components/VideoGames/VideoGameDetails";
import VideoGamesHome from "./components/VideoGames/VideoGamesHome";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<VideoGamesHome />} />
        <Route path="/game/:id" element={<VideoGameDetails />} />
      </Routes>
    </div>
  );
}

export default App;
