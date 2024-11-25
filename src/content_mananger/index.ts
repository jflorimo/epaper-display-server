import { DISPLAY_UPDATE_INTERVAL } from "./configuration";
import { takeScreenshot } from "./render";

const doScreenshot = async () => {
    await takeScreenshot("http://localhost:8080/2in7v2/", 264, 176, "/app/public/2in7v2/latest.png")
}

export class ContentManager {
    constructor() {
        doScreenshot()
        setInterval(doScreenshot, DISPLAY_UPDATE_INTERVAL);
    }
}