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
    role: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    availableAlignments: {
        type: String,
        default: "LN,LN,LE,NG,N,NE,CG,CN,CE",
        required: true
    },
    hitDice: {
        type: String,
        default: 8,
        required: true
    },
    skillRanksPerLvl: {
        type: String,
        default: 2,
        required: true
    },
});

const Class: Model<IClass> = model("Class", schema);
export default Class;