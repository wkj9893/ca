import forge from "node-forge";
import handler from "../../crypto/ClientRequestHandler";
import { encrypt } from "../../crypto/aes";
import Certificate from "../../models/Certificate";
import dbConnect from "../../utils/dbConnect";

export default async (req, res) => {
  if (req.method == "POST") {
    try {
      await dbConnect();
      const { username, commonName, country, state, locality, organization, ou, year, passphrase } = req.body;

      const OneCert = await Certificate.findOne({
        username: username,
      });
      if (OneCert) {
        await Certificate.deleteOne({ username: username });
      }

      const cert = handler(commonName, country, state, locality, organization, ou, year);
      const start_time = cert.validity.notBefore;
      const end_time = cert.validity.notAfter;
      const public_key = forge.pki.publicKeyToPem(cert.publicKey);
      const private_key = encrypt(forge.pki.privateKeyToPem(cert.privateKey), passphrase);
      const number = cert.serialNumber;
      const pem = forge.pki.certificateToPem(cert);

      const certificate = Certificate({
        serialNumber: number,
        start_time: start_time,
        end_time: end_time,
        pem: pem,
        public_key: public_key,
        private_key: private_key,
        username: username,
      });
      await certificate.save();
      res.json({
        message: "success",
        pem: pem,
        filename: `${number}.pem`,
      });
    } catch (error) {
      res.json({ message: error.name + ": " + error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};
