const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category.js')
const generateIconHTML = require('../../generateIconHTML.js')
const dateFormat = require('../../dateFormat.js')
const record = require('../../models/record')
//home page
// router.get('/', (req, res) => {
//   Record.find()
//     .lean()
//     .sort({ date: 'desc' })
//     .then(records => {
//       let totalAmount = 0
//       records.forEach(item => {
//         totalAmount += item.amount
//         item.iconHTML = generateIconHTML(item.category)
//       })
//       res.render('index', { records: records, totalAmount })
//     })
//     .catch(error => console.error(error))
// })

router.get('/', (req, res) => {
  const searchedCategory = req.query.category || ''
  const filter = {}
  let totalAmount = 0
  if (searchedCategory) {
    filter.category = searchedCategory
  }
  const categories = []
  Category.find()
    .lean()
    .then((items) => {
      categories.push(...items)

      Record.find()
        .lean()
        .sort({ date: 'desc' })
        .then(records => {
          let totalAmount = 0
          records.forEach(item => {
            totalAmount += item.amount
            // record.date = dateFormat(record.date)
            item.iconHTML = generateIconHTML(item.category)
          })
          totalAmount = totalAmount.toFixed(2)
          res.render('index', { categories, records, totalAmount, searchedCategory })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})


module.exports = router