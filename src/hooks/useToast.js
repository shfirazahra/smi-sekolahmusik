import { useCallback, useEffect, useRef, useState } from "react";

export function useToast(duration = 3500) {
  const [message, setMessage] = useState("");
  const timer = useRef(null);

  const show = useCallback(
    (text) => {
      clearTimeout(timer.current);
      setMessage(text);
      timer.current = setTimeout(() => setMessage(""), duration);
    },
    [duration]
  );

  useEffect(() => () => clearTimeout(timer.current), []);

  return { message, show };
}
