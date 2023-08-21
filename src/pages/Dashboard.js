import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useDashboard from "../hooks/useDashboard";
import { ethers } from "ethers";
const Dashboard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const {
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
    cntrctBalance,
    acntBalance,
  } = useDashboard();
  const onSubmit = async (data) => {
    console.log(data);
    if (model === "Transfer") {
      await TransferAmount(data.accountNumber, data.amount);
      reset();
    } else if (model === "Deposit") {
      await depositAmount(data.amount);
      reset();
    } else if (model === "Withdraw") {
      await withdrawAmountFun(data.amount);
      reset();
    }
  };
  return (
    <>
    {window.ethereum?<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
    
      <p className="mb-6 text-[60px] text-gray-800 font-bold">Bank DApp</p>
      <div className="  border-b-2 pb-5 flex gap-5">
        <button
          onClick={() => {
            setModel("Transfer");
          }}
          className="w-full bg-purple-600 py-3 px-4 whitespace-nowrap text-white rounded-md hover:bg-purple-700"
        >
          Transfer Amount
        </button>
        <button
          onClick={() => {
            setModel("Deposit");
          }}
          className="w-full bg-purple-600 py-3 px-4 whitespace-nowrap text-white rounded-md hover:bg-purple-700"
        >
          Deposit Amount
        </button>
        <button
          onClick={() => {
            setModel("Withdraw");
          }}
          className="w-full bg-purple-600 py-3 px-4 whitespace-nowrap text-white rounded-md hover:bg-purple-700"
        >
          Withdraw Amount
        </button>
      </div>
      {model !== "" ? (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-4 w-96">
          <h1 className="text-2xl font-semibold mb-4 text-center text-purple-800">
            {model} Form
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {model === "Transfer" ? (
              <div className="mb-4">
                <label
                  htmlFor="accountNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Account Number
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  {...register("accountNumber", { required: true })}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {errors.accountNumber && (
                  <p className="text-red-600 text-sm mt-1">
                    Account Number is required
                  </p>
                )}
              </div>
            ) : null}
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                {...register("amount", { required: true })}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              {errors.amount && (
                <p className="text-red-600 text-sm mt-1">Amount is required</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 py-2 px-4 text-white rounded-md hover:bg-purple-700"
            >
              {model}
            </button>
          </form>
        </div>
      ) : null}
      <div className="flex w-[40%] justify-between  item-center"> 
        <button
          onClick={() => {
            contractBalance();
          }}
          className="mt-4 bg-purple-600 py-2 px-4 whitespace-nowrap text-white rounded-md hover:bg-purple-700"
        >
          Contract Balance
        </button>
        <p className="text-white mt-6">{cntrctBalance}{cntrctBalance?" ETH":null}</p>
      </div>
      <div className="flex w-[40%] justify-between item-center"> 
      
        <button
          onClick={() => {
            accountBalance();
          }}
          className="mt-4  bg-purple-600 py-2 px-4 whitespace-nowrap text-white rounded-md hover:bg-purple-700"
        >
          Account Balance
        </button>
        <p className="text-white mt-6">{acntBalance}{acntBalance?" ETH":null}</p>
      </div>
      <div>
        <button
          onClick={transectionHistory}
          className="mt-4  bg-purple-600 py-2 px-4 whitespace-nowrap text-white rounded-md hover:bg-purple-700"
        >
          Transaction History
        </button>
      </div>

      {history.length > 0 && show ? (
        history.map((item, index) => (
          // const amount= ethers.utils.formatEther(history[0].nonce)
          <div className="bg-white p-6 rounded-lg shadow-lg w-[60%] mt-2">
            <p>
              <span className="font-bold text-purple-800">Index:</span>
              {index}
            </p>

            <p>
              <span className="font-bold text-purple-800">From:</span>
              {item.from}
            </p>
            <p>
              <span className="font-bold text-purple-800">To:</span>
              {item.to}
            </p>
            <p>
              <span className="font-bold text-purple-800">Amount:</span>
              {ethers.utils.formatEther(item.amount)}ETH
            </p>
            <p>
              <span className="font-bold text-purple-800">Nonce:</span>
              {ethers.utils.formatEther(item.nonce)}ETH
            </p>
            <p>
              <span className="font-bold text-purple-800">Gas Fee:</span>
              {ethers.utils.formatEther(item.gasfee)}ETH
            </p>
          </div>
        ))
      ) : history.length === 0 && show ? (
        <p className="text-white">No record Found</p>
      ) : null}
      </div>:<p className="flex justify-center items-center h-screen text-[40px] font-medium"> Plx Install MetaMask Firstly</p>}
      </>
    
  );
};

export default Dashboard;
