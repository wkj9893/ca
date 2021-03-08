import Certificate from "../../models/Certificate";
import dbConnect from "../../utils/dbConnect";
export default async (req, res) => {
  try {
    await dbConnect();
    const { number } = req.body;
    const cert = await Certificate.findOne({ serialNumber: number });
    res.status(200).json({
      pem: cert.pem,
      filename: `${number}.pem`,
    });
  } catch (error) {
    res.json({ message: error.name + ": " + error.message });
  }
};
