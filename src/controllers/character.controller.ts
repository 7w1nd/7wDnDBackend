import { ICharacter } from "../interfaces/character.interface";
import Character from "../models/character.model";
import System from "../models/system.model";

/**
 * get all characters
 */
export const get = (req: any, res: any, next: any) => {
    Character.aggregate([
        {
            $lookup: {
                from: 'systems',
                localField: 'system',
                foreignField: '_id',
                as: 'system'
            }
        },
        {
            $unwind: '$system'
        },
    ]).then((data) => {
        res.json({
            data: data,
        });
    })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};

/**
 * get characters by system
 */
export const find = (req: any, res: any, next: any) => {
    const systemId = req.params.system_id;
    if (!systemId) {
        return res.status(404).json({ message: 'System ID parameter not found in request query' });
    }
    Character.find({ system: systemId })
        .then((data) => {
            res.json({
                data: data,
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};
/**
 * get one character
 */
export const detail = (req: any, res: any, next: any) => {
    const id = req.params.character_id;
    Character.findById(id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: `Chatacter with id ${id} not found` });
            }
            res.json({
                data: data,
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};
/**
 * add new character to system
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
            const created_characters: ICharacter[] = [];
            for (let index = 0; index < req.body.length; index++) {

                const name = req.body[index].name;
                const playerName = req.body[index].player_name;
                const race = req.body[index].race;
                const _class = req.body[index].class;
                const currentExp = req.body[index].current_exp;
                const level = req.body[index].level;
                const note = req.body[index].note;

                const newCharacter: ICharacter = new Character({
                    system: systemId, name: name, playerName: playerName,
                    race: race, class: _class,
                    currentExp: currentExp, level: level, note: note
                });
                await newCharacter.validate().then(() => newCharacter.save().then(character => {
                    created_characters.push(character);
                }));
            }
            res.json({ data: created_characters });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};
/**
 * update character info
 */
export const put = (req: any, res: any, next: any) => {
    const characterId = req.params.character_id;
    if (!characterId) {
        return res.status(404).json({ message: 'Сharacter ID parameter not found in request query' });
    }
    Character.findById(characterId)
        .then(character => {
            if (!character)
                return res.status(404).json({ message: `character with id: ${characterId} not found` });
            const name = req.body.name ? req.body.name : character?.name;
            const playerName = req.body.player_name ? req.body.player_name : character?.playerName;
            const race = req.body.race ? req.body.race : character?.race;
            const _class = req.body.class ? req.body.class : character?.class;
            const currentExp = req.body.current_exp ? req.body.current_exp : character?.currentExp;
            const level = req.body.level ? req.body.level : character?.level;
            const note = req.body.note ? req.body.note : character?.note;

            Character.updateOne({ _id: characterId }, {
                name: name, playerName: playerName,
                race: race, class: _class,
                currentExp: currentExp, level: level,
                note: note
            }).then(r => {
                res.json(r);
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};
/**
 * delete character
 */
export const remove = (req: any, res: any, next: any) => {
    const characterId = req.params.character_id;
    if (!characterId) {
        return res.status(404).json({ message: 'Сharacter ID parameter not found in request query' });
    }
    Character.findById(characterId)
        .then(character => {
            if (!character)
                return res.status(404).json({ message: `character with id: ${characterId} not found` });
            Character.deleteOne({ _id: characterId }).then(r => {
                res.json(r);
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};