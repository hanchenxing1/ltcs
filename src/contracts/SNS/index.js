import { Contract, ethers } from "ethers";
import { chainsInfo, contractAddress, emptyAddress } from "../../config/const";
import { getProvider, getSigner, getChainId } from "../../utils/web3";
import SNSContractABI from "./SNS.json";

export const SNSInstance = () => {
  const provider = getProvider();
  const chainId = getChainId();
  const snsAddress = contractAddress(chainId).snsAddress;
  const SNS = new Contract(snsAddress, SNSContractABI, provider);
  return SNS;
};

const getInfo = async (addr_, name_, tokenId_) => {
  try {
    const info = await SNSInstance().getInfo(addr_, name_, tokenId_);
    return info;
  } catch (error) {
    console.log("getInfoErr:", error);
  }
};

const getTokenIdOfName = async (name) => {
  const info = await SNSInstance().getInfo(emptyAddress, name, 0);
  return info.tokenIdOfName;
};

const getResolverOwner = async (name) => {
  console.log("getResolverOwner:", name);
  console.log("SNSInstance:", SNSInstance());
  try {
    const info = await SNSInstance().getInfo(emptyAddress, name, 0);
    return info.resolverOwner;
  } catch (error) {
    console.log("getResolverOwnerErr:", error);
  }
};

const nameExisted = async (name) => {
  const info = await SNSInstance().getInfo(emptyAddress, name, 0);
  return info.recordExists;
};

const getStake = async (tokenId_) => {
  const isStake = await SNSInstance().getStake(tokenId_);
  return isStake;
};

export {
  getInfo,
  getTokenIdOfName,
  getResolverOwner,
  getStake, // is staked
  nameExisted,
};
