const mongoose = require('mongoose')
const Post = mongoose.model('Post')

exports.create = function(req, res){
  var multer = require('multer')
  var upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 1 * 1024 * 1024}
  }).single('image')
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(413).send(err)
    }
  var newRecord = req.body
  newRecord.image = req.file.filename
  var record = new Post(newRecord);
  record.save(function (err) {
    if (err) {
      return res.status(422).send(err);
    }
    res.send(record)
  });
})
}
exports.list = function (req, res) {
  Post.find({}, function(err, posts){
    res.send(posts)
  })
}

exports.getOne = function (req, res) {
  Post.findById(req.params.id, function (err, post){
    res.send(post)
  })
}

exports.remove = function (req, res) {
  Post.remove({_id: req.params.id}, function(err){
    if (!err) {
      res.send('success')
    }
    else {
      res.send(err)
    }
  })
}

exports.update = function (req, res) {
  var multer = require('multer')
  var upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 1 * 1024 * 1024}
  }).single('image')
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(413).send(err)
    }
    var updateRecord = req.body
    if (req.file) {
      updateRecord.image = req.file.filename
    }
    Post.findOneAndUpdate({_id: req.params.id}, updateRecord, {
      new: true
    }, function (err, post){
      if (err) {
        return res.send(err)
      }
      res.send(post)
    })
  })

}
