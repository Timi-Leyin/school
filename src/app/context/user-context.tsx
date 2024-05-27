"use client";
import { API } from "@/config/api";
import { useFetch } from "@/hooks/use-fetch";
import { UserContext } from "@/types/context";
import { ReactNode, createContext, use, useEffect, useMemo } from "react";
import { UserContextResponse } from "@/types/response";
import { usePathname, useRouter } from "next/navigation";
import { FaInfoCircle, FaSpinner } from "react-icons/fa";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

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

  const redirect = () => {
    router.replace(`/auth/login?next=${pathname}`);
  };

  useMemo(() => {
    fetchData();
    if (!data && !loading && error) {
      redirect();
    }
  }, []);
  return (
    <userContext.Provider
      value={{
        user: data ? data.data : null,
      }}
    >
      {loading ? (
        <div className="p-6">
          <FaSpinner className="animate-spin" />
        </div>
      ) : (
        <div className="">
          {error ? (
            <div className="p-12">
              <Alert variant="destructive">
                <FaInfoCircle fontSize={"25px"} />
                <AlertTitle className="text-2xl font-bold">{error} </AlertTitle>
                <AlertDescription>
                  An error Occurred. Please refresh or log in again.
                </AlertDescription>
                <div className="flex mt-3 mb-1 gap-3">
                  <Button
                    disabled={loading}
                    onClick={() => fetchData()}
                    className="bg-gray-300 text-black text-xs hover:text-white"
                  >
                    Try Again
                  </Button>
                  <Button
                    onClick={() => redirect()}
                    disabled={loading}
                    className="bg-primary-color text-xs"
                  >
                    Login
                  </Button>
                </div>
              </Alert>
            </div>
          ) : (
            children
          )}
        </div>
      )}
    </userContext.Provider>
  );
};

export const useUser = () => {
  return use(userContext);
};
