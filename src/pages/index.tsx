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
  console.table(board);
  console.table(normalBoard);

  const clickHandler = (x: number, y: number) => {
    console.log(bombMap);
    console.log(x, y);
    const newBoard = structuredClone(bombMap);
    newBoard[y][x] = turncolor;
    setBombMap(newBoard);
  };

  return (
    <div className={styles.container}>
      <div className={styles.flame}>
        <div className={styles.board}>
          {board.map((row, y) =>
            row.map((color, x) => (
              <div
                className={styles.bombMap}
                key={`${x}-${y}`}
                style={{ backgroundPosition: ` ${-30 * color}px 0px` }}
              >
                {color === -1 && <div className={styles.cell} key={`${x}-${y}`} />}
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
