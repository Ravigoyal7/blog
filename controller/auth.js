const { UserModel } = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets");
const mapper = (user) => {
  const model = {
    id: user._id,
    name: user.name,
    email: user.email,
  };
  if (user.token) {
    model.token = user.token;
  }
  return model;
};
const signUp = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    //   validate
    if (!email || !name || !password) {
      throw "please provide required data";
    }
    // existing email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw "Email already registered.";
    }
    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // create user
    const user = await UserModel.create({
      email,
      name,
      password: hashedPassword,
    });
    return res.status(201).json({
      data: mapper(user),
    });
  } catch (error) {
    return res.json(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //   user exist
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw "Please provide valid email";
    }
    // password check
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) {
      throw "incorrct Password";
    }

    // token generattion

    const token = jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: 60 * 60 * 1000,
    });
    user.token = token;
    await user.save();
    // response
    return res.json({ data: mapper(user) });
  } catch (error) {
    return res.json(error);
  }
};

module.exports = { signUp, login };
