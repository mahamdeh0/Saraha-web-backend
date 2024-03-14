require('dotenv').config()
const schedule = require('node-schedule');
const express = require('express')
const app = express()
const port = 4000;
app.use(express.json());

const appRouter = require('./modules/app.router');
const { connectDB } = require('./DB/connection');
const BaseUrl=process.env.BaseUrl;
connectDB();

app.use(`${BaseUrl}/upload`,express.static('./upload'));
app.use(`${BaseUrl}/auth`,appRouter.authRouter);
app.use(`${BaseUrl}/user`,appRouter.userRouter);
app.use(`${BaseUrl}/message`,appRouter.messageRouter);
app.get('*',(req,res)=>{
    res.json({message:"404 Page Not Found"})
});

const job = schedule.scheduleJob('0  23 11 * * *', function(){
    console.log('The answer to life, the universe, and everything!');
  });

  
app.listen(port, () => console.log(`Example app listening on port ${port}!`))