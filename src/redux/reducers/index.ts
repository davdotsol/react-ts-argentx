import { Action, ActionType } from '../actionTypes/index';

interface EthBalanceState {
  ethBalance: string;
  loadingEthBalance: boolean;
  errorEthBalance: string | null;
}

interface GuardianCountState {
  guardianCount: number | null;
  loadingGuardianCount: boolean;
  errorGuardianCount: string | null;
}

const initialEthBalanceState = {
  ethBalance: '',
  loadingEthBalance: false,
  errorEthBalance: null,
};

const initialGuardianCountState = {
  guardianCount: null,
  loadingGuardianCount: false,
  errorGuardianCount: null,
};

export const ethBalanceReducer = (
  state: EthBalanceState = initialEthBalanceState,
  action: Action
): EthBalanceState => {
  switch (action.type) {
    case ActionType.GET_ETH_BALANCE_PENDING:
      return {
        loadingEthBalance: true,
        ethBalance: '',
        errorEthBalance: null,
      };
    case ActionType.GET_ETH_BALANCE_SUCCESS:
      return {
        loadingEthBalance: false,
        ethBalance: action.payload,
        errorEthBalance: null,
      };
    case ActionType.GET_ETH_BALANCE_FAIL:
      return {
        loadingEthBalance: false,
        ethBalance: '',
        errorEthBalance: action.payload,
      };
    default:
      return state;
  }
};

export const guardianCountReducer = (
  state: GuardianCountState = initialGuardianCountState,
  action: Action
): GuardianCountState => {
  switch (action.type) {
    case ActionType.GET_GUARDIAN_COUNT_PENDING:
      return {
        loadingGuardianCount: true,
        guardianCount: 0,
        errorGuardianCount: null,
      };
    case ActionType.GET_GUARDIAN_COUNT_SUCCESS:
      return {
        loadingGuardianCount: false,
        guardianCount: action.payload,
        errorGuardianCount: null,
      };
    case ActionType.GET_GUARDIAN_COUNT_FAIL:
      return {
        loadingGuardianCount: false,
        guardianCount: 0,
        errorGuardianCount: action.payload,
      };
    default:
      return state;
  }
};
