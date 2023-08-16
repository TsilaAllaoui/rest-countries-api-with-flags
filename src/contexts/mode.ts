import { createContext } from "react";

export interface Mode {
  darkMode: boolean;
  setDarkMode: (m: boolean) => void;
}

export const ModeContext = createContext<Mode>({
  darkMode: true,
  setDarkMode: (_m: boolean) => {},
});
