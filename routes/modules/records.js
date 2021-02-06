const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

//new page
router.get('/create', (req, res) => {
  return res.render('create')
})

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
    .then(record => res.render('detail', { record }))
    .catch(error => console.log(error))
})

//update page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Record.findById(id)
    .then(record => {
      record.name = name
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



module.exports = router