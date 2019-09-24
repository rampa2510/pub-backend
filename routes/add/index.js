
//========================================================================================
/*                                                                                      *
 *                                import helper functions                               *
 *                                                                                      */
//========================================================================================
const { verifyCollege } = require('../colleges/index')
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
      // console.log(verifyCollegeResp)
     // if the college is not present add it to the database
     if(!verifyCollegeResp){

      db.collection("colleges").insertOne({name:req.body.college.toLowerCase()},(err,respData)=>{
        if(err) {
          res.status(500).json({err})
          console.log(err)
          process.exit(1)
        }
      })

     }

     // insert details here
     let data = req.body;
     data["college"] = req.body.college.toLowerCase()
     db.collection("details").insertOne(data,(err,respData)=>{
      if(err) {
        res.status(500).json({err})
        process.exit(1)
      }     
    })

     res.status(200).end()
}
