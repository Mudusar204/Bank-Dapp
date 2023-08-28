import React, { useEffect, useState } from "react";
import {
  provider,
  AuthContractAddress,
  AuthContractABI,
  TransferAmountAddress,
  TransferAmountABI,
  DepositAmountAddress,
  DepositAmountABI,
} from "../config/ethers";
import { ethers } from "ethers";
import { toast } from "react-toastify";
const useDashboard = () => {
  const [activeAccount, setActiveAccount] = useState("");
  const [model, setModel] = useState("");
  const [history, setHistory] = useState([]);
  const [show, setShow] = useState(false);
  const [cntrctBalance,setContractBalance]=useState(null)
  const [acntBalance,setAccountBalance]=useState(null)
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const currentAccount = window.ethereum.selectedAddress;
    setActiveAccount(currentAccount);
    accountBalance()
    contractBalance()
    
    console.log(currentAccount, "currentAccount");
  });

  const AuthContract = new ethers.Contract(
    AuthContractAddress,
    AuthContractABI,
    provider
  );

  const TransferAmountContract = new ethers.Contract(
    TransferAmountAddress,
    TransferAmountABI,
    provider
  );
  const DepositAmountContract = new ethers.Contract(
    DepositAmountAddress,
    DepositAmountABI,
    provider
  );
  const getUsers = async () => {
    try {
      const usersArray = await AuthContract.getUsers();
      console.log(usersArray, "get");
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const TransferAmount = async (receiverAccount, amount) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const gasLimit = ethers.utils.parseUnits("300000", "wei");
      const senderAccount = await signer.getAddress();

      const myContract = new ethers.Contract(
        TransferAmountAddress,
        TransferAmountABI,
        signer
      );
      const pay = await myContract.payToOtherAccount(receiverAccount, {
        value: amount,
        gasLimit: gasLimit,
      });
     
      toast.success("Successfully Transfer");
      const receipt = await pay.wait();
      console.log("ether has sent", receipt);
    } catch (error) {
      console.log(error.message, "error aya");
      toast.error("Something went wrong");
    }
  };

  const depositAmount = async (amount) => {
    try {
      console.log(amount);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const gasLimit = ethers.utils.parseUnits("300000", "wei");
      const senderAccount = await signer.getAddress();

      const myContract = new ethers.Contract(
        DepositAmountAddress,
        DepositAmountABI,
        signer
      );
      const pay = await myContract.depositAmount({
        value: amount,
        gasLimit: gasLimit,
      });

      toast.success("Successfully Deposit");
      const receipt = await pay.wait();
      console.log("ether has sent", receipt);
    } catch (error) {
      console.log(error);
    }
  };

  const withdrawAmountFun = async (amount) => {
    try {
      console.log(amount, "in function");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const gasLimit = ethers.utils.parseUnits("300000", "wei");
      const value = ethers.utils.parseEther(amount);
      const senderAccount = await signer.getAddress();

      const myContract = new ethers.Contract(
        DepositAmountAddress,
        DepositAmountABI,
        signer
      );
      console.log("log chalaa");
      const pay = await myContract.withdrawAmount(activeAccount, amount, {
        // value: 100000,
        gasLimit: gasLimit,
      });

      toast.success("Successfully Deposit");
      const receipt = await pay.wait();
      console.log("ether has sent", receipt);
    } catch (error) {
      console.log(error);
    }
  };
  const contractBalance = async () => {
    try {
      console.log(activeAccount,'active account');

      const balance = await DepositAmountContract.contractBalance();
      const contractBalance = ethers.utils.formatEther(balance);
      console.log(contractBalance);
      setContractBalance(contractBalance)
      // return contractBalance;
    } catch (error) {
      console.log(error.message);
    }
  };
  const accountBalance = async () => {
    try {
      console.log(activeAccount,'active account');
      const balance = await DepositAmountContract.checkAccountBalance(
        activeAccount
      );
      const accountBalance = ethers.utils.formatEther(balance);
      console.log(accountBalance);
      setAccountBalance(accountBalance)
      // return accountBalance;
    } catch (error) {
      console.log(error.message);
    }
  };
  const transectionHistory = async () => {
    try {
      setShow(true);
      console.log(activeAccount, "active account");
      const userHistory = await TransferAmountContract.getTransactionHistory(
        activeAccount
      );
      console.log(userHistory);
      setHistory(userHistory);
      let n = ethers.utils.formatEther(history[0].nonce);
      console.log(n, "nonce value");
    } catch (error) {
      console.log(error, "getting history");
    }
  };
  return {
    TransferAmount,
    getUsers,
    transectionHistory,
    depositAmount,
    withdrawAmountFun,
    contractBalance,
    accountBalance,
    history,
    show,
    setShow,
    model,
    setModel,
    acntBalance,
    cntrctBalance
  };
};

export default useDashboard;
