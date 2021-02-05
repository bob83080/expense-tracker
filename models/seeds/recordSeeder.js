const mongoose = require('mongoose')
const records = require('../Record')

mongoose.connect('mongodb://localhost/expense-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  records.create(
    {
      name: '鹿皮巾拖把',
      category: '家居物業',
      date: '2021-01-07',
      amount: 375
    },
    {
      name: '蕃茄',
      category: '餐飲食品',
      date: '2021-01-14',
      amount: 100
    },
    {
      name: '智能腦控車',
      category: '休閒娛樂',
      date: '2021-02-01',
      amount: 1590
    },
    {
      name: '95無鉛汽油',
      category: '交通出行',
      date: '2021-01-23',
      amount: 63
    }
  )
  console.log('done')
})