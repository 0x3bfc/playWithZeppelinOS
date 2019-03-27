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

