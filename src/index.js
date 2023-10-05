
const app = require("./app")
const port = process.env.PORT 






app.listen(port , () => {
    console.log("the server is up on port " + port);
})



/*
const main  = async () => {
    //  const task =  await Task.findById('650e1861fb635b288c0dbcc7').populate("owner") ;
    //  console.log(task);

    // const user =  await User.findById("65114a2a1c6d338c19fa6899").populate("tasks");
    // console.log(user.tasks);   // Note tasks is not a property that means will is not showing in user object is virtual property to show it you must use user.tasks  

}



main()
*/