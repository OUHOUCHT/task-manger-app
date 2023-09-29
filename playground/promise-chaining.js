

require("../src/db/mongoose")

const {User} =  require("../src/models/user")

// 

const    findByIdAndUpdate = async (id ,age) => {

    const result = await User.findByIdAndUpdate ( id ,  {age});
        const count = await User.countDocuments({age :25 });
        return count
} 


findByIdAndUpdate("65075c651600a8cbceea3cf6" ,25).then(count => console.log(count)).catch(err => console.log(err))


/*
User.findByIdAndUpdate ("650815cabd69bda2a9afe44a" , { age : 25} ,{
    new : true
}).then( (user) => {
    return User.countDocuments({age :0 });
}).then(count => console.log(count)).catch(err => console.log(err))

*/
 


