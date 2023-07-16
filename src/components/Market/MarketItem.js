import { Avatar, Box, styled, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import { useState } from "react";
import { memo } from "react";
import CommonAvatar from "../Common/CommonAvatar";
import MarketDialog from "./MarketDialog";

const Wrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "190px",
  padding: "10px 10px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  cursor: "pointer",

  "&:hover": {
    ".MuiTypography-title": {
      color: "#ea6060",
    },
  },
}));

const MarketItem = ({ type, info }) => {
  const [marketItemOpen, setMarketItemOpen] = useState(false);
  const { name, releaseAmount, floorPrice, mintAmount, ipfsUrl } = info;

  console.log("MarketItem:", info);

  const handleCloseDialog = useCallback(() => {
    setMarketItemOpen(false);
  }, []);

  return (
    <Wrapper
      onClick={() => {
        if (marketItemOpen === false) setMarketItemOpen(true);
      }}
    >
      <Stack direction="row" p={0} spacing={1}>
        {/* {ipfsUrl ? (
          <CommonAvatar avatarUrl={ipfsUrl} sx={{ borderRadius: "12px" }} />
        ) : (
          <CommonAvatar name={name} />
        )} */}
        <CommonAvatar name={name} />
        <Stack direction="column" p={0}>
          <Typography
            variant="title"
            sx={{ fontWeight: 600, fontSize: "15px" }}
          >
            {name}
          </Typography>
          <Typography sx={{ color: "#7a7a7a" }}>
            {mintAmount} holders
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="space-between" p={0}>
        <Box>
          <Typography sx={{ fontWeight: 500, fontSize: "14px" }}>
            Mintable/All
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>{releaseAmount}/150</Typography>
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 500, fontSize: "14px" }}>
            Floor price
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>{floorPrice} KEY</Typography>
        </Box>
      </Stack>

      <MarketDialog
        type={type}
        info={info}
        open={marketItemOpen}
        onClose={handleCloseDialog}
      />
    </Wrapper>
  );
};

export default MarketItem;
