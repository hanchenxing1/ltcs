import {
  Typography,
  InputBase,
  Box,
  styled,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { memo, useCallback, useState } from "react";
import CommonDialog from "../../CommonDialog";
import EllipsisAddress from "../../EllipsisAddress";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { isApprovedForAll, setApprovalForAll } from "../../../contracts/NFT";
import { setOrder } from "../../../contracts/Trading";
import { useSelector } from "react-redux";
import {
  ethFormatToWei,
  getKeyAddress,
  getTradingAddress,
} from "../../../utils";
import CommonLoadingBtn from "../../Button/LoadingButton";
import { useDialog } from "../../../providers/ApproveDialog";
import { Router, useRouter } from "next/router";

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

const SelectWrapper = styled(Select)(() => ({
  border: "1px solid #ddd",
  borderRadius: "12px",
  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
  },

  ".MuiSelect-select": {
    borderRadius: "12px",
    color: "#9a9a9a",
    padding: "4px 10px",
  },
}));

const SaleDialog = ({ open, title, contractAdd, tax, tokenId, onClose }) => {
  let newTax = tax / 10;
  const [saleInp, setSaleInp] = useState("");
  const [selectItem, setSelectItem] = useState("key");
  const [receiveInp, setReceiveInp] = useState("-");
  const [submitLoading, setSubmitLoading] = useState(false);
  const keyAddress = getKeyAddress();
  const tradingAddress = getTradingAddress();
  const router = useRouter();

  const { account } = useSelector((state) => ({
    account: state.walletInfo.account,
  }));

  const { dialogDispatch } = useDialog();

  const handleChangeSaleInp = useCallback(
    (e) => {
      const value = e.target.value;
      if (/^[0-9]*$/.test(value) && !value.startsWith("0")) {
        setSaleInp(value);
        const receivePrice = (value * (100 - newTax - 2.5)) / 100;
        setReceiveInp(receivePrice);
      }
    },
    [newTax]
  );

  const handleCloseDialog = useCallback(() => {
    setSaleInp("");
    setReceiveInp("");
    setSubmitLoading(false);
    onClose();
  }, [onClose]);

  const allowanceFn = useCallback(async () => {
    try {
      const isApprove = await isApprovedForAll(
        contractAdd,
        account,
        tradingAddress
      );
      return isApprove;
    } catch (error) {
      console.log("handleAllowanceFnErr:", error);
      return false;
    }
  }, [contractAdd, account, tradingAddress]);

  const approveFn = useCallback(
    async (isApprove) => {
      try {
        const resp = await setApprovalForAll(
          contractAdd,
          tradingAddress,
          isApprove
        );
      } catch (error) {
        console.log("handleApproveFnErr:", error);
      }
    },
    [contractAdd, tradingAddress]
  );

  const saleNFTFn = useCallback(async () => {
    console.log(
      "contractAdd, keyAddress, saleInp, tokenId:",
      contractAdd,
      keyAddress,
      ethFormatToWei(saleInp),
      tokenId
    );
    try {
      clearInterval(window.approveTimer);
      const resp = await setOrder(
        contractAdd,
        keyAddress,
        ethFormatToWei(saleInp),
        tokenId
      );
      router.push(`/Market/PurchaseList/${contractAdd}`);
      console.log("setOrder:", resp);
      dialogDispatch({ type: "ADD_STEP" });
      dialogDispatch({ type: "CLOSE_DIALOG" });
      handleCloseDialog();
    } catch (error) {
      console.log("saleNFTFnErr:", error);
      dialogDispatch({ type: "CLOSE_DIALOG" });
      handleCloseDialog();
    }
  }, [
    contractAdd,
    keyAddress,
    saleInp,
    tokenId,
    dialogDispatch,
    handleCloseDialog,
    router,
  ]);

  const handleSale = useCallback(async () => {
    dialogDispatch({ type: "SET_LOADING", payload: true });
    const isApprove = await allowanceFn();
    handleCloseDialog();
    if (isApprove) {
      dialogDispatch({ type: "OPEN_DIALOG" });
      dialogDispatch({ type: "ADD_STEP" });
      await saleNFTFn();
    } else {
      dialogDispatch({ type: "OPEN_DIALOG" });
      await approveFn(true);
      setTimeout(async () => {
        window.approveTimer = setInterval(async () => {
          const approve = await allowanceFn();
          console.log("approve:", approve);
          if (approve) {
            dialogDispatch({ type: "ADD_STEP" });
            await saleNFTFn();
          }
        }, 1000);
      }, 0);
    }
  }, [dialogDispatch, allowanceFn, saleNFTFn, approveFn, handleCloseDialog]);

  const handleSelectChange = useCallback((e) => {
    setSelectItem(e.target.value);
  }, []);

  return (
    <CommonDialog open={open} title={title} onClose={handleCloseDialog}>
      <Wrapper>
        <Items>
          <Typography>Contract Address: </Typography>
          <EllipsisAddress account={contractAdd} />
        </Items>
        <TypographyBox aria-label="Transfer" sx={{ gap: "5px" }}>
          <Typography>Sale price: </Typography>
          <InputBase
            value={saleInp || ""}
            placeholder="Min 1"
            onChange={handleChangeSaleInp}
          />
          <SelectWrapper value={selectItem} onChange={handleSelectChange}>
            <MenuItem value="key">KEY</MenuItem>
          </SelectWrapper>
        </TypographyBox>

        <Typography variant="subtitle1">- Service fee: 2.5%</Typography>
        <Typography variant="subtitle1">- Royalties: {newTax}%</Typography>
        <Typography variant="subtitle1">
          You will receive: {receiveInp}
        </Typography>
        <CommonLoadingBtn
          loading={submitLoading}
          disabled={saleInp.length === 0}
          variant="contained"
          sx={{
            margin: "5px auto",
          }}
          onClick={async () => {
            setSubmitLoading(true);
            await handleSale();
            setSubmitLoading(false);
          }}
        >
          Submit
        </CommonLoadingBtn>
      </Wrapper>
    </CommonDialog>
  );
};

export default memo(SaleDialog);
