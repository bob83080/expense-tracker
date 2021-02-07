const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const generateIconHTML = require('../../generateIconHTML.js')


router.get('/:type/:method', (req, res) => {
  const type = req.params.type
  const method = req.params.method
  const typeObj = { name: '名稱', category: '類別', date: '日期', amount: '金額' }
  const methodObj = { asc: 'A-Z', desc: 'Z-A' }
  const currentSelected = `${typeObj[type]}：${methodObj[method]}`
  Record.find()
    .lean()
    .sort({ [type]: [method] })
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