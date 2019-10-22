//========================================================================================
const {get} = require('../../helpers/conn')
//########################################################################################

module.exports =async (req,res)=>{
  try {
    // console.log(req.body.collegeName)
    let db = get()
    db.collection("details").find({college:req.body.collegeName}).toArray((err,respData)=>{
      if(err) {
        res.status(500).json({err})
        console.log(err)    
          return
      }
      // console.log(respData)
      res.status(200).send(respData)
    })
  } catch (error) {
    console.log(error)
      res.status(500).send({error})
        return 
  }

}