import { maxGwei, sleepOnHighGas } from '../const/config.const.js';
import { sleep } from './general.helper.js';

export const isGasOkay = async (web3, ethAddress) => {
  const gasPrice = await web3.eth.getGasPrice();
  const currentGas = Number(web3.utils.fromWei(String(gasPrice), 'Gwei'));

  const isGasHigher = currentGas <= maxGwei;

  if (!isGasHigher) {
    console.log(
      `Pendle Swap | ${ethAddress}: gas is too high. ${currentGas} gwei now vs ${maxGwei} gwei limit. Waiting for ${sleepOnHighGas} seconds...`
    );

    await sleep(sleepOnHighGas * 1000);
  }

  return isGasHigher;
};

export const waitForGas = async (web3, walletAddress) => {
  let gasOkay = false;
  while (!gasOkay) {
    gasOkay = await isGasOkay(web3, walletAddress);
  }

  return;
};
