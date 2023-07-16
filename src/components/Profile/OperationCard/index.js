import { Paper, styled, Typography, Card, Box } from "@mui/material";

import Details from "./Detais";
import { useCallback, useEffect, useState } from "react";
import { getStakedInfo } from "../../../contracts/Stake";
import { emptyAddress } from "../../../config/const";

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

const OperationAlert = styled(Paper)(() => ({
  width: "500px",
  height: "70px",
  borderRadius: "12px",
  textAlign: "center",
  background: "#ff928d",
  color: "#fff",
  fontWeight: 500,
  margin: "0 auto",
}));

const OperationCard = ({ profileAdd }) => {
  const [friendAddress, setFriendAddress] = useState(emptyAddress);
  const [groupAddress, setGroupAddress] = useState(emptyAddress);

  const getStakeInfoFn = useCallback(async () => {
    const resp = await getStakedInfo(profileAdd);

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
      {friendAddress !== emptyAddress || groupAddress !== emptyAddress ? (
        <></>
      ) : (
        <OperationAlert>
          ⚠️ You are not currently release Follow-NFT or Group-NFT, click the
          button below to release your NFT!
        </OperationAlert>
      )}

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
        <Details
          type="friend"
          contractAdd={friendAddress}
          profileAdd={profileAdd}
        />
        <Details
          type="group"
          contractAdd={groupAddress}
          profileAdd={profileAdd}
        />
      </Box>
    </OperationCardWrapper>
  );
};

export default OperationCard;
