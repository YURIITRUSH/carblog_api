module.exports = function(app) {
  var multer  = require('multer')
  var upload = multer({ dest: 'uploads/' })
  const c = require('../controllers/post.controller.js')
  app.get('/posts.json', c.list)
  app.get('/posts/:id.json', c.getOne)
  app.post('/posts.json', c.create)
  app.delete('/posts/:id.json', c.remove)
  app.put('/posts/:id.json', c.update)
}
