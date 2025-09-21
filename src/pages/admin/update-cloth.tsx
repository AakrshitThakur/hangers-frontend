import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Shield, AlertCircle, Type, Image, IndianRupee } from "lucide-react";
import {
  CLOTH_MIME_TYPES,
  TOP_3_CLOTHES,
} from "../../constants/cloth.constants";
import {
  errorNotification,
  successNotification,
} from "../../utils/toast.utils";
import { validateCreateCloth } from "../../utils/validations/validation-cloth";
import { Dropdown } from "../../components/small/drop-down/drop-down";
import { CLOTH_CATEGORIES } from "../../constants/cloth.constants";
import useFetch from "../../hooks/use-fetch";
import PreviewFormImages from "../../components/small/preview-form-images/preview-form-images";
import type {
  UpdateClothResponse,
  GetClothData,
} from "../../types/clothes.types";

// all interfaces
interface FormErrors {
  title: string;
  clothImages: string;
  isTop3?: string;
  category: string;
  actualPrice: string;
  discountedPrice: string;
  general?: string;
  hasErrors: boolean;
}
interface CallApi {
  url: string;
  options: RequestInit;
}
interface FormData {
  title: string;
  clothImages: File[];
  isTop3?: string;
  category: string;
  actualPrice: string;
  discountedPrice: string;
}
interface PreviewFile {
  id: string;
  name: string;
  url: string;
}
type CallApiObj = {
  UPDATE: {
    API_UPDATE_BASE_URL: string;
    API_UPDATE_OPTIONS: {
      method: "POST";
      credentials: RequestCredentials;
    };
  };
  READ: {
    API_READ_BASE_URL: string;
    API_READ_OPTIONS: {
      method: "GET";
      headers: {
        "Content-Type": "application/json";
      };
      credentials: RequestCredentials;
    };
  };
};

// constants
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const CALL_API_OBJ: CallApiObj = {
  UPDATE: {
    API_UPDATE_BASE_URL: BACKEND_BASE_URL + "/api/v1/admins/clothes",
    API_UPDATE_OPTIONS: {
      method: "POST",
      credentials: "include",
    },
  },
  READ: {
    API_READ_BASE_URL: BACKEND_BASE_URL + "/api/v1/admins/clothes",
    API_READ_OPTIONS: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  },
};

