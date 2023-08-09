import { createContext, useEffect, useState } from "react";

export const DarkModeToggle = createContext();

export const DarkModeToggleProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  const toggle = () => {
    console.log("toggle");
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <DarkModeToggle.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeToggle.Provider>
  );
};
