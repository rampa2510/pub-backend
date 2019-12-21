
//========================================================================================
/*                                                                                      *
 *                                import helper functions                               *
 *                                                                                      */
//========================================================================================
const { verifyCollege } = require('../../helpers/verifyCollege')
const {get} = require('../../helpers/conn')
const { verifyFilledCollege } = require('../../helpers/enterOnlyUsedCollege')
const ObjectID = require('mongodb').ObjectID
//########################################################################################

module.exports =async (req,res)=>{
  
  let verifyCollegeResp,db,verifyFilledCollegeDB

  try {
    db = get()
    verifyCollegeResp = await verifyCollege(db,req.body.college)
   } catch (error) {
      console.log(error)
      res.status(500).json({error})
      process.exit(1)
    }

    if(verifyCollegeResp){
      // console.log(req.body._id)
      let id = ObjectID(req.body._id)
      // console.log(id)
      try {
        verifyFilledCollegeDB = await verifyFilledCollege(db,req.body.college)
      } catch (error) {
        console.log(error)
        res.status(500).json({error})
        process.exit(1)
      }

      delete req.body['_id']

      await db.collection('details').updateOne({_id:id},{$set:req.body},async (err,respData)=>{
        if(err) {
          console.log(err)
          res.status(500).json({err})
          process.exit(1)
        } 
        if(!verifyFilledCollegeDB){
          await db.collection("filledCollege").insertOne({code:verifyCollegeResp.code,name:verifyCollegeResp.name},(err,respData)=>{
          if(err) {
            res.status(500).json({err})
            process.exit(1)
          } 
        })
      }
      // console.log('l')
      res.status(200).json([200,"Ok"])
      })
    }else{
      res.status(409).json([409,"conflict"]) 
    }  
}