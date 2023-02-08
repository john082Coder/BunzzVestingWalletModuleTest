## Preparation before deployment
1. Prepare your any ERC20 token which will be used for vesting token in your wallet.

## Get started(Operation)
As Project Owner,

1. Deploy smart contract via Bunzz
2. Set vesting token address by calling `connectToOtherContracts` function.
3. Deposit some amount of vesting tokens to the contract.
4. To create new vesting schedule, call the function `createVestingSchedule()`.
5. To revoke current vesting schedule of the contract,  call the function `revokeVestingSchedule()`.
6. To release vesting tokens to beneficiary address, call the function `release()`.


## How-to

- How to get the current releasable amount?
  Call `releasableAmount()`. 
- How to get vested amount?
  Call `vestedAmount(uint64 timestamp)`.



