const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
 
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
 
userSchema.plugin(passportLocalMongoose);
 
const User = mongoose.model('User', userSchema);
 
// Create a default admin user
User.register({ username: 'admin' }, 'admin', (err, user) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Admin user created:', user);
  }
});
 
module.exports = User;