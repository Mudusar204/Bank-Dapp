import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useDashboard from "../hooks/useDashboard";
import { ethers } from "ethers";
import useToken from "../hooks/useToken";
const Token = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const {
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
    allowance,
setAllowance,
balance,
setBalance,
    model,

    setModel,
  } = useToken();
  const onSubmit = async (data) => {
    console.log(data);
    if (model === "Check") {
      await BalanceOf(data.accountNumber);
      reset();
    } else if (model === "Transfer") {
      console.log(data);
      await Transfer(data.accountNumber, data.amount);
      reset();
    } else if (model === "TransferFrom") {
      await TransferFrom(data.from,data.accountNumber,data.amount);
      reset();
    } else if (model === "MintToken") {
      await MintToken(data.amount);
      reset();
    } else if (model === "BurnToken") {
      await BurnToken(data.amount);
      reset();
    } else if (model === "Allowance") {
      await Allowance(data.from, data.accountNumber);
      reset();
    } else if (model === "Approval") {
      await Approval(data.accountNumber, data.amount);
      reset();
    }
  };
  return (
    <>
      {window.ethereum ? (
        <div className=" items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="flex justify-center text-[40px] font-bold">
            Token Structure
          </div>
          <dir><p className="flex justify-center text-[28px] font-bold mt-12">Token Information</p></dir>
          <div className="flex justify-around text-white mt-4">
            <p>
              <button   className=" bg-purple-600 py-3 px-4 whitespace-nowrap text-white rounded-md hover:bg-purple-700" onClick={TokenName}>
                Token Name
              </button>
              {name}
            </p>
            <p>
              <button   className=" bg-purple-600 py-3 px-4 whitespace-nowrap text-white rounded-md hover:bg-purple-700" onClick={TokenSymbol}>
                Token Symbol
              </button>
              {symbol}
            </p>
            <p>
              <button   className=" bg-purple-600 py-3 px-4 whitespace-nowrap text-white rounded-md hover:bg-purple-700" onClick={TokenDecimal}>
                Token Decimal
              </button>
              {decimal}
            </p>
            <p>
              <button   className=" bg-purple-600 py-3 px-4 whitespace-nowrap text-white rounded-md hover:bg-purple-700" onClick={TotalSupply}>
                Total Supply
              </button>
              {supply}
            </p>
          </div>
          <dir><p className="flex justify-center text-[28px] font-bold mt-12">Account Information</p></dir>

          <div className="flex justify-center items-center gap-5 mt-6">
            <button
              onClick={() => {
                setModel("Check");
              }}
              className=" bg-purple-600 py-3 px-4 whitespace-nowrap text-white rounded-md hover:bg-purple-700"
            >
              Check Balance
            </button><p>{balance}</p>
            <button
              onClick={() => {
                setModel("Allowance");
              }}
              className=" bg-purple-600 py-3 px-4 whitespace-nowrap text-white rounded-md hover:bg-purple-700"
            >
              Allowance
            </button><p>{allowance}</p>
           
            </div>
          <dir><p className="flex justify-center text-[28px] font-bold mt-12">Token Actions</p></dir>

          <div className="flex justify-center gap-5 mt-6">

          <button
              onClick={() => {
                setModel("Transfer");
              }}
              className=" bg-purple-600 py-3 px-4 whitespace-nowrap text-white rounded-md hover:bg-purple-700"
            >
              Transfer
            </button>
            <button
              onClick={() => {
                setModel("TransferFrom");
              }}
              className=" bg-purple-600 py-3 px-4 whitespace-nowrap text-white rounded-md hover:bg-purple-700"
            >
              Transfer From
            </button>
            <button
              onClick={() => {
                setModel("Approval");
              }}
              className=" bg-purple-600 py-3 px-4 whitespace-nowrap text-white rounded-md hover:bg-purple-700"
            >
              Approval
            </button>
            <button
              onClick={() => {
                setModel("MintToken");
              }}
              className=" bg-purple-600 py-3 px-4 whitespace-nowrap text-white rounded-md hover:bg-purple-700"
            >
              Mint Token
            </button>
            <button
              onClick={() => {
                setModel("BurnToken");
              }}
              className=" bg-purple-600 py-3 px-4 whitespace-nowrap text-white rounded-md hover:bg-purple-700"
            >
              Burn Token
            </button>
          </div>
          <div className="flex justify-center">
            {model !== "" ? (
              <div className="bg-white p-6 rounded-lg shadow-lg mt-4 w-96">
                <h1 className="text-2xl font-semibold mb-4 text-center text-purple-800">
                  {model}
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {model === "TransferFrom" || model === "Allowance" ? (
                    <div className="mb-4">
                      <label
                        htmlFor="accountNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        {model === "Check" ? "Enter Account" : "From"}
                      </label>
                      <input
                        type="text"
                        id="from"
                        {...register("from", { required: true })}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      {errors.accountNumber && (
                        <p className="text-red-600 text-sm mt-1">
                          Account Number is required
                        </p>
                      )}
                    </div>
                  ) : null}
                  {model === "Check" ||
                  model === "Transfer" ||
                  model === "TransferFrom" ||
                  model === "Allowance" ||
                  model === "Approval" ? (
                    <div className="mb-4">
                      <label
                        htmlFor="accountNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        To
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
                  {model === "Transfer" ||
                  model === "TransferFrom" ||
                  model === "Approval" ||
                  model === "MintToken" ||
                  model === "BurnToken" ? (
                    <div className="mb-4">
                      <label
                        htmlFor="amount"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Enter Amount
                      </label>
                      <input
                        type="number"
                        id="amount"
                        {...register("amount", { required: true })}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      {errors.amount && (
                        <p className="text-red-600 text-sm mt-1">
                          Amount is required
                        </p>
                      )}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    className="w-full bg-purple-600 py-2 px-4 text-white rounded-md hover:bg-purple-700"
                  >
                    {model}
                  </button>
                </form>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <p className="flex justify-center items-center h-screen text-[40px] font-medium">
          Plx Install MetaMask Firstly
        </p>
      )}
    </>
  );
};

export default Token;
