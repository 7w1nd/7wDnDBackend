import { Document } from "mongoose";
import { IRace } from "./race.interface";

export interface IRaceTrait extends Document {
    race: IRace["_id"];
    name: string;
    description: string;
    //??????? how to apply?
    // effect: string;
}
