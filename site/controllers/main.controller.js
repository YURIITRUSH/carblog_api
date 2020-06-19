const mongoose = require('mongoose')
const Post = mongoose.model('Post')
const Category = mongoose.model('Category')
const popularPostsOptions = {
  page: 1,
  limit: 4,
  sort: {visits: -1}
}

exports.posts = function (req, res) {
  const options = {
    page: req.query.page || 1,
    limit: req.query.limit || 6,
    sort: {created_at: -1, update_at: -1},
  };
  var filterParams = {}
  if (req.query.category) {
    filterParams.category = req.query.category
  }
  var posts = [];
  var popularPosts = [];
  var popularPostsMain = [];
  var categories = [];
  console.log(popularPostsMain)
  Post.paginate(filterParams, options)
  .then(function (docs) {
    posts = docs
    return Post.paginate({}, popularPostsOptions)
  })
  .then(function (docs) {
    popularPosts = docs
    return Post.paginate({category: 'news'}, popularPostsOptions)
  })
  .then(function (docs) {
    popularPostsMain = docs
    return Category.find({})
  })
  .then(function (docs) {
    const data = {
      posts,
      popularPosts,
      moment: require('moment'),
      popularPostsMain,
      categories: docs
    }
    res.render('pages/index.pug', data)
  })
  .catch(function(err) {
    console.log(err);
  })
}
exports.postShow = function (req, res) {
  Post.findOneAndUpdate({ _id: req.params.id }, { $inc: { visits: 1 } }, {new: true}, function (err, post) {
    Post.paginate({}, popularPostsOptions, function (err, posts) {
      Post.paginate({}, popularPostsOptions, function (err, news) {
        Category.find({}, function(err, categories) {
          res.render('pages/postPage.pug', {
            post,
            popularPosts: posts,
            popularPostsMain: news,
            categories,
            moment: require('moment')
          })
        })
      })
    })
  })
}
