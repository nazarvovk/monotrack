import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import MonobankLogo from './MonobankLogo';
import { useInterval, formatMoney } from './utils';
import LoadingScreen from './LoadingScreen';

const CURRENCY_CODES = {
  USD: 840,
  EUR: 978,
  UAH: 980,
};
async function getCurrencies(retryTimeout = 1000) {
  const response = await fetch('https://api.monobank.ua/bank/currency');
  if (response.ok) {
    const allCurrencies = await response.json();
    return {
      usd: allCurrencies.find(
        (e) =>
          e.currencyCodeB === CURRENCY_CODES.UAH &&
          e.currencyCodeA === CURRENCY_CODES.USD
      ),
      eur: allCurrencies.find(
        (e) =>
          e.currencyCodeB === CURRENCY_CODES.UAH &&
          e.currencyCodeA === CURRENCY_CODES.EUR
      ),
    };
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        getCurrencies(retryTimeout * 2).then(resolve);
      }, retryTimeout);
    });
  }
}

function App() {
  const [currencies, setCurrencies] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const update = () => {
    setIsUpdating(true);
    getCurrencies()
      .then(setCurrencies)
      .then(() => setIsUpdating(false));
  };
  useEffect(update, []);

  // update every 2 minutes
  useInterval(update, 60000 * 2);

  const [usd, setUsd] = useState(1);
  const [eur, setEur] = useState(1);
  if (!currencies) {
    return <LoadingScreen />;
  }
  const usdToUahString = `${formatMoney(
    usd * currencies.usd.rateBuy
  )} / ${formatMoney(usd * currencies.usd.rateSell)}`;
  const eurToUahString = `${formatMoney(
    eur * currencies.eur.rateBuy
  )} / ${formatMoney(eur * currencies.eur.rateSell)}`;

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1
          className={styles.headerTitle}
          onClick={() => window.location.reload()}
        >
          monotrack
        </h1>
        <div className={styles.headerSubtitle}>
          для
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.monobank.ua/'
          >
            <MonobankLogo className={styles.monobankLogo} />
          </a>
        </div>
        {isUpdating && (
          <div className={`lds-ripple ${styles.updateIndicator}`}>
            <div></div>
            <div></div>
          </div>
        )}
      </header>

      <div className={styles.container}>
        <div className={styles.currencyRow}>
          <div className={styles.currencyInputContainer}>
            <span>$</span>
            <input
              type='number'
              min='0'
              value={usd}
              onChange={(e) => setUsd(e.target.value)}
            />
          </div>
          <div className={styles.convertedContainer}>
            <span
              className={styles.converted}
              style={{
                // some math to make the text fit
                fontSize:
                  usdToUahString.length > 20
                    ? `${160 / usdToUahString.length}vmin`
                    : '8vmin',
              }}
            >
              {usdToUahString}
            </span>
          </div>
        </div>
        <div className={styles.currencyRow}>
          <div className={styles.currencyInputContainer}>
            €
            <input
              type='number'
              min='0'
              value={eur}
              onChange={(e) => setEur(e.target.value)}
            />
          </div>
          <div className={styles.convertedContainer}>
            <span
              className={styles.converted}
              style={{
                // some math to make the text fit
                fontSize:
                  eurToUahString.length > 20
                    ? `${160 / eurToUahString.length}vmin`
                    : '8vmin',
              }}
            >
              {eurToUahString}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.adContainer}>
        <div id='728533546'>
          <script type='text/javascript'>
            {`
              try {
                  window._mNHandle.queue.push(function (){
                      window._mNDetails.loadTag("728533546", "970x90", "728533546");
                  });
              }
              catch (error) {}
          `}
          </script>
        </div>
      </div>
      <footer>
        <div>
          Мейд бай{' '}
          <a target='_blank' rel='noopener noreferrer' href='http://nvovk.com/'>
            Назар Вовк
          </a>
        </div>
        <div>
          MONOBANK | Universal Bank є зареєстрованою торговельною маркою АТ
          “Універсал Банк”
        </div>
      </footer>
    </div>
  );
}

export default App;
