import { toast } from "react-toastify";
import { CircleCheckBig, CircleAlert, Info } from "lucide-react";
import { TOAST_UI } from "../constants/toast.constants";

// className property will be applied to .Toastify__toast class
function successNotification(text: string) {
  toast(
    <div className="flex justify-center items-center gap-1">
      <CircleCheckBig className="inline" />
      <p className="inline">{text}</p>
    </div>,
    {
      className: `apply-font color-success color-success-content border text-sm leading-tight`,
      ariaLabel: "Success notification",
      ...TOAST_UI,
    }
  );
}

function errorNotification(text: string) {
  toast(
    <div className="flex justify-center items-center gap-1">
      <CircleAlert className="inline" />
      <p className="inline">{text}</p>
    </div>,
    {
      className: `apply-font color-error color-error-content border text-sm leading-tight`,
      ariaLabel: "Error notification",
      ...TOAST_UI,
    }
  );
}

function infoNotification(text: string) {
  toast(
    <div className="flex justify-center items-center gap-1">
      <Info className="inline-block w-5 h-auto" />
      <p className="inline">{text}</p>
    </div>,
    {
      className: `apply-font color-info color-info-content border text-sm leading-tight`,
      ariaLabel: "Info notification",
      ...TOAST_UI,
    }
  );
}

export { successNotification, errorNotification, infoNotification };
