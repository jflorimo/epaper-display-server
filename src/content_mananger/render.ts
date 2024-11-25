import puppeteer from 'puppeteer-core';
import { emitter } from '..';

/**
 * Takes a screenshot of a webpage with specified width, height, and output path.
 * @param url - The URL of the page to capture.
 * @param width - The width of the viewport.
 * @param height - The height of the viewport.
 * @param outputPath - The path where the screenshot will be saved.
 */
export async function takeScreenshot(
    url: string,
    width: number,
    height: number,
    outputPath: string,
): Promise<void> {

    // private readonly HTTP_NOT_MODIFIED = 304;
    const HTTP_NOT_MODIFIED = 304
    // Launch the browser using the specified executable path
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium', // Use the installed Chromium
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=slight'], // Essential flags for running on a Raspberry Pi
    });

    try {
        const page = await browser.newPage();


        // Set the viewport size
        await page.setViewport({ width, height, deviceScaleFactor: 1 });




        // if (options.username && options.password) {
        //     await this.browserPage.authenticate({ username: options.username, password: options.password });
        // }





        // Navigate to the desired URL
        const response = await page.goto(url, {
            waitUntil: 'networkidle0',
        });



        if (!response?.ok() && response?.status() !== HTTP_NOT_MODIFIED) {
            throw new Error(`Error occurred navigating to ${url}: ${response?.statusText()}`);
        }
        // if (options.delay) {
        //     this.logger?.debug(`Waiting an additional ${options.delay}ms before taking screenshot`);
        //     await this.browserPage.waitForTimeout(options.delay);
        //     this.logger?.debug('Screenshot delay complete');
        // }


        // Take a screenshot and save it to the output path
        await page.screenshot({ path: outputPath });
        // console.log(`Screenshot saved at: ${outputPath}`);
        const imageData = await page.screenshot({ encoding: 'base64' })
        const now = new Date()
        console.log("[CONTENT_MANAGER][RENDER] done at: ", now)

        emitter.emit('new-image-data', { imageData: imageData, date: now })

    } catch (error) {
        console.error('Error taking screenshot:', error);
    } finally {
        // Ensure the browser closes, even if an error occurs
        await browser.close();
    }
}
