import { createContext, useContext, useEffect, useState } from "react";

const DemoThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

export function DemoThemeProvider({ children, defaultTheme = "dark" }) {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("demo-light", theme === "light");
    return () => {
      document.documentElement.classList.remove("demo-light");
    };
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <DemoThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </DemoThemeContext.Provider>
  );
}

export function useDemoTheme() {
  return useContext(DemoThemeContext);
}
