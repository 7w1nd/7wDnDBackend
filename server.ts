import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './src/db';
import systemRoutes from './src/routes/system.routes';
import racesRoutes from './src/routes/race.routes';
import charsRoutes from './src/routes/characteristic.routes';
import skillRoutes from './src/routes/skill.routes';
import classesRoutes from './src/routes/class.routes';
import raceTraitsRoutes from './src/routes/race.trait.routes';

const app = express();
const corsOptions = {
    origin: '*',
}
app.use(cors(corsOptions));
// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/systems', systemRoutes);
app.use('/api/races', racesRoutes);
app.use('/api/raceTraits', raceTraitsRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/characteristics', charsRoutes);
app.use('/api/skills', skillRoutes);

app.get('/api/', (req, res) => res.json({ message: 'Api alive!' }));

app.get('/', (req, res) => res.json({ message: 'Server alive!' }));

connectDB();

app.listen(3111, async () => {
    console.log(`⚡️[server]: Server is running at http://localhost:3111`);
});