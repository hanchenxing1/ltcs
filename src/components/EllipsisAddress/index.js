import { memo, useCallback } from "react";
import { Box, styled, Typography } from "@mui/material";
import CopyToClipboard from "react-copy-to-clipboard";
import CopySvg from "../../assets/icons/common/copy.svg";
import { splitAddress } from "../../utils";
import ToastMention from "../ToastMessage";

const AddressBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "20px",
  background: "rgba(255, 255, 255, 0.04)",
  border: "1px solid rgba(255, 255, 255, 0.02)",
  borderRadius: "34px",
  textAlign: "center",
  gap: "5px",
  "& .MuiTypography-root": {
    color: "#ea6060",
  },
  svg: {
    color: "#ea6060",
    cursor: "pointer",
    ":hover": {
      color: "#FB6D05",
    },
  },
}));

const EllipsisAddress = ({ account, sx }) => {
  const copyDID = useCallback(() => {
    ToastMention({ message: "Copied", type: "success" });
  }, []);

  return (
    <AddressBox sx={sx}>
      <Typography>{splitAddress(account)}</Typography>
      <CopyToClipboard text={account} onCopy={copyDID}>
        <CopySvg />
      </CopyToClipboard>
    </AddressBox>
  );
};

export default memo(EllipsisAddress);
