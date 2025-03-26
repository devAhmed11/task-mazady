import axios, { AxiosResponse } from "axios";
import { useEffect, useRef, useCallback } from "react";

interface ApiResponse<T> {
  data: T;
}

const API_BASE_URL = "https://stagingapi.mazaady.com/api/v1";
const PRIVATE_KEY = 'Tg$LXgp7uK!D@aAj^aT3TmWY9a9u#qh5g&xgEETJ';

const HEADERS = {
  'private-key': PRIVATE_KEY,
  'content-language': 'en',
  platform: 'web',
  currency: 'AED',
  Accept: 'application/json',
};

export const useApi = () => {
  const controllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async <T,>(url: string): Promise<T | undefined> => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();

    try {
      const response: AxiosResponse<ApiResponse<T>> = await axios.get(
        `${API_BASE_URL}/${url}`,
        { 
          headers: HEADERS,
          signal: controllerRef.current.signal,
        }
      );
      return response.data.data;
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error(`Failed to fetch data from ${url}:`, error);
        throw error;
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  return { fetchData };
};