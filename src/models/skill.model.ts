import { Model, model, Schema } from "mongoose";
import { ISkill } from "../interfaces/skill.interface";

const schema: Schema = new Schema({
    system: {
        type: Schema.Types.ObjectId,
        ref: "System"
    },
    charactersitic: {
        type: String,
        ref: "Charactersitic"
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    needTraining: {
        type: Boolean,
        default: false
    },
});

const Skill: Model<ISkill> = model("Skill", schema);
export default Skill;