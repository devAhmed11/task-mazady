import { useEffect, useState } from "react";
import { useApi } from "./useApi";
import { debounce } from "lodash";

interface Property {
  id: number;
  name: string;
  options: { id: number | string; name: string; child: boolean }[];
}

export const useProperties = (selectedSubCategoryId: number | string | null) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const { fetchData } = useApi();

  useEffect(() => {
    if (!selectedSubCategoryId) {
      setProperties([]);
      return;
    }

    const loadProperties = async () => {
      const data = await fetchData<Property[]>(`option-properties/${selectedSubCategoryId}`);
      if (data) setProperties(data);
    };

    const debouncedLoad = debounce(loadProperties, 300);
    debouncedLoad();

    return () => debouncedLoad.cancel();
  }, [selectedSubCategoryId, fetchData]);

  return { properties };
};