import mongoose from 'mongoose';

const viewSchema=new mongoose.Schema({
  day:{
    type:String,
    required:true,
    immutable:true
  },
  month:{
    type:String,
    required:true,
    immutable:true
  },
  year:{
    type:String,
    required:true,
    immutable:true
  }
},{
  timestamps: true
})


//---------------------------------------------------
module.exports=mongoose.models.views || mongoose.model('views',viewSchema);
