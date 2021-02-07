const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const generateIconHTML = require('../../generateIconHTML.js')

// --------搜尋-------- //

router.get('/:category', (req, res) => {
  const keyword = req.query.category

  return Record.find()
    .lean()
    .then(records => {
      const record = records.filter(record => record.category.includes(keyword))
      let totalAmount = 0
      record.forEach(item => {
        totalAmount += item.amount
        item.iconHTML = generateIconHTML(item.category)
      })
      res.render('index', { record: record, totalAmount })
    })
    .catch(error => console.error(error))
})


// router.get('/:type/:category', (req, res) => {
//   const keyword = record.category

//   Record.find()
//     .lean()
//     .then(records => {
//       const record = records.filter(record => record.category.toLowerCase().includes(keyword.toLowerCase()))
//       let totalAmount = 0
//       records.forEach(item => {
//         totalAmount += item.amount
//         item.iconHTML = generateIconHTML(item.category)
//       })
//       res.render('index', { record: record, totalAmount })
//     })
//     .catch(error => console.error(error))


// Record.find()
//   .lean()
//   .sort({ [type]: [method] })
//   .then(records => {
//     let totalAmount = 0
//     records.forEach(item => {
//       totalAmount += item.amount
//       item.iconHTML = generateIconHTML(item.category)
//     })
//     res.render('index', { records: records, totalAmount })
//   })
//   .catch(error => console.error(error))
// })


module.exports = router