export default function AdminUpdateCloth() {
  const { clothId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [previewFiles, setPreviewFiles] = useState<PreviewFile[]>([]);
  const [publicIds, setPublicIds] = useState<string[]>([]);
  const [formData, setFormData] = useState<UpdateClothResponse["cloth"] | null>(
    null
  );
  const [errors, setErrors] = useState<FormErrors>({
    title: "",
    clothImages: "",
    isTop3: "",
    category: "",
    actualPrice: "",
    discountedPrice: "",
    hasErrors: false,
  });

  // state for use-fetch hook
  const [callApi, setCallApi] = useState<CallApi>({ url: "", options: {} });

  // custom use-fetch hook
  const { data, error, loading } = useFetch<UpdateClothResponse>({
    ...callApi,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // set to default values
    setIsLoading(true);
    setErrors({
      title: "",
      clothImages: "",
      isTop3: "",
      category: "",
      actualPrice: "",
      discountedPrice: "",
      hasErrors: false,
    });

    // // check for validation errors
    // const errors = validateCreateCloth(formData);
    // if (errors.hasErrors) {
    //   setErrors(errors);
    //   setIsLoading(false);
    //   return;
    // }

    const fd = new FormData();
    for (let key in formData) {
      const value = formData[key as keyof FormData];

      if (Array.isArray(value)) {
        // If the field is an array of files
        value.forEach((v) => fd.append(key, v));
      } else {
        fd.append(key, value as string);
      }
    }

    // call api
    setCallApi({
      url: CALL_API_OBJ.UPDATE.API_UPDATE_BASE_URL + `/${clothId}/update`,
      options: { ...CALL_API_OBJ.UPDATE.API_UPDATE_OPTIONS, body: fd },
    });
  };

  // handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (target.files) {
      const file = target.files[0];
      // MIME file type check
      if (!CLOTH_MIME_TYPES.includes(file.type)) {
        errorNotification(
          "Kindly provide a file in a valid format (.png, .jpg, or .jpeg)"
        );
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        errorNotification("Maximum allowable file size is 5MB");
        return;
      }
      if (previewFiles && previewFiles.length >= 3) {
        errorNotification("Maximum of three images allowed");
        return;
      }
      // create temporary file preview url
      setPreviewFiles((curr) => [
        ...curr,
        {
          id: `${file.lastModified}`,
          name: file.name,
          url: URL.createObjectURL(file),
        },
      ]);

      // update form state
      setFormData((curr) => {
        if (curr && typeof curr === "object") {
          return { ...curr, clothImages: [...formData!.clothImages, file] };
        }
        return curr;
      });

      // clear input value so user can select the same file again if needed
      target.value = "";
      return;
    }
    // Set non File type fields
    setFormData((curr) => {
      if (curr && typeof curr === "object") {
        return { ...curr, [target.name]: [target.value] };
      }
      return curr;
    });
  };

  // execute on api response
  useEffect(() => {
    if (data?.cloth) {
      successNotification(data.message);
      setPreviewFiles(
        data.cloth.images.map((i) => ({
          id: i._id,
          url: i.url,
          name: i.publicId,
        }))
      );
      setPublicIds(data.cloth.images.map((i) => i.publicId));
      setFormData({ ...data.cloth, clothImages: [] });
    }
    if (data) {
      successNotification(data.message);
      navigate("/admins/clothes/view-all-clothes");
    }
    if (error) {
      errorNotification(error);
      // set states to intial values
      setCallApi({ url: "", options: {} });
      setIsLoading(false);
    }
  }, [data, loading, error]);

  // get cloth of specific cloth ID
  useEffect(() => {
    // call api
    setCallApi({
      url: CALL_API_OBJ.READ.API_READ_BASE_URL + `/${clothId}/read`,
      options: { ...CALL_API_OBJ.READ.API_READ_OPTIONS },
    });
  }, []);

  console.log(formData);

  return (
    <div className="min-h-screen flex items-center justify-center color-base-100 color-base-content p-5">
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
            <h2 className="text-2xl font-semibold text-center mb-1">Sign In</h2>
            <p className="text-base text-center">
              Enter your credentials to access the admin panel
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Card Content */}
            <div className="px-6 py-4 space-y-4">
              {errors.general && (
                <div className="flex items-center p-4 color-error color-error-content rounded-md">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <p className="text-sm">{errors.general}</p>
                </div>
              )}

              {/* Title Field */}
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium">
                  Title
                </label>
                <div className="relative text-base">
                  <Type className="absolute left-3 top-3 h-4 w-4" />
                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Classic White T-Shirt"
                    value={formData?.title}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 solid-border rounded-md"
                  />
                </div>
                {errors.title && (
                  <p
                    id="title-error"
                    className="text-xs text-red-600"
                    role="alert"
                  >
                    {errors.title}
                  </p>
                )}
              </div>

              {/* File Field */}
              <div className="space-y-2">
                <label htmlFor="file" className="block text-sm font-medium">
                  Upload File
                </label>
                <div className="hidden relative text-base">
                  <Image className="absolute left-3 top-3 h-4 w-4" />
                  <input
                    id="file"
                    name="title"
                    type="file"
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 solid-border rounded-md"
                  />
                </div>
                <div
                  className="w-full p-7 flex flex-col justify-center items-center gap-1 border-1 border-dashed rounded-lg cursor-pointer"
                  onClick={() => document.getElementById("file")?.click()}
                >
                  <Image className="w-11 h-11" />
                  <p className="text-base">Upload File</p>
                </div>
                {errors.clothImages && (
                  <p
                    id="title-error"
                    className="text-xs text-red-600"
                    role="alert"
                  >
                    {errors.title}
                  </p>
                )}
              </div>

              {/* preview files */}
              {setFormData && typeof setFormData === "object" && (
                <div className="space-y-2">
                  {previewFiles.map((f) => (
                    <PreviewFormImages<PreviewFile[], FormData>
                      set={{ setPreviewFiles, setFormData }}
                      id={f.id}
                      name={f.name}
                      url={f.url}
                    />
                  ))}
                </div>
              )}

              {setFormData && typeof setFormData === "object" && (
                <div className="space-y-2">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium"
                  >
                    Category
                  </label>
                  <Dropdown<FormData>
                    set={{ setState: setFormData, name: "category" }}
                    options={CLOTH_CATEGORIES}
                    placeholder="---Categories---"
                  />
                  {errors.category && (
                    <p
                      id="title-error"
                      className="text-xs text-red-600"
                      role="alert"
                    >
                      {errors.category}
                    </p>
                  )}
                </div>
              )}

              {setFormData && typeof setFormData === "object" && (
                <div className="space-y-2">
                  <label
                    htmlFor="is-top-3"
                    className="block text-sm font-medium"
                  >
                    Is this garment in the top three?
                  </label>
                  <Dropdown<FormData>
                    set={{ setState: setFormData, name: "isTop3" }}
                    options={TOP_3_CLOTHES}
                    placeholder="---Top 3---"
                  />
                  {errors.isTop3 && (
                    <p
                      id="title-error"
                      className="text-xs text-red-600"
                      role="alert"
                    >
                      {errors.isTop3}
                    </p>
                  )}
                </div>
              )}

              {/* Actual price field */}
              <div className="space-y-2">
                <label
                  htmlFor="actual-price"
                  className="block text-sm font-medium"
                >
                  Actual Price
                </label>
                <div className="relative text-base">
                  <IndianRupee className="absolute left-3 top-3 h-4 w-4" />
                  <input
                    id="actual-price"
                    name="actualPrice"
                    type="text"
                    placeholder="1299"
                    value={formData?.actualPrice}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 solid-border rounded-md"
                  />
                </div>
                {errors.actualPrice && (
                  <p
                    id="title-error"
                    className="text-xs text-red-600"
                    role="alert"
                  >
                    {errors.actualPrice}
                  </p>
                )}
              </div>

              {/* Discounted price field */}
              <div className="space-y-2">
                <label
                  htmlFor="discounted-price"
                  className="block text-sm font-medium"
                >
                  Discounted Price
                </label>
                <div className="relative text-base">
                  <IndianRupee className="absolute left-3 top-3 h-4 w-4" />
                  <input
                    id="discounted-price"
                    name="discountedPrice"
                    type="text"
                    placeholder="799"
                    value={formData?.discountedPrice}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 solid-border rounded-md"
                  />
                </div>
                {errors.discountedPrice && (
                  <p
                    id="title-error"
                    className="text-xs text-red-600"
                    role="alert"
                  >
                    {errors.discountedPrice}
                  </p>
                )}
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 py-4 space-y-4">
              <button
                type="submit"
                className="w-full color-success color-success-content disabled:bg-blue-400 font-medium py-2 px-4 rounded-md transition-colors cursor-pointer"
                disabled={isLoading}
                aria-describedby="create-button-description"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Creating...
                  </div>
                ) : (
                  "Create"
                )}
              </button>

              <p id="signin-button-description" className="sr-only">
                Click to create new cloth
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
