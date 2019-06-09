const UserService = require("../services/user-service");
const userService = new UserService();

router.get("/", (req, res) => {
  userService
    .getUsers()
    .then(result => {
      //var parseData = JSON.parse(result);
      res.send(result);
    })
    .catch(err => {
      res.status(400).json({ msg: err.message });
    });
});
modle.exports = router;

