const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    walletAddress: { 
        type: String, 
        required: true, 
        unique: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String
    },
},{
    timestamps:true
});

module.exports = mongoose.models.Author || mongoose.model('Author', AuthorSchema);