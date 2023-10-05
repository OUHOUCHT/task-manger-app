const express = require("express")
const router = express.Router()
const User = require("../models/user") 
const bcrypt = require("bcryptjs");
const { auth } = require("../middleware/auth");
const multer = require("multer")
const sharp =  require("sharp");
const { sendEmailToUser, sendCancelationEmailUser } = require("../emails/account");




router.post('/users', async (req,res) => {

    const me = new User( req.body);

    
   
    // const error = me.validateSync() ;
   // console.log(error)
   
     /* // without async/await : app.post('/users' , (req,res)=> {}
   
    me.save().then(() => {
           res.send(me)
       }).catch((error) => {
           console.log('Error!', error)
           res.status(400).send(error.errors)
       }).finally(console.log("fin"))
   
   */
   
       // with asyn/await :  app.post('/users', async (req,res) => {}
   
   
       try {



           await me.save() ;
          //  sendEmailToUser(me.email, me.name)
           const token =  await me.generateAuthToken()
           res.status(200).send({token ,me})
            
        } catch (error) {
            res.status(400).send(error + "")
   
        }
   
   
   
   })

router.post('/users/login', async (req, res) => {
    try {


        
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token =  await user.generateAuthToken()

        
         res.status(200).send({  user  , token})

       /*  const userJson =user.toObject();    // using toObject in user model
         res.send({  user : userJson  , token}) */


    } catch (e) {
        res.status(400).send(e.message)
    }
})



router.get('/users/me', auth ,async (req,res) => {

    
    // User.find({}).then ( (data) => {
    //     res.status(200).send(data);
    // }).catch( (err) => {
    //     res.status(500).send(err)
    // })


    try {

      //  const data =  await User.find({});
        res.status(200).send(req.user)

    } catch (error) {
        res.status(500).send(error.message)

    }

});

router.get('/users/logout', auth ,async (req,res) => {


    try {

        const user = req.user;
        const token = req.token;


        user.tokens = user.tokens.filter( (object) => object.token !== token );

        console.log(user.tokens)

        await user.save();

        res.status(200).send()

        
    } catch (error) {

        res.status(500).send(error.message)

    }

})


//  just for test because there is above the methode that can getUser "/users/me"
// router.get("/users/:id" ,auth,async(req,res) => {


//     const id =req.params.id ;

//     /*
//     User.findById(id).then((data) => {

//         if(!data) {
//              return res.status(404).send(404)
            
//         } 

//       res.status(200).send(data)
//     }).catch(err =>  {
//         res.status(500).send(err)
//     }).finally( console.log("fin operation"))
//     */

//    try {
    
//     const data = await User.findById(id)
 
//     if(!data){
//         return res.status(404).send(404)
//     }

//     res.status(200).send(data)

//    } catch (error) {
//     res.status(500).send(error)

//    }



// })

router.patch("/users/me",auth, async (req,res) => {


    const  update = Object.keys(req.body);
    const allowedKeys = ["name","age","email","password"];


    const isValidKeys = update.every( (key) => {
        return  allowedKeys.includes(key)
    })


    if(!isValidKeys){
        return res.status(400).send("ERROR !!! : invalid keys update!")

    }

    try {
        /*

        const data = await User.findByIdAndUpdate(req.params.id,req.body ,{
            new : true ,
            runValidators : true
        })

        */

      //  const me =  await  User.findById(req.params.id);
          const  me =  req.user;

        update.forEach((key) => {
            me[key] =req.body[key]
        })

        await  me.save();

        res.status(200).send(me);

    } catch (error) {
        res.status(400).send(error.message)

    }



})

router.delete('/users/me',auth,async (req,res) => {

   // const id = req.params.id;

    try {
        const response =  await User.findOneAndRemove( { _id : req.user._id});
       // sendCancelationEmailUser(response.email, response.name)

        if(!response){
            return res.status(400).send(404)
        }
        res.status(200).send(response)

        
    } catch (error) {
        res.status(400).send(error)

    }


})


router.post("/users/logoutAll" ,auth ,async (req,res) => {

    const user = req.user;

    try {
        
         user.tokens = [];
         await  user.save()


         return res.status(200).send()

    } catch (error) {
        res.status(400).send(error.message)

    }




}) 



const upload = multer ({

   // dest : "avatars/" ,
    limits : {
        fileSize : 1000000
    },

    fileFilter (req,file,cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))  return cb(new Error("Please upload an Image"))
       // if(!file.originalname.match(/\.(doc|docx|pdf)$/))  return cb(new Error("Please upload a (doc|docx|pdf) file "))

        cb(undefined,true)
    }
})

// his route right here would be used for creating an avatar and for updating it.
router.post('/users/me/avatar' ,auth , upload.single("avatar") ,async(req,res) =>{

  
   // req.user.avatar = req.file.buffer;
    const buffer = await sharp(req.file.buffer).resize({ height : 300, width: 300}).png().toBuffer();
    await req.user.save()
    res.status(200).send("profile image")
    
},(error,req,res,next) => {
    res.status(400).send({"ERROR" : error.message})
});


router.delete('/users/me/avatar',auth,async(req,res) => {


   try {
    req.user.avatar = undefined

    await req.user.save();

    res.status(200).send(200)
   } catch (error) {
    
    res.status(500).send(error.message)

   }




})


router.get('/users/:id/avatar' ,async(req,res) => {

    try {

        const user = await  User.findById(req.params.id);

        if(!user|| !user.avatar) {
            throw new ERROR("")
        }

        res.set("Content-Type","image/jpg")
        res.send(user.avatar)
        
    } catch (error) {

        res.status(404).send(error.message)
    }
})


module.exports = router