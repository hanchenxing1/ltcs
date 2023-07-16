import axios from "axios";
import Router from "next/router";
import ToastMention from "../components/ToastMessage";
import store from "../store";

export const IPFS_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGU1ZTkzYzk3YUVFRTQ5MTExN0U4MTg2ZWU4NkYwMjA5ODVGRTY4YmIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2Mjk3NjE5MTQ3MCwibmFtZSI6ImxpbmtrZXktYXZhdGFyIn0.EBXANJD-5t4N8WoFq-ufeWJcj8IO7MBbADPtNsaRalY";

// create axios instance
const http = axios.create({
  baseURL: "",
  // request connect timeout
  timeout: 2 * 60 * 1000,
  // 表示跨域请求时是否需要使用凭证，开启后，后端服务器要设置允许开启
  // withCredentials: true,
  headers: {
    "x-agent-did": IPFS_API_KEY,
  },
});

const handleCode = (code, msg, errorUrl) => {
  if (code === 10001) {
    Router.push("/");
    console.log("handleCodeMsg:", msg);
    ToastMention({ message: msg, type: "error" });
  }
};

http.interceptors.request.use(
  (config) => {
    if (store.getState().userInfo.token) {
      config.headers.Authorization = `Bearer ${
        store.getState().userInfo.token
      }`;
    }

    if (config.url.includes("https://api.nft.storage/upload")) {
      config.headers["Content-Type"] = "image/*'";
      config.headers.Authorization = `Bearer ${IPFS_API_KEY}`;
    }
    return config;
  },
  (error) => {
    console.warn(error);
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    const { data, config } = response;
    const { code, msg: message } = data;
    if (code === 10001) {
      handleCode(code, message, config.url);
    }
    return data;
  },
  (error) => {
    ToastMention({
      message: error.message,
      type: "error",
    });

    return Promise.reject(error);
  }
);

export default http;
