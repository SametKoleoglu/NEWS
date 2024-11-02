import newsCountryList from "@/constants/CountryList";
import { useCallback, useState } from "react";

export const useNewsCountries = () => {
  const [newsCountries, setNewsCountries] = useState(newsCountryList);

  const toggleNewsCountries = useCallback((id: number) => {
    setNewsCountries((prev) => {
      return prev.map((item, index) => {
        if (index === id) {
          return {
            ...item,
            selected: !item.selected,
          };
        }
        return item;
      });
    });
  }, []);
  return {
    newsCountries,
    toggleNewsCountries,
  };
};
