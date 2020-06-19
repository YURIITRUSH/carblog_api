module.exports = function (app) {
  const c = require('./manager.controller.js')
  app.get('/manager', c.mainPage)
  app.get('/manager/newpost', c.createPostPage)
  app.get('/manager/posts-edit/:id', c.editPostPage)
  app.get('/manager/subscribers', c.listSubscribers)
}
