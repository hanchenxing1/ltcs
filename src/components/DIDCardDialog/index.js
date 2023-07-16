import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { memo, useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DIDCard from "./DIDCard";
import Down from "../../assets/icons/didCard/down.svg";
import CopyIcon from "../../assets/icons/common/copy.svg";
import TwitterIcon from "../../assets/icons/common/twitterIcon.svg";
import CopyToClipboard from "react-copy-to-clipboard";
import ToastMention from "../ToastMessage";
import html2canvas from "html2canvas";

const BaseDialog = styled(Dialog)(() => ({
  top: "30px",
  "& .MuiDialog-paper": {
    borderRadius: 20,
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

const ButtonIcon = styled(Button)(() => ({
  svg: {
    width: "16px",
    color: "#ea6060",
  },
}));

const DialogContentWrapper = styled(DialogContent)(() => ({
  paddingBottom: "0",
}));

const DIDCardDialog = ({ open, onOpen, onClose, name }) => {
  const copyDID = useCallback(() => {
    ToastMention({ message: "Copied", type: "success" });
  }, []);

  const sharedImg = () => {
    let detailElement = document.getElementById("share");
    html2canvas(detailElement, {
      allowTaint: false,
      useCORS: true,
    }).then(function (canvas) {
      // toImage
      const dataImg = new Image();
      dataImg.src = canvas.toDataURL("image/png");
      // eslint-disable-next-line @next/next/no-img-element
      // setImageState(<img width="100%" src={dataImg.src} alt="card" />);
      const alink = document.createElement("a");
      alink.href = dataImg.src;
      alink.download = `${name}.png`;
      alink.click();
    });
  };

  return (
    <BaseDialog open={open}>
      <DialogTitle>
        <Typography>WBE3 DID CARD</Typography>
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

      <DialogContentWrapper>
        <DIDCard name={name} />
      </DialogContentWrapper>
      <Stack direction="row" justifyContent="center" spacing={3}>
        <ButtonIcon startIcon={<Down />} onClick={sharedImg}>
          Download
        </ButtonIcon>
        <CopyToClipboard
          text={`https://sns.chat/name/${name}/details`}
          onCopy={copyDID}
        >
          <ButtonIcon startIcon={<CopyIcon />}>Copy URL</ButtonIcon>
        </CopyToClipboard>
      </Stack>
      <ButtonIcon variant="outlined" startIcon={<TwitterIcon />}>
        Share My DID card
      </ButtonIcon>
    </BaseDialog>
  );
};

export default memo(DIDCardDialog);
