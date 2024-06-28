import React, { useState } from 'react';
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
    if (newBombMap[row][col] !== -1 && y !== row && x !== col) {
      newBombMap[row][col] = -1;
      n++;
    }
  }
};
const numberSelect = (bombMap: number[][]) => {
  for (let dy = 0; dy < 9; dy++) {
    for (let dx = 0; dx < 9; dx++) {
      if (bombMap[dy][dx] === -1) {
        continue;
      }
      for (const direction of directions) {
        if (
          bombMap[dy + direction[0]] !== undefined &&
          bombMap[dy + direction[0]][dx + direction[1]] === -1
        ) {
          bombMap[dy][dx] += 1;
        }
      }
    }
  }
};
const zeroChain = (
  y: number,
  x: number,
  newBombMap: number[][],
  board: number[][],
  lst2: number[][],
) => {
  if (newBombMap[y][x] === 0) {
    for (const [dx, dy] of directions) {
      if (
        newBombMap[dy + y] !== undefined &&
        newBombMap[dy + y][dx + x] !== undefined &&
        !lst2.find((c) => c[0] === dx + x && c[1] === dy + y)
      ) {
        lst2.push([dx + x, dy + y]);
        zeroChain(dy + y, dx + x, newBombMap, board, lst2);
      }
    }
  }
  console.log(lst2);
};
const zeroIndication = (lst2: [number, number][], newUserInputs: number[][]) => {
  for (const zeroNumber of lst2) {
    newUserInputs[zeroNumber[1]][zeroNumber[0]] = 1;
  }
};

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
    if (userInputs[y][x] === 2 || board[y][x] === 20) {
      return;
    }
    const newUserInputs = structuredClone(userInputs);
    const newBombMap = structuredClone(bombMap);
    newUserInputs[y][x] = 1;
    deployment(bombMap, y, x, newBombMap);
    setBombMap(newBombMap);
    const lst2: [number, number][] = [];
    zeroChain(y, x, newBombMap, board, lst2);
    zeroIndication(lst2, newUserInputs);
    setUserInputs(newUserInputs);
  };
  const rightClickHandler = (event: React.MouseEvent<HTMLDivElement>, x: number, y: number) => {
    event.preventDefault();
    const newUserInputs = structuredClone(userInputs);
    if (board[y][x] !== 20) {
      if (userInputs[y][x] === 0) {
        newUserInputs[y][x] = 2; // 旗を置く
      } else if (userInputs[y][x] === 2) {
        newUserInputs[y][x] = 0; // 旗を解除
      }
    }

    setUserInputs(newUserInputs);
  };
  const makeBoard = (userInput: number[][], bombMap: number[][], board: number[][]) => {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        //ボム連鎖のコードが気持ち悪いから改善の余地あり
        if (userInput[y][x] === 1) {
          board[y][x] = 1;
          if (bombMap[y][x] === -1) {
            for (let y = 0; y < 9; y++) {
              for (let x = 0; x < 9; x++) {
                if (bombMap[y][x] === -1 && userInputs[y][x] !== 2) {
                  board[y][x] = 11;
                }
                if (board[y][x] === -1) {
                  board[y][x] = 20;
                }
                if (bombMap[y][x] === -1 && userInputs[y][x] === 1) {
                  //ボムを赤くする
                  board[y][x] = 11;
                }
              }
            }
          }
          for (let q = 1; q < 9; q++) {
            if (bombMap[y][x] === q) {
              board[y][x] = q;
            }
          }
          if (bombMap[y][x] === 0) {
            board[y][x] = 0;
          }
        }
        if (userInput[y][x] === 2) {
          board[y][x] = 10;
        }
      }
    }
  };
  makeBoard(userInputs, bombMap, board);
  console.table(bombMap);
  console.table(userInputs);
  return (
    <div className={styles.container}>
      <div className={styles.worldWar}>
        <div className={styles.flame}>
          <div className={styles.boomNumber} />
          <div className={styles.smile} />
          <div className={styles.timer} />
        </div>

        <div className={styles.board}>
          {board.map((row, y) =>
            row.map((bombNumber, x) => (
              <div
                className={styles.bombMap}
                key={`${x}-${y}`}
                style={{ backgroundPosition: ` ${-30 * (bombNumber - 1)}px 0px` }}
              >
                {(bombNumber === -1 || bombNumber === 10 || bombNumber === 20) && (
                  <div
                    className={styles.stone}
                    onClick={() => clickHandler(x, y)}
                    onContextMenu={(event) => rightClickHandler(event, x, y)}
                  >
                    <div
                      className={styles.bombMapFlag}
                      style={{ backgroundPosition: ` ${-30 * (bombNumber - 1)}px 0px` }}
                    />
                  </div>
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
