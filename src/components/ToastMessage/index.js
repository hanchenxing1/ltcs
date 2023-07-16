import { toast, cssTransition } from "react-toastify";
import ToastErrorIcon from "../../assets/icons/common/toastError.svg";
import ToastSuccessIcon from "../../assets/icons/common/toastSuccess.svg";
import ToastWarnIcon from "../../assets/icons/common/toastWarn.svg";

import "animate.css";

const Slide = cssTransition({
  enter: "animate__animated animate__slideInRight animate__faster",
  exit: "animate__animated animate__slideOutRight animate__faster",
  appendPosition: false,
  collapse: true,
  collapseDuration: 300,
});

const ToastMention = (props) => {
  const {
    message,
    type = "warn",
    onClose,
    duration = 3000,
    showClose = false,
    position = "bottom-right",
  } = props;

  const handleParams = () => {
    switch (type) {
      case "error":
        return {
          icon: <ToastErrorIcon />,
          style: {
            color: "#CC3A3A",
            background: "#fff",
            boxShadow:
              "0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2)",
          },
        };
      case "success":
        return {
          icon: <ToastSuccessIcon />,
          style: {
            color: "#FF8D8D",
            background: "#fff",
            border: "1px solid rgba(255, 184, 184, 0.2)",
          },
        };
      default:
        return {
          icon: <ToastWarnIcon />,
          style: {
            color: "#EA9F60",
            background: "#fff",
            border: "1px solid rgba(255, 167, 38, 0.2)",
          },
        };
    }
  };

  return toast(<span>{message}</span>, {
    icon: handleParams().icon,
    position: position,
    autoClose: duration,
    pauseOnHover: true,
    closeButton: showClose,
    hideProgressBar: true,
    pauseOnFocusLoss: false,
    limit: 3,
    transition: Slide,
    style: {
      maxWidth: "345px",
      minHeight: "48px",
      border: "1px solid rgba(244, 67, 54, 0.2)",
      borderRadius: "12px",
      padding: "0 16px",
      wordBreak: "break-word",
      ...handleParams().style,
    },

    onClose: () => {
      onClose && typeof onClose === "function" && onClose();
    },
  });
};
export default ToastMention;
