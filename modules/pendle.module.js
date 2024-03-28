import Web3 from "web3";
import fakeUa from "fake-useragent";
import { getAbiByRelativePath } from "../helpers/general.helper.js";
import { ETH } from "../const/config.const.js";
import { logger } from "../helpers/logger.helper.js";
import { makeURIWithParams } from "../helpers/string.helper.js";
import { Proxy } from "../helpers/proxy.helper.js";

export class PendleModule {
  constructor(privateKey, proxy) {
    this.proxy = proxy;
    this.chain = ETH;
    this.provider = new Web3.providers.HttpProvider(this.chain.rpc);
    this.web3Eth = new Web3(this.provider);

    this.poolAddress = "";

    this.privateKey = privateKey;
    this.account = this.web3Eth.eth.accounts.privateKeyToAccount(privateKey);
    this.walletAddress = this.account.address;
    logger.info(`Wallet | ${this.walletAddress}`);

    this.contractAddr = "0x00000000005BBB0EF59571E58418F9a4357b68A0";
    this.contractABI = getAbiByRelativePath("./abi/pendlABI.json");
    this.ua = fakeUa();
    this.contract = new this.web3Eth.eth.Contract(
      this.contractABI,
      this.contractAddr
    );

    this.kyberSwapURI = "https://aggregator-api.kyberswap.com";
    this.kyberSwapEndPoint = "/ethereum/route/encode";

    this.pendleMarket = "0xDe715330043799D7a80249660d1e6b61eB3713B3";
    this.pendleMarketZircuit = "0xd7E0809998693fD87E81D51dE1619fd0EE658031";
  }

  async getSwapRoute(amountIn) {
    const payload = {
      tokenIn: this.chain.tokens.ETH,
      tokenOut: this.chain.tokens.ezETH,
      amountIn: amountIn, // amount
      to: this.contractAddr,
      slippageTolerance: 50,
      useMeta: false,
      saveGas: 1,
      gasInclude: 1,
      clientData: { source: "Pendle" },
      deadline: 2147483647,
      excludedSources: "",
    };

    const request = await this.proxy.sendRequest(
      makeURIWithParams(this.kyberSwapURI, this.kyberSwapEndPoint, payload),
      {
        method: "GET",
        headers: {
          Origin: "https://app.pendle.finance",
          Referer: "https://app.pendle.finance/",
          "User-Agent": this.ua,
          "Content-Type": "application/json",
        },
      }
    );
    return request.encodedSwapData;
  }

  async getMarketOrder(market, amount) {
    const payload = {
      chainId: 1,
      market: market,
      netFromTaker: amount,
      type: 2,
    };
    const request = await this.proxy.sendRequest(
      "https://api-v2.pendle.finance/limit-order/v2/limit-order/market-order",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Cache-Control": "no-cache",
            Origin: "https://app.pendle.finance",
            Referer: "https://app.pendle.finance/",
            "User-Agent": this.ua,
            "Content-Type": "application/json",
          },
      }
    );
      
    return request.totalTrade.netToTaker
  }

  async getMarketPrice() {
    const request = await this.proxy.sendRequest(
      "https://api-v2.pendle.finance/core/v1/1/markets/0xde715330043799d7a80249660d1e6b61eb3713b3",
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          Origin: "https://app.pendle.finance",
          Referer: "https://app.pendle.finance/",
          "User-Agent": this.ua,
          "Content-Type": "application/json",
        },
      }
    );
    this.prices = { PT: request.pt.price.acc, YT: request.yt.price.acc };
  }

  async ifExistCommunityEditonNFT() {
    logger.info("Check if exist");
    const balance = await this.communityNFTcontract.methods
      .balanceOf(this.walletAddress, 1)
      .call();
    return balance;
  }

  async swapYTezETH() {
    logger.info("Prepare Open Edition Mint");
    await this.getMarketPrice();
    const amount = 3534516837416222;
    const YTamount = (Number(await this.getMarketOrder(this.pendleMarket, amount))*0.99).toFixed(0);
    console.log(YTamount);
    try {
      const SwapExactTokenCall = await this.contract.methods
        .swapExactTokenForYt(
          this.walletAddress,
          this.pendleMarket,
          YTamount,
          [
            YTamount, //minAmount
            (Number(YTamount) * 1.03).toFixed(0), //maxAmount,
            (Number(YTamount) * 1.005).toFixed(0),
            "0x19",
            "0x038d7ea4c68000",
          ],
          [
            "0x0000000000000000000000000000000000000000",
            amount,
            "0xbf5495Efe5DB9ce00f80364C8B423567e58d2110",
            "0x694ba57eE63614b8448b465c39F505ade5E594ad",
            [
              1, //tokenOutIndex
              "0x6131B5fae19EA4f9D964eAc0408E4408b66337b5", //routerAddress
              await this.getSwapRoute(amount),
              false,
            ],
          ],
          [
            "0x0000000000000000000000000000000000000000",
            {
              type: "BigNumber",
              hex: "0x00",
            },
            [],
            [],
            "0x",
          ]
        )
        .estimateGas({
          from: this.walletAddress,
          value: amount,
        });

      console.log(SwapExactTokenCall);
      /*
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

      const MintOpenNFTResult = await this.web3Eth.eth.sendSignedTransaction(
        MintOpenNFTSignedTx.rawTransaction
      );

      logger.info(
        `Minted Open Edition NFT | TX: ${this.chain.explorer}/${MintOpenNFTResult.transactionHash}`
      );*/
    } catch (error) {
      logger.error(error);
      return;
    }
  }

  async swapYTezETHZircuit() {
    logger.info("Prepare Open Edition Mint");
    await this.getMarketPrice();
    const amount = 3534516837416222;
    const YTamount = (Number(await this.getMarketOrder(this.pendleMarketZircuit, amount))*0.99).toFixed(0);
    console.log(YTamount);
    try {
      const SwapExactTokenCall = await this.contract.methods
        .swapExactTokenForYt(
          this.walletAddress,
          this.pendleMarketZircuit,
          YTamount,
          [
            YTamount, //minAmount
            (Number(YTamount) * 1.03).toFixed(0), //maxAmount,
            (Number(YTamount) * 1.005).toFixed(0),
            "0x19",
            "0x038d7ea4c68000",
          ],
          [
            "0x0000000000000000000000000000000000000000",
            amount,
            "0xbf5495Efe5DB9ce00f80364C8B423567e58d2110",
            "0x694ba57eE63614b8448b465c39F505ade5E594ad",
            [
              1, //tokenOutIndex
              "0x6131B5fae19EA4f9D964eAc0408E4408b66337b5", //routerAddress
              await this.getSwapRoute(amount),
              false,
            ],
          ],
          [
            "0x0000000000000000000000000000000000000000",
            {
              type: "BigNumber",
              hex: "0x00",
            },
            [],
            [],
            "0x",
          ]
        )
        .estimateGas({
          from: this.walletAddress,
          value: amount,
        });

      console.log(SwapExactTokenCall);
    } catch (error) {
      logger.error(error);
      return;
    }
  }
}

async function main() {
  const proxy = new Proxy("");
  const pendle = new PendleModule(
    "",
    proxy
  );

  
}

main();
