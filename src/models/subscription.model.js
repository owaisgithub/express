import mongoose, { Schema } from 'mongoose';

const suscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId,  // One who subscripbing
        ref: "User"
    },

    channel: {
        type: Schema.Types.ObjectId,   // One to whom subscriber is subscribing
        ref: "User"
    }
},
{
    timestamps: true
}
);


export const Subscription = mongoose.model("Subscription", subscriptionSchema);
