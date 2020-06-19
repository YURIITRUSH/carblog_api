const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const Post = new Schema({
  image: {type: String},
  title: {
    type: String,
    required: [true, 'Zagolovok dlya statti neobhidni !']
  },
  info: {
    type: String,
    required: [true, 'Avtor dlya statti neobhidni !']
  },
  visits: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
  },
	intro: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 320
  },
}, {timestamps: {createdAt: 'created_at'}, updatedAt: 'updated_at'});
Post.plugin(mongoosePaginate);
module.exports = mongoose.model('Post', Post);
