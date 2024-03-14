import { POL, domainDuration, sleepBeforeRegistering } from '../../const/config.const.js';

export class Lens {
  constructor(privateKey) {
    this.protocolName = "Lens";
    this.chain = POL;
    this.web3 = new Web3(this.chain.rpc);

    this.privateKey = privateKey;
    this.account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    this.walletAddress = this.account.address;

    this.contractAddr = this.web3.utils.toChecksumAddress(
      "0x0b5e6100243f793e480DE6088dE6bA70aA9f3872"
    );

    this.contractAbi = getAbiByRelativePath("./abi/creatorAbi.json");

    this.contract = new this.web3.eth.Contract(
      this.contractAbi,
      this.contractAddr
    );
  }

  async register() {
    const isAlreadyRegistered = await this.isAlreadyRegistered();
    if (isAlreadyRegistered) {
      console.log(`Wallet: ${this.walletAddress} is already have ENS.`);
      return false;
    }

    let name;

    while (true) {
      name = generateName();
      const taken = await this.isTaken(name);
      if (!taken) {
        break;
      }
    }

    // Generate a random value to mask our commitment
    const salt = generateSalt();
    const resolverCalldata = this.getCalldata(name);

    try {
      // Add 10% to account for price fluctuation; the difference is refunded.
      const price = parseInt(
        (
          await this.contract.methods
            .rentPrice(name, this.duration)
            .call({ from: this.walletAddress })
        )[0]
      );

      const commitment = await this.contract.methods
        .makeCommitment(
          name,
          this.walletAddress,
          this.duration,
          salt,
          this.publicResolverAddr,
          resolverCalldata,
          true,
          0
        )
        .call();

      const commitFunctionCall = await this.contract.methods.commit(commitment);

      const commitEstimatedGas = await commitFunctionCall.estimateGas({
        from: this.walletAddress,
        value: 0,
      });

      const commitTx = {
        from: this.walletAddress,
        to: this.contractAddr,
        value: 0,
        nonce: await this.web3.eth.getTransactionCount(this.walletAddress),
        gas: commitEstimatedGas,
        data: commitFunctionCall.encodeABI(),
      };

      const commitSignedTx = await this.web3.eth.accounts.signTransaction(
        commitTx,
        this.privateKey
      );
      const commitSendTransactionResult =
        await this.web3.eth.sendSignedTransaction(
          commitSignedTx.rawTransaction
        );

      console.log(
        `${this.protocolName}. ${this.walletAddress}: Commit transaction sent | TX: ${this.chain.explorer}/${commitSendTransactionResult.transactionHash}`
      );

      console.log(
        `${this.protocolName}. Waiting for ${sleepBeforeRegistering} seconds before registering...`
      );
      // Wait 60 seconds before registering
      await sleep(sleepBeforeRegistering * 1000);

      // Submit our registration request
      const registerFunctionCall = await this.contract.methods.register(
        name,
        this.walletAddress,
        this.duration,
        salt,
        this.publicResolverAddr,
        resolverCalldata,
        true,
        0
      );

      const registerEstimatedGas = await registerFunctionCall.estimateGas({
        from: this.walletAddress,
        value: price,
      });

      const registerTx = {
        from: this.walletAddress,
        to: this.contractAddr,
        value: price.toString(),
        nonce: await this.web3.eth.getTransactionCount(this.walletAddress),
        gas: registerEstimatedGas,
        data: registerFunctionCall.encodeABI(),
      };

      const registerSignedTx = await this.web3.eth.accounts.signTransaction(
        registerTx,
        this.privateKey
      );
      const registerSendTransactionResult =
        await this.web3.eth.sendSignedTransaction(
          registerSignedTx.rawTransaction
        );

      console.log(
        `${this.protocolName}. ${this.walletAddress}: Registered ${name}.eth | TX: ${this.chain.explorer}/${registerSendTransactionResult.transactionHash}`
      );

      return true;
    } catch (e) {
      if (e.message.includes("insufficient funds")) {
        const [balance, fee, value] = extractNumbersFromString(e.message);
        const feeInEther = this.web3.utils.fromWei(fee, "ether");
        const balanceInEther = this.web3.utils.fromWei(balance, "ether");
        const valueInEther = this.web3.utils.fromWei(value, "ether");

        console.error(
          `${this.protocolName}. ${this.walletAddress} | Insufficient funds for transaction. Fee - ${feeInEther}, Value - ${valueInEther}, Balance - ${balanceInEther}`
        );
      } else {
        console.error(e);
      }
      return false;
    }
  }

  async isTaken(name) {
    try {
      const address = await this.ens.lookup(name);
      return !!address;
    } catch (e) {
      return false;
    }
  }

  async isAlreadyRegistered() {
    try {
      const name = await this.ens.reverse(this.walletAddress);
      const ensName = await this.ens.lookup(name);

      if (this.walletAddress.toLowerCase() != ensName) {
        name = null;
      }

      return !!name;
    } catch (e) {
      return false;
    }
  }

  getCalldata(name) {
    // Each element in the array is a function call to the resolver
    // Most basic UI flow sets setBlockchainAddress function call in the calldata

    const nameHash = namehash.hash(name + ".eth");
    const coinType = 60;
    const addrCalldata = formatsByCoinType[coinType].decoder(
      this.walletAddress
    );

    const encodedAbi = this.resolverContract.methods
      .setAddr(nameHash, coinType, addrCalldata)
      .encodeABI();
    return [encodedAbi];
  }
}
