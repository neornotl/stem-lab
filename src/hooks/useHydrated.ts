"use client";
import { useState, useEffect } from "react";

let _hydrated = false;

export function useHydrated() {
  const [hydrated, setHydrated] = useState(_hydrated);
  useEffect(() => {
    if (!_hydrated) {
      _hydrated = true;
      setHydrated(true);
    } else {
      setHydrated(true);
    }
  }, []);
  return hydrated;
}
