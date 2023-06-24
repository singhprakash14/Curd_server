const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const validateuser = require("../validators/user.validator");

router
  .route("/users")
  .get(userController.getAllUser)
  .post(validateuser, userController.adduser);

router
  .route("/users/:id")
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

// Search route
router.get("/search", userController.searchUser);

module.exports = router;


//  adduser,
//   getUserById,
//   getAllUser,
//   updateUser,
//   deleteUser,
//   searchUser,