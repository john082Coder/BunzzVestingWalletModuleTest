# WRITE(main)

## connectToOtherContracts
To connect address which should be connected to vesting wallet
contracts length is 1 and contracts[0] is vesting token address.
- Who can call: ContractOwner

|Name|Type|Description|Example|Default|
|--- |---|---|---|---|
|contracts|address[]|addresses should be connected to vesting wallet|[0xfc4aa4A414C034E8c852A9E2fA967f82F7D52B90]|N/A|


## createVestingSchedule
This function also can be called by only owner. Vesting manager calls this function to create new vesting. When call this function, this function remove all old datas and replace new data such as beneficiary, startTimestamp and durationSeconds.
- Who can call: ContractOwner

|Name|Type|Description|Example|Default|
|--- |---|---|---|---|
|beneficiaryAddress|address|The address of beneficiary.|[0xfc4aa4A414C034E8c852A9E2fA967f82F7D52B90]|N/A|
|startTimestamp|uint64|The timestamp of start vesting.|[1675827065]|N/A|
|durationSeconds|uint64|Vesting period.|[3600]|N/A|
|revockable_|bool|Whether can revocek or not.|[true]|N/A|


## revokeVestingSchedule

This function also can be called by only owner. Vesting manager calls this function when owner wanna cancel this vesting schedule. At that time, releasable amount that didn't claim to beneficiary will be transferred to beneficiary and vesting wallet is paused.

- Who can call: ContractOwner

No arguments.

## release

Transfers relesable amount of vesting token to beneficiary address.


No arguments.

## emergencyWithdraw

Withdraw vesting token that vesting wallet contract has. But only owner can call this function and before call this, contract should be paused.
- Who can call: ContractOwner

No arguments.


