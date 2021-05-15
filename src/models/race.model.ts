import { Model, model, Schema } from "mongoose";
import { IRace } from "../interfaces/race.interface";

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

const Race: Model<IRace> = model("Race", schema);
Race.createCollection();
export default Race;