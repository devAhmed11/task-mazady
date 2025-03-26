import { useState, useCallback } from "react";
import { useApi } from "./useApi";
import { SingleValue } from "react-select";
import axios from "axios";

interface Property {
  id: number;
  name: string;
  options: { id: number | string; name: string; child: boolean }[];
}

interface Option {
  value: number | string;
  label: string;
}

export const usePropertySelection = () => {
  const [selectedProperties, setSelectedProperties] = useState<Record<string, string>>({});
  const [childProperties, setChildProperties] = useState<Record<number, Property[]>>({});
  const { fetchData } = useApi();

  const handlePropertyChange = useCallback(async (
    propertyId: number,
    value: SingleValue<Option>,
    hasChild: boolean
  ) => {
    if (!value) return;

    setSelectedProperties(prev => ({ ...prev, [propertyId]: value.label }));

    if (hasChild) {
      try {
        const response = await fetchData<Property[]>(`get-options-child/${value.value}`);
        if (response) {
          setChildProperties(prev => ({ ...prev, [propertyId]: response }));
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Failed to fetch child properties:", error);
        }
      }
    }
  }, [fetchData]);

  return { selectedProperties, childProperties, handlePropertyChange };
};