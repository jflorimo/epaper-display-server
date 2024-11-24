import express from 'express';
import path from 'path';
import { PORT } from '../configuration';


export class HttpServer {

    constructor() {
        const app = express();

        // Serve static files from the 'public' directory
        const staticPath = path.join('./public')
        app.use(express.static(staticPath));
        // console.log(staticPath)

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    }


}