import React from "react";
import {
  defaultChainData,
  defaultRefreshing,
  defaultWallet,
  IAction,
  IState,
} from "./interfaces";

const initialState: IState = {
  context: "welcome",
  refreshing: defaultRefreshing,
  wallet: defaultWallet,
  chainData: defaultChainData,
};

export const Store = React.createContext<IState | any>(initialState);

// The reducer takes the state and applies the action(s) to it in order to modify the store
// Each action has a type and payload
function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case "CONTEXT_UPDATED":
      return { ...state, context: action.payload };
    case "REFRESHING_UPDATED":
      return { ...state, refreshing: action.payload };
    case "WALLET_UPDATED":
      return { ...state, wallet: action.payload };
    case "CHAINDATA_UPDATED":
      return { ...state, chainData: action.payload };
    default:
      return state;
  }
}

// This is used to inject the Store at the top level in the index.tsx file
export function StoreProvider(props: any): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children}
    </Store.Provider>
  );
}
