import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { APP_BASE_URL } from "../constants";
import { removeUser } from "../utils";

export const useApi = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const apiFetch = useCallback(
    async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
      const response = await fetch(`${APP_BASE_URL}${endpoint}`, {
        ...options,
        credentials: "include",
      });

      if (response.status === 401) {
        toast.error("You need to login to perform this action.", {
          duration: 3000,
        });
        removeUser();
        navigate("/login", { state: { from: location.pathname } });
      }

      return response;
    },
    [navigate, location.pathname],
  );

  return { apiFetch };
};
