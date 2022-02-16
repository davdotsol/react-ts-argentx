import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getEthBalance, getGuardianCount } from './redux/actionCreators';
import { useTypedSelector } from './hooks/useTypeSelector';
import './App.css';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';

const ARGENTX_CONTRACT_MAINNET = '0xFF5A7299ff6f0fbAad9b38906b77d08c0FBdc9A7';

const CONTRACT_ABI = [
  {
    constant: true,
    inputs: [],
    name: 'securityWindow',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_wallet', type: 'address' }],
    name: 'init',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_wallet', type: 'address' },
      { name: '_guardian', type: 'address' },
    ],
    name: 'revokeGuardian',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_wallet', type: 'address' },
      { name: '_guardian', type: 'address' },
    ],
    name: 'cancelGuardianRevokation',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_wallet', type: 'address' }],
    name: 'getNonce',
    outputs: [{ name: 'nonce', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_wallet', type: 'address' },
      { name: '_guardian', type: 'address' },
    ],
    name: 'confirmGuardianRevokation',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_wallet', type: 'address' }],
    name: 'guardianCount',
    outputs: [{ name: '_count', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_wallet', type: 'address' },
      { name: '_module', type: 'address' },
    ],
    name: 'addModule',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_wallet', type: 'address' },
      { name: '_guardian', type: 'address' },
    ],
    name: 'confirmGuardianAddition',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'securityPeriod',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_token', type: 'address' }],
    name: 'recoverToken',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_wallet', type: 'address' },
      { name: '_guardian', type: 'address' },
    ],
    name: 'cancelGuardianAddition',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_wallet', type: 'address' },
      { name: '_data', type: 'bytes' },
      { name: '_nonce', type: 'uint256' },
      { name: '_signatures', type: 'bytes' },
      { name: '_gasPrice', type: 'uint256' },
      { name: '_gasLimit', type: 'uint256' },
    ],
    name: 'execute',
    outputs: [{ name: 'success', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_wallet', type: 'address' },
      { name: '_guardian', type: 'address' },
    ],
    name: 'addGuardian',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'address' }],
    name: 'relayer',
    outputs: [{ name: 'nonce', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: '_wallet', type: 'address' },
      { name: '_guardian', type: 'address' },
    ],
    name: 'isGuardian',
    outputs: [{ name: '_isGuardian', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'guardianStorage',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_wallet', type: 'address' }],
    name: 'getGuardians',
    outputs: [{ name: '_guardians', type: 'address[]' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: '_registry', type: 'address' },
      { name: '_guardianStorage', type: 'address' },
      { name: '_securityPeriod', type: 'uint256' },
      { name: '_securityWindow', type: 'uint256' },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'wallet', type: 'address' },
      { indexed: true, name: 'guardian', type: 'address' },
      { indexed: false, name: 'executeAfter', type: 'uint256' },
    ],
    name: 'GuardianAdditionRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'wallet', type: 'address' },
      { indexed: true, name: 'guardian', type: 'address' },
      { indexed: false, name: 'executeAfter', type: 'uint256' },
    ],
    name: 'GuardianRevokationRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'wallet', type: 'address' },
      { indexed: true, name: 'guardian', type: 'address' },
    ],
    name: 'GuardianAdditionCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'wallet', type: 'address' },
      { indexed: true, name: 'guardian', type: 'address' },
    ],
    name: 'GuardianRevokationCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'wallet', type: 'address' },
      { indexed: true, name: 'guardian', type: 'address' },
    ],
    name: 'GuardianAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'wallet', type: 'address' },
      { indexed: true, name: 'guardian', type: 'address' },
    ],
    name: 'GuardianRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'wallet', type: 'address' },
      { indexed: true, name: 'success', type: 'bool' },
      { indexed: false, name: 'signedHash', type: 'bytes32' },
    ],
    name: 'TransactionExecuted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: 'name', type: 'bytes32' }],
    name: 'ModuleCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: 'wallet', type: 'address' }],
    name: 'ModuleInitialised',
    type: 'event',
  },
];

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

  useEffect(() => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`
      )
    );
    const argentXGuardianContract = new web3.eth.Contract(
      CONTRACT_ABI as AbiItem[],
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
