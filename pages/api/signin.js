import mysql from "mysql";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { secret } from "../../secret";


export default (req, res) => {

    if (req.method == "POST") {
        const { username, password } = req.body;
        // 连接数据库
        const db = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'ca',
        });


        db.query('SELECT * FROM user WHERE username = ?',
            [username], (err, result) => {
                if (err || !result[0]) {
                    res.json({ message: 'false' })
                }
                else {
                    //比较用户登录密码是否与数据库密码相同(Hash)
                    bcrypt.compare(password, result[0].password, function (error, response) {
                        if (error) {
                            console.log(error);
                        }
                        //如果相同，设置token
                        if (response) {
                            const token = jwt.sign({ iss: "wkj", "username": username }, secret, { expiresIn: '1h' });
                            res.json({
                                message: "true",
                                token: token
                            })
                        } else {
                            res.json({
                                message: "false"
                            })
                        }

                    });
                }
            })

    } else {
        res.status(405).json({ message: "we only support POST" });
    }
}













