const mongoose = require('mongoose')
const Post = mongoose.model('Post')
const Category = mongoose.model('Category')
const Subscriber = mongoose.model('Subscriber')

exports.mainPage = function (req, res) {
  Post.find({}, function(err, posts) {
    res.render('pages/manager.post.listing.pug', { posts, pageTitle: 'Лістинг постів' })
  })
}

exports.createPostPage = function (req, res) {
  Category.find({})
    .then(data=> {
      res.render('pages/manager.post.form.pug', { pageTitle: 'categories', categories: data})
    })
}

exports.editPostPage = function (req, res) {
  Post.findOne({_id: req.params.id}, function(err, post) {
    Category.find({})
      .then(data=> {
        res.render('pages/manager.post.form.pug', { pageTitle: 'редагування categories', categories: data})
      })
  })
}

exports.listSubscribers = function (req, res) {
  console.log(this);
  Subscriber.find({}, function (err, list) {
    res.render('pages/manager.subscribers.pug', { list })
  })
}
