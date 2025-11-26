const router = require("express").Router();
const { getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController");
const { verifyTokenAndAdmin, verifyToken} = require("../middleware/verifyToken");

router.get("/", verifyTokenAndAdmin, getAllUsers);

router.get("/:id", verifyToken, getUserById);

router.put("/:id", verifyToken, updateUser);

router.delete("/:id", verifyToken, deleteUser);

module.exports = router;