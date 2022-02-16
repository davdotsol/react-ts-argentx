export enum ActionType {
  // Wallet actions
  GET_ETH_BALANCE_PENDING = 'GET_ETH_BALANCE_PENDING',
  GET_ETH_BALANCE_SUCCESS = 'GET_ETH_BALANCE_SUCCESS',
  GET_ETH_BALANCE_FAIL = 'GET_ETH_BALANCE_FAIL',
  // ArgentX contract actions
  GET_GUARDIAN_COUNT_PENDING = 'GET_GUARDIAN_COUNT_PENDING',
  GET_GUARDIAN_COUNT_SUCCESS = 'GET_GUARDIAN_COUNT_SUCCESS',
  GET_GUARDIAN_COUNT_FAIL = 'GET_GUARDIAN_COUNT_FAIL',
  // ERC20 Tokens actions
}

interface actionEthBalanceSuccess {
  type: ActionType.GET_ETH_BALANCE_SUCCESS;
  payload: string;
}

interface actionEthBalancePending {
  type: ActionType.GET_ETH_BALANCE_PENDING;
}

interface actionEthBalanceFail {
  type: ActionType.GET_ETH_BALANCE_FAIL;
  payload: string;
}

interface actionGuardianCountSuccess {
  type: ActionType.GET_GUARDIAN_COUNT_SUCCESS;
  payload: number;
}

interface actionGuardianCountPending {
  type: ActionType.GET_GUARDIAN_COUNT_PENDING;
}

interface actionGuardianCountFail {
  type: ActionType.GET_GUARDIAN_COUNT_FAIL;
  payload: string;
}

export type Action =
  | actionEthBalanceSuccess
  | actionEthBalancePending
  | actionEthBalanceFail
  | actionGuardianCountSuccess
  | actionGuardianCountPending
  | actionGuardianCountFail;
