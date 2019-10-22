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
      db.collection('collegeCodes').findOne({code:collegeName.toLowerCase()},(err,res)=>{
        if(err) {
          console.log(err)   
          reject(err)
          process.exit(1)
        }
        if(res)
          resolve(true)
        else
          resolve(false)
      })
      
    })
  }
}