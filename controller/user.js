const { UserModel } = require("../model/user");

// const createUser = async (req, res) => {
//     const {name, email} = req.body;
//     if (!name || !email) {
//         return res.status(400).json({message: "please provide valid data"});
//     }
//     const exist = await UserModel.findOne({name, email});
//     if (exist) {
//         return res.status(409).json({message: "user already exist"});
//     }
//      const newUser = new UserModel({ name, email });
//   await newUser.save();

//     return res.status(201).json({
//     message: "User created successfully",
//     user: {
//       id: newUser._id,
//       name: newUser.name,
//       email: newUser.email,
//     },
//     token,
//   });
// };
const getUser = async (req, res) => {
  const users = await UserModel.find({});
  return res.status(200).json({ users });
};
