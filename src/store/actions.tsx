import { Dispatch, IChainData, IRefreshing, IWallet } from "./interfaces";

// Send an action to the reducer

export const updateContextAction = (dispatch: Dispatch, context: string) => {
  return dispatch({
    type: "CONTEXT_UPDATED",
    payload: context,
  });
};

export const updateRefreshingAction = (
  dispatch: Dispatch,
  refreshing: IRefreshing
) => {
  return dispatch({
    type: "REFRESHING_UPDATED",
    payload: refreshing,
  });
};

export const updateWalletAction = (dispatch: Dispatch, wallet: IWallet) => {
  return dispatch({
    type: "WALLET_UPDATED",
    payload: wallet,
  });
};

export const updateChainDataAction = (
  dispatch: Dispatch,
  chainData: IChainData
) => {
  return dispatch({
    type: "CHAINDATA_UPDATED",
    payload: chainData,
  });
};
