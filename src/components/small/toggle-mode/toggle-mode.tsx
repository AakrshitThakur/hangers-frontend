import { Sun, Moon } from "lucide-react";
import { useState } from "react";

export default function ToggleMode() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    document.documentElement.classList.contains("dark-mode")
  );

  function toggleMode() {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark-mode");
      setIsDarkMode(false);
      return;
    }
    document.documentElement.classList.add("dark-mode");
    setIsDarkMode(true);
  }

  return (
    <div id="toggle-mode" className="text-sm cursor-pointer">
      {isDarkMode ? (
        <Sun strokeWidth={1.25} onClick={toggleMode} />
      ) : (
        <Moon strokeWidth={1.25} onClick={toggleMode} />
      )}
    </div>
  );
}
