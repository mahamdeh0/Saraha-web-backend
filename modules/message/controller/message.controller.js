const {userModel} = require('../../../DB/model/user.model')
const {messageModel} = require('../../../DB/model/message.model')

const sendmessage = async(req,res)=>{


    const {recivedid}=req.params;
    const {message}=req.body;


    const user =await userModel.findById(recivedid);
    if(!user){

        res.json({message:"not found account"})

    }else{

        const newmessage = new messageModel({text:message,reciverid:recivedid})
        const savedmessage = await newmessage.save();
        res.json(savedmessage);


    }


}

const messagelist = async(req,res)=>{

    const messages = await messageModel.find({reciverid:req.user._id});
    res.json(messages);


}

const deletemessage = async(req,res)=>{
    const {id}=req.params;
    const userid=req.user._id;

    const message = await messageModel.findOneAndDelete({_id:id,reciverid:userid});
    if(!message){
        res.json({message:"error"})


    }else{
        
        res.json({message:"done"})


    }


}
module.exports={sendmessage,messagelist,deletemessage};