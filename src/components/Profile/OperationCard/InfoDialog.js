import { Button, DialogContent, Stack, Typography } from "@mui/material";
import { memo } from "react";
import CommonDialog from "../../CommonDialog";

const ReleaseIntroduce = {
  friend: [
    "1. Twitter verification is required to release friend-NFT and only eligible Twitter accounts can be released",
    "2. friend-NFT can be released by paying the release service fee",
    "3. friend-NFT is fixed at 150 nft, all of which can be sold to the public",
    "4. When releasing friend-NFT, a flat floor price is currently set to avoid pricing reasonableness",
  ],
  group: [
    "1. Twitter verification is required to release group-NFT and only eligible Twitter accounts can be released",
    "2. group-NFT can be released by paying the release service fee",
    "3. group-NFT is fixed at 1500 nft, all of which can be sold to the public",
    "4. When releasing group-NFT, a flat floor price is currently set to avoid pricing reasonableness",
  ],
};

const InfoDialog = ({ open, title, onClose, type }) => {
  const introduceList =
    type === "friend" ? ReleaseIntroduce.friend : ReleaseIntroduce.group;

  return (
    <CommonDialog open={open} title={title} onClose={onClose}>
      <DialogContent>
        <Stack direction="column" spacing={3}>
          {introduceList &&
            introduceList.map((item, index) => (
              <Typography key={index} sx={{ fontWeight: 500 }}>
                {item}
              </Typography>
            ))}
        </Stack>
      </DialogContent>
      <Button
        variant="contained"
        sx={{
          margin: "0 auto",
        }}
        onClick={() => {
          onClose();
        }}
      >
        OK
      </Button>
    </CommonDialog>
  );
};

export default memo(InfoDialog);
