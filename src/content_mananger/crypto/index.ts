import { emitter } from "../..";
import { CryptoPriceData } from "../../type";

const axios = require('axios');

// Function to fetch cryptocurrency prices
export async function getCryptoPrices() {
    try {
        // CoinGecko API endpoint
        const url = 'https://api.coingecko.com/api/v3/simple/price';
        const params = {
            ids: 'bitcoin,ethereum,solana,dogecoin,pepe', // Specify the cryptocurrencies
            vs_currencies: 'usd'           // Specify the currency
        };

        // Fetch data
        const response = await axios.get(url, { params });
        const prices = response.data;
        console.log(prices)

        // Display prices
        console.log("[CONTENT_MANAGER][CRYPTO] fething price");
        const data: CryptoPriceData = {
            bitcoin_price: prices.bitcoin.usd,
            etherum_price: prices.ethereum.usd,
            solana_price: prices.solana.usd,
            doge_price: prices.dogecoin.usd,
            pepe_price: prices.pepe.usd
        }
        console.log(data)
        emitter.emit('crypto-price', data)
        // for (const [crypto, value] of Object.entries(prices)) {
        //     const price = (value as any).usd
        //     console.log(`${crypto}: ${price}$`);
        // }
    } catch (error: any) {
        console.error("Error fetching prices:", error.message);
    }
}



