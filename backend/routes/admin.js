const express = require("express");
const router = express.Router();

const admin_control = require("../controllers/adminController");


router.get("/users" , admin_control.fetchUser);


module.exports = router;