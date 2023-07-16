import { ethers } from "ethers";
import { chainsInfo } from "../config/const";
import { getResolverInfo } from "../contracts/Resolver";
import { getInfo } from "../contracts/SNS";
import store from "../store";

let requested = false;

const { snsName } = store.getState().walletInfo;

export const getProvider = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const provider = new ethers.providers.JsonRpcProvider(chainsInfo.infuraUrl);
  return provider;
};

export const getSigner = async () => {
  const provider = getProvider();
  try {
    const signer = provider.getSigner();
    await signer.getAddress();
    return signer;
  } catch (e) {
    if (window.ethereum) {
      try {
        if (requested === true) return provider;
        await window.ethereum.enable();
        const signer = await provider.getSigner();
        await signer.getAddress();
        return signer;
      } catch (e) {
        requested = true;
        console.log("getSignerErr:", e);
        return provider;
      }
    } else {
      return provider;
    }
  }
};

export const getAccount = async () => {
  try {
    const signInfo = await getSigner();
    const account = await signInfo.getAddress();
    if (parseInt(account, 16) !== 0) {
      return account;
    } else {
      return [];
    }
  } catch (e) {
    console.log("getAccountErr:", e);
    return [];
  }
};

export const getChainId = () => {
  const eth = window.ethereum;
  const chainId = eth.networkVersion;
  return chainId;
};

export const fromNameGetInfo = async (name) => {
  const obj = {
    avatar: "",
    description: "",
  };

  try {
    const userInfo = await getResolverInfo(name);

    if (userInfo && userInfo.ipfsUrl) {
      obj.avatar = userInfo.ipfsUrl;
    }
    if (userInfo && userInfo.description) {
      obj.description = userInfo.description;
    }
    if (name === snsName) {
      store.dispatch({ type: "SET_DES", value: obj.description });
      store.dispatch({ type: "SET_AVATAR", value: obj.ipfsUrl });
    }
    return obj;
  } catch (error) {
    console.log("fromNameGetInfoErr:", error);
    return obj;
  }
};

export const fromAddressGetName = async (address) => {
  try {
    const info = await getInfo(address, "", 0);
    return info[2];
  } catch (error) {
    console.log("fromAddressGetNameErr:", error);
    return "";
  }
};
