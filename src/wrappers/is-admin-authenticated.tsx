import { useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/use-fetch";
import { errorNotification } from "../utils/toast.utils";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

// constants
const URL = BACKEND_BASE_URL + "/api/v1/admins/auth/is-authenticated";
const OPTIONS: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};

export default function IsAdminAuthenticated(props: { children: ReactNode }) {
  const navigate = useNavigate();

  // custom use-fetch hook
  const { data, error, loading } = useFetch<{ message: string }>({
    url: URL,
    options: OPTIONS,
  });

  // execute on getting response from api
  useEffect(() => {
    if (error) {
      errorNotification(error);
      navigate("/admins/signin");
    }
  }, [data, loading, error]);

  return (
    <div id="is-admin-authenticated">
      {!loading && data ? (
        props.children
      ) : (
        <section className="min-h-[85vh] flex flex-col items-center justify-center color-base-100 color-base-content gap-5 p-5">
          <span className="loader"></span>
        </section>
      )}
    </div>
  );
}
