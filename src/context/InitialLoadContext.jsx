import { createContext, useContext, useState } from "react";

const STORAGE_KEY = "portfolio-initial-load-done";

const InitialLoadContext = createContext({
  isInitialLoad: false,
  markInitialLoadDone: () => {},
});

export function InitialLoadProvider({ children }) {
  const [isInitialLoad, setIsInitialLoad] = useState(
    () => typeof window !== "undefined" && !sessionStorage.getItem(STORAGE_KEY)
  );

  const markInitialLoadDone = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setIsInitialLoad(false);
  };

  return (
    <InitialLoadContext.Provider value={{ isInitialLoad, markInitialLoadDone }}>
      {children}
    </InitialLoadContext.Provider>
  );
}

export function useInitialLoad() {
  return useContext(InitialLoadContext);
}
