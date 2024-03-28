import {
  decryptAccounts,
  decryptPass,
  sleepFrom,
  sleepTo,
  proxyURL,
  shuffleWallets,
  SwapYTexETH,
  SwapYTexETHZircuit,
} from "./const/config.const.js";
import { importPrivatesKeys, importProxies } from "./helpers/accs.helper.js";
import { randomIntInRange, shuffleArray } from "./helpers/general.helper.js";
import { waitForGas } from "./helpers/gas.helper.js";
import { decryptPrivateKey } from "./helpers/decryption.helper.js";
import { banner, logger, newWallet } from "./helpers/logger.helper.js";
import { Proxy } from "./helpers/proxy.helper.js";
import { PendleModule } from "./modules/pendle.module.js";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const privatesKeys = await importPrivatesKeys();
const proxy = await importProxies();

console.log(banner);

if (!(Array.isArray(privatesKeys) && privatesKeys.length)) {
  logger.warn(`Pendl Swap | No wallets found.`);
  process.exit(0);
}

if (proxy.length < privatesKeys.length && proxy.length != 0) {
  logger.warn(`Pendl Swap | Proxy count less than wallets.`);
  process.exit(0);
}

if (proxy.length == 0) {
  privatesKeys.forEach((el, i) => {
    proxy[i] = proxyURL;
  });
}

if (decryptAccounts) {
  if (decryptPass) {
    privatesKeys.forEach((privateKey, i) => {
      try {
        privatesKeys[i] = decryptPrivateKey(privateKey, decryptPass);
        if (privateKey === "") throw new Error();
        logger.info(`PrivateKey[${i}] is decrypted successfull!`);
      } catch (e) {
        logger.warn(`PrivateKey[${i}] is can not decrypted!`);
      }
    });
  }
}

if (shuffleWallets) {
  shuffleArray(privatesKeys);
}

for (let privateKey of privatesKeys) {
  try {
    console.log(newWallet);
    const proxyInstanse = new Proxy(proxy[privatesKeys.indexOf(privateKey)]);
    const pendleInstanse = new PendleModule(privateKey, proxyInstanse);

    await proxyInstanse.getIP();

    await proxyInstanse.changeIP();

    if (SwapYTexETH) {
      await waitForGas(
        pendleInstanse.web3Eth,
        pendleInstanse.walletAddress
      );
      while (true) {
        try {
          await pendleInstanse.setAmount();
          await pendleInstanse.setGas();
          await pendleInstanse.swapYTezETH();
          break;
        } catch (e) {
          logger.error(e + ' | Try again after 10 sec');
          pendleInstanse.changeRPC();
          sleep(10000);
        }
      }

    }

    if(SwapYTexETH && SwapYTexETHZircuit){
      const timing = randomIntInRange(sleepFrom, sleepTo);
      logger.info(
        `Pendl Swap | Waiting for ${timing} seconds before next swap...`
      );
      await sleep(timing * 1000);
    }

    if (SwapYTexETHZircuit) {
      await waitForGas(
        pendleInstanse.web3Eth,
        pendleInstanse.walletAddress
      );
      while (true) {
        try {
          await pendleInstanse.setAmount();
          await pendleInstanse.setGas();
          await pendleInstanse.swapYTezETHZircuit();
          break;
        } catch (e) {
          logger.error(e + ' | Try again after 10 sec');
          pendleInstanse.changeRPC();
          sleep(10000);
        }
      }


    }
  } catch (error) {
    logger.error(error);
  }
  const timing = randomIntInRange(sleepFrom, sleepTo);
  logger.info(
    `Pendl Swap | Waiting for ${timing} seconds before next wallet...`
  );
  await sleep(timing * 1000);
}
logger.info("All wallets are made!");
