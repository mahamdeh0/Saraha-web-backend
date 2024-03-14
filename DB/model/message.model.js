const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

    text:{

        type:String,
        required:true
    },
    reciverid:{

        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },


},{timestamps:true});

    const messageModel = mongoose.model('messega',messageSchema);
    module.exports={messageModel}; 