const pool = require("../config/db");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  console.log("reach at protect");

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.token_api);
      console.log(decoded);

      const temp = await pool.query(
        `select * from osp.users where email = '${decoded.email}'`
      );
      req.user = temp.rows[0];
      if (req.user.email == decoded.email) {
        console.log("decoded");
        next();
      }

      else {
        res.status(401).json({ mesasge: "Not Authorized, token failed" });
        // console.log(req.user.email);
        // console.log(decoded.email);
      return;

      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ mesasge: "Not Authorized, token failed" });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ mesasge: "No token" });
    return;
  }
};

module.exports = protect;
