const { MongoClient , ObjectId} = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'first_db';

// const id_  = new ObjectId() ;
// console.log(id_);
// console.log(id_.getTimestamp())

const main = async () => {
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);

    // const Users = db.collection('Users');
    // const Tasks = db.collection('Tasks');

    // //insertOne
    //     const result = await Users.insertOne({
    //         _id : id_,
    //         name: 'ouhoucht',
    //         age: 25,
    //         prenom : "mohammed",
    //         profession: 'Software Engineer'
    //         } );
    //         console.log(result)
    //         console.log('Document inserted:', result.insertedId);

// ---------------------------------------------------------------------------------
//    //insertMany
//    const result_Users = await Users.insertMany([{
//         name  : "sliman",
//         age : 50
//     },{
//         name : "chakir",
//         age : 45
//     }])
//     console.log( result_Users) 

//-------------------------------------------------------------------------------
// findOne
// const Tasks = db.collection('Tasks');    
// const res =  await Tasks.findOne({_id: new ObjectId("6504453281521119d9f1c204")});
// console.log(res);

// find
// const res_ =  await  Tasks.find( { coompleted : false}).toArray()
// console.log(res_);

// -----------------------------------------------------------------------------------------


    // const Tasks = db.collection('Tasks');
    // await  Tasks.updateMany({} ,{
    //     $rename : {
    //       coompleted :"completed",
    //     }
    //   }).then( (res) => {
    //     console.log(res)
    //   }).catch(err => console.log(err)) 


    // await  Tasks.updateMany({completed :false} ,{
    //   $set : {
    //     completed :  true
    //   }
    // }).then( (res) => {
    //     console.log(res)
    //   }).catch(err => console.log(err)); 



    const products =  db.collection("products");
  //  const result = await products.insertMany([
  //     {  "name" : "xPhone", "price" : 799, "spec" : { "ram" : 4, "screen" : 6.5, "cpu" : 2.66 },"color":["white","black"],"storage":[64,128,256]},
  //     {  "name" : "xTablet", "price" : 899,  "spec" : { "ram" : 16, "screen" : 9.5, "cpu" : 3.66 },"color":["white","black","purple"],"storage":[128,256,512]},
  //     { "name" : "SmartTablet", "price" : 899,  "spec" : { "ram" : 12, "screen" : 9.7, "cpu" : 3.66 },"color":["blue"],"storage":[16,64,128]},
  //     {  "name" : "SmartPad", "price" : 699,"spec" : { "ram" : 8, "screen" : 9.7, "cpu" : 1.66 },"color":["white","orange","gold","gray"],"storage":[128,256,1024]},
  //     {  "name" : "SmartPhone", "price" : 599,"spec" : { "ram" : 4, "screen" : 9.7, "cpu" : 1.66 },"color":["white","orange","gold","gray"],"storage":[128,256]}
  //  ]);

   
     const result = await products.find({}, {
     }).project({
      name :1 ,
      _id :0
     }).toArray();

     console.group(result)


  //  const result_ =  await products.deleteMany( {
  //   $and : [ {
  //      price : { $gt : 599}
  //   }  , {
  //     "spec.ram" : {
  //       $lt : 12
  //     }
  //   }]
  //  });


  //  const result__ =  await products.deleteOne( { "spec.ram" : {
  //   $not : {
  //     $eq : 14
  //   }
  //  }})

  //  console.log(result__);

  

   




  } finally {
    await client.close();
    console.log('Connection closed.');
  }
};

main().catch(console.error);


/**  In this modified version, we've made the following changes: Moved the creation of 
 * the client object inside the main function to ensure a new client is created for each 
 * execution. Used try-finally to ensure that the client is always closed, even if an error 
 * occurs during execution. Used await with insertOne to ensure that the insertion operation 
 * is completed before closing the connection. This should help in preventing the 
 * "PoolClosedError" and properly manage the MongoDB connection. 
 * */