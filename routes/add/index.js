// import mongoClient
const { MongoClient } = require('mongodb')

module.exports = async (req,res) => {

  MongoClient.connect("mongodb+srv://ram:ramrishi25@cluster0-uvqoo.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true },(err, client)=> {   
     if(err) throw err
     let db = client.db("publicity")
     db.collection("details").insertOne(req.body,(err,res)=>{
      if(err) throw err
      client.close()
     })
     res.status(200).end()
  })
}
