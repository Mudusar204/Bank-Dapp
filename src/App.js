import React, { useState } from "react";
const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider(`HTTP://127.0.0.1:7545`);

const App = () => {
  const [num, setNum] = useState(null);
  const [balance, setBalance] = useState(null);
  const [count, setCount] = useState(null);
  const [accountAddress, setAccountAddress] = useState("");
  const [amount, setAmount] = useState(null);
  const contractAddress = "0x52e9110923AA5DE3CBd8Ea8881F8501f7B9B84f8";
  const [accountHolder, setAccountHolder] = useState([
    "0xaA7AA1c51a04d34cc9369F4C006D94e291c576b1",
    "0x4af22a5DE0795E5a239EcFaAAd0B683c15A70DE2",
    "0x9Bfb2846A9dE20c04AD9D7d7C91f29199D88CFc6",
  ]);
  const contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "payedSuccess",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "doDecrement",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "doIncrement",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCount",
      "outputs": [
        {
          "internalType": "int8",
          "name": "",
          "type": "int8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "receiverAccount",
          "type": "address"
        }
      ],
      "name": "payToOtherAccount",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ]
  const myContract = new ethers.Contract(
    contractAddress,
    contractABI,
    provider
  );

  const blockNumber = async () => {
    let blockNum = await provider.getBlockNumber();
    setNum(blockNum);
  };
  const getBalance = async () => {
    const accountBalance = await provider.getBalance(
      "0x4181e798c06b9982F102EfF25B755701787028C3"
    );
    const formateEther = ethers.utils.formatEther(accountBalance);
    setBalance(formateEther);
  };
  const getCount = async () => {
    const counter = await myContract.getCount();
    setCount(counter);
  };
  const doDecrement = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const myContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      await myContract.doDecrement();
    } catch (error) {
      console.log(error.message);
    }
  };
  const doIncrement = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const myContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      await myContract.doIncrement();
      console.log(provider, "signer===================", signer);
    } catch (error) {
      console.log(error.message);
    }
  };

  const payToOther = async (receiverAccount, amount) => {
    try {
    
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const senderAccount = await signer.getAddress();
      let checkAccount = accountHolder.some((element) => {
        return element===senderAccount
         
       });
       if(checkAccount){
      const myContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const pay = await myContract.payToOtherAccount(receiverAccount, {
        value: amount,
      });
      myContract.on('payedSuccess', (message) => {
        console.log('Event Received:', message);
      });
      const receipt = await pay.wait();
      console.log("ether has sent", receipt);}
      else{
        console.log("Account not Registered")
      }
    } catch (error) {
      console.log(error.message,'error aya');
    }
  };
  return (
    <div>
      <p style={{ textAlign: "center" }}>Dapp</p>
      <p>Block Number:{num}</p>
      <button onClick={blockNumber}>get block number</button>
      {/* <p>Balance:{balance}</p>
      <button onClick={getBalance}> Get Balance</button>
      <p>Contract Name:{count}</p>
      <button onClick={getCount}> Contract Count</button>
      <button onClick={doIncrement}> Do Increment</button>
      <button onClick={doDecrement}> Do Decrement</button> */}

      <div>
        <p>send Ether to Another Account</p>
        <input
          placeholder="enther account address"
          value={accountAddress}
          onChange={(e) => {
            setAccountAddress(e.target.value);
          }}
        /> 
        <input
          placeholder="enther amount to send"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <button onClick={() => payToOther(accountAddress, amount)}>
          Send Now
        </button>
      </div>
    </div>
  );
};

export default App;
