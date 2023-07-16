import { Stack } from "@mui/material";
import { memo } from "react";
import { TableNoData } from "../../assets/icons/common/tableNoRows.svg";

const TableNoRow = () => {
  return (
    <Stack
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <TableNoData />
    </Stack>
  );
};

export default memo(TableNoRow);
