const express = require("express")
const  User = require("./models/user")
const {Task} = require("./models/task")
const { ObjectId } = require("mongodb")
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")
const bcrypt = require("bcryptjs");

require("./db/mongoose")

const app = express()
const port = process.env.PORT 
const jwt  = require('jsonwebtoken')



app.use(express.json())
app.use(userRouter)  // register userRouter
app.use(taskRouter)  // register taskRouter



app.listen(port , () => {
    console.log("the server is up on port " + port);
})



const main  = async () => {
    //  const task =  await Task.findById('650e1861fb635b288c0dbcc7').populate("owner") ;
    //  console.log(task);

    // const user =  await User.findById("65114a2a1c6d338c19fa6899").populate("tasks");
    // console.log(user.tasks);   // Note tasks is not a property that means will is not showing in user object is virtual property to show it you must use user.tasks  

}



main()
