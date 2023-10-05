const request = require('supertest');
const app = require("../src/app");
const User = require('../src/models/user');
const {setupDatabase,userOne,userOneId, userTwo}   =  require("./fixtures/db")



/*
beforeEach( async () => {
    await setupDatabase()
})

*/

/*
test("should signup a new user", async() => {


  const response =  await request(app).post("/users").send({

        name :"mohammed",
        email :"mohammed.ouhoucht@um5r.ac.ma",
        password:"mohammed.ouhoucht@um5r.ac.ma",
        age : 25

    }).expect(200)

    const user = await User.findById(response.body.me)
    expect(user).not.toBeNull();

    // Assertion about the response
    expect(response.body.me.name).toBe("mohammed")
     

})


test('test signIn' , async() => {

   const response= await request(app).post("/users/login").send({
        email : userOne.email,
        password: userOne.password
    }).expect(200)


    const user =  await User.findById(userOne._id)

        // Assertions about the response
    
        expect(response.body).toMatchObject({
             user : {
                email : userOne.email,
                name : userOne.name
             },
             token : user.tokens[1].token
        })

        expect(user.password).not.toBe('MyPass777!')

})



test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    
    const user = await User.findById(userOne._id)
    expect(response.body.token).toEqual(user.tokens[1].token)
})




test("should not logi nonexistent User",async () => {

    await request(app).post("/users/login").send({
        email : userOne.email,
        password: "wwwwwwwww"
    }).expect(400)

})


test("should get profile of user" ,async () => {
    await request(app)
    .get("/users/me")
    .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})


test("should delete account for user" ,async () => {
      const user =  await request(app)
        .delete("/users/me")
        .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

        const response= await User.findById(userOne._id)

        expect(response).toBeNull()



})


test("should not delete account for unauthenticated user" ,async () => {

    await request(app)
    .delete("/users/me")
    .send()
    .expect(400)
})



test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)
})





test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Jess'
        })
        .expect(200)
    const user = await User.findById(userOne._id)
    expect(user.name).toEqual('Jess')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Philadelphia'
        })
        .expect(400)
})

*/

test ( "xxx" , () => {

});