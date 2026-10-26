import { useCallback, useEffect, useState } from "react";
import { fetchCatalog, fetchTeam } from "../services/api";
import { normalizeItem, normalizeMember } from "../utils/format";

// Hook generik: mengurus loading, error, dan data. UI tidak perlu tahu cara fetch.
function useAsyncList(loader, normalize) {
  const [state, setState] = useState({ data: [], loading: true, error: null, skipped: 0 });
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    loader()
      .then((raw) => {
        if (cancelled) return;
        const data = raw.map(normalize).filter(Boolean);
        setState({ data, loading: false, error: null, skipped: raw.length - data.length });
      })
      .catch((err) => {
        if (cancelled) return;
        setState({ data: [], loading: false, error: err.message || "Terjadi kesalahan.", skipped: 0 });
      });

    return () => {
      cancelled = true;
    };
  }, [loader, normalize, reloadKey]);

  const retry = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }));
    setReloadKey((k) => k + 1);
  }, []);
  return { ...state, retry };
}

export const useCatalog = () => useAsyncList(fetchCatalog, normalizeItem);

export function useTeam(limit = 6) {
  const loader = useCallback(() => fetchTeam(limit), [limit]);
  return useAsyncList(loader, normalizeMember);
}
