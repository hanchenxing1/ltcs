import {
  Box,
  Button,
  Paper,
  Stepper,
  StepLabel,
  Step,
  styled,
  Typography,
  Link,
  Alert,
  AlertTitle,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonLoadingBtn from "../components/Button/LoadingButton";
import { chainsInfo, linkList } from "../config/const";
import { useWalletInfo } from "../providers/wallet";
import store from "../store";
import { compareAddress, splitAddress } from "../utils";
import CoffeeIcon from "@mui/icons-material/Coffee";
import Check from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";
import http from "../utils/https";
import { login, queryAccountInfo } from "../api";
import { getSigner } from "../utils/web3";
import { useRouter } from "next/router";

const Wrapper = styled(Paper)(() => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: "400px",

  ".MuiTypography-title": {
    fontSize: "18px",
    fontWeight: 600,
  },
  ".MuiTypography-subtitle1": {
    fontSize: "14px",
    fontWeight: 500,
    color: "#9a9a9a",
  },
  a: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#9a9a9a",
    textDecorationColor: "#9a9a9a",
    "&:hover": {
      color: "#ea6060",
      fontWeight: 600,
      textDecorationColor: "#ea6060",
    },
  },
}));

const StepLabelWrapper = styled(StepLabel)(() => ({
  ".MuiStepLabel-label": {
    display: "flex",
    // gap: "10px",
    justifyContent: "space-between",
    alignItems: "center",
    ".MuiTypography-root": {
      fontSize: "15px",
      color: "black",
    },
  },
}));

const LoadingBtn = styled(CommonLoadingBtn)(() => ({
  minWidth: "100px",
}));

const StepIconWrapper = styled(Box)(() => ({
  marginLeft: "2px",
  svg: {
    color: "#ea6060",
  },
}));

const StepIconFn = (props) => {
  const { active, completed } = props;

  return (
    <StepIconWrapper ownerState={{ active }}>
      {active ? (
        <CircularProgress size={18} />
      ) : completed ? (
        <Check />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            marginLeft: "7px",
            background: "#ea6060",
            borderRadius: "50px",
          }}
        />
      )}
    </StepIconWrapper>
  );
};

