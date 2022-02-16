import { Dispatch } from 'redux';
import { ActionType, Action } from '../actionTypes';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

export const getEthBalance = (wallet: string, web3: Web3 | null) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.GET_ETH_BALANCE_PENDING,
    });

    try {
      if (!web3) {
        throw new Error('Failed to load Web3');
      }
      const ethBalance = await web3.eth.getBalance(wallet);

      dispatch({
        type: ActionType.GET_ETH_BALANCE_SUCCESS,
        payload: ethBalance,
      });
    } catch (err) {
      let errorMessage = 'Failed to fetch eth balance';
      if (err instanceof Error) {
        errorMessage = err.message;
        dispatch({
          type: ActionType.GET_ETH_BALANCE_FAIL,
          payload: errorMessage,
        });
      }
    }
  };
};

export const getGuardianCount = (
  wallet: string,
  guardianContract: Contract | null
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.GET_GUARDIAN_COUNT_PENDING,
    });

    try {
      if (!guardianContract) {
        throw new Error('Failed to load Contract');
      }
      const guardianCount = await guardianContract.methods
        .guardianCount(wallet)
        .call();

      dispatch({
        type: ActionType.GET_GUARDIAN_COUNT_SUCCESS,
        payload: guardianCount,
      });
    } catch (err) {
      let errorMessage = 'Failed to fetch eth balance';
      if (err instanceof Error) {
        errorMessage = err.message;
        dispatch({
          type: ActionType.GET_GUARDIAN_COUNT_FAIL,
          payload: errorMessage,
        });
      }
    }
  };
};
