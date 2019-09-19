//========================================================================================
/*                                                                                      *
 *                                import helper functions                               *
 *                                                                                      */
//========================================================================================

const {get} = require('../../helpers/conn')

//########################################################################################

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
          res.status(500).json({err})
          console.log(err)    
          process.exit(1)
        }
        if(res)
          resolve(true)
        else
          resolve(false)
      })
      
    })
  },

  /**
   * @description     This function is the callback function that will
   *                  be used when the fetch route is called
   * 
   * @param  req      The request object provided by express with the data sent with the request
   * 
   * @param  res      The response object provied by express which has the functions to send 
   *                  response back to client
   * 
   * @returns {Object} College Data
   * 
   * @author Ram Pandey
   */
  fetchCollege:(req,res)=>{
    let db 
    let { noOfPostsToSkip } = req.body
    try {
       db = get()
     } catch (error) {
       console.log(error)
       res.status(500).json({error})
       process.exit(1)
     }
      db.collection('colleges').find({}).limit(5).skip(noOfPostsToSkip).toArray((err,respData)=>{
        if(err) {
          res.status(500).json({err})
          console.log(err)
          process.exit(1)
        }      
        // console.log(respData)
        let data = Object.assign({},respData)
        res.status(200).send(data)
      })
  }
}