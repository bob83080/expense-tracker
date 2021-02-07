const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const generateIconHTML = require('../../generateIconHTML.js')

//home page
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      let totalAmount = 0
      records.forEach(item => {
        totalAmount += item.amount
        item.iconHTML = generateIconHTML(item.category)
      })
      res.render('index', { records: records, totalAmount })
    })
    .catch(error => console.error(error))
})

module.exports = router