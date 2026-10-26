import { useCallback, useState } from "react";

export function useContactForm(onSent) {
  const [submitted, setSubmitted] = useState(false);

  const submit = useCallback(
    (e) => {
      e.preventDefault();
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onSent("Pesan Anda berhasil terkirim!");
      }, 800);
    },
    [onSent]
  );

  return { submitted, submit };
}
