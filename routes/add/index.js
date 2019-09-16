// import mongoClient
const { MongoClient } = require('mongodb')

// import helper functions
const { verifyCollege } = require('../colleges/index')

let urlProd = "mongodb+srv://ram:ramrishi25@cluster0-uvqoo.mongodb.net/test?retryWrites=true&w=majority"
let urlDeve = "mongodb://localhost:27017"

// this is the callback function with the add route
module.exports = (req,res) => {

  MongoClient.connect(urlProd,{ useNewUrlParser: true, useUnifiedTopology: true },async (err, client) => {   
     if(err) {
       res.status(500).json({err})
       console.log(err)
     }
     let db = client.db("publicity")

     let verifyCollegeResp
     // verify college and get the boolean value
     try {
      verifyCollegeResp = await verifyCollege(db,req.body.college)
     } catch (error) {
        console.log(err)
        res.status(500).json({error})
      }

     // if the college is not present add it to the database
     if(!verifyCollegeResp){

      db.collection("colleges").insertOne({name:req.body.college},(err,respData)=>{
        if(err) {
          res.status(500).json({err})
          console.log(err)
        }
      })

     }

     db.collection("details").insertOne(req.body,(err,respData)=>{
      if(err) {
        res.status(500).json({err})
      }     
    })

     client.close()

     res.status(200).end()
  })
}
