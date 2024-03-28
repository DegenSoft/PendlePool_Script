import Web3 from "web3";
import fakeUa from "fake-useragent";
import { getAbiByRelativePath, randomIntInRange, shuffleArray, sleep } from "../helpers/general.helper.js";
import { ETH, amountETH, amountPercent, handleGas, useHandleGas, usePercent } from "../const/config.const.js";
import { logger } from "../helpers/logger.helper.js";
import { makeURIWithParams } from "../helpers/string.helper.js";
import { Proxy } from "../helpers/proxy.helper.js";

export class PendleModule {
  constructor(privateKey, proxy) {
    this.proxy = proxy;
    this.chain = ETH;
    this.rpc = randomIntInRange(0, this.chain.rpc.length)
    this.provider = new Web3.providers.HttpProvider(this.chain.rpc[this.rpc]);
    this.web3Eth = new Web3(this.provider);

    this.poolAddress = "";

    this.privateKey = privateKey;
    this.account = this.web3Eth.eth.accounts.privateKeyToAccount(privateKey);
    this.walletAddress = this.account.address;
    this.web3Eth.defaultAccount = this.account.address;
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

  async changeRPC() {
    this.rpc = randomIntInRange(0, this.chain.rpc.length)
    this.provider = new Web3.providers.HttpProvider(this.chain.rpc[this.rpc]);
    this.web3Eth = new Web3(this.provider);
    this.contract = new this.web3Eth.eth.Contract(
      this.contractABI,
      this.contractAddr
    );
    logger.info(`Change RPC to ${this.chain.rpc[this.rpc]}`);
  }

  async getSwapRoute() {
    const payload = {
      tokenIn: this.chain.tokens.ETH,
      tokenOut: this.chain.tokens.ezETH,
      amountIn: this.amount, // amount
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

  async getMarketOrder(market) {
    const payload = {
      chainId: 1,
      market: market,
      netFromTaker: this.amount,
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

  async setAmount() {
    if (usePercent) {
      const percent = randomIntInRange(amountPercent.min, amountPercent.max);
      const balance = await this.web3Eth.eth.getBalance(this.walletAddress);
      this.amount = (balance * 100 / percent).toFixed(0);
      logger.info(`Use Amount | ${percent} % | ${(Number(this.amount) / 10 ** 18).toFixed(5)} ETH`)
    } else {
      this.amount = randomIntInRange(amountETH.min * 10 ** 18, amountETH.max * 10 ** 18);
      logger.info(`Use Amount | ${(Number(this.amount) / 10 ** 18).toFixed(5)} ETH`);
    }
  }

  async setGas() {
    if (useHandleGas) {
      this.gas = randomIntInRange(handleGas.min * 10** 9, handleGas.max * 10 ** 9);
      logger.info(`Use Handle Gas | ${(Number(this.gas) / 10 ** 9).toFixed(2)} Gwei`);
    } else {
      this.gas = await this.web3Eth.eth.getGasPrice();
      logger.info(`Use Ethereum Gas | ${(Number(this.gas) / 10 ** 9).toFixed(2)} Gwei`);
    }
  }

  async swapYTezETH() {
    logger.info("Prepare Swap YT ezETH");
    if (this.amount === '0') return  logger.warn('No enough money');
    await this.getMarketPrice();

    const YTamount = (Number(await this.getMarketOrder(this.pendleMarket, this.amount)) * 0.99).toFixed(0);
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
            this.amount,
            "0xbf5495Efe5DB9ce00f80364C8B423567e58d2110",
            "0x694ba57eE63614b8448b465c39F505ade5E594ad",
            [
              1, //tokenOutIndex
              "0x6131B5fae19EA4f9D964eAc0408E4408b66337b5", //routerAddress
              await this.getSwapRoute(),
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

      const swapExactTokenGas = await SwapExactTokenCall.estimateGas({
        from: this.walletAddress,
        value: this.amount,
      });

      const swapExactTokenTx = {
        from: this.walletAddress,
        to: this.contractAddr,
        value: this.amount,
        nonce: await this.web3Eth.eth.getTransactionCount(this.walletAddress),
        gas: swapExactTokenGas,
        gasPrice: this.gas,
        data: SwapExactTokenCall.encodeABI()
      };

      const swapExactTokenSignedTx =
        await this.web3Eth.eth.accounts.signTransaction(
          swapExactTokenTx,
          this.privateKey
        );

      const swapExactTokenResult = new Promise((resolve, reject) => {
        this.web3Eth.eth.sendSignedTransaction(
          swapExactTokenSignedTx.rawTransaction,
          async (e, hash) => {
            if (e) {
              logger.error(e);
              reject();
            } else {
              logger.info(`Swap sent | TX: ${this.chain.explorer}/${hash}`);
              let attempts = 1;
              while (true) {
                logger.info(`Attempt ${attempts} | Waiting 10 seconds and checking transaction`);
                await sleep(10000);
                const transactionReceipt = await this.web3Eth.eth.getTransaction(hash);
                if (transactionReceipt === null) {
                  logger.warn(`Transaction failed or not in blockchain`);
                  attempts++;
                  if (attempts > 10) {
                    resolve(false);
                  }
                  continue;
                } else if (transactionReceipt.blockNumber === null) {
                  logger.info(`Transaction pending`);
                  resolve(true);
                  break;
                } else {
                  logger.info(`Transaction mined`);
                  resolve(true);
                  break;
                }
              }
            }
          }
        );
      }).catch((e) => { 
      logger.error(error + ' | Try again after 10 sec');
      this.changeRPC();
      sleep(10000);
      this.swapYTezETH(); 
    });

    } catch (error) {
      if(String(error).includes('insufficient')) return logger.warn('No enough money');
      logger.error(error + ' | Try again after 10 sec');
      this.changeRPC();
      sleep(10000);
      this.swapYTezETH();
    }
  }

  async swapYTezETHZircuit() {
    logger.info("Prepare Swap YT ezETH (Zircuit)");
    if (this.amount === '0') return logger.warn('No enough money');
    await this.getMarketPrice();
    const YTamount = (Number(await this.getMarketOrder(this.pendleMarketZircuit, this.amount)) * 0.99).toFixed(0);
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
            this.amount,
            "0xbf5495Efe5DB9ce00f80364C8B423567e58d2110",
            "0x694ba57eE63614b8448b465c39F505ade5E594ad",
            [
              1, //tokenOutIndex
              "0x6131B5fae19EA4f9D964eAc0408E4408b66337b5", //routerAddress
              await this.getSwapRoute(this.amount),
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
        );

      const swapExactTokenGas = await SwapExactTokenCall.estimateGas({
        from: this.walletAddress,
        value: this.amount,
      });

      const swapExactTokenTx = {
        from: this.walletAddress,
        to: this.contractAddr,
        value: this.amount,
        nonce: await this.web3Eth.eth.getTransactionCount(this.walletAddress),
        gas: swapExactTokenGas,
        gasPrice: this.gas,
        data: SwapExactTokenCall.encodeABI()
      };

      const swapExactTokenSignedTx =
        await this.web3Eth.eth.accounts.signTransaction(
          swapExactTokenTx,
          this.privateKey
        );
      const swapExactTokenResult = new Promise((resolve, reject) => {
        this.web3Eth.eth.sendSignedTransaction(
          swapExactTokenSignedTx.rawTransaction,
          async (e, hash) => {
            if (e) {
              logger.error(e);
              reject();
            } else {
              logger.info(`Swap sent | TX: ${this.chain.explorer}/${hash}`);
              let attempts = 1;
              while (true) {
                logger.info(`Attempt ${attempts} | Waiting 10 seconds and checking transaction`);
                await sleep(10000);
                const transactionReceipt = await this.web3Eth.eth.getTransaction(hash);
                if (transactionReceipt === null) {
                  logger.warn(`Transaction failed or not in blockchain`);
                  attempts++;
                  if (attempts > 10) {
                    resolve(false);
                  }
                  continue;
                } else if (transactionReceipt.blockNumber === null) {
                  logger.info(`Transaction pending`);
                  resolve(true);
                  break;
                } else {
                  logger.info(`Transaction mined`);
                  resolve(true);
                  break;
                }
              }
            }
          }
        );
      }).catch((e) => { logger.error(error + ' | Try again after 10 sec');
      this.changeRPC();
      sleep(10000);
      this.swapYTezETHZircuit();  });

      return swapExactTokenResult;

    } catch (error) {
      logger.error(error + ' | Try again after 10 sec');
      this.changeRPC();
      sleep(10000);
      this.swapYTezETHZircuit();
    }
  }
}