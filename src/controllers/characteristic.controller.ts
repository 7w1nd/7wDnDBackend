import { ICharacteristic } from "../interfaces/characteristic.interface";
import Characteristic from "../models/characteristic.model";
import System from "../models/system.model";

/**
 * get all characteristics
 */
export const get = (req: any, res: any, next: any) => {
    const systemId = req.params.system_id;
    if (!systemId) {
        return res.status(404).json({ message: 'System ID parameter not found in request query' });
    }
    Characteristic.find({ system: systemId })
        .then((data) => {
            res.json({
                data: data,
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};
/**
 * get one characteristic
 */
export const getOne = (req: any, res: any, next: any) => {
    const systemId = req.params.system_id;
    if (!systemId) {
        return res.status(404).json({ message: 'System ID parameter not found in request query' });
    }
    const characteristicShortName = req.params.short_name;
    Characteristic.find({ shortName: characteristicShortName })
        .then((data) => {
            res.json({
                data: data,
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};
/**
 * add new characteristic to system
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
            const shortName = req.body.short_name;
            const description = req.body.description;
            const newCharacteristic: ICharacteristic = new Characteristic({ system: systemId, name: name, description: description, shortName: shortName });
            newCharacteristic.validate().then(() => newCharacteristic.save().then(characteristic => {
                res.json({ data: characteristic });
            }));
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};
/**
 * update characteristic info
 */
export const put = (req: any, res: any, next: any) => {
    const characteristicId = req.params.characteristic_id;
    if (!characteristicId) {
        return res.status(404).json({ message: 'Characteristic ID parameter not found in request query' });
    }
    Characteristic.findById(characteristicId)
        .then(characteristic => {
            if (!characteristic)
                return res.status(404).json({ message: `Characteristic with id: ${characteristicId} not found` });
            const name = req.body.name ? req.body.name : characteristic?.name;
            const shortName = req.body.short_name ? req.body.short_name : characteristic?.shortName;
            const description = req.body.description ? req.body.description : characteristic?.description;
            Characteristic.updateOne({ _id: characteristicId }, { name: name, description: description, shortName: shortName }).then(r => {
                res.json(r);
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};
/**
 * delete characteristic
 */
export const remove = (req: any, res: any, next: any) => {
    const characteristicId = req.params.characteristic_id;
    if (!characteristicId) {
        return res.status(404).json({ message: 'Characteristic ID parameter not found in request query' });
    }
    Characteristic.findById(characteristicId)
        .then(characteristic => {
            if (!characteristic)
                return res.status(404).json({ message: `Characteristic with id: ${characteristicId} not found` });
            Characteristic.deleteOne({ _id: characteristicId }).then(r => {
                res.json(r);
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};