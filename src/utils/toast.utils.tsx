import { toast } from "react-toastify";
import { CircleCheckBig, CircleAlert, Info } from "lucide-react";
import { TOAST_UI } from "../constants/toast.constants";

function successNotification(text: string) {
  toast(
    <div>
      <CircleCheckBig className="inline" />
      <p className="inline"> {text}</p>
    </div>,
    {
      className: "color-success color-success-content solid-border",
      ariaLabel: "Success notification",
      ...TOAST_UI,
    }
  );
}

function errorNotification(text: string) {
  toast(
    <div>
      <CircleAlert className="inline" />
      <p className="inline"> {text}</p>
    </div>,
    {
      className: "color-error color-error-content solid-border",
      ariaLabel: "Error notification",
      ...TOAST_UI,
    }
  );
}

function infoNotification(text: string) {
  toast(
    <div>
      <Info className="inline" />
      <p className="inline"> {text}</p>
    </div>,
    {
      className: "color-info color-info-content solid-border",
      ariaLabel: "Info notification",
      ...TOAST_UI,
    }
  );
}

export { successNotification, errorNotification, infoNotification };
