module.exports = function(app) {
  const c = require('../controllers/additional.controller.js');
  app.post('/subscribe', c.subscribe)
  app.delete('/subscribe/:id.json', c.subscriberRemove)
}
