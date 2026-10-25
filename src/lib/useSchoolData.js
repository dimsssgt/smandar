"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export function useSchoolData(name) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    supabase
      .from(name)
      .select("*")
      .order("date", { ascending: false })
      .then(({ data }) => setItems(data || []));
  }, [name]);

  return items;
}