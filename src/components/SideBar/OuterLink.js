import { memo } from "react";
import { Box, Link, styled } from "@mui/material";
import Telegram from "../../assets/icons/common/telegram.svg";
import Twitter from "../../assets/icons/common/twitter.svg";
import Discord from "../../assets/icons/common/discord.svg";
import Github from "../../assets/icons/common/github.svg";
import { linkList } from "../../config/const";

const LinkBtn = styled(Link)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "black",
  "&:hover": {
    color: "#FB6D05",
  },
}));

const OuterLink = ({ sx }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "21px",
        ...sx,
      }}
    >
      {/* <LinkBtn href="#" underline="none">
                <Email />
            </LinkBtn> */}

      <LinkBtn href={linkList.twitter} target="_blank" underline="none">
        <Twitter />
      </LinkBtn>

      <LinkBtn href={linkList.telegram} target="_blank" underline="none">
        <Telegram />
      </LinkBtn>

      <LinkBtn href={linkList.discord} target="_blank" underline="none">
        <Discord />
      </LinkBtn>

      <LinkBtn href={linkList.github} target="_blank" underline="none">
        <Github />
      </LinkBtn>
    </Box>
  );
};

export default memo(OuterLink);
