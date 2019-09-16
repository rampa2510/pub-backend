const { MongoClient } = require('mongodb')

let urlProd = "mongodb+srv://ram:ramrishi25@cluster0-uvqoo.mongodb.net/test?retryWrites=true&w=majority"
let urlDeve = "mongodb://localhost:27017"

module.exports = {

  /**
   * @description       This function will verify whether a given college
   *                    is present in the database or not 
   * 
   * @param db          - Database connnection to perfom operations
   * 
   * @param collegeName - The college name we want to verify for
   * 
   * @returns { Boolean } True if it exists else false
   * 
   * @author Ram Pandey 
   */
  verifyCollege:async (db,collegeName)=>{
    return new Promise((resolve,reject)=>{
      db.collection('colleges').findOne({name:collegeName},(err,res)=>{
        if(err) {
          console.log(err)
        }
        if(res)
          resolve(true)
        else
          resolve(false)
      })
      
    })
  },
  fetchCollege:(req,res)=>{
    MongoClient.connect(urlProd,{ useNewUrlParser: true, useUnifiedTopology: true },async (err, client)=> {   
      if(err) {
        res.status(500).json({err})
      }
      let db = client.db("publicity")
      db.collection('colleges').find({}).toArray((err,respData)=>{
        if(err) {
          res.status(500).json({err})
        }      
        res.status(200).json({respData})
      })
    })
  }
}