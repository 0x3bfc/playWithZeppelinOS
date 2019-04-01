# playWithZeppelinOS

### Installation
```bash
npm install truffle@5.0.4
npm install -g ganache-cli
npm i
```

### Getting started
- Compile contract
```bash
truffle compile
```
- Start Ganache
```bash
ganache-cli --port 9545 --deterministic
```
- Add contract 
```bash
npx zos add SampleContract
```
- Create new session
```bash
npx zos session --network development  --expires 3600
```
- Push contract to network
```bash
npx zos push --network development
Writing artifacts to ./build/contracts


Using session with timeout 600 seconds
Validating contract SampleContract
Uploading SampleLib library...
Deploying logic contract for SampleLib
Uploading SampleContract contract as SampleContract
Deploying logic contract for SampleContract
Created zos.dev-1553187663175.json
```
SampleLib will pushed directly

- Now lets upgrade the library:

We need this step to validate if the ZeppelinOS will take care of library 
unreadability automatically or not.

1. Replace the existing SampleLib with `NewSampleLib.sol`

```bash
npx zos push --network development SampleLib:NewSampleLib
 
Using session with network development, timeout 600 seconds
Validating contract SampleContract
- Variable samples (SampleContract) contains a struct or enum. These are not automatically checked for storage compatibility in the current version. See https://docs.zeppelinos.org/docs/writing_contracts.html#modifying-your-contracts for more info.
Uploading SampleLib library...
Deploying logic contract for SampleLib
Uploading SampleContract contract as SampleContract
Deploying logic contract for SampleContract
Updated zos.dev-1553187663175.json
```

You will notice that logic contract SampleContract also has been upgraded as it uses the library.

2. But also, we need to replace the existing `SampleContract` with a new functionality.

Now let go to run some test cases and check if the updates does exist on-chain ;) 


- Create Proxy for `SampleContract`
```bash
npx zos create SampleContract --init initialize
```

## Lets start hacking!

- Start Truffle console

```bash
truffle console --network development
```

- Get contract address from `zos.dev-xxxx.json`. Create new instance of contract as follows: 
```javascript
> sampleContract = await SampleContract.at('0x282e967260E73687beA6377D04bd339394d15d47')
```
- Call `create` function
```javascript
truffle(development)> sampleContract.create()
{ tx: '0x9658a29492c88940c382fbc6079c91c063f33893988139e02981bad2f63add2d',
  receipt: 
   { transactionHash: '0x9658a29492c88940c382fbc6079c91c063f33893988139e02981bad2f63add2d',
     transactionIndex: 0,
     blockHash: '0x8062aacfebc78c959323e0a4b777c2ca2ef69b43db36019417b67ea94feadc2a',
     blockNumber: 3,
     gasUsed: 49089,
     cumulativeGasUsed: 49089,
     contractAddress: null,
     logs: [],
     status: true,
     logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
     rawLogs: [] },
  logs: [] }

```

- Call `getSender`. It should return the `SampleContract` address not the sender address (**our bug**)

```javascript
truffle(development)> sampleContract.getSender()
'0x282e967260E73687beA6377D04bd339394d15d47'
``` 
Please compare the contract address and the returned address from `getSender`, you will notice that both of them 
have the same value. 

- Upgrade the contract (to be accurate the code in the library)

Now you need to exit the truffle console and copy the `NewSampleLib.sol` to `SampleLib` to add the fix. Finally 
follow the below commands to upgrade the contract
```bash
npx zos push --network development SampleContract

Compiling contracts with Truffle...
Compiling ./contracts/SampleContract.sol...
Compiling ./contracts/SampleLib.sol...
Compiling ./contracts/upgrade/NewSampleContract.sol...
Compiling openzeppelin-eth/contracts/ownership/Ownable.sol...
Compiling zos-lib/contracts/Initializable.sol...
Writing artifacts to ./build/contracts


Using session with network development, timeout 600 seconds
Validating contract SampleContract
- Variable samples (SampleContract) contains a struct or enum. These are not automatically checked for storage compatibility in the current version. See https://docs.zeppelinos.org/docs/writing_contracts.html#modifying-your-contracts for more info.
Uploading SampleLib library...
Deploying logic contract for SampleLib
Uploading SampleContract contract as SampleContract
Deploying logic contract for SampleContract
Updated zos.dev-1553720336534.json

```
Finally, let's update the already deployed contract with the new code:

```bash

```


1. truffle compile
2. zos init
3. zos add 
4. zos push 
5. zos create
6. change library code and upgrade the SampleLib
7. create new instance from the contract through its proxy
8. call the upgraded function 


# Full flow
Check out the log Below:

