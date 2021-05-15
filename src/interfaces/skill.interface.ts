import { Document } from "mongoose";
import { ICharacteristic } from "./characteristic.interface";
import { ISystem } from "./system.interface";

export interface ISkill extends Document {
    system: ISystem["_id"];
    charactersitic: ICharacteristic["shortName"];
    name: string;
    description: string;
    needTraining: boolean;
}
