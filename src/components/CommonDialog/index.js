import { memo } from "react";
import {
  styled,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  Dialog,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const BaseDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    borderRadius: 20,
    width: "600px",
    "& .MuiDialogTitle-root": {
      display: "flex",
      justifyContent: "center",
      paddingTop: "20px",
      fontSize: "24px",
      fontWeight: 700,
      color: "#ea6060",
      ".MuiTypography-root": {
        fontSize: "24px",
        fontWeight: 700,
        color: "#ea6060",
      },
    },
  },
}));

const CommonDialog = ({ open, onClose, title, children }) => {
  return (
    <BaseDialog open={open}>
      <DialogTitle>
        <Typography>{title}</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 18,
            top: 18,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {children}
    </BaseDialog>
  );
};

export default memo(CommonDialog);
