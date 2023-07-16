export const linkList = {
  docs: "https://docs.linkkey.io",
  blog: "https://mirror.xyz/0x2e4e14FA1fe656679fBfcdfa9F08afcebd248e9e",
  whitePaper: "https://linkkey.io/whitepaper",
  sns: "https://sns.chat/",
  linkChat: "#",
  roadMap: "https://roadmap.linkkey.io/",
  github: "https://github.com/Link-Key",
  twitter: "https://twitter.com/LinkkeyOfficial",
  telegram: "https://t.me/linkkeydao",
  discord: "https://discord.com/invite/UMNRQryyts",
  dao: "https://client.aragon.org/#/linkkey.aragonid.eth",
  teamDao: "https://client.aragon.org/#/linkkeyteam.aragonid.eth",
};

export const emptyAddress = "0x0000000000000000000000000000000000000000";

// Main Network
export const chainsInfo = {
  chainId: 137,
  chainIdHex: "0x89",
  chainName: "Polygon Mainnet",
  token: "MATIC",
  rpcUrl: "https://polygon-rpc.com",
  blockExplorerUrls: "https://polygonscan.com",
  infuraUrl:
    "https://polygon-mainnet.infura.io/v3/5a380f9dfbb44b2abf9f681d39ddc382",
};

// Test Network //可以不需要这个
// export const chainsInfo = {
//   chainId: 80001,
//   chainIdHex: "0x13881",
//   chainName: "Polygon Mumbai",
//   token: "MATIC",
//   rpcUrl: "https://rpc-mumbai.maticvigil.com/",
//   blockExplorerUrls: "https://mumbai.polygonscan.com/",
//   infuraUrl:
//     "https://polygon-mumbai.g.alchemy.com/v2/lzpTmazJeflJIPmTouaSiDo4uYtKC1tw",
// };

// Test Network
export const contractAddress = (chainId) => {
  let snsAddress;
  let keyAddress;
  let stakeAddress;
  let tradingAddress;
  let resolverAddress;
  switch (chainId) {
    case "137":
      snsAddress = "0x19AD2b1F012349645C3173EA63F98948A2b43d27";
      keyAddress = "0x5CA9A8405499a1Ee8fbB1849f197b2b7e518985f";
      stakeAddress = "0x4417C0ABF812a943ca2491E0330970d42fa43E99";
      tradingAddress = "0x5E1E453C50AECCd16Fb2DaA8959FBBa8B35e5B63";
      resolverAddress = "0x08f4372e1CdBDcD958cF5ad6ECcb5637E64A9Ac7";
      break;
    case "80001":
      // snsAddress = "0x23bf7e618c5C2F2772620aa7D57fE6db27eeA176";
      snsAddress = "0x362945C3ffa822854240788EcdB509f104E56588";
      keyAddress = "0xFA12F5ff3c2A137a02F1678E50c54276624b50FB";
      // stakeAddress = "0x279339127a5B4b7580044E5De0DBEA201e0BF723";
      stakeAddress = "0xaA4F164fE5992CF7940C502aa2fDf53aFE09cD54";
      // tradingAddress = "0xB1d8DCf3d31FF8A50F5023883332d03827009056";
      tradingAddress = "0xB6Da7994180a6F074B0E1221ad8b4f89179088CA";
      // resolverAddress = "0x71Bc31C3eE2896408B93E41b0b43ea1bf9a20FE3";
      resolverAddress = "0x2593dE25e895250b33a8cC49abdFa3DE99926e67";
      break;
    default:
      break;
  }
  return {
    snsAddress,
    keyAddress,
    stakeAddress,
    tradingAddress,
    resolverAddress,
  };
};

export const version = {
  url: "https://mirror.xyz/linkkeyio.eth/rJ8UlH-gVq-IaM19xJMXzy4wDZdOj8ImVyuY-BcZVww",
  number: "v1.0_alpha",
};
