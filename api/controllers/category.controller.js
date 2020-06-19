const mongoose = require('mongoose')
const Category = mongoose.model('Category')

exports.create = function (req, res) {
  var record = new Category (req.body);
  record.save(function (err) {
    if (err) {
      return res.status(422).send(err);
  }
  res.send(record)
})
}
exports.list = function (req, res) {
  Category.find({}, function (err, docs) {
    res.send(docs)
  })
}
exports.remove = function (req, res) {

}
