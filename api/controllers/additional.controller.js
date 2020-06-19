const mongoose = require('mongoose')
const Subscriber = mongoose.model('Subscriber')

exports.subscribe = function (req, res) {
  var record = new Subscriber (req.body);
  record.save(function (err) {
    if (err) {
      return res.status(422).send(err);
    }
    res.send(record)
  })
}
exports.subscriberRemove = function (req, res) {
  Subscriber.remove({_id: req.params.id}, function(err){
    if (!err) {
      res.send('success')
    }
    else {
      res.send(err)
    }
  })
}
