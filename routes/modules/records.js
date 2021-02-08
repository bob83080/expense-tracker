const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const dateFormat = require('../../dateFormat.js')
const generateIconHTML = require('../../generateIconHTML.js')
const iconColor = require('../../iconColor.js')
//new page
router.get('/create', (req, res) => {

  const categories = []
  Category.find()
    .lean()
    .then(items => {
      categories.push(...items)
      Record.find()
        .lean()
        .then(record => {
          res.render('create', { categories, record })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})
//   return res.render('create')
// })

router.post('/', (req, res) => {
  const records = req.body
  return Record.create(records)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//detail page
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => {
      record.date = dateFormat(record.date)
      res.render('detail', { record })
    })
    .catch(error => console.log(error))
})

//update page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const categories = []
  Category.find()
    .lean()
    .then(items => {
      categories.push(...items)
      Record.findById(id)
        .lean()
        .then(record => {
          record.date = dateFormat(record.date)
          res.render('edit', { categories, record })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => {
      record.name = req.body.name
      record.category = req.body.category
      record.date = req.body.date
      record.amount = req.body.amount
      record.description = req.body.description
      return record.save()
    })
    .then(() => res.redirect(`/records/${id}`))
    .catch(error => console.log(error))
})

//delete page

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//sort
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
        item.date = dateFormat(item.date)
        totalAmount += item.amount
        item.iconHTML = generateIconHTML(item.category)
        item.iconColor = iconColor(item.category)
      })
      totalAmount = totalAmount.toFixed(2)
      res.render('index', { records: records, totalAmount })
    })
    .catch(error => console.error(error))
})



module.exports = router