"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface States {
  apiKey: string;
}

interface Actions {
  setApiKey: (key: string) => void;
}

export interface Store extends States, Actions {}

const initialStates: States = {
  apiKey: "",
};

export const useSetBoundStore = create<Store>()(
  persist(
    (set, get) => ({
      ...initialStates,
      setApiKey: (key: string) => set({ apiKey: key }),
    }),
    {
      name: "persist-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useBoundStore = <T extends keyof States>(
  selector: (state: States) => States[T]
): States[T] => {
  const [state, setState] = useState(selector(initialStates));
  const zustandState = useSetBoundStore((persistedState) =>
    selector(persistedState)
  );

  useEffect(() => {
    setState(zustandState);
  }, [zustandState]);

  return state;
};
