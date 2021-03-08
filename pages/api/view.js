import Certificate from "../../models/Certificate";
import dbConnect from "../../utils/dbConnect";

export default async (req, res) => {
  const { username } = req.body;
  try {
    await dbConnect();
    const cert = await Certificate.findOne({ username: username });
    res.status(200).json({
      serialNumber: cert.serialNumber,
      start_time: cert.start_time,
      end_time: cert.end_time,
      pem: cert.pem,
      public_key: cert.public_key,
      private_key: cert.private_key,
      username: cert.username,
    });
  } catch (error) {
    res.json({ message: error.name + ": " + error.message });
  }
};
