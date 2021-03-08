import dbConnect from "../../utils/dbConnect";
import Certificate from "../../models/Certificate";
export default async (req, res) => {
  try {
    await dbConnect();
    const { username } = req.body;
    const cert = await Certificate.findOne({ username: username });
    if (!cert) {
      res.status(404).json({ message: "cert does not exist" });
    } else {
      await Certificate.deleteOne({ username: username });
      res.status(200).end();
    }
  } catch (error) {
    res.status(500).json({ message: error.name + ": " + error.message });
  }
};
