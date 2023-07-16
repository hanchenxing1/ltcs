import http from "../utils/https";

export const queryContractByAddress = async (data) => {
  const res = await http({
    url: "/api/chatService/market/queryContractByAddress",
    params: data,
    method: "get",
  });
  return res;
};

export const queryContractList = async (data) => {
  const res = await http({
    url: "/api/chatService/market/queryContractList",
    params: data,
    method: "get",
  });
  return res;
};

export const queryOrderList = async (data) => {
  const res = await http({
    url: "/api/chatService/market/queryOrderList",
    params: data,
    method: "get",
  });
  return res;
};
