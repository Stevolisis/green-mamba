const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true
    },
    slug: { 
        type: String, 
        required: true
    },
    description: { 
        type: String, 
        required: true
    },
    img:{
        public_id:{
          type:String,
          required:true
        },
        url:{
          type:String,
          required:true
        }
    },
    content: { 
        type: String, 
        required: true
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Author'
    },
    tags: [{ 
        type: String
    }], 
    gifts: { 
        type: Number, 
        required: true
    },
},{
    timestamps: true
});

module.exports = mongoose.models.Article || mongoose.model('Article', ArticleSchema);
