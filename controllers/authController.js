const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, name, surname, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      name,
      surname,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const { password: savedPassword, ...others } = user._doc;

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await User.findOne({ 
        $or: [
            { email: identifier }, 
            { username: identifier }
        ] 
    });

    if (!user) {
      return res.status(404).json("Kullanıcı bulunamadı!");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json("Yanlış şifre!");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1d" } 
    );

    const { password: userPassword, ...others } = user._doc;

    res.status(200).json({ ...others, token });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = { register, login };