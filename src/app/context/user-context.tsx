"use client";
import { API } from "@/config/api";
import { useFetch } from "@/hooks/use-fetch";
import { UserContext } from "@/types/context";
import { ReactNode, createContext, use, useEffect, useMemo } from "react";
import { UserContextResponse } from "@/types/response";
import { usePathname, useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
const userContext = createContext<UserContext>({
  user: null,
});

const fetcher = () => {
  return API.get("/api/me");
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data, loading, error, fetchData } = useFetch<
    undefined,
    UserContextResponse
  >(fetcher);

  const router = useRouter();
  const pathname = usePathname();
  useMemo(() => {
    fetchData();
    if (!data && !loading && error) {
      router.replace(`/auth/login?next=${pathname}`);
    }
  }, []);
  return (
    <userContext.Provider
      value={{
        user: data ? data.data : null,
      }}
    >
      {loading ? (
        <FaSpinner className="animate-spin" />
      ) : (
        <div className="">{error ? <div> Error: {error} </div> : children}</div>
      )}
    </userContext.Provider>
  );
};

export const useUser = () => {
  return use(userContext);
};
