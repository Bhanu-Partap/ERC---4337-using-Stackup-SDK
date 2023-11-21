"use strict";
exports.__esModule = true;
/* import { ethers } from 'ethers';
import { Presets, Client } from 'userop';
// require('dotenv').config();
import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  rpcUrl: process.env.RPC_URL,
  paymasterUrl: process.env.PAYMASTER_RPC_URL,
  provider_data: process.env.PROVIDER
}
// const rpcUrl: string | undefined = process.env.RPC_URL;
const rpcUrl= config.rpcUrl;
// const paymasterUrl: string | undefined = process.env.PAYMASTER_RPC_URL;
const paymasterUrl = config.paymasterUrl;
const provider = new ethers.providers.JsonRpcProvider(config.provider_data); */
var ethers_1 = require("ethers");
var dotenv = require("dotenv");
dotenv.config();
var config = {
    rpcUrl: process.env.RPC_URL,
    paymasterUrl: process.env.PAYMASTER_RPC_URL,
    provider_data: process.env.PROVIDER
};
var rpcUrl = config.rpcUrl;
var paymasterUrl = config.paymasterUrl;
var provider;
if (config.provider_data) {
    provider = new ethers_1.ethers.providers.JsonRpcProvider(config.provider_data);
}
else {
    console.error('Provider data is undefined.');
}
/* async function main() {

  const paymasterContext = { type: 'payg' };
  const paymasterMiddleware = Presets.Middleware.verifyingPaymaster(
    paymasterUrl,
    paymasterContext
  );
  const opts =
    paymasterUrl.toString() === ''
      ? {}
      : {
        paymasterMiddleware: paymasterMiddleware,
      };

  // Initialize the account
  const signingKey =process.env.SIGNINKEY;
  // console.log(signingKey);
  const signer = new ethers.Wallet(signingKey);
  var builder = await Presets.Builder.SimpleAccount.init(signer, rpcUrl, opts);
  const address = builder.getSender();
  console.log(`Account address: ${address}`);

  // Create the call data
  const to = address; // Receiving address, in this case we will send it to ourselves
  const token = "0x3938Ac4C25454F65F62292b748a105d70bA5D71f"; // Address of the ERC-20 token
  const value = "0"; // Amount of the ERC-20 token to transfer

  // Read the ERC-20 token contract
  const ERC20_ABI = require("./erc20Abi.json"); // ERC-20 ABI in json format
  const erc20 = new ethers.Contract(token, ERC20_ABI, provider);
  const decimals = await Promise.all([erc20.decimals()]);
  const amount = ethers.utils.parseUnits(value, decimals);

  // Encode the calls
  const callTo = [token, token];
  const callData = [erc20.interface.encodeFunctionData("approve", [to, amount]),
  erc20.interface.encodeFunctionData("transfer", [to, amount])]

  // Send the User Operation to the ERC-4337 mempool
  const client = await Client.init(rpcUrl);
  const res = await client.sendUserOperation(builder.executeBatch(callTo, callData), {
    onBuild: (op) => console.log('Signed UserOperation:', op),
  });

  // Return receipt
  console.log(`UserOpHash: ${res.userOpHash}`);
  console.log('Waiting for transaction...');
  const ev = await res.wait();
  console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
  console.log(`View here: https://jiffyscan.xyz/userOpHash/${res.userOpHash}`);
}

main().catch((err) => console.error('Error:', err));
 */
console.log(paymasterUrl);
