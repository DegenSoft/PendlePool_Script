import Web3 from 'web3';
import { ETH } from './const/config.const.js';
import { defaultAbiCoder, keccak256, soliditySha256, toUtf8Bytes } from 'ethers/lib/utils.js';

// Создание экземпляра Web3 с использованием провайдера (например, Infura)
const web3 = new Web3(new Web3.providers.HttpProvider(ETH.rpc));


// Приватный ключ, используемый для подписи данных
const privateKey = '0xe2f4eaae4a9751e85a3e4a7b9587827a877f29914755229b07a7b2da98285f70';
const account =  web3.eth.accounts.privateKeyToAccount(privateKey);
console.log(account.address)

// Пример данных, которые нужно подписать
const dataToSign = {
    netRecipient: '0x0000000000000000000000000000000000000000',
    initialRecipient: '0x0000000000000000000000000000000000000000',
    initialRecipientAmount: 0,
    quantity: 1,
    nonce: 2,
    expiry: 1710370841,
    price: 0,
    tokenId: 1,
    currency: '0x0000000000000000000000000000000000000000'
};

const messageHash = web3.utils.soliditySha3(
    { t: 'address', v: dataToSign.netRecipient },
    { t: 'address', v: dataToSign.initialRecipient },
    { t: 'uint256', v: dataToSign.initialRecipientAmount },
    { t: 'uint256', v: dataToSign.quantity },
    { t: 'uint256', v: dataToSign.nonce },
    { t: 'uint256', v: dataToSign.expiry },
    { t: 'uint256', v: dataToSign.price },
    { t: 'uint256', v: dataToSign.tokenId },
    { t: 'address', v: dataToSign.currency }
);



// Функция для преобразования хеша в формат, подходящий для проверки в Ethereum
function toEthSignedMessageHash(messageHex) {
    const prefix = '\x19Ethereum Signed Message:\n' + messageHex.length;
    return Web3.utils.sha3(prefix + messageHex);
}

console.log(keccak256(Buffer.from("SIGNER_ROLE")))
// Преобразование хеша в формат, подходящий для проверки в Ethereum
const ethSignedMessageHash = toEthSignedMessageHash(messageHash);

console.log(messageHash)
const signature = web3.eth.accounts.sign(
    ethSignedMessageHash,
    privateKey
).signature;

console.log(signature)


