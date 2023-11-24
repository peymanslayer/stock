const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const { models } = require("../models/index");
async function adminMiddelware(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const extractToken = token.split(" ")?.[1];
  const findAdmin = await models.User.findOne({
    where: { token: extractToken },
  });
  if ((findAdmin.role && findAdmin.role === "admin")) {
    jwt.verify(findAdmin.token, config.development.JWT_SECRET, (err, dec) => {
      isAdmin(dec);
    });
  } else {
    res.status(400).json("not admin");
  }


  function isAdmin(verifyToken) {
    if (verifyToken) {
      next();
    } else {
      res.status(400).json("ادمین نیستید");
    }
  }
}

module.exports = adminMiddelware;
