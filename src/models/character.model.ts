import { Model, model, Schema } from "mongoose";
import { ICharacter } from "../interfaces/character.interface";

const schema: Schema = new Schema({
    system: {
        type: Schema.Types.ObjectId,
        ref: "System"
    },
    name: {
        type: String,
        required: true
    },
    alignment: {
        type: String,
        required: true
    },
    playerName: {
        type: String,
        required: true
    },
    race: {
        type: String,
        ref: "Races",
        required: true
    },
    class: {
        type: String,
        ref: "Classes",
        required: true
    },
    currentExp: {
        type: Number,
        default: 0,
        required: true
    },
    level: {
        type: Number,
        default: 1,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    god: {
        type: String,
        default: '',
        required: false
    },
    size: {
        type: String,
        default: 'Medium',
        required: false
    },
    sex: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    growth: {
        type: Number,
        required: false
    },
    weight: {
        type: Number,
        required: false
    },
    hair: {
        type: String,
        required: false
    },
    eyes: {
        type: String,
        required: false
    },
});

const Character: Model<ICharacter> = model("Character", schema);
export default Character;