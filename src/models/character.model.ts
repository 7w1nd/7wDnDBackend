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
});

const Character: Model<ICharacter> = model("Character", schema);
export default Character;