import User from "../../models/User";
import dbConnect from "../../utils/dbConnect";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import bcrypt from "bcrypt";

export default async (req, res) => {
  if (req.method == "POST") {
    await dbConnect();

    const { username, password } = req.body;
    try {
      const user = await User.findOne({
        username: username,
      });
      if (!user) {
        res.json({ message: "username dose not exist" });
        return;
      }
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign({ iss: "wkj", username: username }, process.env.SECRET, { expiresIn: "1h" });
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("auth", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 3600,
            path: "/",
            secure: process.env.NODE_ENV === "production",
          })
        );

        res.status(200).json({ message: "success", token: token });
      } else {
        res.json({ message: "wrong password" });
      }
    } catch (error) {
      res.json({ message: error.name + ": " + error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};
