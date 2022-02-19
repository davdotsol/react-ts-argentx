import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  getERC20TokenBalances,
  getEthBalance,
  getGuardianCount,
} from './redux/actionCreators';
import { useTypedSelector } from './hooks/useTypeSelector';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import GuardianManager from './abis/GuardianManager.json';

import Layout from './components/layout/Layout';
import WalletForm from './components/wallet/WalletForm';
import WalletDetails from './components/wallet/WalletDetails';

const ARGENTX_CONTRACT_MAINNET = '0xFF5A7299ff6f0fbAad9b38906b77d08c0FBdc9A7';

function App() {
  const dispatch = useDispatch();
  const [wallet, setWallet] = useState('');
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [guardianContract, setGuardianContract] = useState<Contract | null>(
    null
  );
  const { ethBalance, loadingEthBalance, errorEthBalance } = useTypedSelector(
    (state) => state.ethBalance
  );
  const { guardianCount, loadingGuardianCount, errorGuardianCount } =
    useTypedSelector((state) => state.guardianCount);
  const {
    ERC20TokenBalances,
    loadingERC20TokenBalance,
    errorERC20TokenBalance,
  } = useTypedSelector((state) => state.erc20TokenBalances);

  useEffect(() => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`
      )
    );
    const argentXGuardianContract = new web3.eth.Contract(
      GuardianManager.abi as AbiItem[],
      ARGENTX_CONTRACT_MAINNET
    );

    setWeb3(web3);
    setGuardianContract(argentXGuardianContract);
  }, []);

  const onSubmitHandler = async (wallet: string) => {
    // event.preventDefault();
    await dispatch(getEthBalance(wallet, web3));
    await dispatch(getGuardianCount(wallet, guardianContract));
    await dispatch(getERC20TokenBalances(wallet, web3));
  };

  return (
    <Layout>
      <Fragment>
        <WalletForm onSubmitHandler={onSubmitHandler} />
        <WalletDetails
          isLoading={
            loadingEthBalance ||
            loadingGuardianCount ||
            loadingERC20TokenBalance
          }
          errorEthBalance={errorEthBalance}
          ethBalance={ethBalance}
          errorGuardianCount={errorGuardianCount}
          guardianCount={guardianCount}
          errorERC20TokenBalance={errorERC20TokenBalance}
          ERC20TokenBalances={ERC20TokenBalances}
        />
      </Fragment>
    </Layout>
  );
}

export default App;
