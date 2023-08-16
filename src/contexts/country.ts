import { createContext } from "react";

export interface CountryMode {
  setCountryMode: () => void;
}

export const CountryContext = createContext<CountryMode>({
  setCountryMode: () => {},
});
