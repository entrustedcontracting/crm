import { useEffect, useState } from "react";

const isBrowser = typeof window !== "undefined";

const useLocalStorage = (key, initial = null) => {
  const [value, setValue] = useState(() => {
    if (isBrowser) {
      console.log('isBrowser ' + key);
      const saved = window.localStorage.getItem(key);
      if (saved !== null) {
        console.log('saved ' + saved);
        return JSON.parse(saved);
      }
    }
    return initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