```bash
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ rm -r build/
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ 
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ 
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ 
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ 
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ ls -la
total 472
drwxr-xr-x   16 ahmed  staff     512 Mar 27 22:59 .
drwxr-xr-x    3 ahmed  staff      96 Mar 27 11:24 ..
drwxr-xr-x   13 ahmed  staff     416 Mar 27 22:59 .git
-rw-r--r--    1 ahmed  staff     928 Mar 27 11:27 .gitignore
drwxr-xr-x    7 ahmed  staff     224 Mar 27 22:45 .idea
-rw-r--r--    1 ahmed  staff      71 Mar 27 21:54 .zos.session
-rw-r--r--    1 ahmed  staff   11357 Mar 27 11:24 LICENSE
-rw-r--r--    1 ahmed  staff    4989 Mar 27 22:58 README.md
drwxr-xr-x    6 ahmed  staff     192 Mar 27 22:59 contracts
drwxr-xr-x    3 ahmed  staff      96 Mar 27 11:27 migrations
drwxr-xr-x  560 ahmed  staff   17920 Mar 27 14:29 node_modules
-rw-r--r--    1 ahmed  staff  203956 Mar 27 14:29 package-lock.json
-rw-r--r--    1 ahmed  staff     683 Mar 27 14:29 package.json
drwxr-xr-x    3 ahmed  staff      96 Mar 27 14:57 test
-rw-r--r--    1 ahmed  staff     157 Mar 27 12:18 truffle-config.js
drwxr-xr-x    3 ahmed  staff      96 Mar 27 14:43 upgrade
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ 
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ 
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ 
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ 
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ truffle compile
Compiling ./contracts/SampleContract.sol...
Compiling ./contracts/SampleLib.sol...
Compiling ./contracts/upgrade/NewSampleContract.sol...
Compiling openzeppelin-eth/contracts/ownership/Ownable.sol...
Compiling zos-lib/contracts/Initializable.sol...
Writing artifacts to ./build/contracts

Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ zos init PlayWithZoS
Created zos.json
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ zos add SampleContract
Compiling contracts with Truffle...
Compiling ./contracts/SampleContract.sol...
Compiling ./contracts/SampleLib.sol...
Compiling ./contracts/upgrade/NewSampleContract.sol...
Compiling openzeppelin-eth/contracts/ownership/Ownable.sol...
Compiling zos-lib/contracts/Initializable.sol...
Writing artifacts to ./build/contracts


Adding SampleContract
Updated zos.json
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ zos push --network development --verbose SampleContract
[Compiler] Compiling contracts with Truffle...
Compiling ./contracts/SampleContract.sol...
Compiling ./contracts/SampleLib.sol...
Compiling ./contracts/upgrade/NewSampleContract.sol...
Compiling openzeppelin-eth/contracts/ownership/Ownable.sol...
Compiling zos-lib/contracts/Initializable.sol...
Writing artifacts to ./build/contracts


[Error] TypeError: Cannot create property 'timeout' on string 'SampleContract'
    at Object._setDefaults (/usr/local/lib/node_modules/zos/lib/models/network/Session.js:52:29)
    at Object.getOptions (/usr/local/lib/node_modules/zos/lib/models/network/Session.js:20:25)
    at Object.<anonymous> (/usr/local/lib/node_modules/zos/lib/models/initializer/ConfigVariablesInitializer.js:25:66)
    at Generator.next (<anonymous>)
    at /usr/local/lib/node_modules/zos/lib/models/initializer/ConfigVariablesInitializer.js:7:71
    at new Promise (<anonymous>)
    at __awaiter (/usr/local/lib/node_modules/zos/lib/models/initializer/ConfigVariablesInitializer.js:3:12)
    at Object.initNetworkConfiguration (/usr/local/lib/node_modules/zos/lib/models/initializer/ConfigVariablesInitializer.js:23:16)
    at Command.<anonymous> (/usr/local/lib/node_modules/zos/lib/commands/push.js:37:82)
    at Generator.next (<anonymous>)
    at fulfilled (/usr/local/lib/node_modules/zos/lib/commands/push.js:4:58)
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:189:7)
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ zos push --network development --verbose
[Compiler] Compiling contracts with Truffle...
Compiling ./contracts/SampleContract.sol...
Compiling ./contracts/SampleLib.sol...
Compiling ./contracts/upgrade/NewSampleContract.sol...
Compiling openzeppelin-eth/contracts/ownership/Ownable.sol...
Compiling zos-lib/contracts/Initializable.sol...
Writing artifacts to ./build/contracts


[NetworkAppController] Validating contract SampleContract
[NetworkAppController] Uploading SampleLib library...
[BaseSimpleProject] Deploying logic contract for SampleLib
[NetworkAppController] Uploading SampleContract contract as SampleContract
[BaseSimpleProject] Deploying logic contract for SampleContract
[ZosNetworkFile] Created zos.dev-1553721948227.json
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ npx zos create SampleContract --init initialize
A network name must be provided to execute the requested action.
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ npx zos create SampleContract --init initialize --network development
Deploying new ProxyAdmin...
Deployed ProxyAdmin at 0xcd41D693C6fD129Ce87E5878c41C1e9ae70c960c
Creating proxy to logic contract 0x3A868F5da8EFA2c314fBdb39dBa478cb69ac9360 and initializing by calling initialize with: 

Instance created at 0x3F5043B7FD0103464D4BAAcD697DAD13C81a2019
0x3F5043B7FD0103464D4BAAcD697DAD13C81a2019
Updated zos.dev-1553721948227.json
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ truffle console --network development
truffle(development)> sampleContract = await SampleContract.at('0x3F5043B7FD0103464D4BAAcD697DAD13C81a2019')
undefined
truffle(development)> sampleContract.create()
{ tx: '0xdb0cb0cdf571a185d6195f3450f85e230b89cebd85ef113c87038a87efb16fb0',
  receipt: 
   { transactionHash: '0xdb0cb0cdf571a185d6195f3450f85e230b89cebd85ef113c87038a87efb16fb0',
     transactionIndex: 0,
     blockHash: '0xe92502a5085fed6481bedb26ca968d5e8c228e2e9053f9325de11ab33bc4b631',
     blockNumber: 12,
     gasUsed: 50669,
     cumulativeGasUsed: 50669,
     contractAddress: null,
     logs: [],
     status: true,
     logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
     rawLogs: [] },
  logs: [] }
truffle(development)> sampleContract.getSender()
'0x3F5043B7FD0103464D4BAAcD697DAD13C81a2019'
truffle(development)> 
(To exit, press ^C again or type .exit)
truffle(development)> 
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ 
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ 
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ zos push --network development SampleLib:SampleLib
Compiling contracts with Truffle...
Compiling ./contracts/SampleContract.sol...
Compiling ./contracts/SampleLib.sol...
Compiling ./contracts/upgrade/NewSampleContract.sol...
Compiling openzeppelin-eth/contracts/ownership/Ownable.sol...
Compiling zos-lib/contracts/Initializable.sol...
Writing artifacts to ./build/contracts


Cannot create property 'timeout' on string 'SampleLib:SampleLib'
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ npx zos push --network development SampleLib:SampleLib
Compiling contracts with Truffle...
Compiling ./contracts/SampleContract.sol...
Compiling ./contracts/SampleLib.sol...
Compiling ./contracts/upgrade/NewSampleContract.sol...
Compiling openzeppelin-eth/contracts/ownership/Ownable.sol...
Compiling zos-lib/contracts/Initializable.sol...
Writing artifacts to ./build/contracts


Cannot create property 'timeout' on string 'SampleLib:SampleLib'
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ npx zos push --network development 
Compiling contracts with Truffle...
Compiling ./contracts/SampleContract.sol...
Compiling ./contracts/SampleLib.sol...
Compiling ./contracts/upgrade/NewSampleContract.sol...
Compiling openzeppelin-eth/contracts/ownership/Ownable.sol...
Compiling zos-lib/contracts/Initializable.sol...
Writing artifacts to ./build/contracts


Validating contract SampleContract
- Variable samples (SampleContract) contains a struct or enum. These are not automatically checked for storage compatibility in the current version. See https://docs.zeppelinos.org/docs/writing_contracts.html#modifying-your-contracts for more info.
Uploading SampleLib library...
Deploying logic contract for SampleLib
Uploading SampleContract contract as SampleContract
Deploying logic contract for SampleContract
Updated zos.dev-1553721948227.json
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ npx zos update SampleContract
A network name must be provided to execute the requested action.
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ npx zos update --network development SampleContract
Upgrading proxy to logic contract 0x4B3a658607036AEcf69EcdBae0967e03c5eB027e
Upgrading proxy at 0x3F5043B7FD0103464D4BAAcD697DAD13C81a2019 without running migrations...
TX receipt received: 0x3520a8c2ad6e4789eec7eb31314a31a4733d1feb649d8dd5aa4dad14b6847b1f
Instance at 0x3F5043B7FD0103464D4BAAcD697DAD13C81a2019 upgraded
0x3F5043B7FD0103464D4BAAcD697DAD13C81a2019
Updated zos.dev-1553721948227.json
Ahmeds-MacBook-Pro-2:playWithZeppelinOS ahmed$ truffle console --network development
truffle(development)> sampleContract = await SampleContract.at('0x3F5043B7FD0103464D4BAAcD697DAD13C81a2019')
undefined
truffle(development)> sampleContract.getSender()
'0xf42eFca71be3A9e1BBc776d187Cecc4c9Fa7e4C1'
truffle(development)> 
```
