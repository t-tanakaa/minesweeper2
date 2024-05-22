import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const normalBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const [userInputs, setUserInputs] = useState(normalBoard);
  const [bombMap, setBombMap] = useState(normalBoard);
  const board = normalBoard.map((row) => row.map(() => -1));
  const newUserInputs = structuredClone(userInputs);
  const newBombMap = structuredClone(bombMap);
  const clickHandler = (x: number, y: number) => {
    newUserInputs[y][x] = 1;
    setUserInputs(newUserInputs);
    console.log(newUserInputs);
    makeBoard(newUserInputs, newBombMap)
  };

  const makeBoard = (userInput, bombMap) => {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (userInputs[y][x] === 1) board[y][x] = 1;
      }
    }
    return board;
  };

  console.table(board);
  console.table(normalBoard);

  return (
    <div className={styles.container}>
      <div className={styles.flame}>
        <div className={styles.board}>
          {board.map((row, y) =>
            row.map((bomNumber, x) => (
              <div
                className={styles.bombMap}
                key={`${x}-${y}`}
                onClick={() => clickHandler(x, y)}
                style={{ backgroundPosition: ` ${-30 * bomNumber}px 0px` }}
              >
                {bomNumber === -1 && (
                  <div
                    className={styles.cell}
                    key={`${x}-${y}`}
                    onClick={() => clickHandler(x, y)}
                  />
                )}
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
