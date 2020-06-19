module.exports = function (app) {
  const controller = require('../controllers/main.controller.js')
  app.get('/', controller.posts)
  app.get('/posts/:id', controller.postShow)
}
