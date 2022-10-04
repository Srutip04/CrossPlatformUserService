const express = require("express");
const {signup,login} = require("../controllers/users-controller")
const router = express.Router();

// router.get('/',);
router.route("/").post(signup);
router.route("/login").post(login);