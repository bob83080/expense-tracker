const mongoose = require('mongoose')
const Schema = mongoose.Schema


const recordSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  merchant: { type: String, required: true },
  description: { type: String, required: true },
})

module.exports = mongoose.model('Record', recordSchema)