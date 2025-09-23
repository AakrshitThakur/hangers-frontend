import { useState, useEffect } from "react";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // execute on value or delay change
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    // clear executing setDebouncedValue if the next call comes under delay time
    return () => clearInterval(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
