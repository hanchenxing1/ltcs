import { Contract } from "ethers";
import { chainsInfo, contractAddress } from "../../config/const";
import { getProvider, getSigner, getChainId } from "../../utils/web3";
import ERC20ContractABI from "./ERC20.json";

export const ERC20Instance = (erc20Address) => {
  const provider = getProvider();
  const ERC20 = new Contract(erc20Address, ERC20ContractABI, provider);
  return ERC20;
};

// get key price
const getBalance = async (erc20Address, owner) => {
  const balance = await ERC20Instance(erc20Address).balanceOf(owner);
  return balance;
};

const allowance = async (erc20Address, formAddress, toAddress) => {
  const allowanceValue = await ERC20Instance(erc20Address).allowance(
    formAddress,
    toAddress
  );
  return allowanceValue;
};

const approve = async (erc20Address, spender, amount) => {
  const signer = await getSigner();
  const ERC20 = await ERC20Instance(erc20Address).connect(signer);
  await ERC20.approve(spender, amount);
};

export {
  getBalance, // 查询余额
  allowance, //查看授权
  approve, //授权
};
