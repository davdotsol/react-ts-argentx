import { combineReducers } from 'redux';
import { ethBalanceReducer, guardianCountReducer } from './index';

const reducers = combineReducers({
  ethBalance: ethBalanceReducer,
  guardianCount: guardianCountReducer,
  erc20TokenBalances: erc20TokenBalancesReducer,
});

export default reducers;
//This RootState is required to use useSelector later on
export type RootState = ReturnType<typeof reducers>;
