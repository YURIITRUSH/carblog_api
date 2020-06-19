const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;
const Subscriber = new Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 24,
  },
  email: {
    type: String,
    required: true,
    validate: true,
    uniqueCaseInsensitive: true,
    validate: {
      validator: function(v) {
        return /^\S+@\S+\.\S+$/.test(value);
      },
      message: props => `${props.value} is not a valid email!`
    }
  }
})
Subscriber.plugin(uniqueValidator)
Subscriber.path('email').validate(function(value, done) {
    this.model('Subscriber').count({ email: value }, function(err, count) {
        if (err) {
            return done(err);
        }
        done(!count);
    });
}, 'Email already exists');
module.exports = mongoose.model('Subscriber', Subscriber)
