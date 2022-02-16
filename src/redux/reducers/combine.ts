import { combineReducers } from 'redux';
import { ethBalanceReducer, guardianCountReducer } from './index';

const reducers = combineReducers({
  ethBalance: ethBalanceReducer,
  guardianCount: guardianCountReducer,
});

export default reducers;
//This RootState is required to use useSelector later on
export type RootState = ReturnType<typeof reducers>;
