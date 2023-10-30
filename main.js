import { moduleName, decryptAccounts, decryptPass, sleepFrom, sleepTo } from './const/config.const.js';
import { EnsModule } from './modules/ens/ens.module.js';
import { importPrivatesKeys } from './helpers/accs.helper.js';
import { randomIntInRange } from './helpers/general.helper.js';
import { waitForGas } from './helpers/gas.helper.js';
import { decryptPrivateKey } from './helpers/decryption.helper.js';

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const privatesKeys = await importPrivatesKeys();

if (!(Array.isArray(privatesKeys) && privatesKeys.length)) {
  console.log(`${moduleName}. No wallets found.`);
  process.exit(0);
}

// main loop
let idx = 1;
for (let privateKey of privatesKeys) {
  if (decryptAccounts) {
    if (decryptPass) {
      try {
        privateKey = decryptPrivateKey(privateKey, decryptPass);
        console.log(`PrivateKey[${idx}] is decrypted successfull!`);
      } catch (e) {
        console.error(`PrivateKey[${idx}] is can not decrypted!`)
      }
    }
  }

  const ensInstance = new EnsModule(privateKey);

  // check gas
  await waitForGas(ensInstance.web3, ensInstance.walletAddress);

  const result = await ensInstance.register();

  if (result === false) {
    // skip sleep, if nft is already on the account
    continue;
  }

  const timing = randomIntInRange(sleepFrom, sleepTo);
  console.log(`${moduleName}. Waiting for ${timing} seconds before next mint...`);
  await sleep(timing * 1000);
}
console.log('All wallets are made!');
