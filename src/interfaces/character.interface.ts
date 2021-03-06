import { Document } from "mongoose";
import { IRace } from "./race.interface";
import { IClass } from "./class.interface";
import { ISystem } from "./system.interface";

export interface ICharacter extends Document {
    system: ISystem["_id"];
    name: number;
    playerName: number;
    race: IRace["name"];
    class: IClass["name"];
    currentExp: number;
    level: number;
    note: string;
    alignment: string;
    god: string;
    size: string;
    sex: string;
    age: number;
    growth: number;
    weight: number;
    hair: string
    eyes: string
}
