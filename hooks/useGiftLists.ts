// hooks/useGiftLists.ts
import { useState, useEffect } from "react";
import { GiftList } from "@/types/giftList"; // tipagem igual à do backend

export function useGiftLists() {
  const [lists, setLists] = useState<GiftList[]>([]);

  useEffect(() => {
    async function fetchLists() {
      const res = await fetch("/api/listas"); // ou com token se necessário
      const data = await res.json();
      setLists(data);
    }

    fetchLists();
  }, []);

  return { lists };
}
