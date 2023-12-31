import * as express from "express"
import { AppDataSource } from "./data-source"
import router from "./routes"
// const cors = require('cors');

const customCors = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', 'true'); 
    next();
};

AppDataSource.initialize().then(async () => {
    const app = express()
    const port = 5000

    app.use(express.json())
    // app.use(cors())
    app.use(customCors);

    app.use('/api/v1', router)


    app.listen(port, () => console.log(`Server running on port ${port}`))

}).catch(error => console.log(error))
