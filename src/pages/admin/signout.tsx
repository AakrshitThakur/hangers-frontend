import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import {
  successNotification,
  errorNotification,
  infoNotification,
} from "../../utils/toast.utils";
import useFetch from "../../hooks/use-fetch";

interface CallApi {
  url: string;
  options: RequestInit;
}

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

// constants
const URL = BACKEND_BASE_URL + "/api/v1/admins/auth/signout";
const OPTIONS: RequestInit = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};

export default function AdminSignOut() {
  const [isLoading, setIsLoading] = useState(false);

  // state for use-fetch hook
  const [callApi, setCallApi] = useState<CallApi>({ url: "", options: {} });

  // custom use-fetch hook
  const { data, error, loading } = useFetch<{ message: string }>({
    ...callApi,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    // call api
    setCallApi({
      url: URL,
      options: { ...OPTIONS },
    });
  };

  useEffect(() => {
    if (data) {
      successNotification(data?.message);
      navigate("/");
    } else if (error) {
      errorNotification(error);
      // set states to intial values
      setCallApi({ url: "", options: {} });
      setIsLoading(false);
    }
  }, [data, loading, error]);

  return (
    <div className="min-h-[65vh] sm:min-h-[75vh] md:min-h-[85vh] w-full max-w-7xl flex items-center justify-center color-base-100 color-base-content p-5">
      <div className="color-base-300 color-base-content w-full max-w-md space-y-8 p-3 rounded-2xl">
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="flex justify-center">
            <div className="color-primary p-3 rounded-full">
              <Shield className="h-8 w-8 color-primary-content" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Admin</h1>
          <p className="text-base">Secure access to your admin dashboard</p>
        </div>

        <div className="color-base-200 color-base-content rounded-xl">
          {/* Card Header */}
          <div className="px-6 py-3">
            <h2 className="text-2xl font-semibold text-center mb-1">
              Sign Out
            </h2>
            <p className="text-base text-center">
              Are you sure you want to sign out?
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Card Footer */}
            <div className="px-6 py-4 space-y-4">
              <button
                type="submit"
                className="w-full color-error color-error-content hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors cursor-pointer"
                disabled={isLoading}
                aria-describedby="signout-button-description"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Signing Out...
                  </div>
                ) : (
                  "Sign Out"
                )}
              </button>

              <p id="signout-button-description" className="sr-only">
                Click to sign out from your admin account
              </p>

              {/* Registration Link */}
              <div className="text-center text-sm">
                {"Don't have an account? "}
                <a
                  className="text-blue-500 font-medium cursor-pointer"
                  onClick={() => infoNotification("Feature coming soon")}
                >
                  Request Access
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
