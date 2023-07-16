import {
  Box,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import LinkkeyLogo from "../../assets/icons/common/logo.svg";
import OuterLink from "./OuterLink";
import PortraitIcon from "@mui/icons-material/Portrait";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import QuizIcon from "@mui/icons-material/Quiz";
import SmsIcon from "@mui/icons-material/Sms";
import StoreIcon from "@mui/icons-material/Store";
import InterestsIcon from "@mui/icons-material/Interests";
import DnsIcon from "@mui/icons-material/Dns";
import { useWalletInfo } from "../../providers/wallet";
import { useSelector } from "react-redux";
import CommonLoadingBtn from "../Button/LoadingButton";
import { useRouter } from "next/router";
import { useCallback } from "react";
import ToastMention from "../ToastMessage";
import { version } from "../../config/const";
import moment from "moment/moment";

const SideBarWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  height: "100vh",
  color: "black",
  padding: "40px 20px",
  borderRadius: "0 12px 12px 0",
  boxShadow: "1px 0px 0px rgba(255, 255, 255, 0.1)",

  width: "260px",
}));

const SideListItem = styled(ListItemButton)((props) => ({
  display: "flex",
  width: "100%",
  background: props.active ? "#00000012" : "transparent",
  borderRadius: "16px",
  cursor: "pointer",
  span: {
    fontSize: 16,
    fontWeight: 500,
  },
  "& span,svg": {
    color: props.active ? "#ea6060" : "inherit",
  },
  "&:hover": {
    backgroundColor: "#00000012",
    color: "#ea6060",
    svg: {
      color: "#ea6060",
    },
  },
}));

const menuList = [
  {
    name: "Profile",
    type: "menu",
    icon: <PortraitIcon />,
  },
  { name: "Chat", type: "menu", icon: <SmsIcon /> },
  {
    name: "Market",
    type: "menu",
    icon: <StoreIcon />,
  },
  {
    name: "Circle",
    type: "https://docs.linkkey.tech/AboutLinkkey/Circle.html",
    icon: <InterestsIcon />,
  },
  {
    name: "SNS",
    type: "https://sns.chat/",
    icon: <DnsIcon />,
  },
  {
    name: "Docs",
    type: "https://docs.linkkey.tech",
    icon: <DescriptionRoundedIcon />,
  },
  {
    name: "Support",
    type: "https://discord.gg/nMQwb3cpcA",
    icon: <QuizIcon />,
  },
];

const SideBar = () => {
  const { connectWallet, disconnectWallet } = useWalletInfo();

  const router = useRouter();

  const { account, connecting, snsName, token } = useSelector((state) => {
    return {
      account: state.walletInfo.account,
      connecting: state.walletInfo.connecting,
      snsName: state.walletInfo.snsName,
      token: state.userInfo.token,
    };
  });

  const handleHref = ({ name, type }) => {
    if (type === "menu") {
      if (account) {
        if (name === "Profile") {
          return router.push(`/${name}/${snsName}`);
        }
        if (name === "Chat") {
          return router.push(`/${name}/Friend`);
        }
        return router.push(`/${name}`);
      } else {
        ToastMention({ message: "Unregistered SNS domain name", type: "warn" });
        return null;
      }
    } else {
      return window.open(type, "__blank");
    }
  };

  const handleListActive = useCallback(
    (item) => {
      if (item.name === "Profile") {
        const address =
          router.query && router.query.address ? router.query.address[0] : "";
        if (
          router.pathname.includes(item.name) &&
          address &&
          address === account
        ) {
          return 1;
        }
        return 0;
      }
      return router.pathname.includes(item.name) ? 1 : 0;
    },
    [router, account]
  );

  return (
    <SideBarWrapper>
      <Box>
        <div style={{ display: "block" }}>
          <Link
            sx={{
              display: "flex",
              alignItems: "center",
              svg: {
                width: "200px",
              },
            }}
            onClick={() => {
              router.push("/");
            }}
          >
            <LinkkeyLogo />
            {/* <Image src={LinkkeyLogo} alt="logo" /> */}
          </Link>
          <div
            style={{ textAlign: "right", fontSize: "12px", color: "#eb6161" }}
          >
            <a href={version.url}>{version.number}</a>
          </div>
        </div>

        <List
          component="nav"
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
            marginTop: "50px",
          }}
        >
          {menuList.map((item, index) => (
            <SideListItem
              key={index}
              active={handleListActive(item)}
              onClick={() => {
                handleHref({ name: item.name, type: item.type });
              }}
            >
              <ListItemIcon style={{ color: "rgba(0, 0, 0, 0.8)" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </SideListItem>
          ))}
        </List>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "25px",
        }}
      >
        <CommonLoadingBtn
          variant="outlined"
          loading={connecting}
          sx={{
            textAlign: "center",
          }}
          onClick={() => {
            if (account) {
              disconnectWallet();
            } else {
              router.push("/");
            }
          }}
        >
          {account ? (token ? "Logout" : "Disconnect") : "Start Journey"}
        </CommonLoadingBtn>
        <OuterLink />
        <Typography>{`© 2021-${moment().format(
          "YYYY"
        )} by Linkkey DAO`}</Typography>
      </Box>
    </SideBarWrapper>
  );
};

export default SideBar;
