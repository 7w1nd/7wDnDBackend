import { Model, model, Schema } from "mongoose";
import { IClass } from "../interfaces/class.interface";

const schema: Schema = new Schema({
    system: {
        type: Schema.Types.ObjectId,
        ref: "System"
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

const Class: Model<IClass> = model("Class", schema);
Class.createCollection();
export default Class;