import React from 'react'
import { provider, AuthContractABI, AuthContractAddress } from "../config/ethers";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const useSignup = () => {
 const navigate=useNavigate()
  const signup = async (userName, email, password) => {
    try {
      console.log(userName, email, password);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      // const senderAccount = await signer.getAddress();
      const AuthContract = new ethers.Contract(
        AuthContractAddress,
        AuthContractABI,
        signer
      );
      console.log(AuthContract,'ajfkldjslkf');
      const signup = await AuthContract.doSignup(userName, email, password);
      navigate("/dashboard");
      toast.success("Successfully signup");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return{signup}
}

export default useSignup