import { gql, GraphQLClient } from "graphql-request";
import Web3 from "web3";
import FormData from 'form-data';
import fakeUa from "fake-useragent";
import fs from 'fs';
import fetch from 'node-fetch'
import { generateBio, generateName, generateUUID } from "../../helpers/generator.helper.js";
import { getAbiByRelativePath, sleep } from "../../helpers/general.helper.js";
import { getImage } from "../../helpers/img.helper.js";
import { ETH, POL } from "../../const/config.const.js";
import { logger } from "../../helpers/logger.helper.js";





export class ConsensysModule {
    constructor(privateKey, proxy) {
        this.proxy = proxy;
        this.chain = ETH;
        this.provider = new Web3.providers.HttpProvider(this.chain.rpc, { agent: this.proxy.proxyAgent })
        this.web3 = new Web3(this.chain.rpc);
        this.web3Eth = new Web3(this.provider);
        this.privateKey = privateKey;
        this.account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
        this.walletAddress = this.account.address;
        logger.info(`Wallet | ${this.walletAddress}`);
        this.contractAddr = "0xAf9ba9f9d7Db062A119371Ea923ED274E3981163";
        this.contractABI = getAbiByRelativePath("./abi/consensysABI.json");
        this.contract = new this.web3.eth.Contract(
            this.contractABI,
            this.contractAddr
        );
    }

    async mintNFT() {
        logger.info('Prepare Mint')
        const createProfileWithHandleCall =
            await this.creatorContract.methods.createProfileWithHandleUsingCredits(
                [this.walletAddress, this.refAddress, "0x"],
                this.name,
                [this.delegator]
            );

        const createProfileWithHandleGas =
            await createProfileWithHandleCall.estimateGas({
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

        const createProfileWithHandleSignedTx =
            await this.web3.eth.accounts.signTransaction(
                createProfileWithHandleTx,
                this.privateKey
            );

        const createProfileWithHandleResult =
            await this.web3.eth.sendSignedTransaction(
                createProfileWithHandleSignedTx.rawTransaction
            );

        logger.info(
            `Registered ${this.name} handle | TX: ${this.chain.explorer}/${createProfileWithHandleResult.transactionHash}`
        );
    }

    async register() {
        await getImage();
        await this.getName();
        //First interaction 
        await this.loginSignature();
        await this.verifyAuth();
        await this.createProfile();
        await sleep(30 * 1000);
        logger.info('Sleep 30 seconds');
        //If you have profile, comment upper code
        await this.loginSignatureWithId();
        await this.changeMetadata();
    }
}



