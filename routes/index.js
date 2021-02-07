const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const records = require('./modules/records')
const sort = require('./modules/sort')


router.use('/', home)
router.use('/records', records)
router.use('/sort', sort)

module.exports = router