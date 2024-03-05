import { gql, GraphQLClient } from "graphql-request";
import Web3 from "web3";
import axios from "axios";
import FormData from 'form-data';
import fakeUa from "fake-useragent";
import fs from 'fs';

import { generateBio, generateName, generateUUID } from "../../helpers/generator.helper.js";
import { getAbiByRelativePath, sleep } from "../../helpers/general.helper.js";
import { getImage } from "../../helpers/img.helper.js";
import { ETH, POL } from "../../const/config.const.js";
import { logger } from "../../helpers/logger.helper.js";





export class LensModule {
  constructor(privateKey) {
    
    this.chain = POL;
    this.web3 = new Web3(this.chain.rpc);
    this.web3Eth = new Web3(ETH.rpc);
    this.privateKey = privateKey;
    this.account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    this.walletAddress = this.account.address;
    logger.info(`Wallet | ${this.walletAddress}`);
    this.handlePrice = 8 * 10 ** 18;
    this.delegator = "0xC9FA5F824530b0DB3Df97820ded190F849b9bc0d";
    this.refAddress = "0x0000000000000000000000000000000000000000";
    this.contractAddr = "0x4b8845ACb8148dE64D1D99Cf27A3890a91F55E53";
    this.creatorABI = getAbiByRelativePath("./abi/creatorABI.json");
    this.creatorContract = new this.web3.eth.Contract(
      this.creatorABI,
      this.contractAddr
    );
    this.endpoint = "https://api-v2.lens.dev/";
    this.metadataEndpoint = "https://api.hey.xyz/metadata";
    this.graphClient = new GraphQLClient(this.endpoint, {
      jsonSerializer: {
        parse: JSON.parse,
        stringify: JSON.stringify,
      },
      headers: {
        Origin: "https://hey.xyz",
        Referer: "https://hey.xyz/",
        "Content-Type": "application/json",
        "User-Agent": fakeUa(),
        "X-Requested-From": "hey",
      },
    });
  }

  async loadImage() {
    logger.info('Loading profile image to IPFS');
    let data = new FormData();
    data.append(
      "file",
      fs.createReadStream('./buffer.jpg')
    );

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://www.lens.xyz/api/metadata/file",
      headers: {
        Origin: "https://www.lens.xyz",
        Refferer: "https://www.lens.xyz/",
        "Content-Type":
          "multipart/form-data;",
        ...data.getHeaders(),
      },
      data: data,
    };

