import { Box, DialogContent, styled, Typography } from "@mui/material";
import { memo, useCallback } from "react";
import { balanceOf, safeMint } from "../../../contracts/NFT";
import useTransaction from "../../../hooks/useTransaction";
import { useDialog } from "../../../providers/ApproveDialog";
import { getKeyBalance, hexToNumber } from "../../../utils";
import CommonLoadingBtn from "../../Button/LoadingButton";
import CommonDialog from "../../CommonDialog";
import ToastMention from "../../ToastMessage";

const Wrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  "& .MuiTypography-root": {
    fontSize: "15px",
    padding: "10px",
    fontWeight: 500,
  },
}));

const MintOtherDialog = ({
  open,
  title,
  onClose,
  onSuccess,
  isFriend,
  coinAddress,
  from,
  to,
  price,
}) => {
  const { state, dialogDispatch } = useDialog();

  const closeGetBalanceOfFn = useCallback(async () => {
    const balance = await balanceOf(to, from);
    console.log("balance:", balance);
    if (hexToNumber(balance) > 0) {
      clearInterval(window.safeMintTimer);
      dialogDispatch({ type: "ADD_STEP" });
      dialogDispatch({ type: "CLOSE_DIALOG" });
      onSuccess();
    }
  }, [to, from, onSuccess, dialogDispatch]);

  const mintNFT = useCallback(async () => {
    console.log("from:", from);
    const keyBalance = await getKeyBalance(from);
    console.log("keyBalance:", keyBalance);
    console.log("price:", price);
    if (keyBalance > price) {
      try {
        await safeMint(to);
        setTimeout(() => {
          window.safeMintTimer = setInterval(async () => {
            await closeGetBalanceOfFn();
          }, 3000);
        }, 0);
      } catch (error) {
        dialogDispatch({ type: "CLOSE_DIALOG" });
        console.log("safeMintErr:", error);
        ToastMention({ message: "contract error", type: "error" });
      }
    } else {
      dialogDispatch({ type: "CLOSE_DIALOG" });
      ToastMention({ message: "Balance is not enough!", type: "warn" });
    }
  }, [to, from, price, dialogDispatch, closeGetBalanceOfFn]);

  const { handlePayMint } = useTransaction({
    coinAddress,
    from,
    to,
    price,
    executeFn: mintNFT,
  });

  const handlePayMintFn = useCallback(async () => {
    await handlePayMint();
    onClose();
    dialogDispatch({ type: "SET_LOADING", payload: false });
  }, [handlePayMint, onClose, dialogDispatch]);

  return (
    <CommonDialog open={open} title={title} onClose={onClose}>
      <DialogContent>
        <Wrapper>
          <Typography>{`Price: ${price} KEY`}</Typography>
          <Typography>Mintable amount: 1</Typography>

          <Typography
            sx={{
              color: "#777",
            }}
          >
            {isFriend
              ? `Note: After minted his Follow-NFT, you will automatically become his
            friend`
              : `Note: Group-NFT must be verified by twitter before it can be release, and your sns domain name will be locked into a pledge contract`}
          </Typography>
        </Wrapper>
      </DialogContent>

      <CommonLoadingBtn
        loading={state.loading}
        variant="contained"
        sx={{
          margin: "0 auto",
        }}
        onClick={handlePayMintFn}
      >
        {`Pay ${price} Key`}
      </CommonLoadingBtn>
    </CommonDialog>
  );
};

export default memo(MintOtherDialog);
