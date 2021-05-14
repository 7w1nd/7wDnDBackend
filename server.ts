import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';

const app = express();
const corsOptions = {
    origin: '*',
}
app.use(cors(corsOptions));
// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/', (req, res) => res.json({ message: 'Api alive!' }));
app.get('/', (req, res) => res.json({ message: 'Server alive!' }));

const httpServer = http.createServer(app);
httpServer.listen(3111, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:3111`);
});