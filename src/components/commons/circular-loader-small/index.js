import { memo } from 'react';
// import styles from './style.module.css';

const CircularProgress = () => (
  <div data-testid="circular-loader" className="ease-linear rounded-full border-4 border-t-4 border-gray-200 h-4 w-4" />
);

export default memo(CircularProgress);
