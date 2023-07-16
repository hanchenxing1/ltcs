import http from "../utils/https";

export const login = async (data) => {
  const res = await http({
    url: "/api/chatService/user/login",
    data: {
      ...data,
    },
    method: "post",
  });
  return res;
};

export const bindTwitter = async (data) => {
  const res = await http({
    url: "/api/chatService/user/bindTwitter",
    data: {
      ...data,
    },
    method: "post",
  });
  return res;
};

export const queryUserInfo = async (data) => {
  const res = await http({
    url: "/api/chatService/user/userInfo",
    params: {
      ...data,
    },
    method: "get",
  });
  return res;
};

export const queryAccountInfo = async (data) => {
  const res = await http({
    url: "/api/v1/accountService/account/queryAccount",
    params: data,
    method: "get",
  });
  return res;
};

export const issueNFT = async (data) => {
  const res = await http({
    url: "/api/chatService/user/issueNFT",
    data: {
      ...data,
    },
    method: "post",
  });
  return res;
};

export const myContracts = async (data) => {
  const res = await http({
    url: "/api/chatService/user/myContracts",
    params: {
      ...data,
    },
    method: "get",
  });
  return res;
};

export const queryFriends = async (data) => {
  const res = await http({
    url: "/api/chatService/user/friends",
    params: {
      ...data,
    },
    method: "get",
  });
  return res;
};

export const queryMyGroups = async (data) => {
  const res = await http({
    url: "/api/chatService/user/myGroups",
    params: {
      ...data,
    },
    method: "get",
  });
  return res;
};
