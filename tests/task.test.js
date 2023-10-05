const request = require('supertest');
const app = require("../src/app");
const { Task } = require('../src/models/task');
const {setupDatabase,userOne, taskOne, userTwo}  =  require("./fixtures/db")


beforeEach( async () => {
    await setupDatabase()
})



/*test("create task" ,async() => {


    const response =  await request(app)
    .post("/tasks")
    .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
    .send( {
        description : "XXXXXXXXXXXXXXXXXXX"
    })
    .expect(200)

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
})
*/


test("get all tasks for  userOne " , async() => {

    const response = await request(app)
    .get("/tasks")
    .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    
    expect(response.body.length).toBe(2)

    
})



test("get task by id  userOne " , async() => {

    const response = await request(app)
    .get(`/tasks/${taskOne._id}`)
    .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    
})


test ('delete first task of userOne from userTwo' , async ()  => {

    const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)


    const task = await Task.findById(taskOne._id);
    expect(task).toBeNull();



})

