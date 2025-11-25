import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Shield, User, Lock, AlertCircle } from "lucide-react";
import { errorNotification, infoNotification, successNotification } from "../../utils/toast.utils";
import { validateAdminSignin } from "../../utils/validations/validation-auth.utils";
import useFetch from "../../hooks/use-fetch";

// error interface
interface FormErrors {
  username?: string;
  password?: string;
  general?: string;
}
interface CallApi {
  url: string;
  options: RequestInit;
}

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

// constants
const URL = BACKEND_BASE_URL + "/api/v1/admins/auth/signin";
const OPTIONS: RequestInit = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};

export default function AdminSignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

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
    setErrors({});

    // check for validation errors
    const errors = validateAdminSignin(formData);
    if (errors.errorEncountered) {
      setErrors((curr) => ({
        ...curr,
        username: errors.username,
        password: errors.password,
      }));
      setIsLoading(false);
      return;
    }

    // call api
    setCallApi({
      url: URL,
      options: { ...OPTIONS, body: JSON.stringify(formData) },
    });
  };

  // handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setFormData((curr) => ({ ...curr, [target.name]: target.value }));
  };

  useEffect(() => {
    if (data) {
      successNotification(data.message);
      navigate("/admins/clothes/view-all-clothes");
    } else if (error) {
      errorNotification(error);
      // set states to intial values
      setCallApi({ url: "", options: {} });
      setIsLoading(false);
    }
  }, [data, loading, error]);

  return (
    <div className="relative min-h-[90vh] sm:min-h-[95vh] md:min-h-[115vh] w-full max-w-7xl overflow-hidden color-base-100 color-base-content bg-[url('/images/admin.png')] bg-cover bg-center">
      <div className="absolute inset-0 z-45 bg-[rgba(0,0,0,0.05)] overflow-hidden flex flex-col items-center justify-center p-5">
        <div className="color-base-300 color-base-content w-full max-w-md h-auto space-y-5 p-5 rounded-2xl">
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
              <h2 className="text-2xl font-semibold text-center mb-1">Sign In</h2>
              <p className="text-base text-center">Enter your credentials to access the admin panel</p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Card Content */}
              <div className="px-6 py-4 space-y-4">
                {errors.general && (
                  <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-md">
                    <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                    <p className="text-sm text-red-700">{errors.general}</p>
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="username" className="block text-sm font-medium">
                    Username
                  </label>
                  <div className="relative text-base">
                    <User className="absolute left-3 top-3 h-4 w-4" />
                    <input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="John Doe"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 solid-border rounded-md"
                    />
                  </div>
                  {errors.username && (
                    <p id="username-error" className="text-xs text-red-600" role="alert">
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-10 py-2 solid-border rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 cursor-pointer" />
                      ) : (
                        <Eye className="h-4 w-4 cursor-pointer" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p id="password-error" className="text-xs text-red-600" role="alert">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 space-y-4">
                <button
                  type="submit"
                  className="w-full color-success color-success-content hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors cursor-pointer"
                  disabled={isLoading}
                  aria-describedby="signin-button-description"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Signing In...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>

                <p id="signin-button-description" className="sr-only">
                  Click to sign in to your admin account
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
    </div>
  );
}
