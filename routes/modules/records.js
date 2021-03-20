const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const dateFormat = require('../../dateFormat.js')

//new page
router.get('/create', (req, res) => {
  const userId = req.user._id
  const categories = []
  Category.find()
    .lean()
    .then(items => {
      categories.push(...items)
      Record.find(userId)
        .lean()
        .then(record => {
          res.render('create', { categories, record })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, category, date, amount, merchant, description } = req.body
  return Record.create({ name, category, date, amount, merchant, description, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//detail page
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findById({ _id, userId })
    .lean()
    .then(record => {
      record.date = dateFormat(record.date)
      res.render('detail', { record })
    })
    .catch(error => console.log(error))
})

//update page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const categories = []
  Category.find()
    .lean()
    .then(items => {
      categories.push(...items)
      Record.findById({ _id, userId })
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
  const userId = req.user._id
  const _id = req.params.id
  return Record.findById({ _id, userId })
    .then(record => {
      record.name = req.body.name
      record.category = req.body.category
      record.date = req.body.date
      record.amount = req.body.amount
      record.merchant = req.body.merchant
      record.description = req.body.description

      return record.save()
    })
    .then(() => res.redirect(`/records/${_id}`))
    .catch(error => console.log(error))
})

//delete page

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findById({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router