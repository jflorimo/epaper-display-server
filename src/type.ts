export type Base64 = string
export type ImageRender = { imageData: Base64, date: Date }
export type CryptoPriceData = {
    bitcoin_price: number,
    etherum_price: number,
    solana_price: number,
    doge_price: number,
    pepe_price: number
}