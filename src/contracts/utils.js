import { ethers } from 'ethers';

import BigNumber from 'bignumber.js';
import { useWeb3React } from "@web3-react/core";
import {
  // SUBTRACT_GAS_LIMIT,
  contractAddresses,
} from './lib/constants.js';
import { bnToDec } from './utils';
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});


export const getEscrowContract = (bunzz) => {
  return bunzz && bunzz.contracts && bunzz.contracts.escrow;
}
export const getPaymentSplitterContract = (bunzz) => {
  return bunzz && bunzz.contracts && bunzz.contracts.paymentSplitter;
}
export const getVestingWalletContract = (bunzz) => {
  return bunzz && bunzz.contracts && bunzz.contracts.vestingWallet;
}

export const getErc20Contract = (bunzz) => {
  return bunzz && bunzz.contracts && bunzz.contracts.erc20;
}
export const setErc20ContractAddress = (bunzz, address) => {
  bunzz.contracts.erc20.options.address = address;
}
export const getAllowance = async (
  erc20Contract,
  escrowContract,
  account
) => {
  try {
    const allowance = await erc20Contract.methods
      .allowance(account, escrowContract.options.address)
      .call()
    return allowance
  } catch (e) {
    return '0'
  }
}
export const getDecimal = async (
  erc20Contract,
) => {
  try {
    const decimal = await erc20Contract.methods
      .decimals()
      .call()
      return new BigNumber(decimal);
  } catch (e) {
    return new BigNumber(0);
  }
}

export const getFeePercent = async (escrowContract) => {
  
  try {
    const feePercent = await escrowContract.methods.feePercent().call();
    
  
    return new BigNumber(feePercent);
  } catch {
    console.log("error");
    return new BigNumber(0);
  }

}
export const getPoolsCount = async(escrowContract) => {
  
  try {
    const poolCount = await escrowContract.methods.poolCount().call();
 //   console.log("asdfdsf = ", poolCount)
  
    return poolCount;
  } catch {
    console.log("asdfdsf = 22")
    return 0;
  } 

}
export const depositByEth = async (escrowContract, amount, recipientAddress, agentAddress, account) => {
 
    return escrowContract.methods.depositByETH(recipientAddress, agentAddress).send({ from: account, value:new BigNumber(amount).times(new BigNumber(10).pow(18)).toString() })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    });
    
}
export const deposit = async (escrowContract, amount, tokenAddress, recipientAddress, agentAddress, account, erc20Contract) => {
  
  const decimal =await erc20Contract.methods.decimals().call();
  console.log("decimal = ", decimal);
  return escrowContract.methods.deposit(tokenAddress, recipientAddress, agentAddress, new BigNumber(amount).times(new BigNumber(10).pow(decimal)).toString() ).send({ from: account})
  .on('transactionHash', (tx) => {
    console.log(tx)
    return tx.transactionHash
  });
}


export const getPools = async(escrowContract,poolId=0) => {
  try {
    const pool = await escrowContract.methods.pools(poolId).call();
    
  
    return pool;
  } catch {
  
    return null;
  } 
}

export const getPayees = async(paymentSplitterContract) => {
  try {
    const payees = await paymentSplitterContract.methods.listOfPayees().call();
    
  
    return payees;
  } catch {
  
    return [];
  } 
}
export const getMaxPayeeCounter = async(paymentSplitterContract) => {
  
  try {
    const payeeMaxCounter = await paymentSplitterContract.methods.maxPayeeCounter().call();
 //   console.log("asdfdsf = ", poolCount)
  
    return payeeMaxCounter;
  } catch {
   
    return 0;
  } 

}

export const getPayeeCount = async(paymentSplitterContract) => {
  
  try {
    const payeeCount = await paymentSplitterContract.methods.payeeCount().call();
  
    return payeeCount;
  } catch {
   
    return 0;
  } 

}





export const getReleasableAmount = async (vestingWalletContract) => {
  
  try {
    const releasableAmount = await vestingWalletContract.methods.releasableAmount().call();
    
  
    return releasableAmount;
  } catch {
    console.log("error");
    return 0;
  }

}


export const connectToOhterContracts = async(vestingWalletContract, vestingTokenAddress, account ) => {
  return vestingWalletContract.methods.connectToOtherContracts([vestingTokenAddress]).send({ from: account})
  .on('transactionHash', (tx) => {
    console.log(tx)
    return tx.transactionHash
  });
}

export const createVestingSchedule = async (vestingWalletContract, beneficiaryAddress, startTimestamp, durationSeconds, revocable = true, account ) => {
  return vestingWalletContract.methods.createVestingSchedule(beneficiaryAddress, startTimestamp, durationSeconds, revocable  ).send({ from: account})
  .on('transactionHash', (tx) => {
    console.log(tx)
    return tx.transactionHash
  });

}

export const release = async (vestingWalletContract, account) => {
  return vestingWalletContract.methods.release().send({ from: account})
  .on('transactionHash', (tx) => {
    console.log(tx)
    return tx.transactionHash
  }); 
}
