//========================================================================================
/*                                                                                      *
 *                           Import the 3rd party dependencies                          *
 *                                                                                      */
//========================================================================================

const express = require('express'),
      router  = express.Router()

//########################################################################################

//========================================================================================
/*                                                                                      *
 *                            Import all the routes functions                           *
 *                                                                                      */
//========================================================================================

const add = require('./add')
const { fetchCollege,fetchCollegeCodes,addCollegeCodes } = require('./colleges')
const postFun = require('./post')

//########################################################################################

//========================================================================================
/*                                                                                      *
 *                             Configure all the routes here                            *
 *                                                                                      */
//========================================================================================

router.post('/add',add)

router.get('/fetchcollege',fetchCollege)

router.post('/fetchpost',postFun)

router.get('/fetchcode',fetchCollegeCodes)

router.post('/addcode',addCollegeCodes)

//########################################################################################

module.exports = router