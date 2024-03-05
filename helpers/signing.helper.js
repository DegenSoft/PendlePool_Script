import { ethers, AbiCoder } from "ethers";
import { eth } from "web3";
import crypto from "crypto";

function signRegister(wallet, message) {
    const data = {
        domain: {
            name: "Exchange",
            version: "1",
            chainId: 42161,
            verifyingContract: "0x0000000000000000000000000000000000000000",
        },
        types: {
            WithdrawFromBridge2SignPayload: [
                { name: "destination", type: "string" },
                { name: "usd", type: "string" },
                { name: "time", type: "uint64" },
            ],
        },
        primaryType: "WithdrawFromBridge2SignPayload",
        message: message,
    };

    return signInner(wallet, data);
}

function signL1Action(wallet, signature_types, signature_data, source) {
    phantom_agent = constructPhantomAgent(
        signature_types,
        signature_data,
        source
    );

    data = {
        domain: {
            chainId: 1337,
            name: "Exchange",
            verifyingContract: "0x0000000000000000000000000000000000000000",
            version: "1",
        },
        types: {
            Agent: [
                { name: "source", type: "string" },
                { name: "connectionId", type: "bytes32" },
            ]
        },
        primaryType: "Agent",
        message: phantom_agent,
    };
    return signInner(wallet, data);
}

// Function to sign structured data
async function signInner(wallet, data) {
    const signa = await wallet.signTypedData(
        data.domain,
        data.types,
        data.message
    );

    const address = ethers.verifyTypedData(data.domain, data.types, data.message, signa);

    const rValue = "0x" + signa.slice(2, 2 + 64);
    const sValue = "0x" + signa.slice(2 + 64, 2 + 64 + 64);
    const vValue = parseInt(signa.slice(-2), 16);
    return { r: ethers.hexlify(rValue), s: ethers.hexlify(sValue), v: vValue };
}
// Example usage

function constructPhantomAgent(signatureTypes, signatureData, source) {
    const connectionId = new AbiCoder().encode(signatureTypes, signatureData);
    const keccakConnectionId = ethers.keccak256(connectionId);

    return {
        source: source,
        connectionId: keccakConnectionId,
    };
}

function signRegisterAction(wallet, phantom_agent) {

    data = {
        domain: {
            chainId: 42161,
            name: "Exchange",
            verifyingContract: "0x0000000000000000000000000000000000000000",
            version: "1",
        },
        types: {
            Agent: [
                { name: "source", type: "string" },
                { name: "connectionId", type: "bytes32" },
            ]
        },
        primaryType: "Agent",
        message: phantom_agent,
    };
    return signInner(wallet, data);
}

const textTosign = `
https://hey.xyz wants you to sign in with your wallet:
${wallet.address}

Sign in with Ethereum to Lens

URI: https://hey.xyz
Version: 1
Chain ID: 137
Nonce: bc42e25369cdb148
Issued At: 2024-03-01T14:54:22.376Z
 `

 const textHash = textTosign.toString('hex');

 const hash = '0x' + Buffer.from(textTosign,'utf-8').toString('hex');
 console.log(Buffer.from(textTosign,'utf-8').toString('hex'))

module.exports = { signWithdraw, signL1Action, constructPhantomAgent, signRegisterAction };
