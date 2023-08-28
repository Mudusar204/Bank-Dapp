import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
const Login = () => {
const {login}=useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    login(data.email, data.password);
  };

 

  return (
    <>
    {window.ethereum?<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
     <p className="mb-6 text-[60px] text-gray-800 font-bold">Bank DApp</p>
     <span className="text-[14px]">Sepolia Testnet</span>

      <div className="bg-white p-10 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              {...register("password", {
                required: "Password is required",
                minLength: 6,
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login
          </button> 
        </form>
        <p className="mt-5">
          Don't have account?{" "}
          <Link className="text-green-900" to={"/signup"}>
            SignUp
          </Link>
        </p>
      </div>
    </div>:<p className="flex justify-center items-center h-screen text-[40px] font-medium"> Plx Install MetaMask Firstly</p>}
    </>

  );
};

export default Login;
