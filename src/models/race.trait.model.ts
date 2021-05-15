import { Model, model, Schema } from "mongoose";
import { IRaceTrait } from "../interfaces/race.trait.interface";

const schema: Schema = new Schema({
    race: {
        type: Schema.Types.ObjectId,
        ref: "Race"
    },
    description: {
        type: String,
        required: true
    },
});

const RaceTrait: Model<IRaceTrait> = model("RaceTrait", schema);
RaceTrait.createCollection();
export default RaceTrait;