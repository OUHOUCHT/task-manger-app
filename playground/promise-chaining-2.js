

require ("../src/db/mongoose.js")

const {Task} = require("../src/models/task");

/*

Task.findByIdAndRemove("6507614ff7ea75d8d0b71de9").then( res => {
    return Task.countDocuments({completed : true})
}).then( count => console.log(" total number of incomplete tasks ",count)).catch( err => console.log(err))
*/


const deleteTaskAndCount = async(id) => {

    const res = await Task.findByIdAndRemove(id);
    console.log(res)
    return await Task.countDocuments({completed : false});


}

deleteTaskAndCount("65081cbdba993b5b3ab1a4fa").then( count => console.log(" total number of incomplete tasks ",count)).catch( err => console.log(err))







