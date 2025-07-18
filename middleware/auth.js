// authMiddleware.js
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets");
const { UserModel } = require("../model/user");

const authenticateJWT = async (req, res, next) => {
  try {
    // 🛡️ Step 1: Token ko header se uthao
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Token required in Authorization header" });
    }

    // 🛡️ Step 2: Token verify karo
    const decoded = jwt.verify(token, jwtSecret);

    // 🛡️ Step 3: Token ke andar se user ka ID nikalo aur DB se user lao
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 🛡️ Step 4: User ko request object me store karo taaki baad ke routes use kar saken
    req.user = user;

    // ✅ Token valid hai, next middleware/route chalayega
    next();
  } catch (error) {
    // ❌ Error aaya toh yahan handle hoga (jaise token invalid ya expired)
    return res
      .status(401)
      .json({ message: "Invalid or expired token", error: error.message });
  }
};

module.exports = authenticateJWT;
