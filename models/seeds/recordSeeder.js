const records = require('../record')
const categories = require('../category')
const db = require('../../config/mongoose')

db.once('open', () => {
  records.create(
    {
      name: '舒潔衛生紙',
      category: '家居物業',
      date: '2021-01-07',
      amount: 375,
      description: '家用',
      merchant: '超商'
    },
    {
      name: '蕃茄',
      category: '餐飲食品',
      date: '2021-01-14',
      amount: 100,
      description: '水果',
      merchant: '超商'
    },
    {
      name: '深海潛水',
      category: '休閒娛樂',
      date: '2021-02-01',
      amount: 1590,
      description: '潛水課程',
      merchant: '潛水教練'
    },
    {
      name: '95無鉛汽油',
      category: '交通出行',
      date: '2021-01-23',
      amount: 63,
      description: '加油',
      merchant: '中國石油'
    }
  )
  console.log('record done')

})
db.once('open', () => {
  categories.create(
    { name: '家居物業', },
    { name: '交通出行', },
    { name: '休閒娛樂', },
    { name: '餐飲食品', },
    { name: '其他', }
  )

  console.log('category done')
})
