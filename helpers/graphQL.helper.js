import { gql, GraphQLClient } from 'graphql-request';
import Web3 from 'web3';
import { generateBio, generateName, generateUUID } from './generator.helper.js';
import { getAbiByRelativePath } from './general.helper.js';
import { POL } from '../const/config.const.js';
import axios from 'axios';

class LensAPI {
    constructor(privateKey) {
        this.chain = POL;
        this.web3 = new Web3(this.chain.rpc);
        this.privateKey = privateKey;
        this.account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
        this.walletAddress = this.account.address;
        this.handlePrice = 5 * 10 ** 18;
        this.delegator = "0xC9FA5F824530b0DB3Df97820ded190F849b9bc0d"
        this.refAddress = "0x0000000000000000000000000000000000000000"
        this.contractAddr = "0x4b8845ACb8148dE64D1D99Cf27A3890a91F55E53";
        this.creatorABI = getAbiByRelativePath('./abi/creatorABI.json');
        this.creatorContract = new this.web3.eth.Contract(this.creatorABI, this.contractAddr);
        this.endpoint = "https://api-v2.lens.dev/";
        this.metadataEndpoint = "https://api.hey.xyz/metadata";
        this.graphClient = new GraphQLClient(this.endpoint, {
            jsonSerializer: {
                parse: JSON.parse,
                stringify: JSON.stringify,
            },
            headers: {
                "origin": "https://hey.xyz",
                "referer": "https://hey.xyz/",
                "content-type": "application/json",
            }
        })
    }

    async loginSignature() {
        const query = gql`
        query HandleToAddress {
            challenge(request: { signedBy: "${this.walletAddress}" }) {
                id
                text
            }
        }
      `
        const data = await this.graphClient.request(query);
        const signature = this.web3.eth.accounts.sign('0x' + Buffer.from(data.challenge.text, 'utf-8').toString('hex'), this.privateKey).signature;
        this.login = { id: data.challenge.id, signature: signature };
    }

    async loginAccept() {
        const mutation = gql`
        mutation Authenticate {
            authenticate(request: { id: "${this.login.id}", signature: "${this.login.signature}" }) {
                accessToken
                refreshToken
            }
        }
      `
        const data = await this.graphClient.request(mutation)
        this.accessToken = data.authenticate.accessToken
        this.refreshToken = data.authenticate.refreshToken
        this.graphClient.setHeader('X-Access-Token', `Bearer ${this.accessToken}`)
        this.graphClient.setHeader('X-Requested-From', 'hey')
    }

    async checkHuddle(name) {
        const query = `
        query HandleToAddress {
            handleToAddress(request: { handle: "lens/${name}" })
        }`
        const data = await this.graphClient.request(query);
        if (name.length > 4 && data.handleToAddress === null) {
            this.name = name;
            return true;
        }
        else return false
    }

    async createProfile() {

        const createProfileWithHandleCall = await this.creatorContract.methods.createProfileWithHandleUsingCredits([
            [
                this.walletAddress,
                this.refAddress,
                ""
            ],
            this.name,
            [
                this.delegator
            ]
        ])

        const createProfileWithHandleGas = await createProfileWithHandleCall.estimateGas({
            from: this.walletAddress,
            value: this.handlePrice,
        });

        const createProfileWithHandleTx = {
            from: this.walletAddress,
            to: this.contractAddr,
            value: this.handlePrice.toString(),
            nonce: await this.web3.eth.getTransactionCount(this.walletAddress),
            gas: createProfileWithHandleGas,
            data: createProfileWithHandleCall.encodeABI(),
        };

        const createProfileWithHandleSignedTx = await this.web3.eth.accounts.signTransaction(createProfileWithHandleTx, this.privateKey);

        const createProfileWithHandleResult = await this.web3.eth.sendSignedTransaction(createProfileWithHandleSignedTx.rawTransaction);

        console.log(
            `${this.walletAddress}: Registered ${this.name} handle | TX: ${this.chain.explorer}/${createProfileWithHandleResult.transactionHash}`
        );
    }

    async setProfileMetadata(id) {
        const mutation = gql`
        mutation SetProfileMetadata {
            setProfileMetadata(
                request: { metadataURI: "ar://${id}" }
            ) {
                ... on RelaySuccess {
                    txId
                    txHash
                }
            }
        }        
      `
        console.log(this.graphClient)
        const data = await this.graphClient.request(mutation)
        console.log(data)
    }

    async changeMetadata() {
        const payload = {
            "$schema": "https://json-schemas.lens.dev/profile/2.0.0.json",
            "lens": {
                "id": generateUUID(),
                "name": this.name,
                "bio": generateBio(),
                "picture": "",
            }
        }

        const metadataId = await axios.post(this.metadataEndpoint, payload, { headers: { "Origin": "https://hey.xyz", "Referer": "https://hey.xyz/" } });
        await this.setProfileMetadata(metadataId.data.id);
    }
}

async function main() {
    const client = new LensAPI("0x7ea551ef36523b82a302a17c376c37c40fa5eb3202488b81ecdbc074ff2a1ec7");
    while (true) {
        const name = generateName();
        if (await client.checkHuddle(name)) break;
    }
    await client.loginSignature()
    await client.loginAccept()
    await client.changeMetadata()
}


main()