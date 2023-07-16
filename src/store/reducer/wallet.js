import { chainsInfo } from "../../config/const";

const initialWalletState = {
  chainId: null,
  account: null,
  snsName: null,
  connecting: false,
};

const WalletReducer = (state = initialWalletState, action) => {
  switch (action.type) {
    case "SET_ACCOUNTS":
      return { ...state, account: action.value };
    case "SET_CHAIN_ID":
      return { ...state, chainId: action.value };
    case "SET_SNS_NAME":
      return { ...state, snsName: action.value };
    case "WALLET_LOADING":
      return { ...state, connecting: action.value };
    case "LOGOUT":
      return { ...state, account: null, snsName: null };
    default:
      return state;
  }
};

export default WalletReducer;
