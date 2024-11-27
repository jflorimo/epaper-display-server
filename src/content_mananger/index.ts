import { emitter } from "..";
import { CryptoPriceData } from "../type";
import { DISPLAY_UPDATE_INTERVAL } from "./configuration";
import { getCryptoPrices } from "./crypto";
import { takeScreenshot } from "./render";
import { generateHtmlFromTemplate } from "./service";

const render2in7v2 = async () => {
    await takeScreenshot("http://localhost:8080/2in7v2/", 264, 176, "/app/public/2in7v2/latest.png")
}

export class ContentManager {
    private cryptoPrice: CryptoPriceData = {
        bitcoin_price: 0,
        etherum_price: 0,
        solana_price: 0,
        doge_price: 0,
        pepe_price: 0
    }
    constructor() {
        emitter.on('crypto-price', (data: CryptoPriceData) => { this.cryptoPrice = data })
        render2in7v2()
        getCryptoPrices()
        setInterval(getCryptoPrices, 60 * 1000);

        setInterval(() => { this.updateHtml() }, 60 * 1000)
        setInterval(render2in7v2, DISPLAY_UPDATE_INTERVAL);


    }

    private updateHtml() {
        const data = { ...this.cryptoPrice, render_date: new Date().toISOString().slice(0, 16).replace('T', ' ') }
        generateHtmlFromTemplate(
            "/app/public/2in7v2/template.html", "/app/public/2in7v2/index.html", data
        )
    }
}