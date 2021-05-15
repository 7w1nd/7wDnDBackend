import { Model, model, Schema } from "mongoose";
import { ISystem } from "../interfaces/system.interface";

const schema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
});

const System: Model<ISystem> = model("System", schema);
export default System;