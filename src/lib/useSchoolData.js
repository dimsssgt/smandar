"use client";

import { useEffect, useState } from "react";
import { SEED, getList } from "./adminStore";

export function useSchoolData(name) {
  const [items, setItems] = useState(SEED[name] || []);

  useEffect(() => {
    const load = () => setItems(getList(name));
    load();
    window.addEventListener("smandar:change", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("smandar:change", load);
      window.removeEventListener("storage", load);
    };
  }, [name]);

  return items;
}
