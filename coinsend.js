const { ethers } = require('ethers');
const dotenv = require('dotenv');
dotenv.config(); 

const PRIVATE_KEY = process.env.PRIVATE_KEY; 
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const USDT_CONTRACT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955'; 
const ABI = [
    "function transfer(address to, uint256 amount) public returns (bool)"
];

const RECIPIENT_ADDRESS = ''; 
const AMOUNT = 0;

async function sendUsdtBsc() {
    try {
        const provider = new ethers.InfuraProvider('bnb', INFURA_API_KEY); 
        const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
        
        const usdtContract = new ethers.Contract(
            USDT_CONTRACT_ADDRESS,
            ABI,
            wallet 
        );

        const amountInWei = ethers.parseUnits(AMOUNT.toString(), 18);
        const feeData = await provider.getFeeData();
        
        const estimatedGas = await usdtContract.transfer.estimateGas(
            RECIPIENT_ADDRESS, 
            amountInWei
        );
        const gasLimit = estimatedGas * 110n / 100n;
        const txOptions = {
            gasLimit: gasLimit
        };

        if (feeData.maxFeePerGas && feeData.maxPriorityFeePerGas) {
            txOptions.maxFeePerGas = feeData.maxFeePerGas;
            txOptions.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
        } else if (feeData.gasPrice) {
            txOptions.gasPrice = feeData.gasPrice;
        } else {
            throw new Error();
        }
        
        const txid = await usdtContract.transfer(
            RECIPIENT_ADDRESS, 
            amountInWei, 
            txOptions
        );

        console.log(RECIPIENT_ADDRESS);
        console.log(AMOUNT);
        console.log(txid.hash);
        const receipt = await txid.wait();

        if (receipt.status === 1) {
            console.log("완료");
        } else {
            console.error(error);
        }
        
    } catch (error) {
        console.error(error);
    }
}

sendUsdtBsc();