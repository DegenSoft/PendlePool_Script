import { moduleName, decryptAccounts, decryptPass, sleepFrom, sleepTo } from './const/config.const.js';
import { importPrivatesKeys } from './helpers/accs.helper.js';
import { randomIntInRange } from './helpers/general.helper.js';
import { waitForGas } from './helpers/gas.helper.js';
import { decryptPrivateKey } from './helpers/decryption.helper.js';
import { LensModule } from './modules/lens/lens.module.js';
import { banner, logger } from './helpers/logger.helper.js';

console.log(banner)

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const privatesKeys = await importPrivatesKeys();

if (!(Array.isArray(privatesKeys) && privatesKeys.length)) {
  logger.warn(`${moduleName}. No wallets found.`);
  process.exit(0);
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
  const lensInstance = new LensModule(privateKey);

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
