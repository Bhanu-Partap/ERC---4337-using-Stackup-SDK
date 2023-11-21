import { ethers } from 'ethers';
import { Presets, Client } from 'userop';

const rpcUrl = 'https://public.stackup.sh/api/v1/node/ethereum-sepolia';
const paymasterUrl = 'https://api.stackup.sh/v1/paymaster/https://api.stackup.sh/v1/paymaster/c713cd6b5ac9196b897e0e69c5be6951f3f18b3ca763fd7cd346310b9ddfdd3e'; // Optional - you can get one at https://app.stackup.sh/

async function main() {

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
  const signingKey =
    '0x56fe1fd10f0203c190640fb0bad78e9bf29d10fc2fbc97ee1ff49ee4acd2d08a';
  const signer = new ethers.Wallet(signingKey);
  var builder = await Presets.Builder.SimpleAccount.init(signer, rpcUrl, opts);
  const address = builder.getSender();
  console.log(`Account address: ${address}`);

  // Send the User Operation to the ERC-4337 mempool
  const client = await Client.init(rpcUrl);
  const res = await client.sendUserOperation(builder.setCallData('0x'), {
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
