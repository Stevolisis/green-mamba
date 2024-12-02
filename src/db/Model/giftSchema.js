const mongoose = require('mongoose');

const GiftSchema = new mongoose.Schema({
    senderWallet: { 
        type: String, 
        required: true 
    },
    recipientWallet: { 
        type: String, 
        required: true 
    },
    article: { 
        type: mongoose.Schema.Types.ObjectId, 
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

module.exports = mongoose.models.Gift || mongoose.model('Gift', GiftSchema);
