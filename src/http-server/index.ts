import express, { Request, Response } from 'express';
import path from 'path';
import { PORT } from '../configuration';
import { emitter } from '..';
import { ImageRender } from '../type';


export class HttpServer {

    private latestData?: ImageRender

    constructor() {
        emitter.on('new-image-data', (data: ImageRender) => {
            this.latestData = data
        })




        const app = express();

        // Serve static files from the 'public' directory
        const staticPath = path.join('./public')
        app.use(express.static(staticPath));
        // console.log(staticPath)

        /**
         * DEVICE: waveshare 2in7v2
         */

        app.get('/2in7v2/bin', (req: Request, res: Response) => {
            if (!this.latestData) {
                // No image data has been emitted yet
                res.status(404).json({ error: 'No image data available' });
            }

            // Respond with the latest image data
            res.send(this.latestData);
        });



        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    }


}