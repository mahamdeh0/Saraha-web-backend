let bcrypt = require('bcryptjs');
const { Router } = require("express");
const {userModel} = require("../../../DB/model/user.model");
const { sendemail } = require('../../../services/email');
let jwt = require('jsonwebtoken');
const {nanoid}= require('nanoid');
var QRCode = require('qrcode')


const signUp = async (req,res)=>{


    const {name,email,password}= req.body;

    const user = await userModel.findOne({email:email});

    if(user){

        res.status(409).json({message:"email exist"})
    }else{

        let hashPassword = await bcrypt.hash(password,parseInt(process.env.saltRound));
        const newUser = new userModel({email:email,userName:name,password:hashPassword});
        const savedUser = await newUser.save();

        if(!savedUser){
            res.status(400).json({message:"fail to signup"});
        }else{
            let token = await jwt.sign({id:savedUser._id},process.env.confirmemailtoken,{expiresIn:'1h'})
            let message = `
            <a href="#${req.protocol}://${req.headers.host}${process.env.BaseUrl}/auth/confirmemail/${token}">verify email</a>;`

            await sendemail(email,'Confrim Email',message)
            res.status(201).json({message:"done signUp"});
        }
    }

}

const confirmemail = async(req,res)=>{

    const {token}= req.params;
    const decoded = jwt.verify(token,process.env.confirmemailtoken);
    if(!decoded){

        res.json({message:"invalid token"})
    }else{

        let user = await userModel.findByIdAndUpdate(
            {_id:decoded.id,confirmemail:false},
            {confirmEmail:true});

            res.json({message:"your email is confirmed"})

    }

}
 
const signin = async (req,res)=>{

    const{email,password} = req.body;
    const user = await userModel.findOne({email});

    if(!user){
        res.json({message:"invalid account"});
    }else{

        const match = await bcrypt.compare(password,user.password);

        if(!match){

            res.json({message:"invalid password"});


        }else{
            const token = jwt.sign({id:user._id},process.env.logintoken,{expiresIn:60*60*24});


            res.json({message:"done signin ",token});


        }



    }


}


const sendcode = async (req,res)=>{

    const {email}= req.body;
    const user = await userModel.findOne({email});
    if(!user){

        res.json({message:'invalid email'});

    }else{

        const code = nanoid(6);
        await sendemail(email,'forget password',`code :${code}`);
        updateuser = await userModel.updateOne({_id:user._id},{sendcode:code});
        if(!updateuser){

            res.json({message:'invalid code'});


        }else{

            res.json({message:'done code'});

 
        }
    }
}

const forgetpassword = async(req,res)=>{

    try{

    const {code, email,newpassword}=req.body;
    const hash = await bcrypt.hash(newpassword,parseInt(process.env.saltRound));
    const user = await userModel.find({email:email,sendcode:code},{password:hash});
    const user1 = await userModel.findOneAndUpdate({email:email},{sendcode:null});



    if(!user){
        res.json({message:'fail'}) 
    }else{
        res.json({message:'done update'})


    } 


    }catch{
        res.status(500).json({messge:'catch'}) 




    }

    
}

const qrcode = async (req,res)=>{

    QRCode.toDataURL('hi hi hi!', function (err, url) {
        console.log(url)
      })

}
module.exports={qrcode, signUp,confirmemail,signin,sendcode,forgetpassword}