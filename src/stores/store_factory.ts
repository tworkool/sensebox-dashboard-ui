import { create } from 'zustand';

interface ICreateStore<T> {
  current: T;
  set: (newState: T) => void;
  restore: () => void;
}

function validateStructure<T>(objA: T, objB: T): boolean {
  function isSameStructure(a: any, b: any): boolean {
      // Check if both inputs are objects (excluding null)
      if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
          // Get keys of both objects
          const keysA = Object.keys(a);
          const keysB = Object.keys(b);

          // Check if both objects have the same keys
          if (keysA.length !== keysB.length || !keysA.every(key => keysB.includes(key))) {
              return false;
          }

          // Recursively check each key
          return keysA.every(key => isSameStructure(a[key], b[key]));
      } else {
          // If not objects, compare data types
          return typeof a === typeof b;
      }
  }

  return isSameStructure(objA, objB);
}

const createStore = <T>(defaultState: T, localStorageKey: string) => create<ICreateStore<T>>(
  (set) => ({
    ...(() => {
      const storedState = localStorage.getItem(localStorageKey);
    if (storedState) {
      try {
        const parsedSettings = JSON.parse(storedState);
        if (!validateStructure(defaultState, parsedSettings)) throw new Error('invalid structure');
        return {current: parsedSettings};
      } catch (error) {
        console.error(error);
        return {current: defaultState};
      }
    } else {
      console.error("no localstorage found");
      return {current: defaultState};
    }
    })(),
    "set": (newState: T) => {
      set({ current: newState });
      localStorage.setItem(localStorageKey, JSON.stringify(newState));
    },
    "restore": () => {
      set({ current: defaultState });
      localStorage.setItem(localStorageKey, JSON.stringify(defaultState));
    },
  })
);

export { createStore };
export type { ICreateStore };
