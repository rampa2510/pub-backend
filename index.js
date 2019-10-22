
//========================================================================================
/*                                                                                      *
 *                           Import all the 3rd part packages                           *
 *                                                                                      */
//========================================================================================

const express = require('express')
const cors = require('cors')

//========================================================================================
/*                                                                                      *
 *                                     Configuration                                    *
 *                                                                                      */
//========================================================================================

const app = express()
const port = process.env.PORT || 4000
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use('/',require('./routes'))
const { connect } = require('./helpers/conn')

//########################################################################################


app.listen(port, async () => {
  console.log(`Example app listening on port ${port}!`)
  try {
    let isMongoDbConnected = await connect()
  } catch (error) {
    console.log(error)
      }

})