export default function Home() {
  const {
    connectWallet,
    disconnectWallet,
    initialClient,
    startLoading,
    closeLoading,
  } = useWalletInfo();

  const [initialLoading, setInitialLoading] = useState(false);

  const dispatch = useDispatch();
  const { account, snsName, connecting, clientAddress, token } = useSelector(
    (state) => {
      return {
        account: state.walletInfo.account,
        snsName: state.walletInfo.snsName,
        connecting: state.walletInfo.connecting,
        clientAddress: state.userInfo.clientAddress,
        token: state.userInfo.token,
      };
    }
  );

  Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
  };

  const icon = [
    "😁",
    "🔢",
    "😁",
    "👀",
    "😎",
    "🤡",
    "💬",
    "🚣",
    "🏊‍♂️",
    "🐳",
    "🍚",
    "🏝️",
    "🏖️",
    "🚛",
    "🚢",
    "⏱️",
    "🌈",
    "⚛️",
    "☯️",
    "♎",
    "🏳️‍🌈",
    "🚩",
  ].random();

  console.log("clientAddress:", clientAddress);

  const router = useRouter();

  const [activeStep, setActiveStep] = useState(0);

  const handleLoginToken = useCallback(async () => {
    startLoading();
    const singer = await getSigner();

    try {
      const signInfo = await singer.signMessage(snsName);

      const reqParams = {
        address: account,
        message: snsName,
        signature: signInfo,
      };
      const resp = await login(reqParams);

      if (resp && resp.code === 200 && resp.data.token) {
        dispatch({ type: "USER_INFO", value: resp.data });
      }
    } catch (error) {
      console.log("signInfoErr:", error);
    }
    closeLoading();
  }, [account, snsName, dispatch, closeLoading, startLoading]);

  const handleStep = useCallback(() => {
    if (account) {
      setActiveStep(1);
    } else {
      setActiveStep(0);
    }
    if (snsName) {
      setActiveStep(2);
    }
    if (clientAddress && account && compareAddress(clientAddress, account)) {
      setActiveStep(3);
    }
    if (token) {
      setActiveStep(4);
    }
  }, [account, snsName, clientAddress, token]);

  useEffect(() => {
    handleStep();
  }, [handleStep]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "20vh",
        marginRight: "80px",
      }}
    >
      <Stack direction="column" justifyContent="center" spacing={2} p={0}>
        <Alert
          icon={<CoffeeIcon />}
          severity="warning"
          style={{
            maxWidth: "400px",
            color: "#ca8a04",
          }}
        >
          <AlertTitle style={{ fontWeight: "600" }}>Beta warning</AlertTitle>
          Linkkey is still in the experience phase(deployed on{" "}
          {
            <Link
              style={{ color: "#ca8a04" }}
              href="https://polygon.technology/solutions/polygon-pos"
            >
              Polygon PoS
            </Link>
          }
          ), things may break, please handle us with care.
        </Alert>
        <Wrapper>
          <Typography variant="title">
            Welcome to LINNKEY, a Web3 Social Circle Protocol
          </Typography>

          <Typography variant="subtitle1">
            Get started by reading the <Link href={linkList.docs}>docs</Link> or
            joining the <Link href={linkList.discord}>community</Link>
          </Typography>

          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            sx={{ padding: "20px 10px" }}
          >
            <Step>
              <StepLabelWrapper>
                <Typography>
                  {account
                    ? `Connected ${splitAddress(account)}`
                    : "Connect Metamask"}
                </Typography>

                <LoadingBtn
                  variant="contained"
                  loading={account ? false : connecting}
                  onClick={() => {
                    if (account) {
                      disconnectWallet();
                    } else {
                      connectWallet();
                    }
                  }}
                >
                  {account ? "Disconnect" : "Connect"}
                </LoadingBtn>
              </StepLabelWrapper>
            </Step>

            <Step>
              <StepLabelWrapper>
                <Typography>
                  {snsName
                    ? `Hi, ${snsName} ${icon}`
                    : activeStep === 0
                    ? "Get your sns domain name"
                    : "SNS is not registered"}
                </Typography>
                {snsName ? (
                  <></>
                ) : (
                  <LoadingBtn
                    variant="contained"
                    hidden={activeStep < 1}
                    loading={connecting}
                    onClick={() => {
                      window.open(`${linkList.sns}`, "__blank");
                    }}
                  >
                    Register
                  </LoadingBtn>
                )}
              </StepLabelWrapper>
            </Step>

            <Step>
              <StepLabelWrapper>
                <Typography>
                  {clientAddress ? "Initialized" : "Initialize XMTP Client"}
                </Typography>
                <CommonLoadingBtn
                  variant="contained"
                  loading={connecting}
                  hidden={
                    compareAddress(clientAddress, account) || activeStep < 2
                  }
                  onClick={async () => {
                    startLoading();
                    await initialClient();
                    closeLoading();
                  }}
                >
                  Initial
                </CommonLoadingBtn>
              </StepLabelWrapper>
            </Step>

            <Step>
              <StepLabelWrapper>
                <Typography>{token ? "Logged in" : "Login"}</Typography>
                <CommonLoadingBtn
                  loading={connecting}
                  variant="contained"
                  hidden={activeStep < 3 || token}
                  onClick={handleLoginToken}
                >
                  Login
                </CommonLoadingBtn>
              </StepLabelWrapper>
            </Step>
          </Stepper>
          <CommonLoadingBtn
            loading={initialLoading}
            hidden={!token}
            variant="contained"
            onClick={() => {
              setInitialLoading(true);
              router.push(`Profile/${snsName}`);
            }}
          >
            Get started
          </CommonLoadingBtn>
        </Wrapper>
      </Stack>
    </Box>
  );
}
