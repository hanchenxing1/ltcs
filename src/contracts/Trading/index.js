import { Contract, ethers } from "ethers";
import { chainsInfo, contractAddress } from "../../config/const";
import { getProvider, getSigner, getChainId } from "../../utils/web3";
import TradingContractABI from "./Trading.json";

export const TradingInstance = () => {
  const provider = getProvider();
  const chainId = getChainId();
  const tradingAddress = contractAddress(chainId).tradingAddress;
  const Trading = new Contract(tradingAddress, TradingContractABI, provider);
  return Trading;
};

const setOrder = async (nftAddress, erc20Address, erc20Amount, tokenId) => {
  const signer = await getSigner();
  const Trading = await TradingInstance().connect(signer);
  await Trading.setOrder(nftAddress, erc20Address, erc20Amount, tokenId);
};

const cancelOrder = async (nftAddress) => {
  const signer = await getSigner();
  const Trading = await TradingInstance().connect(signer);
  await Trading.cancelOrder(nftAddress);
};

const buy = async (seller, nftAddress, tokenId) => {
  const signer = await getSigner();
  const Trading = await TradingInstance().connect(signer);
  await Trading.buy(seller, nftAddress, tokenId);
};

const getOrder = async (owner, nftAddress) => {
  const order = await TradingInstance().getOrder(owner, nftAddress);
  return order;
};

export {
  setOrder, //上架 1.NFT isApprovalForAll => setApprovalForAll 2.this
  cancelOrder, //下架
  buy, // 购买 1.getOrder 得到 erc20Address、erc20Amount,2.ERC20 allance => approve,3.this
  getOrder, //查看订单
};
