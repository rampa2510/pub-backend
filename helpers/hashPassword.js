const crypto = require('crypto')

module.exports = (password,salt=null)=>{
  if(salt===null)
    salt = crypto.randomBytes(16).toString('hex')
    
  let hash = crypto.pbkdf2Sync(password, salt,1000, 64, `sha512`).toString(`hex`) 
  return {salt,hash}
}