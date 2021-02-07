const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const records = require('./modules/records')
const sort = require('./modules/sort')
const search = require('./modules/search')


router.use('/', home)
router.use('/records', records)
router.use('/sort', sort)
router.use('/search', search)

module.exports = router