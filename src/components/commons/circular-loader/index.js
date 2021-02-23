import { memo } from 'react';
import styles from './style.module.css';

const CircularProgress = () => (
  <div className={`${styles.loader} ease-linear rounded-full border-8 border-t-8 border-gray-200 h-10 w-10`} />
);

export default memo(CircularProgress);
