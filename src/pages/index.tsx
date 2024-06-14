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
    //console.log(row, col);
    if (newBombMap[row][col] !== -1 && y !== row && x !== col) {
      newBombMap[row][col] = -1;
      n++;
    }
  }
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
        // newBombMap[dy + y][dx + x] !== 11 &&
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
//   for (const direction of directions) {
//     const dx = x + direction[0];
//     const dy = y + direction[1];
//     console.log(dx,dy);

//     if (bombMap[dy] !== undefined && bombMap[dy][dx] === 0) {
//       lst.push([dy, dx]);
//       lst2.push([dy, dx]);
//       console.log(lst2);
//     }
//   }
//   if (lst.length !== 0 && lst2 === lst) {
//     lst.map(([dy, dx]) => {
//       zeroChain(dy, dx, bombMap, board, lst2);
//     });
//   } else return;
// };

// bombMap[dy + direction[0]] !== undefined &&
// bombMap[dy + direction[0]][dx + direction[1]] === 0
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
    //console.table(newUserInputs);
    deployment(bombMap, y, x, newBombMap);
    console.table(newBombMap);
    setBombMap(newBombMap);
    const lst2: [number, number][] = [];
    zeroChain(y, x, newBombMap, board, lst2);
    zeroIndication(lst2, newUserInputs);
    setUserInputs(newUserInputs);
    //console.table(bombMap);
    //sconsole.table(board);
  };

  const rightcrick = (event: React.MouseEvent<HTMLDivElement>, x: number, y: number) => {
    event.preventDefault();
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
          if (bombMap[y][x] === 0) {
            board[y][x] = 0;
          }
        }
      }
    }
  };
  makeBoard(userInputs, bombMap, board);
  //右クリックについて
  //新しい関数を作る
  //DIVと同期させる
  //
  //
  return (
    <div className={styles.container}>
      <div className={styles.flame}>
        <div className={styles.board}>
          {board.map((row, y) =>
            row.map((bombNumber, x) => (
              <div
                className={styles.bombMap}
                key={`${x}-${y}`}
                onClick={() => clickHandler(x, y)}
                style={{ backgroundPosition: ` ${-30 * (bombNumber - 1)}px 0px` }}
                onContextMenu={(event) => rightcrick(event, x, y)}
              >
                {bombNumber === -1 && (
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
