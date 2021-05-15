import { Model, model, Schema } from "mongoose";
import { ISystem } from "../interfaces/system.interface";

const systemSchema: Schema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
});

const System: Model<ISystem> = model("System", systemSchema);
System.createCollection();
export default System;