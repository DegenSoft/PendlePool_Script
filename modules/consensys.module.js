import Web3 from "web3";
import fakeUa from "fake-useragent";
import { getAbiByRelativePath } from "../helpers/general.helper.js";
import { ETH, LINEA } from "../const/config.const.js";
import { logger } from "../helpers/logger.helper.js";

export class ConsensysModule {
  constructor(privateKey, proxy) {
    this.proxy = proxy;
    this.chain = ETH;
    this.provider = new Web3.providers.HttpProvider(this.chain.rpc, {
      agent: this.proxy.proxyAgent,
    });
    this.web3Eth = new Web3(this.provider);

    this.chainLinea = LINEA;
    this.providerLinea = new Web3.providers.HttpProvider(this.chainLinea.rpc, {
        agent: this.proxy.proxyAgent,
      });
    this.web3Linea = new Web3(this.providerLinea);

    this.communityNFTaddress = '0x9F44028C2F8959a5b15776e2FD936D5DC141B554';
     
    this.apiEndpoint =
      "https://public-api.consensys-nft.com/v1/purchase-intents";
    this.privateKey = privateKey;
    this.account = this.web3Eth.eth.accounts.privateKeyToAccount(privateKey);
    this.walletAddress = this.account.address;
    logger.info(`Wallet | ${this.walletAddress}`);

    this.contractAddr = "0xAf9ba9f9d7Db062A119371Ea923ED274E3981163";
    this.contractABI = getAbiByRelativePath("./abi/consensysABI.json");
    this.ERC1155ABI = getAbiByRelativePath("./abi/erc1155.json");
    this.communityNFTcontract = new this.web3Linea.eth.Contract(
      this.ERC1155ABI,
      this.communityNFTaddress
    );

    this.contract = new this.web3Eth.eth.Contract(
      this.contractABI,
      this.contractAddr
    );

    this.contractAddrLinea = "0x9F44028C2F8959a5b15776e2FD936D5DC141B554";
    this.contractLinea = new this.web3Linea.eth.Contract(
      this.contractABI,
      this.contractAddrLinea
    );

    this.openEdition = {
      listing_id: "acb40976-f770-4bc5-b3f5-9305ec7c92f3",
      provider: "MINT_VOUCHER",
    };

    this.communityEdition = {
        listing_id: "717d7853-49e0-4f71-b351-50900c0a143e",
        provider: "MINT_VOUCHER",
      };
  }

  async getTxData(options) {
    const payload = {
      buyer: {
        eth_address: this.walletAddress,
      },
      ...options,
      quantity: 1,
    };
    const txData = await this.proxy.sendRequest(this.apiEndpoint, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Origin: "https://app.phosphor.xyz",
        Referer: "https://app.phosphor.xyz/",
        "User-Agent": fakeUa(),
        "Content-Type": "application/json",
      },
      redirect: "follow",
    });
    if(txData.error){
        logger.error(JSON.stringify(txData.error));
        return txData;
    }
    return txData.data;
  }

  async ifExistCommunityEditonNFT() {
    logger.info("Check if exist");
    const balance = await this.communityNFTcontract.methods.balanceOf(this.walletAddress, 1).call();
    return balance
  }

  async mintOpenEditionNFT() {
    logger.info("Prepare Open Edition Mint");
    const txData = await this.getTxData(this.openEdition);
    try {
    const MintOpenNFTCall =
      await this.contract.methods.mintWithVoucher(
        [
          txData.voucher.net_recipient,
          txData.voucher.initial_recipient,
          txData.voucher.initial_recipient_amount,
          txData.voucher.quantity,
          txData.voucher.nonce,
          txData.voucher.expiry,
          txData.voucher.price,
          txData.voucher.token_id,
          txData.voucher.currency,
        ],
        txData.signature
      );

    const MintOpenNFTGas =
      await MintOpenNFTCall.estimateGas({
        from: txData.minter,
        value: txData.value,
      });

    const MintOpenNFTTx = {
      from: txData.minter,
      to: txData.contract,
      value: 0,
      nonce: await this.web3Eth.eth.getTransactionCount(this.walletAddress),
      gas: MintOpenNFTGas,
      data: MintOpenNFTCall.encodeABI(),
    };

    const MintOpenNFTSignedTx =
      await this.web3Eth.eth.accounts.signTransaction(
        MintOpenNFTTx,
        this.privateKey
      );

    const MintOpenNFTResult =
      await this.web3Eth.eth.sendSignedTransaction(
        MintOpenNFTSignedTx.rawTransaction
      );

    logger.info(
        `Minted Open Edition NFT | TX: ${this.chain.explorer}/${MintOpenNFTResult.transactionHash}`
      );
    } catch (error) {
        logger.error(error);
        return;
    }
    
  }

  async mintCommunityEditionNFT() {
    logger.info("Prepare Community Edition Mint");
    const txData = await this.getTxData(this.communityEdition);
    try {
    const MintOpenNFTCall =
      await this.contractLinea.methods.mintWithVoucher(
        [
          txData.voucher.net_recipient,
          txData.voucher.initial_recipient,
          txData.voucher.initial_recipient_amount,
          txData.voucher.quantity,
          txData.voucher.nonce,
          txData.voucher.expiry,
          txData.voucher.price,
          txData.voucher.token_id,
          txData.voucher.currency,
        ],
        txData.signature
      );

    const MintOpenNFTGas =
      await MintOpenNFTCall.estimateGas({
        from: txData.minter,
        value: txData.value,
      });

    const MintOpenNFTTx = {
      from: txData.minter,
      to: txData.contract,
      value: 0,
      nonce: await this.web3Linea.eth.getTransactionCount(this.walletAddress),
      gas: MintOpenNFTGas,
      data: MintOpenNFTCall.encodeABI(),
    };

    const MintOpenNFTSignedTx =
      await this.web3Linea.eth.accounts.signTransaction(
        MintOpenNFTTx,
        this.privateKey
      );

    const MintOpenNFTResult =
      await this.web3Linea.eth.sendSignedTransaction(
        MintOpenNFTSignedTx.rawTransaction
      );

    logger.info(
        `Minted Community Edition NFT | TX: ${this.chain.explorer}/${MintOpenNFTResult.transactionHash}`
      );
    } catch (error) {
        logger.error(error);
        return;
    }
    
  }

}
