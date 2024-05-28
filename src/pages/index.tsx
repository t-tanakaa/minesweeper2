import { useState } from 'react';
import styles from './index.module.css';
const directions = [
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
];

const deployment = (bombMap: number[][], y: number, x: number, newBombMap: number[][]) => {
  const total = bombMap.flat().every((value) => value === 0);
  if (total === true) {
    bomb(y, x, newBombMap);
    numberSelect(newBombMap);
  }
};

const bomb = (y: number, x: number, newBombMap: number[][]) => {
  let n = 0;
  while (10 > n) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    console.log(row, col);
    if (newBombMap[row][col] !== -1 && y !== row && x !== col) {
      newBombMap[row][col] = -1;
      n++;
    }
  }
  return bomb;
};

const numberSelect = (newBombMap: number[][]) => {
  for (let dy = 0; dy < 9; dy++) {
    for (let dx = 0; dx < 9; dx++) {
      if (newBombMap[dy][dx] === -1) {
        continue;
      }
      for (const direction of directions) {
        if (
          newBombMap[dy + direction[0]] !== undefined &&
          newBombMap[dy + direction[0]][dx + direction[1]] === -1
        ) {
          newBombMap[dy][dx] += 1;
        }
      }
    }
  }
};

// const chain =(x:number, y:number ,bombMap:[][],board:number[][])=>{
//   for (const direction of directions){
//     if (
//       bombMap[y + direction[0]] !== undefined &&
//       bombMap[y + direction[0]][x + direction[1]] === 0
//     ){
//       board[y + direction[0]][x + direction[1]] === 0
//       if
//     }
//   }
// }

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
    deployment(bombMap, y, x, newBombMap);
    setBombMap(newBombMap);
    console.table(bombMap);
    console.table(board);
  };

  const makeBoard = (userInput: number[][], bombMap: number[][], board: number[][]) => {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (userInput[y][x] === 1) {
          board[y][x] = 1;
          if (bombMap[y][x] === -1) {
            board[y][x] = 11;
          }
          for (let q = 1; q < 9; q++) {
            if (bombMap[y][x] === q) {
              board[y][x] = q;
            }
          }
          if (bombMap[y][x] === 0) board[y][x] = 0;
        }
      }
    }
  };

  makeBoard(userInputs, bombMap, board);
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
