const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category.js')
const dateFormat = require('../../dateFormat.js')
const generateIconHTML = require('../../generateIconHTML.js')
const iconColor = require('../../iconColor.js')


router.get('/', (req, res) => {
  const searchedCategory = req.query.category || ""
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

      Record.find(filter)
        .lean()
        .sort({ date: 'desc' })
        .then(records => {
          records.forEach(item => {
            totalAmount += item.amount
            item.date = dateFormat(item.date)
            item.iconHTML = generateIconHTML(item.category)
            item.iconColor = iconColor(item.category)
          })
          totalAmount = totalAmount.toFixed(2)
          res.render('index', { categories, records, totalAmount, searchedCategory })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})


module.exports = router