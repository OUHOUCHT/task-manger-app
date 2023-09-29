const mongoose =  require("mongoose")
const validator = require("validator")

 mongoose.connect('mongodb://127.0.0.1:27017/mongoose_db');


// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('Age must be a postive number')
//             }
//         }
//     },

//     password : {
//         type : String ,
//         required : true,
//         trim : true ,
//         lowercase : true,
//         minLength : 7 ,
//         validate : {
//             validator : (value) => {
//                 console.log(value)
//                 console.log(value.includes("password"))
//                  return !value.includes("password")
//             },
//             message : "password invalid : delete password"
//         }
//     }
// })

// const me = new User({
//     name: '   said  ',
//     email: 'said@gmail.com   ',
//     password : "raja@PASSword"
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })





const Task = mongoose.model("Tasks",{
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

    } 


})

const task =  new Task( 
    {
        description : "      je suis ouhoucht mohammed  ",
        completed : false,

    }
)


task.save().then(res => console.log("Success : " + res)).catch( err => console.log("Error : "+err)).finally( console.log("fin"))
