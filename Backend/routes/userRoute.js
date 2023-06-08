const express=require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, reportAdd, chatinterface, updatePassword, updateProfile } = require("../controllers/userController");
const { isAuthentcatedUser } = require("../middleware/auth");
const router =express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthentcatedUser,getUserDetails);
router.route("/report").post(isAuthentcatedUser,reportAdd);
router.route("/message").post(chatinterface);
router.route("/password/update").put(isAuthentcatedUser,updatePassword);
router.route("/me/update").put(isAuthentcatedUser,updateProfile);

module.exports=router;