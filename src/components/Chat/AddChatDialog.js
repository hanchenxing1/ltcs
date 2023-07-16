import { InputBase, Stack, Button } from "@mui/material";
import { useCallback } from "react";
import { memo, useState } from "react";
import CommonDialog from "../CommonDialog";
import { nameExisted } from "../../contracts/SNS/index";
import { useRouter } from "next/router";
import ToastMention from "../ToastMessage";
import CommonLoadingBtn from "../Button/LoadingButton";

const AddChatDialog = ({ open, type, onClose }) => {
  const [inputState, setInputState] = useState("");
  const [mintBtnLoading, setMintBtnLoading] = useState(false);
  const [buyBtnLoading, setBuyBtnLoading] = useState(false);

  const router = useRouter();

  const isFriend = type === 0 ? true : false;

  const handleInpChange = useCallback((e) => {
    setInputState(e.target.value);
  }, []);

  const queryHasKeyName = useCallback(async () => {
    const hasName = await nameExisted(inputState);
    return hasName;
  }, [inputState]);

  const navigatorToProfile = useCallback(async () => {
    setMintBtnLoading(true);
    if (inputState.length > 0) {
      const hasName = await queryHasKeyName();
      if (hasName) {
        return router.push(`/Profile/${inputState}`);
      }
      setMintBtnLoading(false);
      ToastMention({ message: "Please input correct key name" });
      return;
    }
    ToastMention({ message: "Name is empty" });
    setMintBtnLoading(false);
  }, [inputState, queryHasKeyName, router]);

  const navigatorToBuyList = useCallback(async () => {
    setBuyBtnLoading(true);
    if (inputState.length > 0) {
      const hasName = await queryHasKeyName();
      if (hasName) {
        setBuyBtnLoading(false);
        return router.push(`/Market/PurchaseList/${inputState}`);
      }
      ToastMention({ message: "Please input correct key name" });
      return;
    }
    ToastMention({ message: "Name is empty" });
    setBuyBtnLoading(false);
  }, [inputState, queryHasKeyName, router]);

  return (
    <CommonDialog
      open={open}
      title={isFriend ? "Add Friend" : "Join Group"}
      onClose={() => {
        onClose();
        setBuyBtnLoading(false);
        setMintBtnLoading(false);
        setInputState("");
      }}
    >
      <Stack direction="column" spacing={2}>
        <InputBase
          value={inputState}
          placeholder={
            isFriend ? "Input xxx.key" : "Input groupID or groupName"
          }
          onChange={handleInpChange}
        />

        <CommonLoadingBtn
          loading={mintBtnLoading}
          variant="outlined"
          onClick={async () => {
            await navigatorToProfile();
          }}
        >
          {isFriend ? "Mint Follow-NFT" : "Mint Group-NFT"}
        </CommonLoadingBtn>
        <CommonLoadingBtn
          loading={buyBtnLoading}
          variant="outlined"
          onClick={async () => {
            await navigatorToBuyList();
          }}
        >
          {isFriend ? "Buy Follow-NFT" : "Buy Group-NFT"}
        </CommonLoadingBtn>
      </Stack>
    </CommonDialog>
  );
};

export default memo(AddChatDialog);
