import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema({
  serialNumber: { type: String, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  pem: { type: String, required: true },
  public_key: { type: String, required: true },
  private_key: { type: String, required: true },
  username: { type: String, required: true },
});

export default mongoose.models.Certificate || mongoose.model("Certificate", CertificateSchema);
