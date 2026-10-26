import { useMemo, useState } from "react";

export function useCatalogFilter(items) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Semua");

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) &&
        (categoryFilter === "Semua" || item.type === categoryFilter)
    );
  }, [items, searchQuery, categoryFilter]);

  return { searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, filtered };
}
