/* eslint-env mocha */
/* global artifacts, web3, contract, describe, it, beforeEach */
const { execSync } = require('child_process')
const chai = require('chai')
const { assert } = chai
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const SampleLib = artifacts.require('SampleLib')
//const NewSampleLib = artifacts.require('NewSampleLib')
const SampleContract = artifacts.require('SampleContract')
const NewSampleContract = artifacts.require('NewSampleContract')


contract('OceanToken', (accounts) => {

    async function deploy(contracts){
        execSync(`npx zos session --network development  --expires 3600`)
        execSync(`npx zos add ${contracts.join(' ')} -v`)
        // push them using zos
        execSync(`npx zos push --network development -v`)
    }

    async function upgrade(contract, newContract){
        return execSync(`npx zos push --network development ${contract}:${newContract} -v`)
    }

    async function swap(first, second){
        // cash file(s)
        execSync(`cp ${first} ${first}.old`)
        // swap
        execSync(`mv ${second} ${first}`)
        execSync(`mv ${first}.old ${second}`)
    }

    async function getImplementationAddress(
        projectName,
        contractName,
        networkId
    ) {
        const { proxies } = zosGetMigrations('development')
        const proxyEntries = proxies[`${projectName}/${contractName}`]
        return proxyEntries[proxyEntries.length - 1].address
    }


    describe('Deploy', () => {
        it('should deploy contracts to development network', async () => {
            await deploy(['SampleContract'])
        })
    })
})