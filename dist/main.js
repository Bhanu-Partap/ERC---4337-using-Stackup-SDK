"use strict";
//=====    ====== //
// import { ethers } from 'ethers';
// import { Presets, Client } from 'userop';
// import * as dotenv from 'dotenv';
// dotenv.config();
Object.defineProperty(exports, "__esModule", { value: true });
// const config = {
//   rpcUrl: process.env.RPC_URL,
//   paymasterUrl: process.env.PAYMASTER_RPC_URL,
//   provider_data: process.env.PROVIDER
// }
// const rpcUrl = config.rpcUrl;
// const paymasterUrl = config.paymasterUrl;
// let provider: ethers.providers.JsonRpcProvider | undefined;
// if (config.provider_data) {
//   provider = new ethers.providers.JsonRpcProvider(config.provider_data);
// } else {
//   console.error('Provider data is undefined.');
// }
const ethers_1 = require("ethers");
const userop_1 = require("userop");
// require('dotenv').config();
const dotenv = require("dotenv");
dotenv.config();
// const config = {
//   rpcUrl: process.env.RPC_URL,
//   paymasterUrl: process.env.PAYMASTER_RPC_URL,
//   provider_data: process.env.PROVIDER
// }
// const rpcUrl: string | undefined = process.env.RPC_URL;
// const paymasterUrl: string | undefined = process.env.PAYMASTER_RPC_URL;
const rpcUrl = "https://api.stackup.sh/v1/node/c713cd6b5ac9196b897e0e69c5be6951f3f18b3ca763fd7cd346310b9ddfdd3e";
const paymasterUrl = "https://api.stackup.sh/v1/paymaster/c713cd6b5ac9196b897e0e69c5be6951f3f18b3ca763fd7cd346310b9ddfdd3e";
const provider = new ethers_1.ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/9a8614ca9a11412aaab9734cdde0cd29");
async function main() {
    var _a;
    const paymasterContext = { type: 'payg' };
    const paymasterMiddleware = userop_1.Presets.Middleware.verifyingPaymaster(paymasterUrl, paymasterContext);
    const opts = paymasterUrl.toString() === ''
        ? {}
        : {
            paymasterMiddleware: paymasterMiddleware,
        };
    // Initialize the account
    const signingKey = "0x";
    // console.log(signingKey); 
    const signer = new ethers_1.ethers.Wallet(signingKey);
    var builder = await userop_1.Presets.Builder.SimpleAccount.init(signer, rpcUrl, opts);
    const address = builder.getSender();
    console.log(`Account address: ${address}`);
    // Create the call data
    const to = address; // Receiving address, in this case we will send it to ourselves
    const token = "0x3938Ac4C25454F65F62292b748a105d70bA5D71f"; // Address of the ERC-20 token
    const value = "0"; // Amount of the ERC-20 token to transfer
    // Read the ERC-20 token contract
    const ERC20_ABI = require("./erc20Abi.json"); // ERC-20 ABI in json format
    const erc20 = new ethers_1.ethers.Contract(token, ERC20_ABI, provider);
    const decimals = await Promise.all([erc20.decimals()]);
    const amount = ethers_1.ethers.utils.parseUnits(value, decimals);
    // Encode the calls
    const callTo = [token, token];
    const callData = [erc20.interface.encodeFunctionData("approve", [to, amount]),
        erc20.interface.encodeFunctionData("transfer", [to, amount])];
    // Send the User Operation to the ERC-4337 mempool
    const client = await userop_1.Client.init(rpcUrl);
    const res = await client.sendUserOperation(builder.executeBatch(callTo, callData), {
        onBuild: (op) => console.log('Signed UserOperation:', op),
    });
    // Return receipt
    console.log(`UserOpHash: ${res.userOpHash}`);
    console.log('Waiting for transaction...');
    const ev = await res.wait();
    console.log(`Transaction hash: ${(_a = ev === null || ev === void 0 ? void 0 : ev.transactionHash) !== null && _a !== void 0 ? _a : null}`);
    console.log(`View here: https://jiffyscan.xyz/userOpHash/${res.userOpHash}`);
}
main().catch((err) => console.error('Error:', err));
