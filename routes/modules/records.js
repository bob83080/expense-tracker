const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

//new page
router.get('/create', (req, res) => {
  return res.render('create')
})

router.post('/', (req, res) => {
  // const records = req.body
  // Category.find({ name: records.category })
  //   .lean()
  //   .then(category => {
  //     records.icon = category.icon
  //     Record.create(records)
  //     res.redirect('/')
  //   })
  //   .catch(error => console.log(error))



  const records = req.body
  return Record.create(records)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// //search page
// router.get('/:type/:method', (req, res) => {
//   const type = req.params.type
//   const method = req.params.method
//   const typeObj = { name: '店名', category: '類別', rating: '評分' }
//   const methodObj = { asc: 'A-Z', desc: 'Z-A', descending: '由高至低', ascending: '由低至高' }
//   const currentSelected = `${typeObj[type]}：${methodObj[method]}`

//   return Record.find()
//     .lean()
//     .then(records => {
//       const record = records.filter(record => record.name.toLowerCase().includes(keyword.toLowerCase()) || record.category.toLowerCase().includes(keyword.toLowerCase()))
//       res.render('index', { record })
//     })
//     .catch(error => console.error(error))
// })




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
  // const name = req.body.name
  // const category = req.body.category
  // const date = req.body.date
  // const amount = req.body.amount
  return Record.findById(id)
    .then(record => {
      record.name = req.body.name
      record.category = req.body.category
      record.date = req.body.date
      record.amount = req.body.amount
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