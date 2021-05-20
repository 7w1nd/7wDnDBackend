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
            const dbChatacters = await Character.find({ system: systemId });
            const created: ICharacter[] = [];
            const exists: any[] = [];
            for (let index = 0; index < req.body.length; index++) {
                const name = req.body[index].name;
                const playerName = req.body[index].playerName;
                const race = req.body[index].race;
                const _class = req.body[index].class;
                const currentExp = req.body[index].currentExp;
                const level = req.body[index].level;
                const note = req.body[index].note;

                const god = req.body[index].god;
                const size = req.body[index].size;
                const sex = req.body[index].sex;
                const age = req.body[index].age;
                const growth = req.body[index].growth;
                const weight = req.body[index].weight;
                const hair = req.body[index].hair;
                const eyes = req.body[index].eyes;

                const existedCharacter = dbChatacters.find(a => a.name == name && a.playerName == playerName && a.race == race && a.class == _class);
                if (existedCharacter) {
                    exists.push({ system: systemId, name: name, playerName: playerName, race: race, class: _class });
                    continue;
                }
                const newCharacter: ICharacter = new Character({
                    system: systemId, name: name, playerName: playerName,
                    race: race, class: _class,
                    currentExp: currentExp, level: level, note: note,
                    god: god, size: size, sex: sex, age: age,
                    growth: growth, weight: weight, hair: hair, eyes: eyes,
                });
                await newCharacter.validate().then(() => newCharacter.save().then(character => {
                    created.push(character);
                }));
            }
            return res.json({ status: exists.length ? 201 : 200, created: created, exists: exists });
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
            const playerName = req.body.playerName ? req.body.playerName : character?.playerName;
            const race = req.body.race ? req.body.race : character?.race;
            const _class = req.body.class ? req.body.class : character?.class;
            const currentExp = req.body.currentExp ? req.body.currentExp : character?.currentExp;
            const level = req.body.level ? req.body.level : character?.level;
            const note = req.body.note ? req.body.note : character?.note;

            const god = req.body.god ? req.body.god : character?.god;
            const size = req.body.size ? req.body.size : character?.size;
            const sex = req.body.sex ? req.body.sex : character?.sex;
            const age = req.body.age ? req.body.age : character?.age;
            const growth = req.body.growth ? req.body.growth : character?.growth;
            const weight = req.body.weight ? req.body.weight : character?.weight;
            const hair = req.body.hair ? req.body.hair : character?.hair;
            const eyes = req.body.eyes ? req.body.eyes : character?.eyes;

            Character.updateOne({ _id: characterId }, {
                name: name, playerName: playerName,
                race: race, class: _class,
                currentExp: currentExp, level: level,
                note: note, god: god, size: size, sex: sex,
                age: age, growth: growth, weight: weight, hair: hair, eyes: eyes,
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