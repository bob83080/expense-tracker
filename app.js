const express = require('express')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const bodyPraser = require('body-parser')
const routes = require('./routes')
require('./config/mongoose')
const app = express()
const PORT = process.env.PORT || 3000


// const Record = require('./models/record')
// const Category = require('./models/category')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyPraser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})