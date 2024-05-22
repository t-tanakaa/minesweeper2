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
  const clickHandler = (x: number, y: number) => {
    const newUserInputs = structuredClone(userInputs);
    const newBombMap = structuredClone(bombMap);
    newUserInputs[y][x] = 1;
    setUserInputs(newUserInputs);
    console.log(newUserInputs);
    const total = bombMap.flat().every((value) => value === 0);
    if (total === true) {
      for (let dy = 0; dy < 10; dy++) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        console.log(row, col);
        newBombMap[row][col] = 1;
        setBombMap(newBombMap);
      }
    }
    console.log(newBombMap);
  };

  const makeBoard = (userInput: number[][], bombMap: number[][]) => {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (userInput[y][x] === 1) {
          board[y][x] = 1;
        if (bombMap[y][x]===1)
          board[y][x] =11;
        }
      }
    }
  };

  //console.table(board);
  //console.table(normalBoard);

  makeBoard(userInputs, bombMap);
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
                style={{ backgroundPosition: ` ${-30 * (bomNumber - 1)}px 0px` }}
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
