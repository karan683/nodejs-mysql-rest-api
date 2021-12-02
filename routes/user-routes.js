const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const userController = require("../controllers/users-controllers");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post(
  "/create",
  [
    check("firstname").isLength({ min: 2 }),
    check("lastname").isLength({ min: 2 }),
    check("email").isEmail(),
    check("phone").isLength({ min: 10 }),
  ],
  userController.createUser
);
router.patch(
  "/update/:id",
  [
    check("firstname").isLength({ min: 2 }),
    check("lastname").isLength({ min: 2 }),
    check("email").isEmail(),
    check("phone").isLength({ min: 10 }),
  ],
  userController.updateUser
);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
