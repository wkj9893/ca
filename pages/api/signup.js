import User from "../../models/User";
import dbConnect from "../../utils/dbConnect";
import bcrypt from "bcryptjs";

export default async (req, res) => {
  if (req.method === "POST") {
    await dbConnect();
    const { username, password } = req.body;
    const saltRounds = 10;

    try {
      const oneUser = await User.findOne({
        username: username,
      });
      if (oneUser) {
        res.json({
          message: "username already exist",
        });
        return;
      }
      const hash = await bcrypt.hash(password, saltRounds);
      const user = new User({
        username: username,
        password: hash,
      });

      await user.save();
      res.status(200).json({
        message: "success",
      });
    } catch (error) {
      res.json({
        message: error.name + ": " + error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};
