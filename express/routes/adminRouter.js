const express = require("express");

const router = express.Router();

router.get("/admin", (req, res) => {
  res.send("后台页面");
});


module.exports = router;
