import React from 'react';
import styles from './App.module.css';

const LoadingScreen = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className='lds-ripple'>
        <div></div>
        <div></div>
      </div>
      <span>Завантаження курсу валют...</span>
    </div>
  );
};

export default LoadingScreen;
