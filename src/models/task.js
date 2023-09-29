const {model, mongo} =  require("mongoose")
const validator = require("validator")
const { Schema } = require("mongoose")
const bcrypt = require("bcryptjs");
const { schema } = require("./user");
const { default: mongoose } = require("mongoose");




const taskShema = new Schema(
    {
        description : {
            type : String ,
            validate :  {
                validator :  (value) => {
                        if( value.length < 5 ) {
                            throw new Error("description must be grather than 5 characters")
                        }
    
                }
    
            },
            trim : true,
            required : [true ," description value is required !!!"]
        },
        completed : {
            type : Boolean,
            default : false,
    
        } ,

        owner : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref :"User"   //   const User = model( >>>>>>>>>'User'<<<<<<<<<<<<, userSchema)

        }
    }, {
        timestamps :true
    }
);




const Task =  model("Tasks",taskShema)


module.exports = {Task}