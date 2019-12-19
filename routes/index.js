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

const { fetchCollegeCodes,addCollegeCodes,editCode,fetchCollegeCodesWithData } = require('./code')
const postFun = require('./post')
const { addUser,login } = require('./Auth')
const addDetails = require('./addDetails')
const { getuserData,getDetailsAddedByUser } = require('./analtyic')
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                             Configure all the routes here                            *
 *                                                                                      */
//========================================================================================


// router.get('/fetchcollege',fetchCollege)

router.post('/fetchpost',postFun)

router.get('/fetchcode',fetchCollegeCodes)

router.post('/addcode',addCollegeCodes)

router.post('/editcode',editCode)

router.post('/adduser',addUser)

router.post('/login',login)

router.post('/add',addDetails)

router.get('/analytics',getuserData)

router.get('/codewdata',fetchCollegeCodesWithData)

router.post('/user-analytics',getDetailsAddedByUser)
//########################################################################################

module.exports = router