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
  const { TransferAmount, getUsers, transectionHistory, history, show } =
    useDashboard();
  const onSubmit = async (data) => {
    await TransferAmount(data.accountNumber, data.amount);
    reset();
    console.log(data);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <p className="mb-6 text-[60px] text-gray-800 font-bold">Bank DApp</p>

      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold mb-4 text-center text-purple-800">
          Transaction Dashboard
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            Transfer
          </button>
        </form>
      </div>
      <button
        onClick={transectionHistory}
        className="mt-4 w-[20%] bg-purple-600 py-2 px-4 whitespace-nowrap text-white rounded-md hover:bg-purple-700"
      >
       Check Transaction History
      </button>

      {history.length > 0 && show
        ? history.map((item, index) => (
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
        : history.length === 0&&show?<p className="text-white">No record Found</p>:null}
    </div>
  );
};

export default Dashboard;
