const { ethers } = require('ethers');
const dotenv = require('dotenv');
dotenv.config(); 

const INFURA_API_KEY = process.env.INFURA_API_KEY; 
const BSC_RPC_URL = `https://bsc-mainnet.infura.io/v3/${INFURA_API_KEY}`; 
const USDT_CONTRACT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955'; 
const ABI = [
    "function balanceOf(address owner) view returns (uint256)"
];

const WALLET_ADDRESS_TO_CHECK = process.env.PRIVATE_KEY 
    ? new ethers.Wallet(process.env.PRIVATE_KEY).address
    : '';

async function checkBalance() {
    try {
        const provider = new ethers.JsonRpcProvider(BSC_RPC_URL);
        const bnbBalanceWei = await provider.getBalance(WALLET_ADDRESS_TO_CHECK);
        const bnbBalance = ethers.formatEther(bnbBalanceWei);
        
        const usdtContract = new ethers.Contract(
            USDT_CONTRACT_ADDRESS,
            ABI,
            provider 
        );
        const usdtBalanceWei = await usdtContract.balanceOf(WALLET_ADDRESS_TO_CHECK);
        const usdtBalance = ethers.formatUnits(usdtBalanceWei, 18);

        console.log(`${bnbBalance} BNB`);
        console.log(`${usdtBalance} USDT`);

    } catch (error) {
        console.error(error);
    }
}

checkBalance();