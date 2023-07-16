import { Typography, InputBase, Box, styled, Button } from "@mui/material";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { balanceOf, getOwner, transferFrom } from "../../../contracts/NFT";
import { hexToNumber } from "../../../utils";
import CommonLoadingBtn from "../../Button/LoadingButton";
import CommonDialog from "../../CommonDialog";
import EllipsisAddress from "../../EllipsisAddress";
import ToastMention from "../../ToastMessage";

const Wrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "0 20px",
  ".MuiTypography-root": {
    fontSize: "15px",
    fontWeight: 500,
  },
  ".MuiTypography-subtitle1": {
    color: "#777",
  },
}));

const Items = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
}));

const TypographyBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  ".MuiButton-root": {
    height: "35px",
    fontSize: "14px",
    svg: {
      marginRight: "5px",
    },
  },
  ".MuiInputBase-root": {
    fontSize: "15px",
    fontWeight: 500,
  },
}));

const TransferDialog = ({ open, title, contractAdd, tokenId, onClose }) => {
  const { account } = useSelector((state) => {
    return {
      account: state.walletInfo.account,
    };
  });
  const [receiverInp, setReceiverInp] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const handleChangeReceiverInp = useCallback((e) => {
    setReceiverInp(e.target.value);
  }, []);

  // judge your hold this nft.nft owners can transfer,other can't transfer
  const judgeTransferNFT = useCallback(async () => {
    const NFTOwnerAdd = await getOwner(contractAdd);
    console.log("NFTOwnerAdd:", NFTOwnerAdd);

    if (NFTOwnerAdd === receiverInp) {
      return true;
    } else {
      const balanceHex = await balanceOf(contractAdd, receiverInp);
      console.log("balanceHex:", balanceHex);
      return hexToNumber(balanceHex) === 0 ? true : false;
    }
  }, [contractAdd, receiverInp]);

  const handleTransferSubmit = useCallback(async () => {
    setBtnLoading(true);
    const isTransfer = await judgeTransferNFT();
    console.log("isTransfer:", isTransfer);
    if (isTransfer) {
      try {
        await transferFrom(contractAdd, account, receiverInp, tokenId);
        ToastMention({ message: "Transfer success!", type: "success" });
      } catch (error) {
        console.log("transferErr:", error);
      }
      onClose();
      setBtnLoading(false);
    }
  }, [judgeTransferNFT, account, contractAdd, receiverInp, tokenId, onClose]);

  return (
    <CommonDialog open={open} title={title} onClose={onClose}>
      <Wrapper>
        <Items>
          <Typography>Contract Address: </Typography>
          <EllipsisAddress account={contractAdd} />
        </Items>

        <TypographyBox aria-label="Transfer" sx={{ gap: "5px" }}>
          <Typography>Receiver: </Typography>
          <InputBase
            value={receiverInp || ""}
            placeholder="Please input address"
            onChange={handleChangeReceiverInp}
          />
        </TypographyBox>
        <CommonLoadingBtn
          loading={btnLoading}
          variant="contained"
          sx={{
            margin: "5px auto",
          }}
          onClick={handleTransferSubmit}
        >
          Submit
        </CommonLoadingBtn>
      </Wrapper>
    </CommonDialog>
  );
};

export default memo(TransferDialog);
