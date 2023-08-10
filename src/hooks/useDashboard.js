import React, { useEffect, useState } from "react";
import {
  provider,
  AuthContractAddress,
  AuthContractABI,
  TransferAmountAddress,
  TransferAmountABI,
} from "../config/ethers";
import { ethers } from "ethers";
import { toast } from "react-toastify";
const useDashboard = () => {
  const [activeAccount, setActiveAccount] = useState("");
  const [history, setHistory] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const currentAccount = window.ethereum.selectedAddress;
    setActiveAccount(currentAccount);
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
      // myContract.on("payedSuccess", (message) => {
      //   console.log("Event Received:", message);
      // });
      toast.success("Successfully Transfer");
      const receipt = await pay.wait();
      console.log("ether has sent", receipt);
    } catch (error) {
      console.log(error.message, "error aya");
      toast.error("Something went wrong");
    }
  };
  const transectionHistory = async () => {
    try {
      setShow(true);
      console.log(activeAccount, "active account");
      const userHistory = await TransferAmountContract.getTransactionHistory(
        activeAccount
      );
      console.log(history);
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
    history,
    show,
    setShow,
  };
};

export default useDashboard;
