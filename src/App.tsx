import React, { useState } from "react";

import "./App.css";
import Button from "./features/game/button/Button";
import { Cell } from "./features/game/button/buttonInterface";
const ENDPOINT = "wss://hometask.eg1236.com/game1/";
const webSocket = new WebSocket(ENDPOINT);

webSocket.onopen = () => {
  console.log("CON open");
};

function App() {
  const [cells, setCells] = useState<Cell[]>([]);
  const [level, setLevel] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);

  /* Setting Styles to the grid */

  const handleStyles = () => {
    let style = "grid ";
    let gridLevel =
      level === 1
        ? "grid1"
        : level === 2
        ? "grid2"
        : level === 3
        ? "grid3"
        : "grid4";
    return style + gridLevel;
  };

  /* Button Handlers */

  const handleOnClickHelp = (e: React.MouseEvent<HTMLElement>) => {
    webSocket.send("help");
  };

  const handleOnClickNew = (e: React.MouseEvent<HTMLElement>) => {
    let target = e.target as HTMLButtonElement;
    let value = target.value;
    switch (value) {
      case "1":
        webSocket.send("new 1");
        break;
      case "2":
        webSocket.send("new 2");
        break;
      case "3":
        webSocket.send("new 3");
        break;
      case "4":
        webSocket.send("new 4");
        break;
    }
    setLoading(true);
  };

  const handleOnClickMap = (e: React.MouseEvent<HTMLElement>) => {
    webSocket.send("map");
  };

  const buttonClicked = (e: React.MouseEvent<HTMLElement>) => {
    let target = e.target as HTMLInputElement;
    console.log(e.target);
    if (target.value) {
      webSocket.send("open " + target.value);
      webSocket.send("map");
    }
  };

  webSocket.onmessage = function (event) {
    if (event.data.includes("new")) {
      handleNewGame();
    } else if (event.data.includes("map")) {
      handleMap(event.data);
    }
  };

  /* State Handlers */

  const handleNewGame = () => {
    console.log("newGame");
  };
  const handleMap = (map: string) => {
    parseMap(map);
  };

  const parseMap = (map: string) => {
    map.length === 115
      ? setLevel(1)
      : map.length === 825
      ? setLevel(2)
      : map.length === 5055
      ? setLevel(3)
      : setLevel(4);
    let matrix: string[][];
    matrix = [];
    let one_dim_matrix: Cell[] = [];

    let rows = map.split(":")[1].trim().split("\n");
    // show dimensions

    for (let i = 0; i < rows.length; i++) {
      let row = rows[i].split("");
      matrix.push(rows[i].split(""));
      for (let j = 0; j < row.length; j++) {
        one_dim_matrix.push({
          x: j,
          y: i,
          value: row[j],
        });
      }
    }

    setCells(one_dim_matrix);
    setLoading(false);
  };

  const renderRows = () => {
    if (!!cells) {
      return cells.map((element, index) => (
        <Button key={index} {...element} buttonClicked={buttonClicked}></Button>
      ));
    }
  };

  return (
    <div className="App">
      <h1>Welcome to Minesweeper</h1>

      <button onClick={handleOnClickHelp}>Help</button>
      <button onClick={handleOnClickNew} value="1">
        L 1
      </button>
      <button onClick={handleOnClickNew} value="2">
        L 2
      </button>
      <button onClick={handleOnClickNew} value="3">
        L 3
      </button>
      <button onClick={handleOnClickNew} value="4">
        L 4
      </button>
      <button onClick={handleOnClickMap}>Map</button>
      {!loading && <div className={handleStyles()}>{renderRows()}</div>}
      {loading && (
        <p>Loading the grid, please select the level and press "Map"</p>
      )}
    </div>
  );
}

export default App;
