const request = require('supertest');
const app = require("../src/app")




test("should signup a new user", async() => {


    await request(app).post("/users").send({

        name :"mohammed",
        email :"mohammed.ouhoucht@um5r.ac.ma",
        password:"mohammed.ouhoucht@um5r.ac.ma",
        age : 25

    }).expect(200)
})

