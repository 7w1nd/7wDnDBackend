import { IRaceTrait } from "../interfaces/race.trait.interface";
import Race from "../models/race.model";
import RaceTrait from "../models/race.trait.model";

/**
 * get all traits of rase
 */
export const get = (req: any, res: any, next: any) => {
    const raceId = req.params.race_id;
    if (!raceId) {
        return res.status(404).json({ message: 'Race ID parameter not found in request query' });
    }
    RaceTrait.find({ race: raceId })
        .then((data) => {
            res.json({
                data: data,
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};

/**
 * add new race trait to system
 */
export const add = (req: any, res: any, next: any) => {
    const raceId = req.params.race_id;
    if (!raceId) {
        return res.status(404).json({ message: 'Race ID parameter not found in request query' });
    }
    Race.findById(raceId)
        .then(async race => {
            if (!race)
                return res.status(404).json({ message: `Race with id: ${raceId} not found` });
            const dbRaceTraits = await RaceTrait.find({ race: raceId });
            const created: IRaceTrait[] = [];
            const exists: IRaceTrait[] = [];
            for (let index = 0; index < req.body.length; index++) {
                const name = req.body.name;
                const description = req.body.description;

                if (dbRaceTraits.some(a => a.name == name)) {
                    exists.push(req.body[index])
                    continue;
                }

                const newRaceTrait: IRaceTrait = new RaceTrait({ race: raceId, name: name, description: description });
                await newRaceTrait.validate().then(() => newRaceTrait.save().then(trait => {
                    created.push(trait);
                }));
            }
            return res.json({ status: exists.length ? 201 : 200, created: created, exists: exists });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};
/**
 * update race trait info
 */
export const put = (req: any, res: any, next: any) => {
    const raceTraitId = req.params.race_trait_id;
    if (!raceTraitId) {
        return res.status(404).json({ message: 'Race Trait ID parameter not found in request query' });
    }
    RaceTrait.findById(raceTraitId)
        .then(race => {
            if (!race)
                return res.status(404).json({ message: `Race Trait with id: ${raceTraitId} not found` });
            const name = req.body.name ? req.body.name : race?.name;
            const description = req.body.description ? req.body.description : race?.description;
            RaceTrait.updateOne({ _id: raceTraitId }, { name: name, description: description }).then(r => {
                res.json(r);
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};
/**
 * delete race trait
 */
export const remove = (req: any, res: any, next: any) => {
    const raceTraitId = req.params.race_trait_id;
    if (!raceTraitId) {
        return res.status(404).json({ message: 'Race Trait ID parameter not found in request query' });
    }
    RaceTrait.findById(raceTraitId)
        .then(race => {
            if (!race)
                return res.status(404).json({ message: `Race Trait with id: ${raceTraitId} not found` });
            RaceTrait.deleteOne({ _id: raceTraitId }).then(r => {
                res.json(r);
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};