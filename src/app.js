const express = require("express")
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")

require("./db/mongoose")

const app = express()


app.use(express.json())
app.use(userRouter)  // register userRouter
app.use(taskRouter)  // register taskRouter



module.exports =  app