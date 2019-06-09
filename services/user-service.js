var User = require("../models/user");

module.exports = class UserService {
  constructor() {}

  getUsers() {
    return new Promise((resolve, reject) => {
      User.getAllUsers((err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
}