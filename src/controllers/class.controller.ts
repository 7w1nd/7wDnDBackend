import { IClass } from "../interfaces/class.interface";
import Class from "../models/class.model";
import System from "../models/system.model";

/**
 * get all classses
 */
export const get = (req: any, res: any, next: any) => {
    const systemId = req.params.system_id;
    if (!systemId) {
        return res.status(404).json({ message: 'System ID parameter not found in request query' });
    }
    Class.find({ system: systemId })
        .then((data) => {
            res.json({
                data: data,
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};
/**
 * get one class
 */
export const getOne = (req: any, res: any, next: any) => {
    const systemId = req.params.system_id;
    if (!systemId) {
        return res.status(404).json({ message: 'System ID parameter not found in request query' });
    }
    const classId = req.params.class_id;
    Class.findById(classId)
        .then((data) => {
            res.json({
                data: data,
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};
/**
 * add new class to system
 */
export const add = (req: any, res: any, next: any) => {
    const systemId = req.params.system_id;
    if (!systemId) {
        return res.status(404).json({ message: 'System ID parameter not found in request query' });
    }
    System.findById(systemId)
        .then(system => {
            if (!system)
                return res.status(404).json({ message: `System with id: ${systemId} not found` });
            const name = req.body.name;
            const description = req.body.description;
            const role = req.body.role;
            const availableAlignments = req.body.availableAlignments;
            const hitDice = req.body.hitDice;
            const skillRanksPerLvl = req.body.skillRanksPerLvl;

            const newClass: IClass = new Class({
                system: systemId, name: name, description: description, role: role,
                availableAlignments: availableAlignments, hitDice: hitDice, skillRanksPerLvl: skillRanksPerLvl
            });
            newClass.validate().then(() => newClass.save().then(_class => {
                res.json({ data: _class });
            }));
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};
/**
 * update class info
 */
export const put = (req: any, res: any, next: any) => {
    const classId = req.params.class_id;
    if (!classId) {
        return res.status(404).json({ message: 'Class ID parameter not found in request query' });
    }
    Class.findById(classId)
        .then(_class => {
            if (!_class)
                return res.status(404).json({ message: `Class with id: ${classId} not found` });
            const name = req.body.name ? req.body.name : _class?.name;
            const description = req.body.description ? req.body.description : _class?.description;
            const role = req.body.role ? req.body.role : _class?.role;
            const availableAlignments = req.body.availableAlignments;
            const hitDice = req.body.hitDice;
            const skillRanksPerLvl = req.body.skillRanksPerLvl;
            Class.updateOne({ _id: classId }, {
                name: name, description: description, role: role,
                availableAlignments: availableAlignments, hitDice: hitDice, skillRanksPerLvl: skillRanksPerLvl
            }).then(r => {
                res.json(r);
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};
/**
 * delete class
 */
export const remove = (req: any, res: any, next: any) => {
    const classId = req.params.class_id;
    if (!classId) {
        return res.status(404).json({ message: 'Class ID parameter not found in request query' });
    }
    Class.findById(classId)
        .then(_class => {
            if (!_class)
                return res.status(404).json({ message: `Class with id: ${classId} not found` });
            Class.deleteOne({ _id: classId }).then(r => {
                res.json(r);
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};