import { verify } from "jsonwebtoken";

export default (req, res) => {
  try {
    const decoded = verify(req.cookies.auth, process.env.SECRET);
    res.status(200).json({
      username: decoded.username,
    });
  } catch (error) {
    res.status(401).json({
      message: error.name + ": " + error.message,
    });
  }
};
