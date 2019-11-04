const db = require('../database/db');
// creating adding secure password functionality to user model
const User = db.Model.extend({
  tableName: 'login_user',
  // To customize password field instead of true put name of column.
  // Ex: 'login_password'
  hasSecurePassword: true
});

module.exports = User;
