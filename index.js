const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const morgan = require('morgan')
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080
const configDB = require('./config/database.js')

let app = express()

mongoose.connect(configDB.url)

require('./config/passport')(passport)

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser())

app.set('view engine', 'ejs')

app.use(session({ secret: 'mysecretsession'}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

require('./app/routes')(app, passport)

let server = app.listen(port);

console.log('The magic happens on port ' + server.address().port);
