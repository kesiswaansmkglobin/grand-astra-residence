"use client";

import { useState, useEffect, useRef } from "react";

export function useData<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetcherRef = useRef(fetcher);

  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  useEffect(() => {
    let cancelled = false;
    fetcherRef
      .current()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(String(e));
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);
    fetcherRef
      .current()
      .then((result) => setData(result))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  };

  return { data, loading, error, refetch };
}
