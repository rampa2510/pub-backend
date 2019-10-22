//========================================================================================
/*                                                                                      *
 *                                import helper functions                               *
 *                                                                                      */
//========================================================================================

const {get} = require('../../helpers/conn')

//########################################################################################

module.exports = {

  /**
   * @description     This function is the callback function that will
   *                  be used when the fetch college code route is called
   * 
   * @param  req      The request object provided by express with the data sent with the request
   * 
   * @param  res      The response object provied by express which has the functions to send 
   *                  response back to client
   * 
   * @returns {Object} College code Data
   * 
   * @author Ram Pandey
   */
  fetchCollegeCodes:(req,res)=>{
    let db = get()
    db.collection('collegeCodes').find({}).toArray((err,respData)=>{
      if(err) {
        res.status(500).json({err})
        console.log(err)
          return
      }      
      res.status(200).json(respData)
    })
  },
  /**
   * @description     This function is the callback function that will
   *                  be used when the add college code route is called
   * 
   * @param  req      The request object provided by express with the data sent with the request
   * 
   * @param  res      The response object provied by express which has the functions to send 
   *                  response back to client
   * 
   * @returns {Object} College code Data
   * 
   * @author Ram Pandey
   */
  addCollegeCodes:(req,res)=>{
    let db = get()

    db.collection('collegeCodes').findOne({code:req.body.code.trim().toLowerCase()},(err,respData)=>{
      if(err){
        res.status(500).json({err})
          console.log(err)
            return
      }
      if(respData)
        res.status(409).json([409,"Conflict"])
      else{
        db.collection('collegeCodes').insertOne({code:req.body.code.trim().toLowerCase(),name:req.body.name.toLowerCase()},(err,respData)=>{
          if(err) {
            res.status(500).json({err})
            console.log(err)
              return
          }
          // console.log("l")
          res.status(200).json([200,"ok"])
        })
      }
      })
  },
  editCode:(req,res)=>{
    let db = get()
    db.collection('collegeCodes').findOne({code:req.body.code.trim().toLowerCase()},(err,respData)=>{

      if(err){
          res.status(500).json({err})
          console.log(err)
            return
      }

      if(respData){
        let newValue={$set:{code:req.body.newcode,name:req.body.newname}}
        db.collection('collegeCodes').updateOne({code:req.body.code.trim().toLowerCase()},newValue,(err,respData)=>{
          if(err) {
            res.status(500).json({err})
            console.log(err)
              return
          }
          // console.log("l")
          res.status(200).json([200,"ok"])
        })
      }else
        res.status(400).json([400,"Bad request"])
      
      // res.status(200).json([200,"ok"])
    })
  }
}