import { createContext, useContext, useReducer } from "react";

const initialState = {
  open: false,
  step: 0,
  loading: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "ADD_STEP":
      return { ...state, step: state.step + 1 };
    case "RESET_STEP":
      return { ...state, step: 0 };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "OPEN_DIALOG":
      return { ...state, open: true };
    case "CLOSE_DIALOG":
      return { ...state, open: false, step: 0, loading: false };
  }
};

const DialogContext = createContext();

const ApproveDialogProvider = ({ children }) => {
  const [state, dialogDispatch] = useReducer(reducer, initialState);

  return (
    <DialogContext.Provider value={{ state, dialogDispatch }}>
      {children}
    </DialogContext.Provider>
  );
};

const useDialog = () => ({ ...useContext(DialogContext) });

export { useDialog, ApproveDialogProvider };
