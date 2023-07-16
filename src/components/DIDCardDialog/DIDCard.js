import { Box, Stack, styled, Typography } from "@mui/material";
import QRCode from "qrcode.react";
import { memo } from "react";
import backImgItem from "../../assets/images/didCard/backImgItem.png";
import whiteLogo from "../../assets/images/didCard/whiteLogo.png";
import polygonGrant from "../../assets/images/didCard/polygonGrant.png";
import discordImg from "../../assets/images/didCard/D.png";
import twitterImg from "../../assets/images/didCard/t.png";
import telegramImg from "../../assets/images/didCard/tg.png";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";

const PrefaceWrapper = styled(Box)(() => ({
  width: "375px",
  backgroundColor: "#ea6060",
  backgroundImage: `url(${backImgItem.src})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  // borderRadius: "12px 12px 0 0",
  padding: "16px 20px",
  backgroundPositionY: "-150px",

  ".MuiTypography-subtitle1": {
    fontFamily: "Inter-Medium",
    fontSize: "24px",
    color: "#f7f8f8",
    textAlign: "center",
  },
}));

const TitleWrapper = styled(Typography)(() => ({
  fontSize: "67px",
  fontFamily: "Inter-Bold",
  fontWeight: 900,
  color: "white",
  textAlign: "center",
  span: {
    fontFamily: "Inter-Bold",
    fontWeight: 900,
    color: "#3e3a39",
  },
}));

const LogoSign = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  ".MuiTypography-root": {
    fontSize: "15px",
    fontFamily: "Inter-Medium",
    color: "#f7f8f8",
  },
}));

const LogoImg = styled("img")`
  position: relative;
  width: 7%;
  height: 7%;
`;

const QRCodeItem = styled(QRCode)`
  margin-top: 10%;
  border-radius: 12px;
`;

const ShareNameAndIcon = styled(Box)(() => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  span: {
    border: "1px solid #9a9a9a",
    padding: "10px 20px",
    fontSize: "15px",
    fontWeight: 600,
    borderRadius: "12px",
  },
  div: {
    position: "absolute",
    left: 160,
    width: "35px",
    height: "35px",
    backgroundColor: "#ea6060",
    borderRadius: "4px",
    svg: {
      width: "38px",
      height: "38px",
      color: "#fff",
    },
  },
}));

const ShareFooter = styled("div")`
  display: flex;
  bottom: 0;
  height: 37px;
  background-color: #3e3a39;
  justify-content: space-around;
  align-items: center;
  /* border-radius: 0 0 12px 12px; */
`;

// const ShareItem = styled(Box)`
//   color: #fff;
//   text-align: center;
//   font-size: 13px;
//   line-height: 40px;
//   font-weight: 1000;
//   text-align: center;
//   img {
//     color: #fff;
//     width: 14px;
//     height: 14px;
//     margin-right: 5px;
//   }
// `;

const ShareItem = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  color: "#fff",
  textAlign: "center",
  ".MuiTypography-root": {
    marginLeft: "5px",
  },
}));

const WebSiteText = styled(Typography)(() => ({
  fontSize: "16px",
  fontFamily: "Inter-Medium",
}));

const SharePolygonImg = styled(Image)(() => ({
  transform: "scale(0.43)",
}));

const DIDCard = ({ name }) => {
  const ShareFooterImg = {
    width: "14px",
    height: "14px",
  };
  return (
    <Box
      id="share"
      sx={{
        height: "100%",
      }}
    >
      <PrefaceWrapper>
        <TitleWrapper>
          WEB3 <span>DID CARD</span>
        </TitleWrapper>
        <Typography variant="subtitle1">Control your own data</Typography>
        <LogoSign>
          <LogoImg src={whiteLogo.src} />
          <Typography>LINKKEY</Typography>
        </LogoSign>
      </PrefaceWrapper>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        width="375px"
        p={0}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <QRCodeItem
            value={`https://sns.chat/name/${name}/details`}
            size={110}
            fgColor="#ea6060"
          />

          <ShareNameAndIcon>
            <span>{name}</span>
            <Box>
              <SearchIcon />
            </Box>
          </ShareNameAndIcon>
          <WebSiteText>www.sns.chat</WebSiteText>
        </Stack>

        <Box>
          <SharePolygonImg src={polygonGrant} alt="polygonGrant" />

          <ShareFooter>
            <ShareItem>
              <Image src={discordImg} alt="discordImg" {...ShareFooterImg} />
              <Typography>linkkey.io</Typography>
            </ShareItem>
            <ShareItem>
              <Image src={telegramImg} alt="telegramImg" {...ShareFooterImg} />
              <Typography>@linkkeydao</Typography>
            </ShareItem>
            <ShareItem>
              <Image src={twitterImg} alt="twitterImg" {...ShareFooterImg} />
              <Typography>@LinkkeyOfficial</Typography>
            </ShareItem>
          </ShareFooter>
        </Box>
      </Stack>
    </Box>
  );
};

export default memo(DIDCard);
