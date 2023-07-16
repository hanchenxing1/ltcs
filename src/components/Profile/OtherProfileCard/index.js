import { Card, styled, Typography, Stack, Box } from "@mui/material";
import { useCallback } from "react";
import { useEffect } from "react";
import { memo, useState } from "react";
import { emptyAddress } from "../../../config/const";
import { getStakedInfo } from "../../../contracts/Stake";
import OtherDetails from "./OtherDetails";

const OperationCardWrapper = styled(Card)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  borderRadius: "12px",

  ".MuiTypography-title": {
    fontWeight: 500,
    fontSize: "25px",
    color: "#9a9a9a",
  },
}));

const OtherProfileCard = ({ profileAdd }) => {
  const [friendAddress, setFriendAddress] = useState("");
  const [groupAddress, setGroupAddress] = useState("");

  const getStakeInfoFn = useCallback(async () => {
    const resp = await getStakedInfo(profileAdd);
    console.log("getStakeInfoFn:", resp);
    if (resp && resp.friendNFTAddress && resp.groupNFTAddress) {
      setFriendAddress(resp.friendNFTAddress);
      setGroupAddress(resp.groupNFTAddress);
    }
  }, [profileAdd]);

  useEffect(() => {
    if (profileAdd) {
      getStakeInfoFn();
    }
  });

  return (
    <OperationCardWrapper>
      <Typography variant="title">NFTs</Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          flexWrap: { xs: "wrap", md: "wrap", lg: "unset", xl: "unset" },
          "& .MuiPaper-root": {
            width: "100%",
            minWidth: "400px",
            borderRadius: "12px",
          },
          ".MuiTypography-subtitle1": {
            fontSize: "20px",
            fontWeight: 500,
          },
          svg: {
            color: "#ea6060",
            cursor: "pointer",
          },
        }}
      >
        <OtherDetails
          type="friend"
          contractAdd={friendAddress}
          // isMinted={friendAddress === emptyAddress}
        />
        <OtherDetails
          type="group"
          contractAdd={groupAddress}
          // isMinted={groupAddress !== emptyAddress}
        />
      </Box>
    </OperationCardWrapper>
  );
};

export default memo(OtherProfileCard);
