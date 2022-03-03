import React from "react";

import { Game } from "./features/game/Game";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Welcome to Minesweeper</h1>
      {/* level picker */}
      {/* map */}
      <Game />
    </div>
  );
}

export default App;
