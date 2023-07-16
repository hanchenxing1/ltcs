import { ContactPageSharp } from "@mui/icons-material";
import {
  Box,
  Button,
  Paper,
  Typography,
  styled,
  Stack,
  Skeleton,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { emptyAddress } from "../../../config/const";
import { balanceOf, getFloorPrices, getTotal } from "../../../contracts/NFT";
import { getKeyAddress, weiFormatToEth, hexToNumber } from "../../../utils";
import CommonLoadingBtn from "../../Button/LoadingButton";
import MintOtherDialog from "./MintOtherDialog";

const TitleWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  borderBottom: "1px solid #ddd",
}));

const Wrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginTop: "10px",

  ".MuiTypography-root": {
    fontSize: "15px",
    fontWeight: 500,
  },
  ".MuiTypography-subtitle1": {
    color: "#777",
  },
}));

const OtherDetails = ({ type, contractAdd }) => {
  const { account } = useSelector((state) => ({
    account: state.walletInfo.account,
  }));

  const router = useRouter();

  const isFriend = type === "friend" ? true : false;

  const [mintOpen, setMintOpen] = useState(false);
  const [floorPrice, setFloorPrice] = useState(0);
  const [totalNFT, setTotalNFT] = useState(0);
  const [nftBalance, setNFTBalance] = useState(0);
  const [nftAdd, setNFTAdd] = useState(contractAdd);
  const keyAddress = getKeyAddress();

  const handleOpenMintNFTDialog = useCallback(async () => {
    setMintOpen(true);
  }, []);

  const getBasicInfo = useCallback(
    async (nftAddress) => {
      await getFloorPrice(nftAddress);
      await getTotalNFT(nftAddress);
      await getBalanceOf(nftAddress);
    },
    [getFloorPrice, getTotalNFT, getBalanceOf]
  );

  const getFloorPrice = useCallback(async (nftAddress) => {
    try {
      const priceHex = await getFloorPrices(nftAddress);
      setFloorPrice(weiFormatToEth(priceHex));
    } catch (error) {
      console.log("getFloorPriceErr:", error);
    }
  }, []);

  const getTotalNFT = useCallback(async (nftAddress) => {
    try {
      const totalHex = await getTotal(nftAddress);
      console.log("totalHex:", hexToNumber(totalHex));
      setTotalNFT(hexToNumber(totalHex));
    } catch (error) {
      console.log("getTotalNFTErr:", error);
    }
  }, []);

  const getBalanceOf = useCallback(
    async (nftAddress) => {
      try {
        const balance = await balanceOf(nftAddress, account);
        console.log("balance:", hexToNumber(balance));
        setNFTBalance(hexToNumber(balance));
      } catch (error) {
        console.log("getBalanceOfErr:", error);
      }
    },
    [account]
  );

  useEffect(() => {
    if (nftAdd && nftAdd !== emptyAddress) {
      getBasicInfo(nftAdd);
    }
  }, [getBasicInfo, nftAdd, contractAdd]);

  useEffect(() => {
    setNFTAdd(contractAdd);
  }, [contractAdd]);

  console.log("nftBalance:", nftBalance);

  return (
    <Paper>
      <TitleWrapper>
        <Typography variant="subtitle1">
          {isFriend ? "Follow-NFT details" : "Group-NFT details"}
        </Typography>
        {!isFriend ? (
          <CommonLoadingBtn disabled={true} variant="outlined">
            Info
          </CommonLoadingBtn>
        ) : (
          <></>
        )}
      </TitleWrapper>

      <Wrapper>
        <Typography>Contract Address: {nftAdd === emptyAddress ? "-" : nftAdd}</Typography>
        <Typography>{`Minted/All: ${totalNFT} / ${
          isFriend ? "150" : "1500"
        }`}</Typography>
        <Typography>{`Floor Price: ${floorPrice} KEY`}</Typography>

        <Stack direction="row" justifyContent="center" spacing={2}>
          <CommonLoadingBtn
            disabled={totalNFT === 0 || nftBalance !== 0}
            variant="outlined"
            onClick={handleOpenMintNFTDialog}
          >
            {isFriend ? "Mint" : "Mint"}
          </CommonLoadingBtn>
          <CommonLoadingBtn
            variant="outlined"
            disabled={totalNFT === 0 || nftBalance !== 0}
            onClick={() => {
              router.push(`/Market/PurchaseList/${nftAdd}`);
            }}
          >
            {isFriend ? "Buy" : "Buy"}
          </CommonLoadingBtn>
        </Stack>
      </Wrapper>

      <MintOtherDialog
        open={mintOpen}
        title={isFriend ? "Mint Follow-NFT" : "Mint Group-NFT"}
        isFriend={isFriend}
        coinAddress={keyAddress}
        from={account}
        to={nftAdd}
        price={floorPrice}
        onClose={() => {
          setMintOpen(false);
        }}
        onSuccess={async () => {
          await getTotalNFT(nftAdd);
          await getBalanceOf(nftAdd);
        }}
      />
    </Paper>
  );
};

export default memo(OtherDetails);
