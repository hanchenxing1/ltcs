import { Card, CardHeader, Stack, Typography } from "@mui/material";
import { memo } from "react";
import ItemsCard from "./ItemsCard";

const FriendAndGroupCard = () => {
  return (
    <Stack
      direction="row"
      spacing={2}
      p={0}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
          borderRadius: "12px",
        },
      }}
    >
      <ItemsCard type="friend" />

      {/* <ItemsCard type="group" /> */}
    </Stack>
  );
};

export default memo(FriendAndGroupCard);
