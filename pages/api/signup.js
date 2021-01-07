import mysql from "mysql";
import bcrypt from 'bcryptjs';


export default (req, res) => {
    if (req.method === "POST") {

        const { username, password } = req.body;

        bcrypt.hash(password, 10, function (err, hash) {

            // 连接数据库
            const db = mysql.createPool({
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'ca',
            });

            db.query(
                'INSERT INTO user(username,password) VALUES (?,?)',
                [username, hash],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                }
            );

            res.json({
                message: "true",
            })
        });
    } else {
        res.status(405).json({ message: "we only support POST" })
    }

}