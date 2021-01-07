import jwt from "jsonwebtoken";
import { secret } from "../../secret";


export default (req, res) => {
    const { token } = req.body;
    jwt.verify(token, secret, function (err, decoded) {
        if (!err && decoded) {
            res.json({ username: decoded.username });
        } else {
            res.status(401).json({ message: 'Sorry you are not authenticated' });
        }

    });

}