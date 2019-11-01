const db = require('../database/db');

const User = db.Model.extend({
  tableName: 'login_user',
  //to customize password field instead of true put name of column. Ex: 'login_password'
  hasSecurePassword: true
});

module.exports = User;
