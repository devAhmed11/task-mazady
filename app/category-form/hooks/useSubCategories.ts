import { useEffect, useState } from "react";
import { useApi } from "./useApi";
import { debounce } from "lodash";

interface Category {
  id: number;
  name: string;
}

export const useSubCategories = (selectedMainCategoryId: number | string | null) => {
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const { fetchData } = useApi();

  useEffect(() => {
    if (!selectedMainCategoryId) {
      setSubCategories([]);
      return;
    }

    const loadSubCategories = async () => {
      const data = await fetchData<Category[]>(`properties/${selectedMainCategoryId}`);
      if (data) setSubCategories(data);
    };

    const debouncedLoad = debounce(loadSubCategories, 300);
    debouncedLoad();

    return () => debouncedLoad.cancel();
  }, [selectedMainCategoryId, fetchData]);

  return { subCategories };
};