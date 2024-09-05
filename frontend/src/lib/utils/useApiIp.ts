// utils/useApiIp.ts

import { useState, useEffect } from "react";

const API_IP_KEY = "apiIp";
const DEFAULT_API_IP = "https://localhost:3001";

export function useApiIp() {
  const [apiIp, setApiIp] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(API_IP_KEY) || DEFAULT_API_IP;
    }
    return DEFAULT_API_IP;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(API_IP_KEY, apiIp);
    }
  }, [apiIp]);

  return { apiIp, setApiIp };
}

export function getApiIp() {
  if (typeof window !== "undefined") {
    return localStorage.getItem(API_IP_KEY) || DEFAULT_API_IP;
  }
  return DEFAULT_API_IP;
}
