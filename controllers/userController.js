const bcrypt = require("bcryptjs");
const { generateToken } = require("../middlewares/jwt");
const UserModel = require("../models/userModel");

const handleRegisterUser = async (req, res) => {
  const { name, email, password,role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await UserModel.create(name, email, hashedPassword,role);
    res
      .status(201)
      .json({ response: response, message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

const handleloginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findByEmail(email);
    //Check if user is present or not
    if (!user) return res.status(404).json({ error: " Invalid Email Id" });
    //Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const payload = { id: user.id, role: user.role };
    const token = generateToken(payload);

    res.status(201).json(token);
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

const handleProfile = async (req, res) => {
  const id = req.user.id;

    try {
    const user = await UserModel.findById(id);
    res.status(201).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};
const handleUpdateProfile = async (req, res) => {
  const id = req.user.id;

  const { name, email, password } = req.body;
  try {
    const user = await UserModel.update(id, { name, email, password });
    console.log(user);
    return res
      .status(201)
      .json({ user: user, message: "User Updated Sucessfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};

module.exports = {
  handleRegisterUser,
  handleloginUser,
  handleProfile,
  handleUpdateProfile,
};
