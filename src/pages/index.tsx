import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [samplePos, setSanplePos] = useState(0);
  const [board, setboard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [bombmap, setbombmap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

//<div
//className={styles.sampleStyle}
//style={{ backgroundPosition: ` ${-30 * samplePos}px 0px` }}
///>
//<button onClick={() => setSanplePos((p) => (p + 1) % 14)}>sample</button>

  return (
    <div className={styles.container}>
      <div className={styles.flame}>
        <div className={styles.board}>
          {bombmap.map((row, y) =>
            row.map((color, x) => (
              <div className={styles.bombmap} key={`${x}-${y}`}>
                <div className={styles.cell} key={`${x}-${y}`} />
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
