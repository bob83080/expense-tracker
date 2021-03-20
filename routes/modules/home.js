const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const monthOption = require('../../monthOption.js')
const monthDisplay = require('../../monthDisplay.js')
const dateFormat = require('../../dateFormat.js')
const generateIconHTML = require('../../generateIconHTML.js')
const iconColor = require('../../iconColor.js')

router.get('/', (req, res) => {
  let totalAmount = 0
  let months = []

  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      records.forEach(item => {
        months = monthOption(item.date, months)
        totalAmount += item.amount
        item.date = dateFormat(item.date)
        item.iconHTML = generateIconHTML(item.category)
        item.iconColor = iconColor(item.category)
      })
      totalAmount = totalAmount.toFixed(2)
      res.render('index', { records, totalAmount, months })
    })
    .catch(error => console.log(error))


})


router.get('/filter', (req, res) => {
  let months = []
  let totalAmount = 0
  const category = req.query.category
  const month = req.query.month
  if (category === '全部類別' && month === '全部月份') {
    return res.redirect('/')
  } else if (category === '全部類別') {
    Record.find()
      .lean()
      .sort({ date: 'desc' })
      .then(recordList => {
        recordList.forEach(item => {
          months = monthOption(item.date, months)
        })
        const records = recordList.filter(item => monthDisplay(item.date) === month)
        records.forEach(item => {
          months = monthOption(item.date, months)
          totalAmount += item.amount
          item.date = dateFormat(item.date)
          item.iconHTML = generateIconHTML(item.category)
          item.iconColor = iconColor(item.category)
        })
        res.render('index', { records, totalAmount, month, months })
      })
      .catch(error => console.log(error))
  } else if (month === '全部月份') {
    Record.find({ category })
      .lean()
      .sort({ date: 'desc' })
      .then(records => {
        records.forEach(item => {
          months = monthOption(item.date, months)
          totalAmount += item.amount
          item.date = dateFormat(item.date)
          item.iconHTML = generateIconHTML(item.category)
          item.iconColor = iconColor(item.category)
        })
        res.render('index', { category, records, totalAmount, month, months })
      })
      .catch(error => console.log(error))
  } else {
    Record.find({ category })
      .lean()
      .sort({ date: 'desc' })
      .then(recordList => {
        recordList.forEach(record => {
          months = monthOption(record.date, months)
        })
        const records = recordList.filter(record => monthDisplay(record.date) === month)
        records.forEach(item => {
          months = monthOption(item.date, months)
          totalAmount += item.amount
          item.date = dateFormat(item.date)
          item.iconHTML = generateIconHTML(item.category)
          item.iconColor = iconColor(item.category)
        })
        res.render('index', { category, records, totalAmount, month, months })
      })
      .catch(error => console.log(error))
  }
})


module.exports = router