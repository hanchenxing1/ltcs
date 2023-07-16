import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { memo } from "react";
import CommonDialog from "../CommonDialog";

const MarketDialog = ({ open, onClose, type, info }) => {
  const router = useRouter();

  return (
    <CommonDialog
      open={open}
      title={type === 0 ? "Become Friend" : "Join Group"}
      onClose={onClose}
      sx={{ width: "400px" }}
    >
      <Stack direction="column" spacing={2}>
        <Button
          variant="outlined"
          onClick={() => {
            router.push(`/Profile/${info.name}`);
          }}
        >
          Mint from Owner
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            router.push(`/Market/PurchaseList/${info.contractAddress}`);
          }}
        >
          Buy from Market
        </Button>

        <Typography
          variant="subtitle1"
          sx={{
            color: "#777",
            fontWeight: 500,
          }}
        >
          {type === 0
            ? `
          Note: Buy his(her) Follow-NFT and you will automatically become his(her) friend.You can buy it in the above two ways`
            : `Note: buy his(her) Group-NFT, you will automatically join the Group chat. You can buy it in the above two ways`}
        </Typography>
      </Stack>
    </CommonDialog>
  );
};

export default memo(MarketDialog);
