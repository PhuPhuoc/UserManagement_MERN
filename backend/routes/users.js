const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

// GET ALL USERS
router.get("/", userController.getUsers);
// GET A USER
router.get("/:id", userController.getAUser);
// CREATE NEW USER
router.post("/", userController.addNewUser);
// UPDATE USER
router.put("/:id", userController.updateUser);
// DELETE USER
router.delete("/:id", userController.deleteUser);

module.exports = router;