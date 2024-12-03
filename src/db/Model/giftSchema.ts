import { Schema, InferSchemaType, model, models } from 'mongoose';

const GiftSchema = new Schema({
    senderWallet: { 
        type: String, 
        required: true 
    },
    recipientWallet: { 
        type: String, 
        required: true 
    },
    article: { 
        type: Schema.Types.ObjectId, 
        ref: 'Article' 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    txHash: { 
        type: String, 
        required: true 
    },
},{
    timestamps: true
});

type GiftType = InferSchemaType<typeof GiftSchema>;

const Gift = models.Gift || model<GiftType>('Gift', GiftSchema);
export default Gift;