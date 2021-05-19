import { IRace } from "../interfaces/race.interface";
import Race from "../models/race.model";
import System from "../models/system.model";

/**
 * get all rases
 */
export const get = (req: any, res: any, next: any) => {
    const systemId = req.params.system_id;
    if (!systemId) {
        return res.status(404).json({ message: 'System ID parameter not found in request query' });
    }
    Race.find({ system: systemId })
        .then((data) => {
            res.json({
                data: data,
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};
/**
 * get one rase
 */
export const detail = (req: any, res: any, next: any) => {
    const raceId = req.params.race_id;
    Race.findById(raceId)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: `Race with id ${raceId} not found` });
            }
            res.json({
                data: data,
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};
/**
 * add new race to system
 */
export const add = (req: any, res: any, next: any) => {
    const systemId = req.params.system_id;
    if (!systemId) {
        return res.status(404).json({ message: 'System ID parameter not found in request query' });
    }
    System.findById(systemId)
        .then(async system => {
            if (!system)
                return res.status(404).json({ message: `System with id: ${systemId} not found` });
            const result: IRace[] = [];
            for (let index = 0; index < req.body.length; index++) {
                const name = req.body[index].name;
                const description = req.body[index].description;
                const newRace: IRace = new Race({ system: systemId, name: name, description: description });
                await newRace.validate().then(() => newRace.save().then(race => {
                    result.push(race);
                }));
            }
            res.json({ data: result });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};
/**
 * update race info
 */
export const put = (req: any, res: any, next: any) => {
    const raceId = req.params.race_id;
    if (!raceId) {
        return res.status(404).json({ message: 'Race ID parameter not found in request query' });
    }
    Race.findById(raceId)
        .then(race => {
            if (!race)
                return res.status(404).json({ message: `Race with id: ${raceId} not found` });
            const name = req.body.name ? req.body.name : race?.name;
            const description = req.body.description ? req.body.description : race?.description;
            Race.updateOne({ _id: raceId }, { name: name, description: description }).then(r => {
                res.json(r);
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};
/**
 * delete race
 */
export const remove = (req: any, res: any, next: any) => {
    const raceId = req.params.race_id;
    if (!raceId) {
        return res.status(404).json({ message: 'Race ID parameter not found in request query' });
    }
    Race.findById(raceId)
        .then(race => {
            if (!race)
                return res.status(404).json({ message: `Race with id: ${raceId} not found` });
            Race.deleteOne({ _id: raceId }).then(r => {
                res.json(r);
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};