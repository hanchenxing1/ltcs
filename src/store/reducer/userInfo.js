const initialUserState = {
  friendAuth: false,
  groupAuth: false,
  token: null,
  twitterId: null,
  twitterName: null,
  twitterStatus: false,
  clientAddress: null,
  description: "",
  avatar: "",
};

const UserReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case "USER_INFO":
      return { ...state, ...action.value, avatar: action.value.ipfsUrl };
    case "SET_CLIENT_ADD":
      return { ...state, clientAddress: action.value };
    case "SET_USER_TOKEN":
      return { ...state, token: action.value };
    case "CLEAR_USER_INFO":
      return { ...initialUserState };
    case "SET_DES":
      return { ...state, description: action.value };
    case "SET_AVATAR":
      return { ...state, avatar: action.value };
    default:
      return state;
  }
};

export default UserReducer;
