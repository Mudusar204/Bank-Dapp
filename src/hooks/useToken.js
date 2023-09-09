import React, { useEffect, useState } from "react";
import { provider, OceanTokenAddress, OceanTokenABI } from "../config/ethers";
import { ethers } from "ethers";
import { toast } from "react-toastify";
const useToken = () => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimal, setDecimal] = useState(null);
  const [supply, setSupply] = useState(null);
  const [balance,setBalance]=useState(null)
  const [allowance,setAllowance]=useState(null)
  const [model, setModel] = useState("");

  const OceanTokenContract = new ethers.Contract(
    OceanTokenAddress,
    OceanTokenABI,
    provider
  );

  const TokenName = async () => {
    let name = await OceanTokenContract.name();
    setName(name);
    console.log(name);
    return name;
  };
  const TokenSymbol = async () => {
    let symbol = await OceanTokenContract.symbol();
    setSymbol(symbol);
    console.log(symbol);
    return symbol;
  };
  const TokenDecimal = async () => {
    let decimal = await OceanTokenContract.decimal();
    console.log(decimal);
    let formated = ethers.BigNumber.from(decimal._hex);
    let number = formated.toNumber();
    setDecimal(number);
    console.log(number);
    return number;
  };

  const TotalSupply = async () => {
    let supply = await OceanTokenContract.totalSupply();
    console.log(supply);
    const bigNumber = ethers.BigNumber.from(supply._hex);
    const actualNumber = bigNumber.toNumber();
    setSupply(actualNumber);
    console.log(actualNumber);
    return actualNumber;
  };
  const BalanceOf = async (account) => {
    let balance = await OceanTokenContract.balanceOf(account);
    const bigNumber = ethers.BigNumber.from(balance._hex);
    const actualNumber = bigNumber.toNumber();
    setBalance(actualNumber)
    console.log(balance, actualNumber);
  };
  const Transfer = async (receiverAccount, amount) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      // const gasLimit = ethers.utils.parseUnits("300000", "wei");
      const senderAccount = await signer.getAddress();

      const myContract = new ethers.Contract(
        OceanTokenAddress,
        OceanTokenABI,
        signer
      );
      toast.loading("Loading...")
      const pay = await myContract.transfer(receiverAccount, amount);

      const receipt = await pay.wait();
      toast.dismiss()
      toast.success("Successfully Transfer");
      console.log("ether has sent", receipt);
    } catch (error) {
      console.log(error.message, "error aya");
      toast.dismiss();

      toast.error("Something went wrong");
    }
  };
  const TransferFrom = async (from, to, amount) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const myContract = new ethers.Contract(
        OceanTokenAddress,
        OceanTokenABI,
        signer
      );
      toast.loading("Loading...");

      let approve = await myContract.transferFrom(from, to, amount);
      const receipt = await approve.wait();

      toast.dismiss();
      console.log(receipt);
      toast.success("Successfully Transfer Token");
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong");
      console.log("error aa gya", error);
    }
  };
  const Allowance = async (from, to) => {
    let allownce = await OceanTokenContract.allownce(from, to);
    const bigNumber = ethers.BigNumber.from(allownce._hex);
    const actualNumber = bigNumber.toNumber();
    console.log(allownce, actualNumber);
    setAllowance(actualNumber)
  };
  const Approval = async (account, amount) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const myContract = new ethers.Contract(
        OceanTokenAddress,
        OceanTokenABI,
        signer
      );
      toast.loading("Loading...");

      let approve = await myContract.approve(account, amount);
      toast.dismiss();
      console.log(approve);
      toast.success("Successfully Approved Token");
    } catch (error) {
      toast.dismiss();

      toast.error("Something went wrong");
      console.log("error aa gya", error);
    }
  };
  const MintToken = async (amount) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const myContract = new ethers.Contract(
        OceanTokenAddress,
        OceanTokenABI,
        signer
      );
      toast.loading("Loading...");

      const mint = await myContract.mint(amount);
      const receipt = await mint.wait();
      toast.dismiss();

      console.log("minted", receipt);
      toast.success("Successfully Minted");
    } catch (error) {
      toast.dismiss();

      toast.error("Something went wrong");
      console.log(error, "error aa gya");
    }
  };
  const BurnToken = async (amount) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const myContract = new ethers.Contract(
        OceanTokenAddress,
        OceanTokenABI,
        signer
      );
      toast.loading("Loading...");
      const burn = await myContract.burn(amount);
      const receipt = await burn.wait();
      toast.dismiss();
      console.log("minted", receipt);
      toast.success("Successfully Burn");
    } catch (error) {
      toast.dismiss();

      toast.error("Something went wrong");
      console.log(error, "error aa gya");
    }
  };

  return {
    TokenName,
    TokenSymbol,
    TokenDecimal,
    name,
    symbol,
    decimal,
    supply,
    TotalSupply,
    BalanceOf,
    Transfer,
    TransferFrom,
    Allowance,
    Approval,
    MintToken,
    BurnToken,
    model,
allowance,
setAllowance,
balance,
setBalance,
    setModel,
  };
};

export default useToken;
