import React from 'react'
import { provider, AuthContractABI, AuthContractAddress } from "../config/ethers";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const useLogin = () => {
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      console.log(email, password);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const senderAccount = await signer.getAddress();
      const myContract = new ethers.Contract(
        AuthContractAddress,
        AuthContractABI,
        signer
      );
      const login = await myContract.doLogin(email, password);
      console.log(login);
      if(login){
      navigate("/dashboard");
      toast.success("Successfuly login");}
      else{toast.error("incorect email or password")}
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return{login}
}

export default useLogin