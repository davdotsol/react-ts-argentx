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
      let errorMessage = 'Failed to fetch number of guardian';
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

export const getERC20TokenBalances = (wallet: string, web3: Web3 | null) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.GET_ERC20TOKEN_BALANCE_PENDING,
    });

    try {
      if (!web3) {
        throw new Error('Failed to load Web3');
      }
      const BAT_MAINNET = '0x0D8775F648430679A709E98d2b0Cb6250d2887EF';
      const transferEventTopic = web3.utils.keccak256(
        'Transfer(address,address,uint256)'
      );

      const ERC20TokenBalances = {};
      let optionsSent = {
        fromBlock: 0,
        toBlock: 'latest',
        address: [BAT_MAINNET], // ERC20 Tokens contract address
        topics: [transferEventTopic, wallet], // 0: signature of event, 1: from, 2: to
      };
      let optionsReceived = {
        fromBlock: 0,
        toBlock: 'latest',
        address: [BAT_MAINNET], // ERC20 Tokens contract address
        topics: [transferEventTopic, null, wallet], // 0: signature of event, 1: from, 2: to
      };

      const transferEventSentLogs = web3.eth.getPastLogs(
        optionsSent,
        function (error, result) {
          if (!error) console.log('got result', result);
          else console.log(error);
        }
      );
      const transferEventReceivedLogs = web3.eth.getPastLogs(
        optionsReceived,
        function (error, result) {
          if (!error) console.log('got result', result);
          else console.log(error);
        }
      );

      dispatch({
        type: ActionType.GET_ERC20TOKEN_BALANCE_SUCCESS,
        payload: ERC20TokenBalances,
      });
    } catch (err) {
      let errorMessage = 'Failed to fetch eth balance';
      if (err instanceof Error) {
        errorMessage = err.message;
        dispatch({
          type: ActionType.GET_ERC20TOKEN_BALANCE_FAIL,
          payload: errorMessage,
        });
      }
    }
  };
};
