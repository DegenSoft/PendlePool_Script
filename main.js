import {
  moduleName,
  decryptAccounts,
  decryptPass,
  sleepFrom,
  sleepTo,
  proxyURL,
  MINT_OPEN_EDITION,
  MINT_COMMUNITY_EDITION,
} from "./const/config.const.js";
import { importPrivatesKeys, importProxies } from "./helpers/accs.helper.js";
import { randomIntInRange } from "./helpers/general.helper.js";
import { waitForGas, waitForGasLinea } from "./helpers/gas.helper.js";
import { decryptPrivateKey } from "./helpers/decryption.helper.js";
import { banner, logger } from "./helpers/logger.helper.js";
import { Proxy } from "./helpers/proxy.helper.js";
import { ConsensysModule } from "./modules/consensys.module.js";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const privatesKeys = await importPrivatesKeys();
const proxy = await importProxies();

console.log(banner);

if (!(Array.isArray(privatesKeys) && privatesKeys.length)) {
  logger.warn(`${moduleName}. No wallets found.`);
  process.exit(0);
}

if (proxy.length < privatesKeys.length && proxy.length != 0) {
  logger.warn(`${moduleName}. Proxy count less than wallets.`);
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

// main loop
for (let privateKey of privatesKeys) {
  try {
    const proxyInstanse = new Proxy(proxy[privatesKeys.indexOf(privateKey)]);
    const consensysInstance = new ConsensysModule(privateKey, proxyInstanse);

    await proxyInstanse.getIP();

    await proxyInstanse.changeIP();

    if (MINT_OPEN_EDITION) {
      // check gas
      await waitForGas(
        consensysInstance.web3Eth,
        consensysInstance.walletAddress
      );

      await consensysInstance.mintOpenEditionNFT();
    }

    if (MINT_COMMUNITY_EDITION) {
      if (MINT_OPEN_EDITION) {
        const timing = randomIntInRange(sleepFrom, sleepTo);
        logger.info(
          `${moduleName}. Waiting for ${timing} seconds before next mint...`
        );
        await sleep(timing * 1000);
      }
      await waitForGasLinea(
        consensysInstance.web3Linea,
        consensysInstance.walletAddress
      );

      await consensysInstance.mintCommunityEditionNFT();
    }
  } catch (error) {
    logger.error(error);
  }
  const timing = randomIntInRange(sleepFrom, sleepTo);
  logger.info(
    `${moduleName}. Waiting for ${timing} seconds before next mint...`
  );
  await sleep(timing * 1000);
}
logger.info("All wallets are made!");
