import { useEffect, useRef } from 'react';

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
export function formatMoney(
  amount,
  decimalCount = 2,
  decimal = '.',
  thousands = ','
) {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '')
    );
  } catch (e) {
    console.log(e);
  }
}

export const subscribeToPush = async () => {
  const sw = await navigator.serviceWorker.ready;
  console.log(
    'process.env.REACT_APP_PUSH_PUBLIC_KEY: ',
    process.env.REACT_APP_PUSH_PUBLIC_KEY
  );
  const push = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: process.env.REACT_APP_PUSH_PUBLIC_KEY,
  });
  console.log(JSON.stringify(push))
};
