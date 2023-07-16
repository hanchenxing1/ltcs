import { Typography, Box, styled, Button, InputBase } from "@mui/material";
import { memo, useCallback, useState } from "react";
import CommonDialog from "../../CommonDialog";
import EllipsisAddress from "../../EllipsisAddress";

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

const CreateGroupDialog = ({ open, title, contractAdd, onClose }) => {
  const [groupNameInp, setGroupNameInp] = useState("");

  const handleChangeGrpNameInp = useCallback((e) => {
    setGroupNameInp(e.target.value);
  }, []);

  return (
    <CommonDialog open={open} title={title} onClose={onClose}>
      <Wrapper>
        <Items>
          <Typography>Contract Address: </Typography>
          <EllipsisAddress account={contractAdd} />
        </Items>
        <TypographyBox aria-label="Transfer" sx={{ gap: "5px" }}>
          <Typography>Group Name:</Typography>
          <InputBase
            value={groupNameInp || ""}
            placeholder="Input group name"
            onChange={handleChangeGrpNameInp}
          />
        </TypographyBox>
        <Button
          variant="contained"
          sx={{
            margin: "5px auto",
          }}
        >
          Submit
        </Button>
      </Wrapper>
    </CommonDialog>
  );
};

export default memo(CreateGroupDialog);
