import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getEthBalance, getGuardianCount } from './redux/actionCreators';
import { useTypedSelector } from './hooks/useTypeSelector';
import './App.css';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import GuardianManager from './abis/GuardianManager.json';
import ERC20 from './abis/ERC20.json';

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
  const { guardianCount, loadingGuardianCount, errorGuardianCount } =
    useTypedSelector((state) => state.erc20TokenBalances);

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

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(getEthBalance(wallet, web3));
    await dispatch(getGuardianCount(wallet, guardianContract));
  };
  return (
    <div className="App">
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        />
        <button type="submit">Submit</button>
        {loadingEthBalance && <div>Loading Eth Balance...</div>}
        {!loadingEthBalance && web3 && ethBalance && (
          <p>Eth Balance: {web3.utils.fromWei(ethBalance, 'ether') + ' ETH'}</p>
        )}
        {loadingGuardianCount && <div>Loading Guardian Count...</div>}
        {!loadingGuardianCount && guardianCount && (
          <p>Guardian Count: {guardianCount}</p>
        )}
      </form>
    </div>
  );
}

export default App;
