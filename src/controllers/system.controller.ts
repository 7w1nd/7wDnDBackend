import System from "../models/system.model";

export const get = (req: any, res: any, next: any) => {
    System.find({})
        .then((data) => {
            console.log(data);
            if (data != null)
                res.json({
                    data: data,
                });
            else
                res.status(400).json({ message: 'error get systems' })
        })
        .catch(err => res.status(400).json({ message: err }));
};