const {model, default: mongoose} =  require("mongoose")
const validator = require("validator")
const { Schema } = require("mongoose")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Task } = require("./task");





const subSchema = new Schema({
    token : {
        type : String ,
        required : true
    }
  });




const  userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase : true,
    },
    email: {
        type: String,
        required: true,
        unique :  true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {

            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },

    password : {
        type : String ,
        required : true,
        trim : true ,
        minLength : 7 ,
        validate : {
            
            validator : (value) => {

                 return !value.toLowerCase().includes("password")
            },
            message : "password invalid : delete password"
        }
    } ,

    //tokens : [subSchema],  
    tokens : [ {
        token : {
            type : String ,
            required : true,
            ref :"Tasks"
        }
        
    }] ,
    
    avatar  : {
        type : Buffer
    }
    

} ,{
  
        timestamps : true
     

})


userSchema.virtual("tasks", {
    ref : "Tasks",
    localField :"_id",
    foreignField : "owner"
})

userSchema.methods.generateAuthToken =  async function () {

    const user = this

    const token = jwt.sign( {_id : user._id.toString()} ,process.env.JWT_SECRET)

    user.tokens.push({
        token
    })

    await user.save();

    return token;

};


userSchema.pre('findOneAndRemove', { query: true }, async function() {
    // Access the user object using `this` (standard function, not arrow function)
    
    const userId = this._conditions._id;

    try {
        
     await Task.deleteMany({ owner : userId});
    } catch (error) {
      console.error('Error deleting associated tasks:', error);
    }
  });

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {

    if (this.isModified('password')) {
        console.log(this.isModified('password'))
        this.password = await bcrypt.hash(this.password, 10)
    }

    next()
})


// Define a static method findByCredentials
userSchema.statics.findByCredentials = async function (email, password){
    const user = await this.findOne({ email })

    if (!user) {
        throw new Error('Unable to login email')
    }

    const isMatch = await bcrypt.compare(password,user.password)

   if (!isMatch) {
        throw new Error('Unable to login isMatch ')
    }

    return user
}






// userSchema.set('toObject' , {
//     transform : function (doc,user) {
//         delete user.password;
//         delete  user.tokens;
//         return user;
//     }
// })


userSchema.set('toJSON' , {
    transform : function (doc,user) {
        delete user.password;
        delete  user.tokens;
        return user;
    }
})



/** 
userSchema.methods.toJSON =  function ()  {
    const user =  this;
    const userObject =  user.toObject();
        delete userObject.password;
        delete userObject.tokens;
    return userObject;
} */



const User = model('User', userSchema)



module.exports = User

