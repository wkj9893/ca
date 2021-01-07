import verify from "../../crypto/Verify"
import multer from 'multer';


const upload = multer();

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    upload.single('cert')(req, {}, err => {
        if (req.file == null) {
            res.status(400).json({ msg: 'No file uploaded' });
        }
        const file = req.file;
        const pem = file.buffer.toString('utf8');
        if (verify(pem)) {
            return res.json({ msg: 'true' })

        } else {
            return res.json({ msg: 'false' })
        }
    });

};



