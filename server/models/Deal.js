const mongoose=require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    type: {
      type: String,
      enum: ['text', 'price'],
      default: 'text'
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  });

const dealSchema=new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    filePath: String,
    status:{
        type:String,
        enum:['Pending','In Progress','Completed','Cancelled'],
        default:'Pending'
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,ref:'User'

    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
    },
    messages: [messageSchema]
})
module.exports = mongoose.model('Deal', dealSchema);