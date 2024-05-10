import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [samplePos, setSanplePos] = useState(0);
  console.log(samplePos);

  return (
    <div className={styles.container}>
      <div
        className={styles.sampleStyle}
        style={{ backgroundPosition: ` ${-30*samplePos}px 0px` }}
      />
      <button onClick={() => setSanplePos((p) => (p + 1) % 14)}>sample</button>
    </div>
  );
};

export default Home;
