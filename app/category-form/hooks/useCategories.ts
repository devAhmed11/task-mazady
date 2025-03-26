import { useEffect, useState } from "react";
import { useApi } from "./useApi";

interface Category {
  id: number;
  name: string;
}

interface CategoriesResponse {
  categories: Category[];
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { fetchData } = useApi();

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchData<CategoriesResponse>("all-categories/web");
      if (data) setCategories(data.categories);
    };
    loadCategories();
  }, [fetchData]);

  return { categories };
};