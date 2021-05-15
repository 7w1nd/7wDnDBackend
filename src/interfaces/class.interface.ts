import { Document } from "mongoose";
import { ISystem } from "./system.interface";

export interface IClass extends Document {
    system: ISystem["_id"];
    name: number;
    description: string;
}
