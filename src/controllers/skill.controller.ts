import { ICharacteristic } from "../interfaces/characteristic.interface";
import { ISkill } from "../interfaces/skill.interface";
import Characteristic from "../models/characteristic.model";
import Skill from "../models/skill.model";
import System from "../models/system.model";

/**
 * get all skills
 */
export const get = (req: any, res: any, next: any) => {
    const systemId = req.params.system_id;
    if (!systemId) {
        return res.status(404).json({ message: 'System ID parameter not found in request query' });
    }
    Skill.find({ system: systemId })
        .then((data) => {
            res.json({
                data: data,
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};
/**
 * get one Skill
 */
export const detail = (req: any, res: any, next: any) => {
    const skillId = req.params.skill_id;
    Skill.find({ _id: skillId })
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: `Skill with id ${skillId} not found` });
            }
            res.json({
                data: data,
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};
/**
 * add new Skill to system
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

            const dbSkills = await Skill.find({ system: systemId });
            const created: ISkill[] = [];
            const exists: ISkill[] = [];
            for (let index = 0; index < req.body.length; index++) {
                const name = req.body[index].name;
                const description = req.body[index].description;
                const charactersitic = req.body[index].charactersitic;
                const needTraining = req.body[index].needTraining;

                if (dbSkills.some(a => a.name == name)) {
                    exists.push(req.body[index])
                    continue;
                }

                const newCharacteristic: ISkill = new Skill({
                    system: systemId, name: name, description: description,
                    charactersitic: charactersitic, needTraining: needTraining
                });
                await newCharacteristic.validate().then(() => newCharacteristic.save().then(skill => {
                    created.push(skill);
                }));
            }
            return res.json({ status: exists.length ? 201 : 200, created: created, exists: exists });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};
/**
 * update Skill info
 */
export const put = (req: any, res: any, next: any) => {
    const characteristicId = req.params.characteristic_id;
    if (!characteristicId) {
        return res.status(404).json({ message: 'Skill ID parameter not found in request query' });
    }
    Skill.findById(characteristicId)
        .then(skill => {
            if (!skill)
                return res.status(404).json({ message: `Skill with id: ${characteristicId} not found` });
            const name = req.body.name ? req.body.name : skill?.name;
            const description = req.body.description ? req.body.description : skill?.description;
            const charactersitic = req.body.charactersitic ? req.body.charactersitic : skill?.charactersitic;
            const needTraining = req.body.needTraining ? req.body.needTraining : skill?.needTraining;
            Skill.updateOne({ _id: characteristicId }, {
                name: name, description: description,
                charactersitic: charactersitic, needTraining: needTraining
            }).then(r => {
                res.json(r);
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};
/**
 * delete skill
 */
export const remove = (req: any, res: any, next: any) => {
    const skillId = req.params.skill_id;
    if (!skillId) {
        return res.status(404).json({ message: 'Skill ID parameter not found in request query' });
    }
    Skill.findById(skillId)
        .then(skill => {
            if (!skill)
                return res.status(404).json({ message: `Skill with id: ${skillId} not found` });
            Skill.deleteOne({ _id: skillId }).then(r => {
                res.json(r);
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};