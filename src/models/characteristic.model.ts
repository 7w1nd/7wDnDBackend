import { Model, model, Schema } from "mongoose";
import { ICharacteristic } from "../interfaces/characteristic.interface";

const schema: Schema = new Schema({
    system: {
        type: Schema.Types.ObjectId,
        ref: "System"
    },
    name: {
        type: String,
        required: true
    },
    shortName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

const Characteristic: Model<ICharacteristic> = model("Characteristic", schema);
export default Characteristic;