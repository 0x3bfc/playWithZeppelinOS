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