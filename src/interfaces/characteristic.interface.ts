import { Document } from "mongoose";
import { ISystem } from "./system.interface";

export interface ICharacteristic extends Document {
    system: ISystem["_id"];
    shortName: number;
    name: string;
    description: string;
}
