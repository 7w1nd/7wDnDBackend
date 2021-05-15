import { Document } from "mongoose";
import { ISystem } from "./system.interface";

export interface ICharacteristic extends Document {
    system: ISystem["_id"];
    name: number;
    shortName: number;
    description: string;
}
