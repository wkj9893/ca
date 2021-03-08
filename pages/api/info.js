import Certificate from "../../models/Certificate";
import { decrypt } from "../../crypto/aes";
import dbConnect from "../../utils/dbConnect";

export default async (req, res) => {
  const { username, passphrase } = req.body;
  try {
    await dbConnect();
    const cert = await Certificate.findOne({ username: username });
    const private_key = decrypt(cert.private_key, passphrase);
    res.status(200).json({
      username: username,
      private_key: private_key,
    });
  } catch (error) {
    res.json({ message: error.name + ": " + error.message });
  }
};
