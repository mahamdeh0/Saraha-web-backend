const { json } = require("express");
const { userModel } = require("../../../DB/model/user.model");
let bcrypt = require('bcryptjs');

const updatePassword = async (req,res)=>{

    try{

        const{oldpassword,newpassword}= req.body;
        const user = await userModel.findById(req.user._id)
        const match = await bcrypt.compare(oldpassword,user.password);
        if(!match){

            res.json({message:'oldpassword error'})

        }else{

            const newhash = await bcrypt.hash(newpassword,parseInt(process.env.saltRound));
            const updateuser = await userModel.findByIdAndUpdate(req.user._id,{password:newhash});
            res.json({message:'done update',user})
        }
    
    }catch{

        res.json({message:'catch error',error})
    
    }

}
const uploadprofilepic = async(req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(400).json({ message: 'User not authenticated or missing user ID' });
        }

        const imageurl = req.file.destination + '/' + req.file.filename;
        await userModel.findByIdAndUpdate({ _id: req.user._id }, { profilePic: imageurl });
        return res.status(200).json({ message: 'Profile picture uploaded successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports={updatePassword,uploadprofilepic}   