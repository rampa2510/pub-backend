
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

//########################################################################################


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
