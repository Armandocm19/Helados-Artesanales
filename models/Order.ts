import mongoose, { Schema, model, Model } from 'mongoose'
import { IOrder } from '../interfaces';

const orderSchema = new Schema({

    nameCustomer     : { type: String, required: true },
    lastnameCustomer : { type: String, required: true },
    orderIcecreams: [{
        _id     : { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        name    : { type: String, required: true },
        price   : { type: Number, required: true },
        quantity: { type: Number, required: true },
        images  : { type: String, required: true },
        slug    : { type: String, required: true },
    }],

    numberOfItems   : { type: Number, required: true },
    total           : { type: Number, required: true },

}, {
    timestamps: true, //Para saber cuando se actualiza la orden
}
);

const Order:Model<IOrder> = mongoose.models.Order || model<IOrder>('Order', orderSchema);

export default Order;