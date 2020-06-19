const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
require('dotenv').config()

mongoose
	.connect('mongodb+srv://yuriitrush:'+process.env.DB_PASS+'@cluster0-p4epi.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
	.then(()=> console.log('Database Connected'))
	.catch(err => console.log(err));

const PostModel = require('./api/models/post.model.js')
const CategoryModel = require('./api/models/category.model.js')
const SubscriberModel = require('./api/models/subscriber.model.js')

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(express.static('uploads'))
app.set('view engine', 'pug');

const categoryRouter = require('./api/routes/category.router.js')
const postRouter = require('./api/routes/post.router.js')
const managerRouter = require('./site/manager/manager.router.js')
const mainRouter = require('./site/routes/main.router.js')
const additionalRouter = require('./api/routes/additional.router.js')
additionalRouter(app)
categoryRouter(app)
postRouter(app)
managerRouter(app)
mainRouter(app)

app.listen(process.env.PORT, function(){
	console.log('aplication listen on port '+process.env.PORT);
})
