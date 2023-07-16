import { formatEther, parseEther, formatUnits } from "ethers/lib/utils";
import { chainsInfo, contractAddress } from "../config/const";
import { getBalance } from "../contracts/ERC20";
import store from "../store/index";

const chainId = chainsInfo.chainId;

export const compareAddress = (add1, add2) => {
  if (add1 && add2 && add1.toLowerCase() === add2.toLowerCase()) {
    return true;
  } else {
    return false;
  }
};

export const splitAddress = (address, start = 11, end = -4) => {
  return (
    (address && address.slice(0, start) + "..." + address.slice(end)) || ""
  );
};

export const hexToNumber = (value) => {
  return parseInt(value._hex, 16);
};

export const weiFormatToEth = (value) => {
  let number = value.toString();
  if (value && value._hex) {
    number = hexToNumber(value).toString();
  }
  return Number(formatEther(number));
};

export const ethFormatToWei = (value) => {
  if (typeof value === "string") {
    return parseEther(value);
  }
  return parseEther(value.toString());
};

export const BNformatToWei = (value) => {
  return formatUnits(value, "wei");
};

export const getKeyAddress = () => {
  return contractAddress(chainId.toString()).keyAddress;
};

export const getTradingAddress = () => {
  return contractAddress(chainId.toString()).tradingAddress;
};

export const getKeyBalance = async (owner) => {
  const keyAddress = getKeyAddress();
  try {
    const balance = await getBalance(keyAddress, owner);
    const weiBalance = BNformatToWei(balance);
    return weiFormatToEth(weiBalance);
  } catch (error) {
    console.log("getKeyBalanceErr:", error);
  }
};

export const formatTime = (d) =>
  d
    ? d.toLocaleTimeString(undefined, {
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
      })
    : "";
