import { moduleName, decryptAccounts, decryptPass, sleepFrom, sleepTo, proxyURL, changeURL } from './const/config.const.js';
import { importPrivatesKeys, importProxies } from './helpers/accs.helper.js';
import { randomIntInRange } from './helpers/general.helper.js';
import { waitForGas } from './helpers/gas.helper.js';
import { decryptPrivateKey } from './helpers/decryption.helper.js';
import { LensModule } from './modules/lens/lens.module.js';
import { banner, logger } from './helpers/logger.helper.js';
import { Proxy } from './helpers/proxy.helper.js';

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const privatesKeys = await importPrivatesKeys();
const proxy = await importProxies();

if (!(Array.isArray(privatesKeys) && privatesKeys.length)) {
  logger.warn(`${moduleName}. No wallets found.`);
  process.exit(0);
}

if (proxy.length < privatesKeys.length && proxy.length != 0){
  logger.warn(`${moduleName}. Proxy count less than wallets.`);
  process.exit(0);
}

if (proxy.length == 0) {
  privatesKeys.forEach((el, i) => {
    proxy[i] = proxyURL;
  });
}

// main loop
let idx = 1;
for (let privateKey of privatesKeys) {
  
  if (decryptAccounts) {
    if (decryptPass) {
      try {
        privateKey = decryptPrivateKey(privateKey, decryptPass);
        if(privateKey === '') throw new Error();
        logger.info(`PrivateKey[${idx}] is decrypted successfull!`);
      } catch (e) {
        logger.warn(`PrivateKey[${idx}] is can not decrypted!`);
        continue
      }
    }
  }
  try {
  const proxyInstanse = new Proxy(proxy[privatesKeys.indexOf(privateKey)]);
  const lensInstance = new LensModule(privateKey, proxyInstanse);

  await proxyInstanse.getIP();

  await proxyInstanse.changeIP();
  // check gas
  await waitForGas(lensInstance.web3Eth, lensInstance.walletAddress);

  await lensInstance.register();
  
} catch (error) {
    logger.error(error);

}
  const timing = randomIntInRange(sleepFrom, sleepTo);
  logger.info(`${moduleName}. Waiting for ${timing} seconds before next mint...`);
  await sleep(timing * 1000);
}
logger.info('All wallets are made!');
