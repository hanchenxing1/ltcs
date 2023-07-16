import { Paper } from "@mui/material";
import { memo } from "react";
import { TypographyWrapper } from "../Styled";

const PageTitleWrapper = ({ title }) => {
  return (
    <Paper sx={{ padding: "20px 0" }}>
      <TypographyWrapper>{title}</TypographyWrapper>
    </Paper>
  );
};

export default memo(PageTitleWrapper);
