import { Document } from "mongoose";
import { ISystem } from "./system.interface";

export interface IClass extends Document {
    system: ISystem["_id"];
    name: number;
    role: string;
    description: string;
    availableAlignments: string;
    hitDice: number;
    skillRanksPerLvl: number;
}
