
//========================================================================================
/*                                                                                      *
 *                                import helper functions                               *
 *                                                                                      */
//========================================================================================

const {get} = require('../../helpers/conn')

//########################################################################################

module.exports = {
  getuserData:(req,res)=>{
    let db = get()
    db.collection('users').find({}).toArray((err,respData)=>{
      if(err){
        res.status(500).json([500,"Internal server error",err])
        console.log(err)
        return
      }
      res.status(200).json([200,"ok",respData])
    })
  },
  getDetailsAddedByUser:(req,res)=>{
    let db = get()

    const {username} = req.body

    db.collection('details').find({username}).toArray((err,resp)=>{
      if(err) {
        res.status(500).json({err})
        console.log(err)    
          return
      }
      res.status(200).json([200,"ok",resp])
    })
  }
}