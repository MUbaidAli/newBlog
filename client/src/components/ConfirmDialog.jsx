import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const ConfirmDialog = (onConfirm) => {
  confirmAlert({
    title: "Confirm Deletion",
    message: "Are you sure you want to delete this?",
    buttons: [
      {
        label: "Yes, Delete",
        onClick: onConfirm,
      },
      {
        label: "No, Cancel",
      },
    ],
  });
};

export default ConfirmDialog;
