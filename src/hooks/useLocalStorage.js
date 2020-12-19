import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [data, setData] = useState(
    JSON.parse(window.localStorage.getItem(key)) || initialValue
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  return [data, setData];
};

export default useLocalStorage;