    const response = await axios
      .request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        logger.error(error);
      });
      this.profileImg = response.data;
      await getImage()
    logger.info('Image loaded, upload new to buffer.jpg')
  }

  async loginSignature() {
    logger.info('Get signature for hey.xyz');
    const query = gql`
        query HandleToAddress {
            challenge(request: { signedBy: "${this.walletAddress}" }) {
                id
                text
            }
        }
      `;
    const data = await this.graphClient.request(query);
    const signature = this.web3.eth.accounts.sign(
      "0x" + Buffer.from(data.challenge.text, "utf-8").toString("hex"),
      this.privateKey
    ).signature;
    this.login = { id: data.challenge.id, signature: signature };
    await this.loginAccept();
  }

  async loginSignatureWithId() {
    await this.handleId();
    logger.info('Get signature for hey.xyz with hudle');
    const query = gql`
        query Challenge {
            challenge(request: { for: "${this.profileId}", signedBy: "${this.walletAddress}" }) {
                id
                text
            }
        }
        
      `;
    const data = await this.graphClient.request(query);
    const signature = this.web3.eth.accounts.sign(
      "0x" + Buffer.from(data.challenge.text, "utf-8").toString("hex"),
      this.privateKey
    ).signature;
    this.login = { id: data.challenge.id, signature: signature };
    await this.loginAccept();
  }

  async loginAccept() {
    const mutation = gql`
        mutation Authenticate {
            authenticate(request: { id: "${this.login.id}", signature: "${this.login.signature}" }) {
                accessToken
                refreshToken
            }
        }
      `;
    const data = await this.graphClient.request(mutation);
    this.accessToken = data.authenticate.accessToken;
    this.refreshToken = data.authenticate.refreshToken;
    this.graphClient.setHeader("X-Access-Token", `Bearer ${this.accessToken}`);
    this.graphClient.setHeader("Authorization", `Bearer ${this.accessToken}`);
    logger.info('Signature recieved, setup authorization');
  }

  async checkHuddle(name) {
    const query = `
        query HandleToAddress {
            handleToAddress(request: { handle: "lens/${name}" })
        }`;
    const data = await this.graphClient.request(query);
    if (name.length > 4 && data.handleToAddress === null) {
      this.name = name;
      logger.info(`Profile name will be ${name}`)
      return true;
    } else return false;
  }

  async createProfile() {
    logger.info('Creating profile')
    const createProfileWithHandleCall =
      await this.creatorContract.methods.createProfileWithHandleUsingCredits(
        [this.walletAddress, this.refAddress, "0x"],
        this.name,
        [this.delegator]
      );

    const createProfileWithHandleGas =
      await createProfileWithHandleCall.estimateGas({
        from: this.walletAddress,
        value: this.handlePrice,
      });

    const createProfileWithHandleTx = {
      from: this.walletAddress,
      to: this.contractAddr,
      value: this.handlePrice.toString(),
      nonce: await this.web3.eth.getTransactionCount(this.walletAddress),
      gas: createProfileWithHandleGas,
      data: createProfileWithHandleCall.encodeABI(),
    };

    const createProfileWithHandleSignedTx =
      await this.web3.eth.accounts.signTransaction(
        createProfileWithHandleTx,
        this.privateKey
      );

    const createProfileWithHandleResult =
      await this.web3.eth.sendSignedTransaction(
        createProfileWithHandleSignedTx.rawTransaction
      );

    logger.info(
      `Registered ${this.name} handle | TX: ${this.chain.explorer}/${createProfileWithHandleResult.transactionHash}`
    );
  }

  async setProfileMetadata(id) {
    logger.info('Uploading profile info')
    const mutation = gql`
        mutation SetProfileMetadata {
            setProfileMetadata(request: { metadataURI: "ar://${id}" }) {
                ... on RelaySuccess {
                    txId
                }
                ... on LensProfileManagerRelayError {
                    reason
                }
            }
        }  `;
    const data = await this.graphClient.request(mutation);
  }

  async changeMetadata() {
    await this.loadImage();
    const payload = {
      $schema: "https://json-schemas.lens.dev/profile/2.0.0.json",
      lens: {
        id: generateUUID(),
        name: this.name,
        bio: generateBio(),
        picture: this.profileImg.uri
      },
    };
    logger.info(`Edit profile info:\n Name | ${this.name}\n Description | ${payload.lens.bio}`)
    const metadataId = await axios.post(this.metadataEndpoint, payload, {
      headers: { Origin: "https://hey.xyz", Referer: "https://hey.xyz/" },
    });
    await this.setProfileMetadata(metadataId.data.id);
  }

  async refreshAuth() {
    logger.info('Update authorization')
    const mutation = gql`
        mutation Refresh {
            refresh(request: { refreshToken: "${this.refreshToken}" }) {
                accessToken
                refreshToken
            }
        }     
      `;
    const data = await this.graphClient.request(mutation);
    this.accessToken = data.refresh.accessToken;
    this.refreshToken = data.refresh.refreshToken;
  }

  async handleId() {
    const query = gql`
        query ProfilesManaged {
            profilesManaged(request: { for: "${this.walletAddress}" }) {
                items {
                    id
                }
            }
        }
        `;

    const data = await this.graphClient.request(query);
    this.profileId = data.profilesManaged.items[0].id;
  }

  async verifyAuth() {
    const query = gql`
        query Verify {
            verify(
                request: {
                    accessToken: "${this.accessToken}"
                }
            )
        }`;
    const data = await this.graphClient.request(query);
  }

  async getName() {
    logger.info('Find name for your profile');
    while (true) {
      const name = generateName();
      if (await this.checkHuddle(name)) break;
    }
  }

  async register() {
    await getImage();
    await this.getName();
    //First interaction 
    await this.loginSignature();
    await this.verifyAuth();
    await this.createProfile();
    await sleep(30*1000);
    logger.info('Sleep 30 seconds');
    //If you have profile, comment upper code
    await this.loginSignatureWithId();
    await this.changeMetadata();
  }
}



