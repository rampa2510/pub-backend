
//========================================================================================
/*                                                                                      *
 *                                import helper functions                               *
 *                                                                                      */
//========================================================================================
const { verifyCollege } = require('../../helpers/verifyCollege')
const {get} = require('../../helpers/conn')
//########################################################################################

// this is the callback function with the add route
module.exports =async (req,res) => {

    // we will reuse this variable 
     let verifyCollegeResp,db
     // verify college and get the boolean value

     try {
      db = get()
      verifyCollegeResp = await verifyCollege(db,req.body.college)
     } catch (error) {
        console.log(error)
        res.status(500).json({error})
        process.exit(1)
      }
      
     // if the college is present then only add it
     if(verifyCollegeResp){
      let data = req.body;
      
      // to make the college code all lower case for avoiding conflicts while verfying
      data["college"] = req.body.college.toLowerCase()

      db.collection("details").insertOne(data,(err,respData)=>{
       if(err) {
         res.status(500).json({err})
         process.exit(1)
       }     
     })
     res.status(200).json([200,"ok"])
     }else{
      res.status(409).json([409,"conflict"]) 
     }     

}