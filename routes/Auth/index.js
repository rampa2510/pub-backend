
//========================================================================================
/*                                                                                      *
 *                                import helper functions                               *
 *                                                                                      */
//========================================================================================

const {get} = require('../../helpers/conn')

const hashPass = require('../../helpers/hashPassword')

//########################################################################################

module.exports = {
  
  addUser:(req,res) => {
    let db = get()

    const {password,username,type} = req.body
        
    let passObject = hashPass(password)

    db.collection('users').findOne({username},(err,resp)=>{
      if(err){
        res.status(500).json({err})
        console.log(err)
        return
      }
      if(resp){
        res.status(409).json([409,"Conflict"])
        return
      }
      db.collection('users').insertOne({password:passObject.hash, username, type, salt:passObject.salt,added:0},(err,respData)=>{
        if(err){
          res.status(500).json({err})
          console.log(err)
          return
        }
        res.status(200).json([200,"ok"])
      })
    })
  },
  login:(req,res)=>{
    let db = get()

    const {password,username} = req.body
        

    db.collection('users').findOne({username},(err,resp)=>{
      if(err){
        res.status(500).json({err})
        console.log(err)
        return
      }

      if(resp){

        let passObject = hashPass(password,resp.salt)

        if(passObject.hash===resp.password){
          let data = {username:resp.username,type:resp.type}
          res.status(200).json([200,"Ok",data])
          return
        }

        res.status(400).json([400,"Bad request"])
        return
      }
      res.status(401).json([401,"Unauthorized"])

    }
  )}

}


