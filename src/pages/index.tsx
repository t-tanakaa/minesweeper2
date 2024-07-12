import type { SetStateAction } from 'react';
import { useEffect, useState } from 'react';
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

const deployment = (
  bombMap: number[][],
  y: number,
  x: number,
  newBombMap: number[][],
  height: number,
  width: number,
  bombCount: number,
) => {
  const isStart = bombMap.flat().every((value) => value === 0);
  if (isStart) {
    bomb(y, x, newBombMap, height, width, bombCount);
    numberSelect(newBombMap, height, width);
  }
};
const bomb = (
  y: number,
  x: number,
  newBombMap: number[][],
  height: number,
  width: number,
  bombCount: number,
) => {
  let n = 0;
  while (bombCount > n) {
    const row = Math.floor(Math.random() * height);
    const col = Math.floor(Math.random() * width);
    if (newBombMap[row][col] !== -1 && y !== row && x !== col) {
      newBombMap[row][col] = -1;
      n++;
    }
  }
};
const numberSelect = (bombMap: number[][], height: number, width: number) => {
  for (let dy = 0; dy < height; dy++) {
    for (let dx = 0; dx < width; dx++) {
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
  const generateBoard = (width: number, height: number, fill: number) =>
    Array.from({ length: height }, () => Array.from({ length: width }, () => fill));

  const [userInputs, setUserInputs] = useState(generateBoard(9, 9, 0));
  const [bombMap, setBombMap] = useState(generateBoard(9, 9, 0));
  const [difficulty, setDifficulty] = useState('easy');
  const [bombCount, setBombCount] = useState(10);
  const [inputWidth, setInputWidth] = useState(9);
  const [inputHeight, setInputHeight] = useState(9);
  const [inputBombCount, setInputBombCount] = useState(10);
  const board = userInputs.map((row) => row.map(() => -1));
  const [time, setTime] = useState(0);
  const width: number = userInputs[0].length;
  const height: number = userInputs.length;
  const clickHandler = (x: number, y: number) => {
    if (userInputs[y][x] === 2 || board[y][x] === 20) {
      return;
    }
    const newUserInputs = structuredClone(userInputs);
    const newBombMap = structuredClone(bombMap);
    newUserInputs[y][x] = 1;
    deployment(bombMap, y, x, newBombMap, height, width, bombCount);
    setBombMap(newBombMap);
    const lst2: [number, number][] = [];
    zeroChain(y, x, newBombMap, board, lst2);
    zeroIndication(lst2, newUserInputs);
    setUserInputs(newUserInputs);
  };

  const rightClickHandler = (
    event: React.MouseEvent<HTMLDivElement>,
    x: number,
    y: number,
    height: number,
    width: number,
  ) => {
    event.preventDefault();
    const newUserInputs = structuredClone(userInputs);
    if (board[y][x] !== 20) {
      if (userInputs[y][x] === 0) {
        newUserInputs[y][x] = 2; // 旗を置く
      } else if (userInputs[y][x] === 2) {
        newUserInputs[y][x] = 0; // 旗を解除
      }
    }
    for (let yy = 0; yy < height; yy++) {
      for (let xx = 0; xx < width; xx++) {
        userInputs[yy][xx] === 2;
      }
    }
    setUserInputs(newUserInputs);
  };
  const makeBoard = (userInput: number[][], bombMap: number[][], board: number[][]) => {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (userInput[y][x] === 1) {
          board[y][x] = 1;
          if (bombMap[y][x] === -1) {
            for (let yy = 0; yy < height; yy++) {
              for (let xx = 0; xx < width; xx++) {
                if (bombMap[yy][xx] === -1 && userInputs[yy][xx] !== 2) {
                  board[yy][xx] = 11;
                }
                if (board[yy][xx] === -1) {
                  board[yy][xx] = 20;
                }
                if (bombMap[yy][xx] === -1 && userInputs[yy][xx] === 1) {
                  board[yy][xx] = 11;
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
  const handleClick = (
    width: number,
    height: number,
    bombCount: number,
    level: SetStateAction<string>,
  ) => {
    setUserInputs(generateBoard(width, height, 0));
    setBombMap(generateBoard(width, height, 0));
    setDifficulty(level);
    setBombCount(bombCount);
  };

  const isClear =
    board.flat().filter((v) => ![-1, 10].includes(v)).length === height * width - bombCount;
  const isFailed = board.flat().some((value) => value === 11);
  useEffect(() => {
    if (!bombMap.flat().every((value) => value === 0) && !isClear && !isFailed) {
      const id = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
      return () => clearInterval(id);
    }
  }, [bombMap, isClear, isFailed]);
  return (
    <div className={styles.container}>
      <button onClick={() => handleClick(9, 9, 10, 'easy')}>easy</button>
      <button onClick={() => handleClick(16, 16, 40, 'normal')}>normal</button>
      <button onClick={() => handleClick(30, 16, 99, 'hard')}>hard</button>
      <button onClick={() => handleClick(inputWidth, inputHeight, inputBombCount, 'custom')}>
        custom
      </button>
      <input
        type="number"
        value={inputWidth}
        onChange={(event) => setInputWidth(parseInt(event.target.value))}
      />
      <input
        type="number"
        value={inputHeight}
        onChange={(event) => setInputHeight(parseInt(event.target.value))}
      />
      <input
        type="number"
        value={inputBombCount}
        onChange={(event) => setInputBombCount(parseInt(event.target.value))}
      />
      <div
        className={styles.worldWar}
        style={{
          width:
            difficulty === 'easy'
              ? '320px'
              : difficulty === 'normal'
                ? '530px'
                : difficulty === 'hard'
                  ? '950px'
                  : inputWidth * 30 + 50 > 262
                    ? inputWidth * 30 + 50
                    : '262px',

          height:
            difficulty === 'easy'
              ? '400px'
              : difficulty === 'normal'
                ? '600px'
                : difficulty === 'hard'
                  ? '610px'
                  : inputHeight * 30 + 130,
        }}
      >
        <div
          className={styles.flame}
          style={{
            width:
              difficulty === 'easy'
                ? '280px'
                : difficulty === 'normal'
                  ? '490px'
                  : difficulty === 'hard'
                    ? '910px'
                    : inputWidth * 30 + 10 > 222
                      ? inputWidth * 30 + 10
                      : '222px',
          }}
        >
          <div className={styles.boomNumber}>
            {bombCount - board.flat().filter((cell) => cell === 10).length}
          </div>
          <div
            className={styles.smile}
            onClick={() => {
              difficulty === 'easy'
                ? handleClick(9, 9, 10, 'easy')
                : difficulty === 'normal'
                  ? handleClick(16, 16, 40, 'normal')
                  : difficulty === 'hard'
                    ? handleClick(30, 16, 99, 'hard')
                    : handleClick(inputWidth, inputHeight, inputBombCount, difficulty);
              {
                setTime(0);
              }
            }}
            style={{
              backgroundPosition: isClear
                ? ` ${-30 * 12}px 0px`
                : isFailed
                  ? ` ${-30 * 13}px 0px`
                  : ` ${-30 * 11}px 0px`,
              marginLeft:
                difficulty === 'easy'
                  ? '24px'
                  : difficulty === 'normal'
                    ? '129px'
                    : difficulty === 'hard'
                      ? '338px'
                      : inputWidth * 15 - 111 > 0
                        ? inputWidth * 15 - 111
                        : '0px',
              marginRight:
                difficulty === 'easy'
                  ? '24px'
                  : difficulty === 'normal'
                    ? '129px'
                    : difficulty === 'hard'
                      ? '338px'
                      : inputWidth * 15 - 111 > 0
                        ? inputWidth * 15 - 111
                        : '0px',
            }}
          />
          <div className={styles.timer}>{time}</div>
        </div>

        <div
          className={styles.board}
          style={{
            width:
              difficulty === 'easy'
                ? '280px'
                : difficulty === 'normal'
                  ? '490px'
                  : difficulty === 'hard'
                    ? '910px'
                    : inputWidth * 30 + 10,
            height:
              difficulty === 'easy'
                ? '280px'
                : difficulty === 'normal'
                  ? '490px'
                  : difficulty === 'hard'
                    ? '490px'
                    : inputHeight * 30 + 10,
          }}
        >
          {board.map((row, y) =>
            row.map((bombNumber, x) => (
              <div
                className={styles.bombMap}
                key={`${x}-${y}`}
                style={{
                  backgroundPosition: ` ${-30 * (bombNumber - 1)}px 0px`,
                  backgroundColor: bombMap[y][x] === -1 && userInputs[y][x] === 1 ? 'red' : '',
                }}
              >
                {(bombNumber === -1 || bombNumber === 10 || bombNumber === 20) && (
                  <div
                    className={styles.stone}
                    onClick={() => clickHandler(x, y)}
                    onContextMenu={(event) => rightClickHandler(event, x, y, height, width)}
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
