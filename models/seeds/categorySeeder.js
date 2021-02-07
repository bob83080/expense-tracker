const categories = require('../Category')
const db = require('../../config/mongoose')


db.once('open', () => {
  categories.create(
    { name: '家居物業', },
    { name: '交通出行', },
    { name: '休閒娛樂', },
    { name: '餐飲食品', },
    { name: '其他', }
  )
  console.log('done')
})