
const mongoose = require('mongoose')


//const password = encodeURIComponent("Raja@0676400415"); // Encode the password
// const uri = `mongodb+srv://mohammed:${password}@cluster0.fjxtrsc.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(process.env.MONGODB_URL ,{ useNewUrlParser: true, useUnifiedTopology: true })




