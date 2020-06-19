module.exports = function (app){
  const c = require('../controllers/category.controller.js');
  app.post('/categories.json', c.create)
  app.get('/categories.json', c.list)
}
