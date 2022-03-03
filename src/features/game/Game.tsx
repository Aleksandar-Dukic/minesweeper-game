import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  /*   incrementIfOdd, */
  selectStatus,
} from "./gameSlice";
import styles from "./Game.module.css";

export function Game() {
  const count = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let button = e.target as HTMLButtonElement;
    console.log(button.value);
  };

  return (
    <div>
      <button onClick={handleOnClick} value="1">
        L1
      </button>
      <button onClick={handleOnClick} value="2">
        L2
      </button>
      <button onClick={handleOnClick} value="3">
        L3
      </button>
      <button onClick={handleOnClick} value="4">
        L4
      </button>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        {/*         <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button> */}
      </div>
    </div>
  );
}
