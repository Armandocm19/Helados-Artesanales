import mongoose, { Schema, model, Model } from "mongoose";
import { IIcecream } from "../interfaces";

const icecreamSchema = new Schema( {
    name: { type: String, required: true, default: '' },
    price: { type: Number, required: true, default: 0 },
    inStock: { type: Number, required: true, default: 0 },
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    images: { type: String, required: true },
},{
    timestamps: true
});

icecreamSchema.index({ name: 'text', tags: 'text' });

const Icecream: Model<IIcecream> = mongoose.models.Icecream || model<IIcecream>('Icecream', icecreamSchema);

export default Icecream;



