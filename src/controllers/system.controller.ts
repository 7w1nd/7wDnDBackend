import System from "../models/system.model";

/**
 * get all systems
 */
export const get = (req: any, res: any, next: any) => {
    System.find({})
        .then((data) => {
            res.json({
                data: data,
            });
        })
        .catch(err => { console.trace(err); res.status(400).json({ message: err ? err.message ? err.message : err : err }); });
};