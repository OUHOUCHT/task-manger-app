const express = require("express")
const router = express.Router()
const {Task} = require("../models/task") 
const { auth } = require("../middleware/auth")
const { default: mongoose } = require("mongoose")
const User = require("../models/user")




router.post('/tasks' ,auth,async (req,res)=> {

    //const task = new  Task(req.body);
    const task =  new Task( {
        ...req.body,
        owner : req.user._id
    })
    // const error = task.validateSync() ;
    // console.log(error)


    /* // without async / await : app.post('/tasks' , (req,res)=> { }
    task.save().then( () => {
        res.status(200).send(task)
    }).catch( err => {
        res.status(400).send(err)
    }).finally(console.log("fin"))
    */
    // with asyn/await : app.post('/tasks' ,async (req,res)=> { }


        try {
           await task.save() ;
           res.status(200).send(task)
            
        } catch (error) {
            res.status(400).send(error)

        }


})







// GET /tasks?completed=true
// GET  /tasks?limit=2&skip=0
// GET  /tasks?sortBy=createdAt:desc

router.get('/tasks' ,auth,async (req,res) => {

    const match = {};
    const sort = { }
    

    if(req.query.completed) {
        match.completed = req.query.completed === "true"
    }

    if(req.query.sortBy) {

        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = (parts[1] === "desc" ? 1 : -1)
    }


    console.log(sort )

    /*
    Task.find({}).select('description').then((data) =>{
        res.status(200).send(data)
    }).catch(err => {
        res.status(500).send(err)
    }).finally("successfull operation")
    */
  
    try {
        
        const data = await Task.find({owner : req.user._id , ...match}).sort(sort).limit(parseInt( req.query.limit)).skip(parseInt( req.query.skip * req.query.limit)).select('description  owner completed').populate({path :'owner' }) ;

        /*  const data = await req.user.populate( {
            path : 'tasks',
            match ,
            options :  {
                limit : parseInt( req.query.limit) ,
                skip :parseInt(req.query.skip),

            }
          } );;

          //?completed=true&limit=2&skip=5
                    res.status(200).send(data.tasks)

          */

          res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error+"")

    }
})

router.get("/tasks/:id" ,auth,async (req,res) => {


    const id = req.params.id;

    try {
        const data = await Task.findOne({_id : id , owner : req.user._id}).populate({
            path :"owner",
            select : 'name email'
        });;

        if(!data){
            return  res.status(404).send(404)
         }

         
 
         res.status(200).send(data)

    } catch (error) {
        res.status(500).send(error)

    }


    /*
    Task.findById(id).then((data) => {

        if(!data){
           return  res.status(404).send(404)
        }

        res.status(200).send(data)

    }).catch( err => {
        res.status(500).send(err)
    }).finally("successfull operation")
    */



})

router.patch("/tasks/:id",auth,async (req,res) => {


        const updateKeys =  Object.keys(req.body)
        const allowedKeys = ["description","completed"]

        const isValidKeys = updateKeys.every(value =>  allowedKeys.includes(value) );

        if(!isValidKeys) {
            return res.status(400).send({error : "invalid updates"})
        }

    try {

        /*
        const data = await Task.findByIdAndUpdate(req.params.id , req.body , {
            new: true,
            runValidators : true
        });

        */

        const task =  await Task.findOne({_id:req.params.id , owner:req.user._id}).populate("owner");
       
        if(!task){
            return res.status(400).send({error : "invalid updates"})
        }

        
        updateKeys.forEach((key) => {
            task[key] =req.body[key]

        })

        await task.save();

     

     
         res.status(400).send(task)


        
    } catch (error) {
        res.status(500).send(error)
    }



})

router.delete('/tasks/:id',auth,async (req,res) => {

    const id = req.params.id;
    const ObjectId = mongoose.Types.ObjectId;

    try {
        const response =  await Task.findOneAndDelete( { _id : id , owner : req.user._id}).populate('owner')
        
        if(!response){
            return res.status(400).send(404)
        }
        res.status(404).send(response)

        
    } catch (error) {
        res.status(400).send(error+'')

    }


})


module.exports = router